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

export interface PokemonPictureCardsPropsInterface {
    id: NumOrString;
    isLink?: boolean;
    pokemonImagesKit?: PokemonImagesKitInterface;
    isModalActiveKit?: IsModalActiveKitInterface;
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
                <PokemonTypesElement typeName={capitalizeWords(x.type.name)} key={index} />
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
                } else if (isModalActive.activeImageNumber === 2) {
                    setPokemonImages({
                        ...pokemonImages,
                        bottomPokemon: pokeInfoObject
                    });
                }
                setIsModalActive({ isActive: false, activeImageNumber: 0 });
            }
        };
        return (
            <Container
                to={props.isLink ? `/pokemons/id/${pokemonInfo.id}` : ""}
                onClick={handleClick}
                $mainType={pokemonInfo.types[0].type.name}
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
                <LoadingAnimation />
            </Container>
        );
    }
}

const Container = styled(Link)<{ $mainType: string; $isFlex?: true }>`
    display: ${(props) => (props.$isFlex ? "flex" : "grid")};
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: auto 100%;
    grid-template-areas:
        "name name name id"
        "typesContainer typesContainer image image";
    max-width: 100%;
    max-height: 100%;
    height: 18vh;
    padding: 0.7rem;
    border-radius: 15px;
    text-decoration: none;
    background-color: ${(props) => typesColors[props.$mainType as keyof TypesColorsInt]};
    line-height: 1;
    overflow: hidden;
`;

const PokeName = styled.h4`
    min-height: fit-content;
    color: white;
    grid-area: name;
    place-self: start;
`;

const PokeId = styled.span`
    grid-area: id;
    color: white;
    font-weight: 500;
    font-size: 0.9rem;
`;

const PokemonTypesContainer = styled(ContainerPrototype)`
    flex-direction: column;
    justify-content: end;
    grid-area: typesContainer;
    align-self: center;
    margin-bottom: 0.3rem;
    max-height: 100%;
`;

const PokemonImgWrapper = styled.div`
    grid-area: image;
    max-width: 100%;
    max-height: 100%;
`;

const PokemonImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    min-width: 100%;
    min-height: 100%;
    aspect-ratio: 1/1;
`;

const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    //border-bottom-color: green;
    /*  border: 0.5rem solid grey;
    border-bottom: 0.5rem solid red; */
    width: auto;
    justify-self: center;
    margin-left: auto;
    margin-right: auto;
`;
