import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import React, { useRef, useState, useEffect } from "react";
import { SearchSuggestions } from "./SearchSuggestions";
import SearchIcon from "../../../../assets/icons8-search-100.png";
import { punctuationRegex } from "../../../../regularExpressions/punctuationRegex";
import { useHandleSearchSubmission } from "../../../../functions/utilities/useHandleSearchSubmission";
import { IsModalActiveKitInterface } from "../../../comparator/PokemonSearchModal";
import * as breakpoints from "../../../../objects/breakpoints";
import { whereUsedValues } from "../../../../objects/whereUsedValues";

export interface SearchPropsInterface {
    usesNavigation?: boolean;
    hasFilter?: boolean;
    isModalActiveKit?: IsModalActiveKitInterface;
    searchedPokemonId?: string | number | null;
    setSearchedPokemonId?: React.Dispatch<React.SetStateAction<string | number | null>>;
    setSearchStatusTracker?: React.Dispatch<React.SetStateAction<string>>;
    whereUsed?: string;
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

    useEffect(() => {
        if (!props.searchedPokemonId) {
            setSearchInput("");
            setFocusedSuggestion("");
        }
    }, [props.isModalActiveKit?.isModalActive.isActive]);

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
        const sanitizedInput = (e.target as HTMLInputElement).value.replace(punctuationRegex, "");
        setSearchInput(sanitizedInput);
        setFocusedSuggestion(sanitizedInput);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        handleSub(e);
        console.log(searchInput, suggestedInput);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputContainer ref={searchRef} $whereUsed={props.whereUsed}>
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
    grid-area: searchBar;

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        bottom: 0rem;
        align-items: flex-end;
    }
`;

const Form = styled.form.attrs({
    method: "get"
})`
    width: 100%;
    height: 100%;
    display: flex;
    column-gap: 2%;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        @media ${breakpoints.heightsQueries.minHeights.flexible("1100px")} {
            max-height: 100%;
            height: 100%;
        }
    }
`;

const InputContainer = styled.div<{ $whereUsed?: string }>`
    position: relative;
    height: 100%;
    flex: 1 0 0;
    //margin-right: ${(props) => (props.$whereUsed === whereUsedValues.searchModal ? "0" : "0.2rem")};

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        //margin-right: ${(props) => (props.$whereUsed === whereUsedValues.searchModal ? "0" : "1rem")};
    }
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        @media ${breakpoints.heightsQueries.minHeights.flexible("1100px")} {
            max-height: 100%;
            height: 100%;
        }
    }
`;
const Label = styled.label<{ $isShowingSuggestions: boolean }>`
    width: 100%;
    height: 100%;
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
    border-bottom: ${(props) => props.$isShowingSuggestions && "none"};
    padding: 0.5rem 0;
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        @media ${breakpoints.heightsQueries.minHeights.flexible("1100px")} {
            max-height: 100%;
            height: 100%;
        }
    }
`;

const Input = styled.input.attrs({
    placeholder: "Search any pokemon by name or number",
    name: "searchInput"
})`
    width: 85%;
    flex: 1 0 auto;
    height: 100%;
    z-index: 2;
    margin-top: 0;
    padding-left: 1rem;
    border: none;
    background-color: transparent;
    border-right: 0.1px solid grey;
    font-size: 0.8rem;

    @media ${breakpoints.widthsQueries.maxWidths.mobileM} {
        padding-left: 0.5rem;
    }

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 1.3rem;

        @media ${breakpoints.heightsQueries.minHeights.flexible("1100px")} {
            max-height: 100%;
            height: 100%;
        }
    }

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        font-size: 2rem;
    }
`;

const FilterButton = styled.button.attrs({ type: "button" })`
    flex: 0 0 20%;
    height: 100%;
    max-width: 6rem;
    border-radius: 10px;
    color: black;

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        //flex: 0 0 15%;
    }

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 1.5rem;
        @media ${breakpoints.heightsQueries.minHeights.flexible("1100px")} {
            max-height: 100%;
            height: 100%;
        }
    }
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
    padding: 0.3rem;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        min-width: fit-content;
        max-width: 5rem;
    }
    @media (orientation: landscape) {
        //max-width: 1rem;
        //flex: 0 1 5rem;
    }
`;

const ImgSvgContainer = styled.svg.attrs({ viewBox: "0 0 24 24" })`
    align-self: center;
    display: flex;
    justify-content: center;
    height: 100%;
    max-width: 100%;
`;

const SearchIconImg = styled.image`
    height: 100%;
    width: 100%;
    aspect-ratio: 1/1;
    align-self: center;
`;
