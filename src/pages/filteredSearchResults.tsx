import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { useParams } from "react-router-dom";
import { getPokemonNameAndTypes } from "../functions/api/batchApiCalls/getPokemonNameAndTypes";
import { GenerationsInterface, PokemonSpecy } from "../interfaces/generationsInterface";
import { getGenerationsData } from "../functions/api/batchApiCalls/getGenerationsData";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import { capitalizeWords } from "../functions/utilities/capitalizeWords";
import { CustomPokemonInfo } from "../interfaces/miscInterfaces";

export function FilteredSearchResults(): React.ReactElement {
    const [myState, setMyState] = useState<CustomPokemonInfo[]>();
    const params = useParams();
    const generationInfo: string[] = params["*"]?.split("/").splice(0, 2) as [string: string];
    const generalFilters = params["*"]
        ?.split("/")
        ?.splice(2)
        .filter((x) => x !== "");

    console.log(generationInfo[1]);

    interface ReceivedParameters {
        generation?: string;
        type?: string;
        type2?: string;
        height?: string;
        weight?: string;
    }
    const turnSplitsToObject = (arr: string[] | undefined) => {
        if (arr) {
            const data: ReceivedParameters = {};
            for (let i = 0; i < arr.length; i += 2) {
                const key = arr[i];
                const value = arr[i + 1];
                data[key as keyof ReceivedParameters] = value;
            }
            return data;
        }
    };

    useEffect(() => {
        getData(Number(generationInfo[1]));
    }, []);

    const getData = async (pokeGen: number): Promise<void> => {
        try {
            const generationData: GenerationsInterface = await getGenerationsData(pokeGen);
            const pokemonSpecies: PokemonSpecy[] = generationData.pokemon_species;
            const generationPokemonList: CustomPokemonInfo[] = await Promise.all(
                pokemonSpecies.map(async (x: PokemonSpecy) => await getPokemonNameAndTypes(x.name))
            );
            setMyState(generationPokemonList);
        } catch (err) {
            console.log(err);
            return;
        }
    };

    const filterChecker: { [key: string]: (x: CustomPokemonInfo) => boolean } = {
        type: (x: CustomPokemonInfo) =>
            capitalizeWords(`${x.types[0].type.name}`) === turnSplitsToObject(generalFilters)?.type,
        type2: (x: CustomPokemonInfo) =>
            capitalizeWords(`${x.types[1]?.type.name}`) === turnSplitsToObject(generalFilters)?.type2,
        height: (x: CustomPokemonInfo) => Number(x.height) >= Number(turnSplitsToObject(generalFilters)?.height) * 10,
        weight: (x: CustomPokemonInfo) => Number(x.weight) >= Number(turnSplitsToObject(generalFilters)?.weight) * 10
    };

    const checkPokemonForFilters = (pokemon: CustomPokemonInfo) => {
        return Object.keys(turnSplitsToObject(generalFilters)!).every((x) => filterChecker[x](pokemon) === true);
    };

    const applyFilter = () => {
        if (myState) {
            const displayMatchingPokemons = () =>
                myState.filter((x) => checkPokemonForFilters(x) === true).map((y) => <PokemonPictureCard id={y.id} />);

            return displayMatchingPokemons().length <= 0
                ? "No Pokemon matching these criterias have been found"
                : displayMatchingPokemons();
        }
    };

    if (myState) {
        return <Container>{applyFilter()}</Container>;
    } else {
        return <Container>Loading</Container>;
    }
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
`;
