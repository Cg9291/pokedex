import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AxiosError } from "axios";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { getPokemonData } from "../functions/api/singleApiCalls/getPokemonData";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import { handleOutsideClicks } from "../functions/utilities/handleOutsideClicks";
import {
    ComparatorPokemonImagesInterface,
    IsModalActiveInterface,
    IsModalActiveKitInterface,
    PokemonImagesKitInterface
} from "../interfaces/miscInterfaces";

import { comparatorDefaultPokemonInfo } from "../objects/comparatorDefaultPokemonInfo";

export function Comparator(): React.ReactElement {
    const [isModalActive, setIsModalActive] = useState<IsModalActiveInterface>({
        isActive: false,
        activeImageNumber: 0
    });
    const [pokemonImages, setPokemonImages] = useState<ComparatorPokemonImagesInterface>(comparatorDefaultPokemonInfo);

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

    return (
        <Container $isActive={isModalActive.isActive}>
            <Header>
                <HeaderTitle>Comparator</HeaderTitle>
                <HeaderDescription>Select the two Pokemon that you would like to compare.</HeaderDescription>
            </Header>
            <ComparatorBody>
                <ComparatorPokemonCards
                    imgUrl={pokemonImages.topPokemon.sprites.front_default}
                    imgOrder={1}
                    setIsModalActive={setIsModalActive}
                />
                <RandomizeButton></RandomizeButton>
                <ComparatorPokemonCards
                    imgUrl={pokemonImages.bottomPokemon.sprites.front_default}
                    imgOrder={2}
                    setIsModalActive={setIsModalActive}
                />
                <CompareButton> COMPARE!</CompareButton>
            </ComparatorBody>
            {isModalActive && (
                <ComparatorPokemonSearchModal
                    isModalActiveKit={{ isModalActive: isModalActive, setIsModalActive: setIsModalActive }}
                    pokemonImagesKit={{ pokemonImages: pokemonImages, setPokemonImages: setPokemonImages }}
                />
            )}
        </Container>
    );
}

function ComparatorPokemonCards(props: {
    imgUrl: string;
    imgOrder: number;
    setIsModalActive: React.Dispatch<React.SetStateAction<IsModalActiveInterface>>;
}): React.ReactElement {
    return (
        <ComparatorPokemonCardsContainer>
            <ChangeSelectionButton
                onClick={() => props.setIsModalActive({ isActive: true, activeImageNumber: props.imgOrder })}
            >
                Switch
            </ChangeSelectionButton>
            <PokemonImg src={props.imgUrl} />
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

const HeaderTitle = styled.h1`
    margin-bottom: 0.5rem;
`;

const HeaderDescription = styled.p`
    min-height: fit-content;
`;

const ComparatorBody = styled(ContainerPrototype)`
    flex-direction: column;
    align-items: center;
`;

const ComparatorPokemonCardsContainer = styled(ContainerPrototype)`
    height: 30%;
    background-color: lightgrey;
    justify-content: center;
    border-radius: 12px;
    align-items: center;
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
    top: 7vh;
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
