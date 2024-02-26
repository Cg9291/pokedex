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
                <PokeName>{capitalizeWords(pokemonInfo.name)}</PokeName>
                <PokeId>{displayFormattedId(pokeInfoObject.id)}</PokeId>

                <PokemonTypesContainer>{renderPokemonTypes(pokemonInfo.types)}</PokemonTypesContainer>
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
                <LoadingAnimation $whereUsed={props.whereUsed} />
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
    height: 100%;
    margin: auto;
    padding: 0.3rem;
    border-radius: 15px;
    text-decoration: none;
    background-color: ${(props) => typesColors[props.$mainType as keyof TypesColorsInt]};
    overflow: hidden;

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        padding: 0.6rem;
    }

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        grid-template-rows: repeat(2, auto);
        padding-bottom: 0.6rem;
        min-height: ${(props) => (props.$whereUsed === "searchmodal" ? "30%" : "100%")};
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        min-height: 80%;
        min-width: 95%;
        max-width: 95%;
    }

    //HEIGHTS MEDIA QUERIES
    /* @media ${breakpoints.heightsQueries.minHeights.mobileS} {

    } */

    @media ${breakpoints.heightsQueries.minHeights.mobileS} {
        padding: 0.4rem;
    }
    @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
        padding: 0.5rem;
    }
`;

const PokeName = styled.h4`
    color: white;
    grid-area: name;
    place-self: start start;
    font-size: 0.8rem;
    line-height: 0.8rem;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 2rem;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        font-size: 2.5rem;
    }
    //HEIGHTS MEDIA QUERIES
    @media ${breakpoints.heightsQueries.minHeights.mobileS} {
        font-size: 0.8rem;
        line-height: 0.8rem;
    }
    @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
        font-size: 1.2rem;
        //line-height: 1.2rem;
        align-self: baseline;
    }

    //MIXED MEDIA QUERIES
    @media ${breakpoints.widthsQueries.minWidths.tablet}, ${breakpoints.heightsQueries.minHeights.tablet} {
        font-size: 2rem;
        line-height: 2rem;
    }
`;

const PokeId = styled.span`
    grid-area: id;
    color: white;
    font-weight: 500;
    font-size: 0.7rem;
    line-height: 0.7rem;
    margin-left: auto;

    /*   @media ${breakpoints.widthsQueries.minWidths.mobileS} {
        font-size: 0.9rem;
    } */

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        line-height: 0.9rem;
    }
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 1.4rem;
    }

    @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
        font-size: 1rem;
        //line-height: 1rem;
        align-self: baseline;
    }

    //MIXED MEDIA QUERIES
    @media ${breakpoints.widthsQueries.minWidths.tablet}, ${breakpoints.heightsQueries.minHeights.tablet} {
        font-size: 1.5rem;
        line-height: 1.5rem;
    }
`;

const PokemonTypesContainer = styled(ContainerPrototype)`
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.3rem;
    padding-top: 8%;
    grid-area: typesContainer;
    align-self: center;
    overflow: hidden;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 2rem;
        margin-bottom: 0;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        margin-bottom: 1.5rem;
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

const LoadingAnimation = styled(LoadingSpinnerPrototype)<{ $whereUsed?: string }>`
    width: 40%;
    max-height: 100%;
`;
