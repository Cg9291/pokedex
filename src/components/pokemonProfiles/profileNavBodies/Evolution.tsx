import React, { useEffect, useState } from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components";
import { getPokemonEvolutionChainData } from "../../../functions/api/singleApiCalls/getPokemonEvolutionChainData";
import { EvolutionComponentProps, TypesColorsInt } from "../../../interfaces/miscInterfaces";
import { PokemonEvolutionChainInterface, Chain, EvolvesTo } from "../../../interfaces/pokemonEvolutionChainInterface";
import { PokemonInterface } from "../../../interfaces/pokemonInterface";
import { getPokemonData } from "../../../functions/api/singleApiCalls/getPokemonData";
import { NumOrString } from "../../../interfaces/miscTypes";
import { TypePrototype } from "../../prototypes/TypePrototype";
import { typesColors } from "../../../objects/typesColors";
import { capitalizeWords } from "../../../functions/utilities/capitalizeWords";
import { displayFormattedId } from "../../../functions/utilities/displayFormattedId";
import { Link } from "react-router-dom";
import { LoadingSpinnerPrototype } from "../../prototypes/LoadingSpinnerPrototype";

export type StringArrays = (string | string[])[];

export function Evolution(props: { ownProps: EvolutionComponentProps }): React.ReactElement {
    const [evolutionChainData, setEvolutionChainData] = useState<PokemonEvolutionChainInterface>();
    const evolutionChainUrl: string = props.ownProps.evolution_chain.url;

    const getData = async (url: string): Promise<void> => {
        try {
            const data: PokemonEvolutionChainInterface = await getPokemonEvolutionChainData(url);
            setEvolutionChainData(data);
        } catch (err) {
            console.log(err);
            return;
        }
    };

    useEffect(() => {
        getData(evolutionChainUrl);
    }, []);

    if (evolutionChainData) {
        const fetchEvolutions = (): StringArrays => {
            const evolutionsArray: StringArrays = [];
            const targetObject: Chain = evolutionChainData.chain;
            evolutionsArray.push(targetObject.species.name);

            if (targetObject.evolves_to.length === 1) {
                const secondFormLocation: EvolvesTo = targetObject.evolves_to[0];
                evolutionsArray.push(secondFormLocation.species.name);
                if (secondFormLocation.evolves_to.length === 1) {
                    const thirdFormLocation: EvolvesTo = secondFormLocation.evolves_to[0];
                    evolutionsArray.push(thirdFormLocation.species.name);
                }
            } else if (targetObject.evolves_to.length > 1) {
                const secondForms: string[] = targetObject.evolves_to.map((x: EvolvesTo) => x.species.name);
                evolutionsArray.push(secondForms);
            }
            return evolutionsArray;
        };

        const displayPokemons = (): (React.ReactElement | React.ReactElement[])[] =>
            fetchEvolutions().map((x: string | string[]) => {
                return Array.isArray(x) ? (
                    <SameStageEvolutionsContainer>
                        {x.map((y: string) => (
                            <PokemonEvolutionStage pokemonEvolutionName={y} $multi={true} key={y} />
                        ))}
                    </SameStageEvolutionsContainer>
                ) : (
                    <PokemonEvolutionStage pokemonEvolutionName={x} key={x} />
                );
            });

        return <Container>{displayPokemons()}</Container>;
    } else {
        return (
            <Container>
                <LoadingAnimation />
            </Container>
        );
    }
}

function PokemonEvolutionStage(props: { pokemonEvolutionName: string; $multi?: boolean }): React.ReactElement {
    const [pokemonEvolutionInfo, setPokeEvolutionInfo] = useState<PokemonInterface>();

    const getData = async (pokemonId: NumOrString): Promise<void> => {
        try {
            const data = await getPokemonData(pokemonId);
            setPokeEvolutionInfo(data);
        } catch (err) {
            console.log(err);
        }
        return;
    };

    useEffect(() => {
        getData(props.pokemonEvolutionName);
    }, []);

    if (pokemonEvolutionInfo) {
        const { id, sprites, types } = pokemonEvolutionInfo;
        const typeColor = typesColors[types[0].type.name as keyof TypesColorsInt];

        return (
            <PokemonContainer to={`/pokemons/id/${id}`} $multi={props.$multi}>
                <SvgImg $bgColor={typeColor}>
                    <PokemonImage href={sprites.front_default} />
                </SvgImg>
                <PokemonIdentifiers $multi={props.$multi}>
                    <PokemonName>{capitalizeWords(props.pokemonEvolutionName)}</PokemonName>
                    <PokemonNumber>{displayFormattedId(id)}</PokemonNumber>
                </PokemonIdentifiers>
                <PokemonType $bgColor={typeColor}>{capitalizeWords(types[0].type.name)}</PokemonType>
            </PokemonContainer>
        );
    } else {
        return (
            <PokemonContainer to="/">
                <LoadingAnimation />
            </PokemonContainer>
        );
    }
}

const Container = styled(ContainerPrototype)`
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 1rem 0;
`;

const SameStageEvolutionsContainer = styled(ContainerPrototype)`
    max-width: 70%;
    height: 100%;
    flex-wrap: wrap;
`;

const PokemonContainer = styled(Link)<{ $multi?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${(props) => (props.$multi ? "space-around" : "space-between")};
    width: ${(props) => (props.$multi ? "25%" : "33.33%")};
    height: min-content;
    text-decoration: none;
    color: black;
`;
const SvgImg = styled.svg.attrs({ viewBox: "0 0 25 25" })<{ $bgColor: string }>`
    border: solid ${(props) => props.$bgColor};
    border-radius: 50%;
    width: 90%;
`;
const PokemonImage = styled.image`
    width: 100%;
    height: 100%;
`;

const PokemonIdentifiers = styled.div<{ $multi?: boolean }>`
    display: flex;
    flex-direction: ${(props) => (props.$multi ? "column" : "row")};
    justify-content: ${(props) => (props.$multi ? "space-around" : "space-between")};
    margin: ${(props) => (props.$multi ? "0" : "1rem 0")};
`;
const PokemonName = styled.span`
    font-size: 0.9em;
`;
const PokemonNumber = styled.span`
    margin-left: 0.3rem;
    font-size: 0.7em;
`;
const PokemonType = styled(TypePrototype)`
    margin: 0;
    max-width: 100%;
`;
const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    border-bottom-color: green;
`;
