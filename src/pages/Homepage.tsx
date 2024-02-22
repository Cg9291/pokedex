import styled from "styled-components/macro";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { Header } from "../components/homepage/header/Header";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import React, { useState } from "react";
import { pickRandomPokemonNumbers } from "../functions/utilities/pickRandomPokemonNumbers";
import * as breakpoints from "../objects/breakpoints";

export function Homepage(): React.ReactElement {
    const [randomPokemonSelection, setRandomPokemonSelection] = useState<number[]>(pickRandomPokemonNumbers());

    const mapPictureCards = (): React.ReactElement[] =>
        randomPokemonSelection.map((number, index) => (
            <PokemonPictureCard id={number} isLink={true} whereUsed="homepage" key={index} />
        ));

    return (
        <Container>
            <Header
                randomPokemonSelection={randomPokemonSelection}
                setRandomPokemonSelection={setRandomPokemonSelection}
            />
            <MainContainer>
                <Wrapper>{mapPictureCards()}</Wrapper>
            </MainContainer>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    flex: 0 0 1fr;
    overflow: hidden;

    @media (orientation: landscape) {
        overflow-y: scroll;
    }
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        overflow: hidden;
        flex: 0 0 1fr;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        padding: 0 12vw;
        background-color: #1b252f;
    }
`;

export const MainContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 2vw;
    justify-content: center;
    flex: 0 1 auto;
    overflow: hidden;

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        //flex: 1 0 content;
    }
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        overflow: hidden;
        flex: 0 1 auto;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        padding: 0;
    }

    //HEIGHTS MEDIA QUERIES
    @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
        padding: 3vw;
    }
    @media ${breakpoints.heightsQueries.minHeights.flexible("812px")} {
        padding: 4vw;
    }
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 2vw;
    background-color: white;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
            row-gap: 2vh;
        }
    }
    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        column-gap: 2vh;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        grid-template-columns: repeat(3, 1fr);
        padding: 2rem;
        @media ${breakpoints.heightsQueries.minHeights.flexible("1365px")} {
            grid-template-columns: 1fr 1fr;
        }
    }

    //HEIGHTS MEDIA QUERIES
    @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
        gap: 3vw;
    }
    @media ${breakpoints.heightsQueries.minHeights.flexible("812px")} {
        gap: 4vw;
    }
`;
