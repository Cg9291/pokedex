import React, { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import styled from "styled-components/macro";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import { getPokemonGameList } from "../../../../functions/api/singleApiCalls/getPokemonGameList";
import { PokemonGuessInfo } from "../../../../functions/api/singleApiCalls/getPokemonGameList";
import { useNavigate } from "react-router-dom";
import { getPokemonData } from "../../../../functions/api/singleApiCalls/getPokemonData";
import { capitalizeWords } from "../../../../functions/utilities/capitalizeWords";
import {
    FocusedSuggestionInterface,
    SearchInputKitInterface,
    SearchStatusKitInterface,
    SuggestedInputKitInterface
} from "./Search";
import { noImageSrcPlaceholder } from "../../../../objects/noImageSrcPlaceholder";
import * as breakpoints from "../../../../objects/breakpoints";

export interface SearchSuggestionsProps {
    searchInputKit: SearchInputKitInterface;
    suggestedInputKit: SuggestedInputKitInterface;
    focusedSuggestionKit: FocusedSuggestionInterface;
    usesNavigation: boolean;
    setSearchedPokemonIdentifier?: React.Dispatch<React.SetStateAction<string | number | null>>;
    searchStatusKit?: SearchStatusKitInterface;
}

export interface FocusedElementTracker {
    value: number;
    isArrowNavigation: boolean;
}

export function SearchSuggestions(props: SearchSuggestionsProps): React.ReactElement {
    const { pokemons } = getPokemonGameList(1021);
    const pokemonNamesList = pokemons
        .map((x: PokemonGuessInfo) => {
            return { name: x.pokemonName, sprite: x.pokemonSprite };
        })
        .sort(); /* [NOTE] will create custom sort function later */
    const [suggestionsList, setSuggestionsList] = useState<React.ReactElement[]>();
    const [focusedElementIndex, setFocusedElementIndex] = useState<FocusedElementTracker>({
        value: -1,
        isArrowNavigation: false
    });
    const suggestionRef = useRef<HTMLLIElement | null>(null);
    const navigate = useNavigate();

    const searchStatusOptions: readonly [string, string, string] = ["searching", "searchError", "found"];

    useEffect(() => {
        displaySearchInputSuggestions();
        props.suggestedInputKit.setSuggestedInput(generateSuggestions()[0]?.name);
        setFocusedElementIndex({ value: -1, isArrowNavigation: true });
    }, [props.searchInputKit?.searchInput]);

    useEffect(() => {
        displaySearchInputSuggestions();
        focusedElementIndex.isArrowNavigation &&
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
        const inputRegex = new RegExp(`^${props.searchInputKit?.searchInput}`);
        const searchInputMirror = {
            name: `${props.searchInputKit.searchInput}`,
            sprite: noImageSrcPlaceholder,
            key: "inputMirror"
        };
        let _suggestionsList: { name: string; sprite: string; key?: string }[] = props.searchInputKit.searchInput
            ? [searchInputMirror]
            : [];

        const generateList =
            props.searchInputKit?.searchInput.length === 0
                ? []
                : pokemonNamesList
                      .filter((x: { name: string; sprite: string }) => inputRegex.test(x.name))
                      .map((pokemon: { name: string; sprite: string }) => pokemon);

        _suggestionsList = [..._suggestionsList, ...generateList];

        return _suggestionsList;
    };

    const displaySearchInputSuggestions = () => {
        let tabIndexValue = 0;
        const displaySuggestionsList = generateSuggestions().map(
            (pokemon: { name: string; sprite: string; key?: string }, idx: number) => (
                <ListItem
                    key={pokemon.key ? pokemon.key : pokemon.name}
                    ref={(node) => {
                        focusedElementIndex.value === idx ? (suggestionRef.current = node) : null;
                    }}
                    tabIndex={(tabIndexValue += 1)}
                    $isFocused={focusedElementIndex.value === idx ? true : false}
                    onMouseOver={() => handleMouseOver(idx)}
                    onMouseMove={() => {
                        setFocusedElementIndex({ value: idx, isArrowNavigation: false });
                    }}
                >
                    <Button onClick={() => handleClick(pokemon.name)}>
                        <Wrapper>
                            <PokemonName> {capitalizeWords(pokemon.name)}</PokemonName>
                            <PokemonImg src={pokemon.sprite} />
                        </Wrapper>
                    </Button>
                </ListItem>
            )
        );
        setSuggestionsList(displaySuggestionsList);
    };

    const handleNav = (e: KeyboardEvent) => {
        let index = focusedElementIndex.value;
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (suggestionsList && focusedElementIndex.value > 0) {
                index--;
                setFocusedElementIndex({
                    value: index,
                    isArrowNavigation: true
                });
                props.suggestedInputKit.setSuggestedInput(generateSuggestions()[index].name);
                props.focusedSuggestionKit.setFocusedSuggestion(generateSuggestions()[index].name);
            }
        } else if (e.key === "ArrowDown") {
            if (suggestionsList && focusedElementIndex.value < suggestionsList.length - 1) {
                index++;
                setFocusedElementIndex({
                    value: index,
                    isArrowNavigation: true
                });
                props.suggestedInputKit.setSuggestedInput(generateSuggestions()[index].name);
                props.focusedSuggestionKit.setFocusedSuggestion(generateSuggestions()[index].name);
            }
        }
    };

    const handleClick = async (suggestedName: string) => {
        if (props.usesNavigation) {
            navigate(`/pokemons/name/${suggestedName}`);
        } else {
            (async () => {
                if (props.searchStatusKit?.setSearchStatus && props.setSearchedPokemonIdentifier) {
                    try {
                        props.setSearchedPokemonIdentifier("");
                        props.suggestedInputKit.setSuggestedInput("");
                        props.searchStatusKit?.setSearchStatus(searchStatusOptions[0]);
                        const pokemonData = await getPokemonData(suggestedName);
                        props.setSearchedPokemonIdentifier(pokemonData.id);

                        props.searchStatusKit.setSearchStatus(searchStatusOptions[2]);
                    } catch (err) {
                        if (err instanceof AxiosError && err.response?.status === 404) {
                            props.searchStatusKit?.setSearchStatus(searchStatusOptions[1]);
                        }
                    } finally {
                        /*  props.searchStatusKit?.setSearchStatus(searchStatusOptions[2]); */
                        // props.suggestedInputKit.setSuggestedInput("");
                    }
                }
            })();
        }
    };

    const handleMouseOver = (idx: number) => {
        if (!focusedElementIndex.isArrowNavigation) {
            setFocusedElementIndex({ value: idx, isArrowNavigation: false });
            props.suggestedInputKit.setSuggestedInput(generateSuggestions()[idx].name);
            props.focusedSuggestionKit.setFocusedSuggestion(generateSuggestions()[idx].name);
        }
    };

    return props.suggestedInputKit.suggestedInput?.length > 0 ? (
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
    border: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const SuggestionsList = styled.ul`
    width: 100%;
    overflow-y: scroll;
`;

const ListItem = styled.li<{ $isFocused: boolean }>`
    width: 100%;
    height: 2.5rem;

    border: 0.1px solid;
    background-color: ${(props) => (props.$isFocused ? "lightgray" : "white")};
    overflow-y: hidden;
    display: flex;
    align-items: center;
`;

const Button = styled.button.attrs({ type: "button" })`
    display: flex;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
`;

const Wrapper = styled.div`
    display: grid;
    max-width: 100%;
    max-height: 100%;
    min-width: 100%;
    min-height: 100%;
    grid-template-columns: 55% 45%;
    grid-template-rows: 100%;
`;

const PokemonName = styled.h5`
    justify-self: center;
    align-self: center;
    width: 100%;
    text-align: left;
    padding-left: 0.3rem;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        font-size: 1rem;
        padding-left: 0.4rem;
    }
`;

const PokemonImg = styled.img`
    justify-self: end;
    max-height: 100%;
    max-width: 100%;
`;
