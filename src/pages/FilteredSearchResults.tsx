import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { useParams } from "react-router-dom";
import { getPokemonNameAndTypes } from "../functions/api/batchApiCalls/getPokemonNameAndTypes";
import { GenerationsInterface, PokemonSpecy } from "../interfaces/generationsInterface";
import { getGenerationsData } from "../functions/api/batchApiCalls/getGenerationsData";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import { capitalizeWords } from "../functions/utilities/capitalizeWords";
import { CustomPokemonInfo } from "../interfaces/miscInterfaces";
import { LoadingSpinnerPrototype } from "../components/prototypes/LoadingSpinnerPrototype";

export interface ReceivedParametersInterface {
    type?: string;
    type2?: string;
    minHeight?: string;
    maxHeight?: string;
    minWeight?: string;
    maxWeight?: string;
}
export function FilteredSearchResults(): React.ReactElement {
    const [myState, setMyState] = useState<CustomPokemonInfo[]>();
    const params = useParams() as { "*": string };
    const [, generationInfo]: string[] = params["*"]?.split("/").splice(0, 2) as [string: string];
    const generalFilters = params["*"]
        ?.split("/")
        .splice(2)
        .filter((x) => x !== "");

    useEffect(() => {
        getData(Number(generationInfo));
    }, []);

    const createFilterObject = (arr: string[]) => {
        if (arr) {
            const myFilterObject: ReceivedParametersInterface = {};
            for (let i = 0; i < arr.length; i += 2) {
                const key = arr[i];
                myFilterObject[key as keyof ReceivedParametersInterface] = arr[i + 1];
            }
            return myFilterObject;
        }
    };

    const getData = async (pokeGen: number): Promise<void> => {
        try {
            const generationData: GenerationsInterface = await getGenerationsData(pokeGen);
            const pokemonSpecies: PokemonSpecy[] = generationData.pokemon_species;
            const generationPokemonListResults: PromiseSettledResult<CustomPokemonInfo>[] = await Promise.allSettled(
                pokemonSpecies.map((x: PokemonSpecy) => getPokemonNameAndTypes(x.name))
            );

            const fulfilledPromises = generationPokemonListResults.filter(
                (y) => y.status === "fulfilled"
            ) as PromiseFulfilledResult<CustomPokemonInfo>[];

            const generationPokemonList = fulfilledPromises.map(
                (z: PromiseFulfilledResult<CustomPokemonInfo>) => z.value
            );

            setMyState([...generationPokemonList]);
        } catch (err) {
            console.log(err);
            return;
        }
    };

    const filterChecker: { [key: string]: (x: CustomPokemonInfo) => boolean } = {
        type: (x: CustomPokemonInfo) =>
            capitalizeWords(`${x.types[0].type.name}`) === createFilterObject(generalFilters)?.type,
        type2: (x: CustomPokemonInfo) =>
            capitalizeWords(`${x.types[1]?.type.name}`) === createFilterObject(generalFilters)?.type2,
        minHeight: (x: CustomPokemonInfo) =>
            Number(x.height) >= Number(createFilterObject(generalFilters)?.minHeight) * 10,
        maxHeight: (x: CustomPokemonInfo) =>
            Number(x.height) <= Number(createFilterObject(generalFilters)?.maxHeight) * 10,
        minWeight: (x: CustomPokemonInfo) =>
            Number(x.weight) >= Number(createFilterObject(generalFilters)?.minWeight) * 10,
        maxWeight: (x: CustomPokemonInfo) =>
            Number(x.weight) <= Number(createFilterObject(generalFilters)?.maxWeight) * 10
    };

    const checkPokemonForFilters = (pokemon: CustomPokemonInfo) => {
        return Object.keys(createFilterObject(generalFilters) as ReceivedParametersInterface).every((x) =>
            filterChecker[x](pokemon)
        );
    };

    const applyFilter = () => {
        if (myState) {
            const displayMatchingPokemons = () =>
                myState
                    .filter((x) => checkPokemonForFilters(x))
                    .map((y, index) => <PokemonPictureCard key={index} id={y.id} isLink={true} />);

            return displayMatchingPokemons().length <= 0
                ? "No Pokemon matching these criterias have been found"
                : displayMatchingPokemons();
        }
    };

    if (myState) {
        return <Container>{applyFilter()}</Container>;
    } else {
        return (
            <Container>
                <LoadingAnimation />
            </Container>
        );
    }
}

const Container = styled(ContainerPrototype)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1fr;
    padding: 1rem 1rem;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
    overflow-y: scroll;
    overflow-x: none;
`;

const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    margin: auto;
`;
