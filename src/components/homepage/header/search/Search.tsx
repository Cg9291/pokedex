import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import React, { useRef, useState, useEffect } from "react";
import { SearchSuggestions } from "./SearchSuggestions";
import SearchIcon from "../../../../assets/icons8-search-100.png";
import { punctuationRegex } from "../../../../regularExpressions/punctuationRegex";
import { useHandleSearchSubmission } from "../../../../functions/utilities/useHandleSearchSubmission";
import * as breakpoints from "../../../../objects/breakpoints";

export interface SearchPropsInterface {
    usesNavigation?: boolean;
    hasFilter?: boolean;
    setSearchedPokemonId?: React.Dispatch<React.SetStateAction<string | number | null>>;
    setSearchStatusTracker?: React.Dispatch<React.SetStateAction<string>>;
}
export interface SearchInputKitInterface {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export interface FocusedSuggestionInterface {
    focusedSuggestion: string | null;
    setFocusedSuggestion: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface SuggestedInputKitInterface {
    suggestedInput: string;
    setSuggestedInput: React.Dispatch<React.SetStateAction<string>>;
}

export interface SearchStatusKitInterface {
    searchStatus: string;
    setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
    //searchStatusOptions: readonly [string, string, string];
}

export function Search(props: SearchPropsInterface): React.ReactElement {
    const [searchInput, setSearchInput] = useState<string>("");
    const [suggestedInput, setSuggestedInput] = useState<string>("");
    const [searchStatus, setSearchStatus] = useState<string>("");
    const [focusedSuggestion, setFocusedSuggestion] = useState<string | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const hasSuggestions = suggestedInput?.length > 0;
    const {
        usesNavigation = props.usesNavigation ? props.usesNavigation : true,
        hasFilter = props.hasFilter ? props.hasFilter : true
    } = props;
    const { handleSub, searchedPokemonIdentifier, setSearchedPokemonIdentifier } = useHandleSearchSubmission(
        searchInput,
        setSearchInput,
        suggestedInput,
        setSuggestedInput,
        usesNavigation,
        setSearchStatus
    );

    const searchInputKit: SearchInputKitInterface = {
        searchInput: searchInput.toLowerCase(),
        setSearchInput: setSearchInput
    };

    const suggestedInputKit: SuggestedInputKitInterface = {
        suggestedInput: suggestedInput,
        setSuggestedInput: setSuggestedInput
    };

    const focusedSuggestionKit: FocusedSuggestionInterface = {
        focusedSuggestion: focusedSuggestion,
        setFocusedSuggestion: setFocusedSuggestion
    };

    const searchStatusKit = {
        searchStatus: searchStatus,
        setSearchStatus: setSearchStatus
    };

    useEffect(() => {
        if (props.setSearchStatusTracker && props.setSearchedPokemonId) {
            props.setSearchedPokemonId(searchedPokemonIdentifier);
            props.setSearchStatusTracker(searchStatus);
        }
        return;
    }, [searchStatus, searchedPokemonIdentifier]);

    (function handleOutsideClicks() {
        useEffect(() => {
            const detectOutsideClicks = (e: MouseEvent) => {
                if (!searchRef.current?.contains(e.target as Node)) {
                    setSuggestedInput("");
                }
            };

            document.addEventListener("mousedown", detectOutsideClicks);
            return () => {
                document.removeEventListener("mousedown", detectOutsideClicks);
            };
        }, []);
    })();

    const handleFilterClick = () => {
        navigate(`/filter/:gen`);
    };

    const handleChange = (e: React.ChangeEvent) => {
        const clearedInput = (e.target as HTMLInputElement).value.replace(punctuationRegex, "");
        setSearchInput(clearedInput);
        setFocusedSuggestion(clearedInput);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        handleSub(e);
        console.log(searchInput, suggestedInput);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputContainer ref={searchRef}>
                    <Label $isShowingSuggestions={hasSuggestions}>
                        <Input
                            value={focusedSuggestion ? focusedSuggestion : searchInput}
                            onChange={handleChange}
                            required
                        />
                        <SearchIconButton $isShowingSuggestions={hasSuggestions}>
                            <ImgSvgContainer>
                                <SearchIconImg href={SearchIcon} />
                            </ImgSvgContainer>
                        </SearchIconButton>
                    </Label>
                    <SearchSuggestions
                        searchInputKit={searchInputKit}
                        suggestedInputKit={suggestedInputKit}
                        focusedSuggestionKit={focusedSuggestionKit}
                        usesNavigation={usesNavigation}
                        searchStatusKit={searchStatusKit}
                        setSearchedPokemonIdentifier={setSearchedPokemonIdentifier}
                    />
                </InputContainer>
                {hasFilter && <FilterButton onClick={handleFilterClick}>Filter</FilterButton>}
            </Form>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    max-height: 4rem;
    width: 100%;
`;

const Form = styled.form.attrs({
    method: "get"
})`
    width: 100%;
    max-height: 3rem;
    display: flex;
`;

const InputContainer = styled.div`
    position: relative;
    height: fit-content;
    flex: 1;
    margin-right: 1rem;
`;
const Label = styled.label<{ $isShowingSuggestions: boolean }>`
    width: 100%;
    height: 3rem;
    display: flex;
    border: 1px solid black;
    border-radius: 99px;
    z-index: 2;
    background-color: white;
    padding-right: 0.5rem;
    border-top-left-radius: ${(props) => (props.$isShowingSuggestions ? "24px" : "99px")};
    border-top-right-radius: ${(props) => (props.$isShowingSuggestions ? "24px" : "99px")};
    border-bottom-left-radius: ${(props) => (props.$isShowingSuggestions ? "0" : "99px")};
    border-bottom-right-radius: ${(props) => (props.$isShowingSuggestions ? "0" : "99px")};
    padding: 0.5rem 0;
`;

const Input = styled.input.attrs({
    placeholder: "Search any pokemon by name or number",
    name: "searchInput"
})`
    width: 85%;
    flex: 1 0 auto;
    height: 100%;
    z-index: 2;
    margin-top: auto;
    padding-left: 1rem;
    border: none;
    background-color: transparent;
    border-right: 0.1px solid grey;
    font-size: 0.8rem;

    @media ${breakpoints.widthsQueries.maxWidths.mobileM} {
        padding-left: 0.5rem;
    }
`;

const FilterButton = styled.button.attrs({ type: "button" })`
    flex: 0 1 15%;
    height: 100%;
    max-width: 6rem;
    border-radius: 10px;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        font-size: 1.4rem;
    }
`;

const SearchIconButton = styled.button.attrs({ type: "submit" })<{ $isShowingSuggestions: boolean }>`
    width: 15%;
    height: 100%;
    border: none;
    background-color: white;
    border-top-right-radius: ${(props) => (props.$isShowingSuggestions ? "24px" : "99px")};
    border-bottom-right-radius: ${(props) => (props.$isShowingSuggestions ? "0" : "99px")};
    display: flex;
    justify-content: center;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        width: 5%;
    }
`;

const ImgSvgContainer = styled.svg.attrs({ viewBox: "0 0 24 24" })`
    display: flex;
    justify-content: center;
    max-height: 100%;
    max-width: 100%;
`;

const SearchIconImg = styled.image`
    height: 100%;
    width: 100%;
    aspect-ratio: 1/1;
    align-self: center;
`;
