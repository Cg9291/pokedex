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
    display: grid;
    grid-template-rows: auto min-content;
    grid-template-columns: 1fr 10vw;
    grid-template-areas:
        "headerText randomizeButton"
        "searchBar searchBar";
    max-height: 13rem;
    max-width: 100%;
    align-items: end;
    background-color: darkred;
    padding: 0.5rem 0.5rem;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        grid-template-rows: auto min-content;
        @media ${breakpoints.heightsQueries.minHeights.laptop} {
            max-height: 16rem;
        }
    }

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        grid-template-columns: 1fr 5vw;
    }

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        position: relative;

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
    max-width: 99%;
    color: white;
    text-align: start;
    margin-bottom: 0.5rem;

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        max-width: 95%;
        font-size: 1.8rem;
        margin-top: 3rem;
        margin-bottom: 0.5rem;
        @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
            max-width: 100%;
            font-size: 1.9rem;
        }
    }

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        font-size: 3rem;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        font-size: 3rem;
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
