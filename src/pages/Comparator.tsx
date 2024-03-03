import React, { useState } from "react";
import styled from "styled-components/macro";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { ComparatorsPokemonSearchModal } from "../components/comparator/PokemonSearchModal";
import { getPokemonData } from "../functions/api/singleApiCalls/getPokemonData";
import { ComparatorPokemonInfoInterface, IsModalActiveInterface } from "../interfaces/comparatorInterfaces";
import { comparatorDefaultPokemonInfo } from "../objects/comparatorDefaultPokemonInfo";
import { BaseStats } from "../components/pokemonProfiles/profileNavBodies/BaseStats";
import { pickRandomPokemonNumbers } from "../functions/utilities/pickRandomPokemonNumbers";
import { NumOrString } from "../interfaces/miscTypes";
import { capitalizeWords } from "../functions/utilities/capitalizeWords";
import comparatorsButtonLogo from "../assets/comparatorsRandomizeButtonLogo.png";
import { ComparatorPokemonDataInterface } from "../interfaces/comparatorInterfaces";
import { ComparatorsPokemonCards } from "../components/comparator/ComparatorsPokemonCards";
import backIcon from "../assets/icons8-back-arrow-50.png";
import * as breakpoints from "../objects/breakpoints";

export function Comparator(): React.ReactElement {
    const [isModalActive, setIsModalActive] = useState<IsModalActiveInterface>({
        isActive: false,
        activeImageNumber: 0
    });
    const [pokemonData, setPokemonData] = useState<ComparatorPokemonDataInterface>(comparatorDefaultPokemonInfo);
    const [isCompared, setIsCompared] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>();

    const getData = async (identifier: NumOrString, imgOrder: number): Promise<void> => {
        const data = await getPokemonData(identifier);
        const pokemonInfo: ComparatorPokemonInfoInterface = {
            name: data.name,
            id: data.id,
            sprites: data.sprites,
            stats: data.stats,
            types: data.types
        };
        if (imgOrder === 1) {
            await setPokemonData((oldState) => ({ ...oldState, topPokemon: pokemonInfo }));
        } else if (imgOrder === 2) {
            await setPokemonData((oldState) => ({ ...oldState, bottomPokemon: pokemonInfo }));
        }
        return;
    };

    const compareStats = (): string => {
        const { topPokemon, bottomPokemon } = pokemonData;
        const scores = { topPokemonScore: 0, bottomPokemonScore: 0 };
        for (let i = 0; i < 6; i++) {
            if (topPokemon.stats[i].base_stat > bottomPokemon.stats[i].base_stat) {
                scores.topPokemonScore += 1;
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
        comparisonResult === "tie"
            ? setWinner(`It's a tie!`)
            : setWinner(`${capitalizeWords(comparisonResult)} is the winner!`);
    };

    const handleRandomize = async () => {
        const pokemonNumbersArray: number[] = pickRandomPokemonNumbers(true);
        await getData(pokemonNumbersArray[0], 1);
        await getData(pokemonNumbersArray[1], 2);
        return;
    };

    return (
        <Container>
            <Wrapper $isActive={isModalActive.isActive}>
                {isCompared && (
                    <BackButton onClick={() => setIsCompared(false)}>
                        <BackIcon />
                    </BackButton>
                )}
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
                                <ComparatorsPokemonCards
                                    pokemonData={pokemonData.topPokemon}
                                    imgOrder={1}
                                    setIsModalActive={setIsModalActive}
                                    isCompared={isCompared}
                                />
                                <ComparatorsPokemonCards
                                    pokemonData={pokemonData.bottomPokemon}
                                    imgOrder={2}
                                    setIsModalActive={setIsModalActive}
                                    isCompared={isCompared}
                                />
                            </CardsRow>
                            <Result>{winner}</Result>
                            <BaseStats
                                pokemonStatsProps={pokemonData.topPokemon}
                                secondPokemonStatsProps={pokemonData.bottomPokemon}
                            />
                        </>
                    ) : (
                        <>
                            <CardsWrapper>
                                <ComparatorsPokemonCards
                                    pokemonData={pokemonData.topPokemon}
                                    imgOrder={1}
                                    setIsModalActive={setIsModalActive}
                                />
                                <RandomizeButton>
                                    <RandomizeButtonImage onClick={handleRandomize} />
                                </RandomizeButton>
                                <ComparatorsPokemonCards
                                    pokemonData={pokemonData.bottomPokemon}
                                    imgOrder={2}
                                    setIsModalActive={setIsModalActive}
                                />
                            </CardsWrapper>
                            <CompareButton onClick={handleCompare}> COMPARE!</CompareButton>
                        </>
                    )}
                </ComparatorBody>
                {isModalActive && (
                    <ComparatorsPokemonSearchModal
                        isModalActiveKit={{ isModalActive: isModalActive, setIsModalActive: setIsModalActive }}
                        pokemonImagesKit={{ pokemonImages: pokemonData, setPokemonImages: setPokemonData }}
                    />
                )}
            </Wrapper>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    flex: 1 0 0;
    background-color: white;
    overflow: hidden;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        max-height: 100%;
        height: 100%;
    }

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        padding: 0 12vw;
        background-color: #1b252f;
    }
