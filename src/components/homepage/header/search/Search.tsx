import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import React, { useEffect, useState } from "react";
import { SearchSuggestions } from "./SearchSuggestions";
import SearchIcon from "../../../../assets/icons8-search-100.png";

export function Search(): React.ReactElement {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log(searchInput);
    }, [searchInput]);

    const hasInputAndIsFocused = searchInput.length > 0 && isFocused;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const transmittedData = Object.fromEntries(formData.entries()).searchInput;
        const name = transmittedData.toString().toLowerCase();
        navigate(`/pokemons/name/${name}`);
    };

    const handleClick = () => {
        navigate(`/filter/:gen`);
    };

    console.log(hasInputAndIsFocused, searchInput.length);

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputContainer>
                    <Label $showSuggestions={hasInputAndIsFocused}>
                        <Input
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                            onFocus={() => setIsFocused(true)}
                            required
                        />
                        <SearchIconButton $showSuggestions={hasInputAndIsFocused}>
                            <SvgImg>
                                <SearchIconImg href={SearchIcon} />
                            </SvgImg>
                        </SearchIconButton>
                    </Label>
                    {isFocused && (
                        <SearchSuggestions
                            searchInput={searchInput.toLowerCase()}
                            setSearchInput={setSearchInput}
                            setIsFocused={setIsFocused}
                        />
                    )}
                </InputContainer>

                <ButtonsContainer>
                    <Button>Search</Button>
                    <FilterButton onClick={handleClick}>Filter</FilterButton>
                </ButtonsContainer>
            </Form>
        </Container>
    );
}

const Container = styled(ContainerPrototype)``;

const Form = styled.form.attrs({
    method: "get"
})`
    width: 100%;
    display: flex;
`;

const InputContainer = styled.div`
    position: relative;
    min-width: 85%;
    width: 85%;
    max-width: 85%;
    height: fit-content;
`;
const Label = styled.label<{ $showSuggestions: boolean }>`
    width: 100%;
    height: 3rem;
    display: flex;
    border-radius: 99px;
    z-index: 2;
    background-color: white;
    padding-right: 0.5rem;
    border-top-left-radius: ${(props) => (props.$showSuggestions ? "24px" : "99px")};
    border-top-right-radius: ${(props) => (props.$showSuggestions ? "24px" : "99px")};
    border-bottom-left-radius: ${(props) => (props.$showSuggestions ? "0" : "99px")};
    border-bottom-right-radius: ${(props) => (props.$showSuggestions ? "0" : "99px")};
    padding: 0.5rem 0;
`;

const Input = styled.input.attrs({
    placeholder: "Search anything related to a pokemon",
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

const Button = styled.button.attrs({ type: "submit" })`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;
const ButtonsContainer = styled(ContainerPrototype)`
    flex-direction: column;
`;

const FilterButton = styled.button.attrs({ type: "button" })`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

const SearchIconButton = styled.button.attrs({ type: "submit" })<{ $showSuggestions: boolean }>`
    width: 15%;
    height: 100%;
    border: none;
    background-color: white;
    border-top-right-radius: ${(props) => (props.$showSuggestions ? "24px" : "99px")};
    border-bottom-right-radius: ${(props) => (props.$showSuggestions ? "0" : "99px")};
`;

const SvgImg = styled.svg.attrs({ viewBox: "0 0 24 24" })`
    display: flex;
    justify-content: center;
    min-height: 60%;
    width: 100%;
    height: 100%;
    //padding-left: 0.3rem;
`;

const SearchIconImg = styled.image`
    height: 100%;
    width: auto;
    aspect-ratio: 1/1;
    align-self: center;
    //padding-left: 0.3rem;
`;
