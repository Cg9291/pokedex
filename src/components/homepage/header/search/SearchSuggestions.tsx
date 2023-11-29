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
    const suggestionRef = useRef<any>(null); //[NOTE!]will fix any

    useEffect(() => {
        displaySearchInputSuggestions();
        setFocusedElement(0);
    }, [props.searchInput]);

    useEffect(() => {
        displaySearchInputSuggestions();
        suggestionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        });
    }, [focusedElement]);

    useEffect(() => {
        const handleNav = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") {
                focusedElement > 0 && setFocusedElement((count) => count - 1);
            } else if (e.key === "ArrowDown") {
                inputSuggestionsList &&
                    focusedElement < inputSuggestionsList.length - 1 &&
                    setFocusedElement((count) => count + 1);
            }
        };
        document.addEventListener("keydown", handleNav);
        return () => document.removeEventListener("keydown", handleNav);
    }, [focusedElement, inputSuggestionsList]);

    const handleClick = (name: string) => {
        props.setSearchInput(name);
        props.setIsFocused(false);
    };

    const displaySearchInputSuggestions = () => {
        let tabIndexValue = 0;
        const inputRegex = new RegExp(`^${props.searchInput}`);

        const displaySuggestionsList = pokemonNamesList
            .filter((x: string) => inputRegex.test(x))
            .map((name: string, idx: number) => (
                <ListItem
                    key={name}
                    ref={(node) => {
                        focusedElement === idx ? (suggestionRef.current = node) : null;
                    }}
                    tabIndex={(tabIndexValue += 1)}
                    $isFocused={focusedElement === idx ? true : false}
                >
                    <Button onClick={() => handleClick(name)}>{name}</Button>
                </ListItem>
            ));

        setInputSuggestionsList(displaySuggestionsList);
    };

    return props.searchInput ? (
        <Container>
            <SuggestionsList>{inputSuggestionsList}</SuggestionsList>
        </Container>
    ) : (
        <></>
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
    height: 50vh;
    overflow-y: scroll;
`;

const ListItem = styled.li<{ $isFocused: boolean }>`
    width: 100%;
    height: 2rem;
    border: 0.1px solid;
    background-color: ${(props) => (props.$isFocused ? "lightgray" : "white")};
`;

const Button = styled.button.attrs({ type: "button" })`
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
`;
