import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import { PokemonTypesElement } from "./PokemonTypesElement";
import { getPokemonData } from "../../../functions/api/singleApiCalls/getPokemonData";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { TypesColorsInt } from "../../../interfaces/miscInterfaces";
import { PokemonInterface, Type } from "../../../interfaces/pokemonInterface";
import { typesColors } from "../../../objects/typesColors";
import { LoadingSpinnerPrototype } from "../../prototypes/LoadingSpinnerPrototype";
import { NumOrString } from "../../../interfaces/miscTypes";
import { IsModalActiveKitInterface } from "../../comparator/PokemonSearchModal";
import { PokemonImagesKitInterface } from "../../comparator/PokemonSearchModal";
import { displayFormattedId } from "../../../functions/utilities/displayFormattedId";
import * as breakpoints from "../../../objects/breakpoints";
import { whereUsedValues } from "../../../objects/whereUsedValues";

export interface PokemonPictureCardsPropsInterface {
    id: NumOrString;
    isLink?: boolean;
    pokemonImagesKit?: PokemonImagesKitInterface;
    isModalActiveKit?: IsModalActiveKitInterface;
    whereUsed?: string;
    setSearchedPokemonId?: React.Dispatch<React.SetStateAction<string | number | null>>;
}

export function PokemonPictureCard(props: PokemonPictureCardsPropsInterface): React.ReactElement {
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInterface>();
    const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

    useEffect(() => {
        getData(props.id);
    }, [props.id]);

    async function getData(pokemonNumber: NumOrString): Promise<void> {
        try {
            await setLoadingStatus(true);
            const data: PokemonInterface = await getPokemonData(pokemonNumber);
            setPokemonInfo(data);
            setLoadingStatus(false);
        } catch (err) {
            console.log(err);
            return;
        }
    }

    const renderPokemonTypes = (typesArray: Type[]): React.ReactElement[] =>
        [...typesArray]
            .reverse()
            .map((x: Type, index: number) => (
                <PokemonTypesElement typeName={capitalizeWords(x.type.name)} whereUsed={props.whereUsed} key={index} />
            ));

    if (pokemonInfo && !loadingStatus) {
        const pokeInfoObject = {
            name: pokemonInfo.name,
            id: pokemonInfo.id,
            sprites: pokemonInfo.sprites,
            stats: pokemonInfo.stats,
            types: pokemonInfo.types
        };
        const handleClick = () => {
            if (props.isLink) {
                return;
            } else if (props.pokemonImagesKit && props.isModalActiveKit) {
                const { pokemonImages, setPokemonImages } = props.pokemonImagesKit;
                const { isModalActive, setIsModalActive } = props.isModalActiveKit;
                if (isModalActive.activeImageNumber === 1) {
                    setPokemonImages({
                        ...pokemonImages,
                        topPokemon: pokeInfoObject
                    });
                    props.setSearchedPokemonId && props.setSearchedPokemonId(null);
                } else if (isModalActive.activeImageNumber === 2) {
                    setPokemonImages({
                        ...pokemonImages,
                        bottomPokemon: pokeInfoObject
                    });
                    props.setSearchedPokemonId && props.setSearchedPokemonId(null);
                }
                setIsModalActive({ isActive: false, activeImageNumber: 0 });
            }
        };
        return (
            <Container
                to={props.isLink ? `/pokemons/id/${pokemonInfo.id}` : ""}
                onClick={handleClick}
                $mainType={pokemonInfo.types[0].type.name}
                $whereUsed={props.whereUsed}
            >
                <PokeName $whereUsed={props.whereUsed}>{capitalizeWords(pokemonInfo.name)}</PokeName>
                <PokeId $whereUsed={props.whereUsed}>{displayFormattedId(pokeInfoObject.id)}</PokeId>

                <PokemonTypesContainer $whereUsed={props.whereUsed}>
                    {renderPokemonTypes(pokemonInfo.types)}
                </PokemonTypesContainer>
                <PokemonImgWrapper>
                    <PokemonImg
                        src={pokemonInfo.sprites.front_default}
                        /* 	alt="a pokemon image" */
                    />
                </PokemonImgWrapper>
            </Container>
        );
    } else {
        return (
            <Container to="/" $mainType="none" $isFlex={true}>
                <LoadingAnimation />
            </Container>
        );
    }
}

const Container = styled(Link)<{ $mainType: string; $isFlex?: true; $whereUsed?: string }>`
    display: ${(props) => (props.$isFlex ? "flex" : "grid")};
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: min-content 1fr;
    grid-template-areas:
        "name name name id"
        "typesContainer typesContainer image image";
    width: 100%;
    height: ${(props) => (props.$whereUsed === whereUsedValues.searchModal ? "initial" : "100%")};
    aspect-ratio: ${(props) => props.$whereUsed === whereUsedValues.searchModal && "2 / 1"};
    max-height: ${(props) => props.$whereUsed === whereUsedValues.searchModal && "80%"};
    margin: auto;
    padding: 0.3rem;
    border-radius: 15px;
    text-decoration: none;
    background-color: ${(props) => typesColors[props.$mainType as keyof TypesColorsInt]};
    overflow: hidden;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        grid-template-rows: repeat(2, auto);
        padding-bottom: 0.6rem;
        min-height: ${(props) => (props.$whereUsed === whereUsedValues.searchModal ? "30%" : "100%")};
    }

    //HEIGHTS MEDIA QUERIES

    @media (orientation: landscape) {
        padding: 0.35rem;
    }
`;

const PokeName = styled.h4<{ $whereUsed?: string }>`
    color: white;
    grid-area: name;
    place-self: start start;
    font-size: 4vw;

    @media (orientation: landscape) {
        font-size: ${(props) => props.$whereUsed === whereUsedValues.filter && "2vw"};
    }
`;

const PokeId = styled.span<{ $whereUsed?: string }>`
    grid-area: id;
    color: white;
    font-weight: 500;
    font-size: 4vw;
    margin-left: auto;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 1.4rem;
    }

    //MIXED MEDIA QUERIES
    @media ${breakpoints.widthsQueries.minWidths.tablet}, ${breakpoints.heightsQueries.minHeights.tablet} {
        font-size: 1.5rem;
        line-height: 1.5rem;
    }

    @media ${breakpoints.widthsQueries.minWidths.laptop} and ${breakpoints.heightsQueries.minHeights.tablet} {
        font-size: 2em;
        line-height: 2rem;
    }

    @media (orientation: landscape) {
        font-size: ${(props) => props.$whereUsed === whereUsedValues.filter && "1.6vw"};
    }
`;

const PokemonTypesContainer = styled(ContainerPrototype)<{ $whereUsed?: string }>`
    display: grid;
    grid-auto-rows: 46%;
    gap: 8%;
    grid-area: typesContainer;
    align-self: center;
    overflow: hidden;
    max-height: 80%;
    align-self: flex-end;
    overflow: hidden;
    align-content: flex-end;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 2rem;
        margin-bottom: 0;
    }

    @media (orientation: landscape) {
        max-height: ${(props) => (props.$whereUsed === whereUsedValues.filter ? "initial" : "90%")};
        font-size: ${(props) => props.$whereUsed === whereUsedValues.filter && "1.5vw"};
    }
`;

const PokemonImgWrapper = styled.div`
    grid-area: image;
    min-height: 0;
    height: 100%;
    width: 100%;
`;

const PokemonImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    min-width: 100%;
    min-height: 100%;
    aspect-ratio: 1/1;
`;

const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    width: initial;
    height: 90%;
`;
