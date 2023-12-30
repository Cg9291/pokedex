import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import { PokemonTypesElement } from "./PokemonTypesElement";
import { getPokemonData } from "../../../functions/api/singleApiCalls/getPokemonData";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { PokemonPictureCardsPropsInterface, TypesColorsInt } from "../../../interfaces/miscInterfaces";
import { PokemonInterface, Type } from "../../../interfaces/pokemonInterface";
import { typesColors } from "../../../objects/typesColors";
import { LoadingSpinnerPrototype } from "../../prototypes/LoadingSpinnerPrototype";
import { widthsQueries, heightsQueries } from "../../../objects/breakpoints";

export function PokemonPictureCard(props: PokemonPictureCardsPropsInterface): React.ReactElement {
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInterface>();
    const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

    async function getData(pokemonNumber: number): Promise<void> {
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

    useEffect(() => {
        getData(props.id);
    }, [props.id]);

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
            stats: pokemonInfo.stats
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
                <Wrapper>
                    <PokeName>{capitalizeWords(pokemonInfo.name)}</PokeName>
                    <SubContainer>
                        <PokemonTypesContainer>{renderPokemonTypes(pokemonInfo.types)}</PokemonTypesContainer>
                        <PokemonImgWrapper>
                            <SvgImg>
                                <PokemonImg
                                    href={pokemonInfo.sprites.front_default}
                                    /* 	alt="a pokemon image" */
                                />
                            </SvgImg>
                        </PokemonImgWrapper>
                    </SubContainer>
                </Wrapper>
            </Container>
        );
    } else {
        return (
            <Container to="/" $mainType="none">
                <LoadingAnimation />
            </Container>
        );
    }
}

const Container = styled(Link)<{ $mainType: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 19vh;
    padding: 0.5rem;
    border-radius: 25px;
    text-decoration: none;
    background-color: ${(props) => typesColors[props.$mainType as keyof TypesColorsInt]};

    @media ${heightsQueries.two} {
        height: 17vh;
    }
`;

const Wrapper = styled(ContainerPrototype)`
    display: flex;
    flex-direction: column;
    border-radius: 25px;
`;

const PokeName = styled.h3`
    height: 20%;
    color: white;
`;

const SubContainer = styled(ContainerPrototype)``;

const PokemonTypesContainer = styled(ContainerPrototype)`
    width: 50%;
    flex-direction: column;
    justify-content: end;
`;

const PokemonImgWrapper = styled.div`
    width: 50%;
`;

const SvgImg = styled.svg.attrs({ viewBox: "50 50 200 200" })`
    width: 100%;
    height: 100%;
`;
const PokemonImg = styled.image`
    width: 20rem;
    aspect-ratio: 1/1;
`;

const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    border-bottom-color: green;
`;
