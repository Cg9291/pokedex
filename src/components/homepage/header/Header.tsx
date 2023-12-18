import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import { Search } from "./search/Search";
import React from "react";
import { RandomizeSelectionButton } from "./RandomizeSelectionButton";
import { RandomPokemonSelectionInterface } from "../../../interfaces/miscInterfaces";

export function Header(props: RandomPokemonSelectionInterface): React.ReactElement {
    return (
        <Container>
            <RandomizeSelectionButton setRandomPokemonSelection={props.setRandomPokemonSelection} />
            <HeaderText>
                What Pokemon
                <br /> would you like to find?
            </HeaderText>
            <Search />
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    max-height: 13rem;
    flex-direction: column;
    justify-content: center;
    background-color: darkred;
    padding: 0.5rem 0.5rem;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    position: fixed;
`;

const HeaderText = styled.h2`
    height: fit-content;
    margin-top: 3.7rem;
    max-width: 85%;
    color: white;
    text-align: start;
    padding: 0 0 1rem;
`;
