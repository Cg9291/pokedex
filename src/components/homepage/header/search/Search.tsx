import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import React, { useEffect, useState } from "react";
import { SearchSuggestions } from "./SearchSuggestions";

export function Search(): React.ReactElement {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log(searchInput);
    }, [searchInput]);

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

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputContainer>
                    <Label>
                        <Input
                            $isFocused={isFocused}
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                            onFocus={() => setIsFocused(true)}
                            required
                        />
                    </Label>
                    {isFocused && (
                        <SearchSuggestions
                            searchInput={searchInput}
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
const Label = styled.label`
    width: 100%;
`;

const Input = styled.input.attrs<{ $isFocused: boolean }>({
    placeholder: "Search anything related to a pokemon",
    name: "searchInput"
})`
    width: 100%;
    height: 3rem;
    border-radius: 99px;
    z-index: 2;
    border-top-left-radius: ${(props) => (props.$isFocused ? "24px" : "99px")};
    border-top-right-radius: ${(props) => (props.$isFocused ? "24px" : "99px")};
    border-bottom-left-radius: ${(props) => (props.$isFocused ? "0" : "99px")};
    border-bottom-right-radius: ${(props) => (props.$isFocused ? "0" : "99px")};
    margin-top: auto;
    padding-left: 1rem;
    box-shadow: 0 0 2px 1px grey;
    border: none;
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
