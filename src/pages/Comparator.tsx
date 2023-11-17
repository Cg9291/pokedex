import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AxiosError } from "axios";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { getPokemonData } from "../functions/api/singleApiCalls/getPokemonData";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import { handleOutsideClicks } from "../functions/utilities/handleOutsideClicks";
import {
    ComparatorPokemonDataInterface,
    ComparatorPokemonInfoInterface,
    IsModalActiveInterface,
    IsModalActiveKitInterface,
    PokemonImagesKitInterface
} from "../interfaces/miscInterfaces";
import { comparatorDefaultPokemonInfo } from "../objects/comparatorDefaultPokemonInfo";
import { BaseStats } from "../components/pokemonProfiles/profileNavBodies/BaseStats";

export function Comparator(): React.ReactElement {
    const [isModalActive, setIsModalActive] = useState<IsModalActiveInterface>({
        isActive: false,
        activeImageNumber: 0
    });
    const [pokemonData, setPokemonData] = useState<ComparatorPokemonDataInterface>(comparatorDefaultPokemonInfo);
    const [isCompared, setIsCompared] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>();

    /*[NOTE] To be used later
      const getData = async (identifier: NumOrString, imgOrder: number): Promise<void> => {
        const data = await getPokemonData(identifier);
        const pokemonInfo: ComparatorPokemonInfoInterface = {
            name: data.name,
            id: data.id,
            sprites: data.sprites,
            stats: data.stats
        };
        if (imgOrder === 1) {
            setPokemonImages({ ...pokemonImages, topPokemon: pokemonInfo });
        } else if (imgOrder === 2) {
            setPokemonImages({ ...pokemonImages, bottomPokemon: pokemonInfo });
        }
    }; */

    /* const randomizeButtonImage =
        "https://cdn4.iconfinder.com/data/icons/game-design-flat-icons-2/512/13_dice_roll_random_game_design_flat_icon-512.png";
 */ // [NOTE!] To be used later

    const compareStats = (): string => {
        const { topPokemon, bottomPokemon } = pokemonData;
        const scores = { topPokemonScore: 0, bottomPokemonScore: 0 };
        for (let i = 0; i < 6; i++) {
            if (topPokemon.stats[i].base_stat > bottomPokemon.stats[i].base_stat) {
                scores.topPokemonScore += 1;
            } else if (topPokemon.stats[i].base_stat === bottomPokemon.stats[i].base_stat) {
                scores.topPokemonScore += 1;
                scores.bottomPokemonScore += 1;
            } else {
                scores.bottomPokemonScore += 1;
            }
        }
        return scores.topPokemonScore > scores.bottomPokemonScore
            ? topPokemon.name
            : scores.topPokemonScore === scores.bottomPokemonScore
            ? "tie"
            : bottomPokemon.name;
    };

    const handleCompare = () => {
        setIsCompared(true);
        const comparisonResult = compareStats();
        comparisonResult === "tie" ? setWinner(`It's a tie!`) : setWinner(`${comparisonResult} is the winner!`);
    };

    return (
        <Container $isActive={isModalActive.isActive}>
            {isCompared && <BackButton onClick={() => setIsCompared(false)}>Back</BackButton>}
            <Header>
                <HeaderTitle $isCompared={isCompared}>Comparator</HeaderTitle>
                {!isCompared && (
                    <HeaderDescription>Select the two Pokemon that you would like to compare.</HeaderDescription>
                )}
            </Header>
            <ComparatorBody>
                {isCompared ? (
                    <>
                        <CardsRow>
                            <ComparatorPokemonCards
                                pokemonData={pokemonData.topPokemon}
                                imgOrder={1}
                                setIsModalActive={setIsModalActive}
                                isCompared={isCompared}
                            />
                            <ComparatorPokemonCards
                                pokemonData={pokemonData.bottomPokemon}
                                imgOrder={2}
                                setIsModalActive={setIsModalActive}
                                isCompared={isCompared}
                            />
                        </CardsRow>
                        <>{winner}</>
                        <BaseStats
                            pokemonStatsProps={pokemonData.topPokemon}
                            secondPokemonStatsProps={pokemonData.bottomPokemon}
                        />
                    </>
                ) : (
                    <>
                        <ComparatorPokemonCards
                            pokemonData={pokemonData.topPokemon}
                            imgOrder={1}
                            setIsModalActive={setIsModalActive}
                        />
                        <RandomizeButton></RandomizeButton>
                        <ComparatorPokemonCards
                            pokemonData={pokemonData.bottomPokemon}
                            imgOrder={2}
                            setIsModalActive={setIsModalActive}
                        />
                        <CompareButton onClick={handleCompare}> COMPARE!</CompareButton>
                    </>
                )}
            </ComparatorBody>
            {isModalActive && (
                <ComparatorPokemonSearchModal
                    isModalActiveKit={{ isModalActive: isModalActive, setIsModalActive: setIsModalActive }}
                    pokemonImagesKit={{ pokemonImages: pokemonData, setPokemonImages: setPokemonData }}
                />
            )}
        </Container>
    );
}

