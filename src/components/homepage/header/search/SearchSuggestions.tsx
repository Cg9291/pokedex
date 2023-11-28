import React, { useEffect, useRef, useState } from "react";
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
    const [inputSuggestionsList, setInputSuggestionsList] = useState<React.ReactElement[]>();
    const [focusedElement, setFocusedElement] = useState<number>(0);
    const suggestionRef = useRef<any>(null);

    useEffect(() => {
        displaySearchInputSuggestions();
    }, [props.searchInput, focusedElement]);

    useEffect(() => {
        suggestionRef.current?.focus();
    });

    useEffect(() => {
        const handleNav = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") {
                focusedElement > 0 && setFocusedElement((count) => count - 1);
            } else if (e.key === "ArrowDown") {
                setFocusedElement((count) => count + 1);
            }
        };

        document.addEventListener("keydown", handleNav);
        return () => document.removeEventListener("keydown", handleNav);
    }, [focusedElement]);

    console.log("mvmt", focusedElement);
    const handleClick = (name: string) => {
        props.setSearchInput(name);
        props.setIsFocused(false);
    };

    const displaySearchInputSuggestions = () => {
        let tabIndexNum = 0;
        const inputRegex = new RegExp(`^${props.searchInput}`);

        const displaySuggestionsList = pokemonNamesList
            .filter((x: string) => inputRegex.test(x))
            .map((name: string, idx: number) => (
                <ListItem
                    key={name}
                    ref={(node) => {
                        focusedElement === idx ? (suggestionRef.current = node) : null;
                    }}
                    tabIndex={(tabIndexNum += 1)}
                >
                    <Button onClick={() => handleClick(name)}>{name}</Button>
                </ListItem>
            ));
        setInputSuggestionsList(displaySuggestionsList);
    };

    return (
        <Container>
            <SuggestionsList>{inputSuggestionsList}</SuggestionsList>
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

    &:focus {
        background-color: lightgray;
        color: red;
    }
`;

const Button = styled.button.attrs({ type: "button" })`
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
`;
