import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import { getPokemonGameList } from "../../../../functions/api/singleApiCalls/getPokemonGameList";
import { PokemonGuessInfo } from "../../../../functions/api/singleApiCalls/getPokemonGameList";

export interface SearchSuggestionsProps {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchSuggestions(props: SearchSuggestionsProps): React.ReactElement {
    const { pokemons } = getPokemonGameList(1021);
    const pokemonNamesList = pokemons
        .map((x: PokemonGuessInfo) => x.pokemonName)
        .sort(); /* [NOTE] will create custom sort function later */
    const [pokemonSuggestions, setPokemonSuggestions] = useState<React.ReactElement[]>();

    useEffect(() => {
        displayInputMatches(props.searchInput, pokemonNamesList);
    }, [props.searchInput]);

    const handleClick = (name: string) => {
        props.setSearchInput(name);
        props.setIsFocused(false);
    };

    const displayInputMatches = (input: string, list: string[]) => {
        const inputRegex = new RegExp(`^${props.searchInput}`);
        const suggestionsList = list
            .filter((x: string) => inputRegex.test(x))
            .map((name: string, idx: number) => (
                <ListItem key={idx}>
                    <Button onClick={() => handleClick(name)}>{name}</Button>
                </ListItem>
            ));
        setPokemonSuggestions(suggestionsList);
    };

    return (
        <Container>
            <SuggestionsList>{pokemonSuggestions}</SuggestionsList>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    background-color: white;
    position: absolute;
    height: fit-content;
    width: 100%;
    max-width: 100%;
    z-index: 0;
    box-shadow: 0 2px 2px 1px grey;
    border: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 0.5rem 0;
`;

const SuggestionsList = styled.ul`
    width: 100%;
`;

const ListItem = styled.li`
    width: 100%;
    height: 2rem;
    border: 0.1px solid;
`;

const Button = styled.button.attrs({ type: "button" })`
    width: 100%;
    height: 100%;
    border: none;
    background-color: white;
`;
