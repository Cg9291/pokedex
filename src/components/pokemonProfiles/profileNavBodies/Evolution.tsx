import { useEffect, useState } from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import styled from "styled-components";

import getPokemonEvolutionChainData from "../../../functions/api/getPokemonEvolutionChainData";

import { EvolutionComponentProps, TypesColorsInt } from "../../../interfaces/miscInterfaces";
import PokemonEvolutionChainInterface, { Chain, EvolvesTo } from "../../../interfaces/pokemonEvolutionChainInterface";
import PokemonInterface from "../../../interfaces/pokemonInterface";
import GetPokemonData from "../../../functions/api/GetPokemonData";
import { NumOrString } from "../../../interfaces/miscTypes";
import TypePrototype from "../../prototypes/TypePrototype";
import typesColors from "../../../objects/typesColors";
import capitalizeWords from "../../../functions/utilities/capitalizeWords";
import { Evolution_chain } from "../../../interfaces/pokemonSpeciesInterface";

export default function Evolution(props: { ownProps: EvolutionComponentProps }): React.ReactElement {
    const [evolutionChainData, setEvolutionChainData] = useState<PokemonEvolutionChainInterface>();

    const evolutionChainUrl: string = props.ownProps.evolution_chain.url;

    const getData = async (url: string): Promise<void> => {
        try {
            const data = await getPokemonEvolutionChainData(url);
            setEvolutionChainData(data);
        } catch (err) {
            console.log(err);
        }
        return;
    };

    useEffect(() => {
        getData(evolutionChainUrl);
    }, []);

    /*   const fetchEvolutions = () => {
        let evolutionsArray: string[] = [];
        if (!evolutionChainData.hasOwnProperty("default")) {
            const targetObject: Chain = evolutionChainData.chain;

            if (targetObject.hasOwnProperty("species")) {
                evolutionsArray.push(targetObject.species.name);
                if (targetObject.hasOwnProperty("evolves_to") && targetObject.evolves_to[0]) {
                    const secondFormLocation: EvolvesTo = targetObject.evolves_to[0];
                    evolutionsArray.push(secondFormLocation.species.name);
                    if (secondFormLocation.hasOwnProperty("evolves_to") && secondFormLocation.evolves_to[0]) {
                        const thirdFormLocation: EvolvesTo = secondFormLocation.evolves_to[0];
                        evolutionsArray.push(thirdFormLocation.species.name);
                    }
                }
            }
        }
        return evolutionsArray;
    }; */

    /*  const displayPokemons = (): React.ReactElement[] =>
        fetchEvolutions().map((x: string) => <PokemonEvolutionStage name={x} />); */

    return <Container>{/* {displayPokemons()} */}tst</Container>;
}

function PokemonEvolutionStage(props: { name: string }): React.ReactElement {
    const [pokeEvolutionInfo, setPokeEvolutionInfo] = useState<PokemonInterface>();

    const getData = async (pokeId: NumOrString): Promise<void> => {
        try {
            const data = await GetPokemonData(pokeId);
            setPokeEvolutionInfo(data);
        } catch (err) {
            console.log(err);
        }
        return;
    };

    useEffect(() => {
        getData(props.name);
    });

    const displayId = (idArg: number) => {
        return idArg.toString().length === 3
            ? `#${idArg}`
            : idArg.toString().length === 2
            ? `#0${idArg}`
            : `#00${idArg}`;
    };

    if (pokeEvolutionInfo) {
        const { id, sprites, types } = pokeEvolutionInfo;
        const typeColor = typesColors[types[0].type.name as keyof TypesColorsInt];

        return (
            <PokemonContainer>
                <SvgImg $bgColor={typeColor}>
                    <PokemonImage href={sprites ? sprites.front_default : undefined} />→
                </SvgImg>
                <PokemonIdentifiers>
                    <PokemonName>{capitalizeWords(props.name)}</PokemonName>
                    <PokemonNumber>{id && displayId(id)}</PokemonNumber>
                </PokemonIdentifiers>
                <PokemonType $bgColor={typeColor}>
                    {types ? capitalizeWords(types[0].type.name) : undefined}
                </PokemonType>
            </PokemonContainer>
        );
    } else {
        return <Container>Loading</Container>;
    }
}

const Container = styled(ContainerPrototype)`
    align-items: center;
    justify-content: center;
    height: fit-content;
    margin-top: 5.5rem;
`;

const PokemonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 33.33%;
    height: max-content;
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

const PokemonIdentifiers = styled.div`
    display: flex;
    margin: 1rem 0;
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
`;
