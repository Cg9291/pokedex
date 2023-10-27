import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import { getGenerationsData } from "../../functions/api/batchApiCalls/getGenerationsData";
import { getPokemonNameAndTypes } from "../../functions/api/batchApiCalls/getPokemonNameAndTypes";
import { useParams } from "react-router-dom";
import { GenerationsInterface, PokemonSpecy } from "../../interfaces/generationsInterface";
import { Type } from "../../interfaces/pokemonInterface";

export function FilteredSearchModal(): React.ReactElement {
    const [myState, setMyState] = useState<{ name: string; types: Type[] }[]>();
    const { gen } = useParams();

    const getData = async (pokeGen: number): Promise<void> => {
        try {
            const generationData: GenerationsInterface = await getGenerationsData(pokeGen);
            const pokemonSpecies: PokemonSpecy[] = generationData.pokemon_species;
            console.log("ps", pokemonSpecies);
            const generationPokemonList: { name: string; types: Type[] }[] = await Promise.all(
                pokemonSpecies.map(async (x: PokemonSpecy) => await getPokemonNameAndTypes(x.name))
            );
            setMyState(generationPokemonList);
        } catch (err) {
            console.log(err);
            return;
        }
    };

    useEffect(() => {
        getData(Number(gen));
    }, [gen]);

    // useEffect(() => console.log("upd"), [myState]);

    if (myState) {
        return <Container>{myState[0].name}</Container>;
    } else {
        return <Container>no data yet</Container>;
    }
}

const Container = styled(ContainerPrototype)``;