function ComparatorPokemonCards(props: {
    pokemonData: ComparatorPokemonInfoInterface;
    imgOrder: number;
    isCompared?: boolean;
    setIsModalActive: React.Dispatch<React.SetStateAction<IsModalActiveInterface>>;
}): React.ReactElement {
    const { name, sprites } = props.pokemonData;
    return (
        <ComparatorPokemonCardsContainer $isCompared={props.isCompared && props.isCompared}>
            {!props.isCompared && (
                <ChangeSelectionButton
                    onClick={() => props.setIsModalActive({ isActive: true, activeImageNumber: props.imgOrder })}
                >
                    Switch
                </ChangeSelectionButton>
            )}
            <PokemonImg src={sprites.front_default} />
            {props.isCompared && <PokemonName>{name}</PokemonName>}
        </ComparatorPokemonCardsContainer>
    );
}

function ComparatorPokemonSearchModal(props: {
    isModalActiveKit: IsModalActiveKitInterface;
    pokemonImagesKit: PokemonImagesKitInterface;
}): React.ReactElement {
    const [searchedPokemonId, setSearchedPokemonId] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    handleOutsideClicks(modalRef, props.isModalActiveKit.setIsModalActive);
    const navigate = useNavigate();

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const transmittedData = Object.fromEntries(formData.entries()).searchInput;
        const name = transmittedData.toString().toLowerCase();
        try {
            const pokemonData = await getPokemonData(name);
            await setSearchedPokemonId(pokemonData.id);
        } catch (err) {
            if (err instanceof AxiosError && err.response?.status === 404) {
                navigate(`/pokemon-not-found`);
            }
        }
        return;
    };

    return (
        <ComparatorSearchModalContainer isModalActive={props.isModalActiveKit.isModalActive.isActive} ref={modalRef}>
            <SearchModalHeader>Choose a Pokemon</SearchModalHeader>
            <Form onSubmit={handleSearch}>
                <Label>
                    <Input required />
                </Label>
            </Form>
            {searchedPokemonId && (
                <PokemonPictureCard
                    id={searchedPokemonId}
                    pokemonImagesKit={props.pokemonImagesKit}
                    isModalActiveKit={props.isModalActiveKit}
                    isLink={false}
                />
            )}
        </ComparatorSearchModalContainer>
    );
}

const Container = styled(ContainerPrototype)<{ $isActive?: boolean }>`
    padding: 0 1rem;
    flex-direction: column;
    background-color: ${(props) => (props.$isActive ? `rgba(0, 0, 0, 0.4)` : "inherit")};
`;

const Header = styled(ContainerPrototype)`
    height: max-content;
    flex-direction: column;
    margin-bottom: 1.5rem;
`;

const HeaderTitle = styled.h1<{ $isCompared?: boolean }>`
    margin: ${(props) => props.$isCompared && "auto"};
    font-size: ${(props) => props.$isCompared && "1.5em"};
`;

const HeaderDescription = styled.p`
    min-height: fit-content;
`;

const ComparatorBody = styled(ContainerPrototype)`
    flex-direction: column;
    align-items: center;
`;

const BackButton = styled.button.attrs({ type: "button" })<{ $isCompared?: boolean }>`
    position: absolute;
    width: 3rem;
    height: 2rem;
`;
const CardsRow = styled(ContainerPrototype)`
    height: fit-content;
    min-height: fit-content;
    max-height: fit-content;
    justify-content: space-evenly;
`;

const ComparatorPokemonCardsContainer = styled(ContainerPrototype)<{ $isCompared?: boolean }>`
    height: 30%;
    background-color: lightgrey;
    justify-content: center;
    border-radius: 12px;
    align-items: center;
    width: ${({ $isCompared }) => $isCompared && ` 40%`};
    height: ${({ $isCompared }) => $isCompared && ` fit-content;`};
`;

const PokemonName = styled.h5`
    background-color: white;
    border: 0.1rem solid grey;
    border-radius: 50px;
    padding: 0.5rem 0.2rem;
`;

const PokemonImg = styled.img`
    width: 9rem;
    aspect-ratio: 1/1;
`;

const ChangeSelectionButton = styled.button.attrs({ type: "button" })`
    //Will review
    position: absolute;
    width: fit-content;
    aspect-ratio: 1/1;
    margin-left: -80%;
`;

const ComparatorSearchModalContainer = styled(ContainerPrototype)<{ isModalActive: boolean }>`
    flex-direction: column;
    display: ${(props) => (props.isModalActive ? "flex" : "none")};
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 12vh;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 1;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding: 2rem 1rem;
`;

const SearchModalHeader = styled.h2``;

const Form = styled.form.attrs({
    method: "get"
})`
    width: 100%;
    display: flex;
`;

const Label = styled.label`
    flex: 3 0 85%;
`;

const Input = styled.input.attrs({
    placeholder: "Search a Pokemon",
    name: "searchInput"
})`
    width: 100%;
    height: 3rem;
    border-radius: 99px;
    margin-top: 1rem;
    padding-left: 1rem;
`;

const CompareButton = styled.button.attrs({ type: "button" })`
    height: 3rem;
    width: 100%;
    background-color: gold;
    border-radius: 15px;
    border: none;
    font-weight: 600;
    font-size: 1.2em;
    margin-top: 1rem;
`;

const RandomizeButton = styled.button.attrs({ type: "button" })`
    width: 3rem;
    aspect-ratio: 1/1;
    margin: -0.9rem 0;
    z-index: 1;
    border-radius: 50%;
    background-color: white;
    border: none;
`;
