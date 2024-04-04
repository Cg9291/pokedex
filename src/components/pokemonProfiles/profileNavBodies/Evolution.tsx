import React, { useEffect, useState } from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components/macro";
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
import * as breakpoints from "../../../objects/breakpoints";

export function Evolution(props: { ownProps: EvolutionComponentProps }): React.ReactElement {
    const [evolutionChainData, setEvolutionChainData] = useState<PokemonEvolutionChainInterface>();
    const evolutionChainUrl: string = props.ownProps.evolution_chain.url;

    useEffect(() => {
        getData(evolutionChainUrl);
    }, []);

    const getData = async (url: string): Promise<void> => {
        try {
            const data: PokemonEvolutionChainInterface = await getPokemonEvolutionChainData(url);
            setEvolutionChainData(data);
        } catch (err) {
            console.log(err);
            return;
        }
    };

    if (evolutionChainData) {
        const fetchEvolutions = (): string[] => {
            const evolutionsArray: string[] = [];
            const targetObject: Chain = evolutionChainData.chain;
            evolutionsArray.push(targetObject.species.name);

            if (targetObject.evolves_to.length > 0) {
                const secondFormLocation: EvolvesTo = targetObject.evolves_to[0];
                evolutionsArray.push(secondFormLocation.species.name);
                if (secondFormLocation.evolves_to.length > 0) {
                    const thirdFormLocation: EvolvesTo = secondFormLocation.evolves_to[0];
                    evolutionsArray.push(thirdFormLocation.species.name);
                }
            }
            return evolutionsArray;
        };

        const displayPokemons = (): React.ReactElement[] =>
            fetchEvolutions().map((x: string) => <PokemonEvolutionStage pokemonEvolutionName={x} key={x} />);

        return <Container>{displayPokemons()}</Container>;
    } else {
        return (
            <Container>
                <LoadingAnimation />
            </Container>
        );
    }
}

function PokemonEvolutionStage(props: { pokemonEvolutionName: string }): React.ReactElement {
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
            <PokemonContainer to={`/pokemons/id/${id}`}>
                <SvgImg $bgColor={typeColor}>
                    <PokemonImage href={sprites.front_default} />
                </SvgImg>
                <PokemonIdentifiers>
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
    padding: 1rem 0;
    column-gap: 0.5rem;
    @media (orientation: landscape) {
        //padding: 0.5vh 0 0 0;
    }
`;

const PokemonContainer = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex: 1 1 0;
    text-decoration: none;
    color: black;
    row-gap: 1rem;
    overflow: hidden;
`;
const SvgImg = styled.svg.attrs({ viewBox: "0 0 25 25" })<{ $bgColor: string }>`
    border: solid ${(props) => props.$bgColor};
    border-radius: 50%;
    max-width: 50vw;
    max-height: 50vw;
    aspect-ratio: 1/1;

    @media (orientation: landscape) {
        max-height: 40vw;
    }
`;
const PokemonImage = styled.image`
    width: 100%;
    height: 100%;
`;

const PokemonIdentifiers = styled(ContainerPrototype)`
    flex-direction: column;
    flex: 0 0 content;
    align-items: center;
    overflow: hidden;
`;
const PokemonName = styled.span`
    font-size: 1em;
`;
const PokemonNumber = styled.span`
    margin-left: 0.3rem;
    font-size: 0.8em;
`;
const PokemonType = styled(TypePrototype)`
    margin: 0;
`;
const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    border-bottom-color: red;
    @media (orientation: landscape) {
        width: initial;
        height: 90%;
    }
`;
