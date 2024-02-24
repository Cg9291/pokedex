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
    grid-template-rows: 1fr 7vh;
    grid-template-columns: 1fr 10vw;
    grid-template-areas:
        "headerText randomizeButton"
        "searchBar searchBar";
    flex: 0 1 40vh;
    align-items: end;
    background-color: darkred;
    padding: 0.5rem;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    row-gap: 0.5rem;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        grid-template-columns: 1fr 7vw;
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

    //HEIGHTS MEDIA QUERIES
    @media ${breakpoints.heightsQueries.minHeights.mobileM} {
        flex-shrink: 0;
    }
    /*    @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
        flex-basis: 16rem;
    }
    @media ${breakpoints.heightsQueries.minHeights.flexible("812px")} {
        flex-basis: 17.5rem;
        grid-template-rows: auto 20%;
    } */
    @media ${breakpoints.heightsQueries.minHeights.tablet} {
        grid-template-rows: auto 28%;
    }
`;

const HeaderText = styled.h2`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    color: white;

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        font-size: 1.8rem;
        //line-height: 2.1rem;

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

    //HEIGHTS MEDIA QUERIES
    @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
        font-size: 1.8rem;
    }
    @media ${breakpoints.heightsQueries.minHeights.flexible("812px")} {
        font-size: 1.9rem;
        margin-bottom: 0.5rem;
    }

    //MIXED MEDIA QUERIES
    @media ${breakpoints.widthsQueries.minWidths.tablet} and ${breakpoints.heightsQueries.minHeights.tablet} {
        font-size: 4rem;
        line-height: 4rem;
    }
`;
