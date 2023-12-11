import React from "react";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import styled from "styled-components";

export function PokemonNotFound(): React.ReactElement {
    return <Container>The Pokemon you are looking for does not exist</Container>;
}

const Container = styled(ContainerPrototype)``;
