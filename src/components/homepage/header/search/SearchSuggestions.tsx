import React from "react";
import styled from "styled-components";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import { getPokemonGameList } from "../../../../functions/api/singleApiCalls/getPokemonGameList";
import { PokemonGuessInfo } from "../../../../functions/api/singleApiCalls/getPokemonGameList";

export function SearchSuggestions(props: { searchInput: string }): React.ReactElement {
    const { pokemons, pending } = getPokemonGameList();
    const pokemonNamesList = pokemons
        .map((x: PokemonGuessInfo) => x.pokemonName)
        .sort(); /* [NOTE] will create custom sort function later */
    console.log("aa", pokemonNamesList);
    return (
        <Container>
            <SuggestionsList>
                <li>Test1</li>
                <li>Test2</li>
            </SuggestionsList>
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

const SuggestionsList = styled.ul``;

const ListItem = styled.li``;
