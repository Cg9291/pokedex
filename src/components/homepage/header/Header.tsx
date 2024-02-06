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
        display: grid;
        grid-template-rows: auto fit-content;
        grid-template-columns: 1fr min-content;
        grid-template-areas:
            "headerText randomizeButton"
            "searchBar searchBar";
        border-bottom-left-radius: unset;
        border-bottom-right-radius: unset;
        padding: 1rem 2rem;
        justify-content: flex-end;
    }
    @media ${breakpoints.widthsQueries.minWidths.flexible("1720px")} {
        align-items: flex-start;
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
        font-size: 3.5rem;
        padding: unset;
        margin-top: 0;
        padding-bottom: 1rem;
        //max-height: 80%;
        overflow: hidden;
        grid-area: headerText;
        line-height: 3.5rem;
    }

    @media ${breakpoints.widthsQueries.minWidths.flexible("1212px")} {
        padding-bottom: 0;
    }

    @media ${breakpoints.widthsQueries.minWidths.flexible("1720px")} {
        min-width: 100%;
        min-height: 100%;
    }
`;
