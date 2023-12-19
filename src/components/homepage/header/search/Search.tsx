import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import React, { useRef, useState, useEffect } from "react";
import { SearchSuggestions } from "./SearchSuggestions";
import SearchIcon from "../../../../assets/icons8-search-100.png";
import { punctuationRegex } from "../../../../regularExpressions/punctuationRegex";
import { useHandleSearchSubmission } from "../../../../functions/utilities/useHandleSearchSubmission";

export interface SearchPropsInterface {
    usesNavigation?: boolean;
    hasFilter?: boolean;
    setSearchedPokemonId?: React.Dispatch<React.SetStateAction<string | number | null>>;
    setSearchError?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSearching?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Search(props: SearchPropsInterface): React.ReactElement {
    const [searchInput, setSearchInput] = useState<string>("");
    const [suggestedInput, setSuggestedInput] = useState<string>("");
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const hasSuggestions = suggestedInput?.length > 0;
    const {
        usesNavigation = props.usesNavigation ? props.usesNavigation : true,
        hasFilter = props.hasFilter ? props.hasFilter : true
    } = props;
    const { handleSub, searchedPokemonIdentifier, searchError, isSearching } = useHandleSearchSubmission(
        searchInput,
        suggestedInput,
        setSuggestedInput,
        usesNavigation
    );

    useEffect(() => {
        if (props.setIsSearching && props.setSearchError && props.setSearchedPokemonId) {
            props.setSearchedPokemonId(searchedPokemonIdentifier);
            props.setIsSearching(isSearching);
            props.setSearchError(searchError);
        }
    }, [isSearching, searchedPokemonIdentifier, searchError]);

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
                        <Input value={searchInput} onChange={handleChange} required />
                        <SearchIconButton $isShowingSuggestions={hasSuggestions}>
                            <ImgSvgContainer>
                                <SearchIconImg href={SearchIcon} />
                            </ImgSvgContainer>
                        </SearchIconButton>
                    </Label>
                    <SearchSuggestions
                        searchInput={searchInput.toLowerCase()}
                        setSearchInput={setSearchInput}
                        suggestedInput={suggestedInput}
                        setSuggestedInput={setSuggestedInput}
                        usesNavigation={usesNavigation}
                        setIsSearching={props.setIsSearching}
                        setSearchError={props.setSearchError}
                        setSearchedPokemonIdentifier={props.setSearchedPokemonId}
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
    //margin-right: 0.1rem;
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
    placeholder: "Search a pokemon by name or number",
    name: "searchInput"
})`
    width: 85%;
    height: 100%;
    z-index: 2;
    margin-top: auto;
    padding-left: 1rem;
    border: none;
    background-color: transparent;
    border-right: 0.1px solid grey;
`;

/* const SearchButton = styled.button.attrs({ type: "submit" })`
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 10px;
`; */
/* const ButtonsContainer = styled(ContainerPrototype)`
    flex-direction: column;
    max-height: 100%;
`; */

const FilterButton = styled.button.attrs({ type: "button" })`
    /* width: 100%; */
    flex: 0 1 15%;
    height: 100%;
    border-radius: 10px;
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
