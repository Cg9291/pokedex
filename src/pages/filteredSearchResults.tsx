import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { useParams } from "react-router-dom";
import { getPokemonNameAndTypes } from "../functions/api/batchApiCalls/getPokemonNameAndTypes";
import { GenerationsInterface, PokemonSpecy } from "../interfaces/generationsInterface";
import { Type } from "../interfaces/pokemonInterface";
import { getGenerationsData } from "../functions/api/batchApiCalls/getGenerationsData";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import { capitalizeWords } from "../functions/utilities/capitalizeWords";

export function FilteredSearchResults(): React.ReactElement {
    const [myState, setMyState] = useState<{ name: string; id: number; types: Type[] }[]>();
    const myParams = useParams();
    const paramEntries = Object.entries(myParams).filter((x) => x[0].includes("param"));
    console.log("pe", paramEntries);

    console.log(useParams().param);
    useEffect(() => {
        getData(Number(1));
    }, []);
    //console.log(typeParam, type2Param);

    const getData = async (pokeGen: number): Promise<void> => {
        try {
            const generationData: GenerationsInterface = await getGenerationsData(pokeGen);
            const pokemonSpecies: PokemonSpecy[] = generationData.pokemon_species;
            //console.log("ps", pokemonSpecies);
            const generationPokemonList: { name: string; id: number; types: Type[] }[] = await Promise.all(
                pokemonSpecies.map(async (x: PokemonSpecy) => await getPokemonNameAndTypes(x.name))
            );
            //console.log(generationPokemonList);
            setMyState(generationPokemonList);
        } catch (err) {
            console.log(err);
            return;
        }
    };

    const conditions = (pokemon: any) => {
        for (let i = 0; i < paramEntries.length; i++) {
            if (paramChecker[paramEntries[i][1]!](pokemon) !== true) {
                console.log("i stopped", i);
                return false;
            }
        }
        return true;
    };

    /* const check=(pokemon:any)=>{
        myState?.filter(x=>)
    } */

    const paramChecker: { [key: string]: (x: { name: string; id: number; types: Type[] }) => boolean } = {
        type: (x: { name: string; id: number; types: Type[] }) =>
            capitalizeWords(`${x.types[0]?.type.name}`) === useParams().type,
        type2: (x: { name: string; id: number; types: Type[] }) =>
            capitalizeWords(`${x.types[1]?.type.name}`) === useParams().type2
    };

    /*  const checkConditions = () => {
        const myArr = [];
        // console.log("up", useParams());
        for (const param in useParams()) {
            if (useParams().param === undefined) {
                console.log(`${param} is undefined`);
            } else {
                myArr.push(paramChecker[param]);
                console.log(`${param} is gucci`, param);
            }
        }

        return myArr;
    }; */

    /*  const inspectPokemon = (pokemon: any) => {
        for (let i = 0; i < checkConditions().length; i++) {
            if (checkConditions()[i](pokemon) === false) {
                return false;
            } else {
                console.log("tc", checkConditions()[i](pokemon), pokemon);
                i++;
            }
        }
        console.log("pk", pokemon);
        return true;
    }; */

    const applyFilter = () => {
        if (myState) {
            return myState.filter((x) => conditions(x) === true).map((y) => <PokemonPictureCard id={y.id} />);
        }
    };

    if (myState) {
        return <Container>{applyFilter()}</Container>;
    } else {
        return <Container>Nothing yet</Container>;
    }
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
`;
