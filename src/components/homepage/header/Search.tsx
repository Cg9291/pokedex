import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import React from "react";
import { IsFiltersModalActiveKitInterface } from "../../../interfaces/miscInterfaces";

export function Search(props: IsFiltersModalActiveKitInterface): React.ReactElement {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const transmittedData = Object.fromEntries(formData.entries()).searchInput;
        const name = transmittedData.toString().toLowerCase();
        navigate(`/pokemons/name/${name}`);
    };

    const handleFilterClick = () => {
        //navigate(`/filter/:gen`);
        props.setIsFilterModalActive(true);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Label>
                    <Input required />
                </Label>

                <ButtonsContainer>
                    <Button>Search</Button>
                    <FilterButton onClick={handleFilterClick}>Filter</FilterButton>
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

const Label = styled.label`
    flex: 3 0 85%;
`;

const Input = styled.input.attrs({
    placeholder: "Search anything related to a pokemon",
    name: "searchInput"
})`
    width: 100%;
    height: 3rem;
    border-radius: 99px;
    margin-top: auto;
    padding-left: 1rem;
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
