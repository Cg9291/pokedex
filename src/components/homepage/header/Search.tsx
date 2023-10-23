import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import React from "react";

export default function Search(): React.ReactElement {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const transmittedData = Object.fromEntries(formData.entries()).myInput;
        const name = transmittedData.toString().toLowerCase();
        navigate(`/pokemons/name/${name}`);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Label>
                    <Input />
                </Label>
                <Button>Search</Button>
            </Form>
        </Container>
    );
}

const Container = styled(ContainerPrototype)``;

const Form = styled.form.attrs({
    method: "get"
    //onSubmit: handleSubmit,
})`
    width: 100%;
    display: flex;
`;

const Label = styled.label`
    flex: 3 0 85%;
`;

const Input = styled.input.attrs({
    placeholder: "Search anything related to a pokemon",
    name: "myInput"
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
