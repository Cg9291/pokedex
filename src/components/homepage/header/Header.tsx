import styled from "styled-components/macro";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import { Search } from "./search/Search";
import React from "react";
import { RandomizeSelectionButton } from "./RandomizeSelectionButton";
import { RandomPokemonSelectionInterface } from "../../../interfaces/miscInterfaces";
import * as breakpoints from "../../../objects/breakpoints";

export function Header(props: RandomPokemonSelectionInterface): React.ReactElement {
    return (
        <Container>
            <RandomizeSelectionButton setRandomPokemonSelection={props.setRandomPokemonSelection} />
            <HeaderText>What Pokemon would you like to find?</HeaderText>
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
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        position: relative;
        border-bottom-left-radius: unset;
        border-bottom-right-radius: unset;
        padding: 2rem 1rem 2rem 2rem;
    }
`;

const HeaderText = styled.h2`
    height: fit-content;
    margin-top: 3.7rem;
    max-width: 85%;
    color: white;
    text-align: start;
    padding: 0 0 1rem;

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        font-size: xx-large;
    }
`;
