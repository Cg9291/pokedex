import React, { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import styled from "styled-components";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import { getPokemonGameList } from "../../../../functions/api/singleApiCalls/getPokemonGameList";
import { PokemonGuessInfo } from "../../../../functions/api/singleApiCalls/getPokemonGameList";
import { useNavigate } from "react-router-dom";
import { getPokemonData } from "../../../../functions/api/singleApiCalls/getPokemonData";

export interface SearchSuggestionsProps {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    suggestedInput: string;
    setSuggestedInput: React.Dispatch<React.SetStateAction<string>>;
    usesNavigation: boolean;
    setSearchedPokemonIdentifier?: React.Dispatch<React.SetStateAction<string | number | null>>;
    setSearchError?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSearching?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchSuggestions(props: SearchSuggestionsProps): React.ReactElement {
    const { pokemons } = getPokemonGameList(1021);
    const pokemonNamesList = pokemons
        .map((x: PokemonGuessInfo) => x.pokemonName)
        .sort(); /* [NOTE] will create custom sort function later */
    const [suggestionsList, setSuggestionsList] = useState<React.ReactElement[]>();
    const [focusedElementIndex, setFocusedElementIndex] = useState<number>(0);
    const suggestionRef = useRef<HTMLLIElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        displaySearchInputSuggestions();
        props.setSuggestedInput(generateSuggestions()[0]);
        setFocusedElementIndex(0);
        //console.log(pokemonNamesList.filter((x) => x.includes("-")));
    }, [props.searchInput]);

    useEffect(() => {
        displaySearchInputSuggestions();
        suggestionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        });
    }, [focusedElementIndex]);

    useEffect(() => {
        document.addEventListener("keydown", handleNav);
        return () => document.removeEventListener("keydown", handleNav);
    }, [suggestionsList]);

    const generateSuggestions = () => {
        const inputRegex = new RegExp(`^${props.searchInput}`);
        return props.searchInput.length === 0
            ? []
            : pokemonNamesList.filter((x: string) => inputRegex.test(x)).map((name: string) => name);
    };

    const displaySearchInputSuggestions = () => {
        let tabIndexValue = 0;
        const displaySuggestionsList = generateSuggestions().map((name: string, idx: number) => (
            <ListItem
                key={name}
                ref={(node) => {
                    focusedElementIndex === idx ? (suggestionRef.current = node) : null;
                }}
                tabIndex={(tabIndexValue += 1)}
                $isFocused={focusedElementIndex === idx ? true : false}
            >
                <Button onClick={() => handleClick(name)}>{name}</Button>
            </ListItem>
        ));
        setSuggestionsList(displaySuggestionsList);
    };

    const handleNav = (e: KeyboardEvent) => {
        if (e.key === "ArrowUp") {
            if (suggestionsList && focusedElementIndex > 0) {
                const index = focusedElementIndex - 1;
                setFocusedElementIndex(index);
                props.setSuggestedInput(generateSuggestions()[index]);
            }
        } else if (e.key === "ArrowDown") {
            if (suggestionsList && focusedElementIndex < suggestionsList.length - 1) {
                const index = focusedElementIndex + 1;
                setFocusedElementIndex(index);
                props.setSuggestedInput(generateSuggestions()[index]);
            }
        }
    };

    const handleClick = (suggestedName: string) => {
        if (props.usesNavigation) {
            navigate(`/pokemons/name/${suggestedName}`);
        } else {
            (async () => {
                if (props.setIsSearching && props.setSearchError && props.setSearchedPokemonIdentifier) {
                    try {
                        props.setSearchedPokemonIdentifier("");
                        props.setIsSearching(true);
                        const pokemonData = await getPokemonData(suggestedName);
                        props.setSearchedPokemonIdentifier(pokemonData.id);
                    } catch (err) {
                        if (err instanceof AxiosError && err.response?.status === 404) {
                            props.setSearchError(true);
                        }
                    } finally {
                        props.setIsSearching(false);
                        props.setSuggestedInput("");
                    }
                }
            })();
        }
    };

    console.log(suggestionsList?.length);

    return props.suggestedInput ? (
        <Container>
            <SuggestionsList>{suggestionsList}</SuggestionsList>
        </Container>
    ) : (
        <></>
    );
}

const Container = styled(ContainerPrototype)`
    background-color: white;
    position: absolute;
    max-height: 50vh;
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