`;

const Wrapper = styled(ContainerPrototype)<{ $isActive?: boolean }>`
    flex-direction: column;
    background-color: ${(props) => (props.$isActive ? `rgba(0, 0, 0, 0.8)` : "inherit")};
    padding: 0 1rem 1rem;
    row-gap: 0.5rem;
    align-items: center;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        //height: 100%;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        position: relative;
        padding: 0 5vw;
    }
`;

const Header = styled(ContainerPrototype)`
    flex-direction: column;
    flex: 0 0 content;
`;

const HeaderTitle = styled.h1<{ $isCompared?: boolean }>`
    flex: 0 0 content;
    margin: ${(props) => props.$isCompared && "auto"};
    font-size: ${(props) => (props.$isCompared ? "2.5em" : "3em")};

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        font-size: ${(props) => props.$isCompared && "3.2em"};
    }

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: ${(props) => (props.$isCompared ? "3.5em" : "4rem")};
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        font-size: 5em;
    }
`;

const HeaderDescription = styled.p`
    flex: 0 0 content;
    font-size: 1.1em;
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 1.4rem;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        font-size: 1.6em;
    }
`;

const ComparatorBody = styled(ContainerPrototype)`
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    overflow: hidden;
    flex: 1 0 0;
    row-gap: 2%;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        //flex: 0 1 100%;
        justify-content: space-evenly;
        //border: 1rem solid red;
        //min-height: 100%;
    }
`;

const CardsWrapper = styled(ContainerPrototype)`
    position: relative; //necessary for absolute centering of randomize button
    flex-direction: column;
    align-items: center;
    flex: 1 1 0;
    row-gap: 2%;
    @media ${breakpoints.heightsQueries.minHeights.tablet} {
        //padding: 5% 0;
    }
`;

const BackButton = styled.button.attrs({ type: "button" })<{ $isCompared?: boolean }>`
    position: absolute;
    width: fit-content;
    height: 2rem;
    background-color: transparent;
    border: none;
    top: 0.5rem;
    left: 0.5rem;
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        top: 0.5rem;
        height: 2.4rem;
    }
`;
const CardsRow = styled(ContainerPrototype)`
    flex: 0 0 25%;
    justify-content: space-between;
    gap: 5%;

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        max-height: max-content;
        max-width: 100%;
        overflow-x: none;
    }
`;

const Result = styled.p`
    font-size: 1.8em;
    font-weight: bolder;
    white-space: nowrap;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        min-height: 3rem;
        font-size: 2.5em;
        font-weight: bolder;
    }
`;

const CompareButton = styled.button.attrs({ type: "button" })`
    height: 100%;
    width: 100%;
    background-color: gold;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    font-size: 1.2rem;
    flex: 0 1 12%;
    color: inherit;
    @media ${breakpoints.heightsQueries.minHeights.laptop} {
        flex: 0 1 9%;
    }
`;

export const RandomizeButton = styled.button.attrs({ type: "button" })`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 15%;
    aspect-ratio: 1/1 !important;
    z-index: 1;
    border-radius: 50%;
    background-color: white;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;

export const RandomizeButtonImage = styled.img.attrs({
    src: comparatorsButtonLogo
})`
    width: 100%;
    height: 100%;
`;

const BackIcon = styled.img.attrs({ src: backIcon })`
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1/1;
`;
