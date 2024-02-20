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
    padding: 1vh 3vw;
    justify-content: center;

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
            padding: 2vh 3vw;
        }
    }

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        overflow: hidden;
        flex: 0 1 auto;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        padding: 0;
    }
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 1fr);
    column-gap: 0.8rem;
    row-gap: 0.3rem;
    background-color: white;
    min-width: 100%;
    min-height: 100%;
    //max-height: 100%;

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
            row-gap: 2vh;
        }
    }

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        //max-height: 20vh;
        column-gap: 2vh;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        grid-template-columns: repeat(3, 1fr);
        padding: 2rem;

        @media ${breakpoints.heightsQueries.minHeights.flexible("1365px")} {
            grid-template-columns: 1fr 1fr;
        }
    }
`;
