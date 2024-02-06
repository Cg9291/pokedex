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
        randomPokemonSelection.map((number, index) => <PokemonPictureCard id={number} isLink={true} key={index} />);

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
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        padding: 0;
    }
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    column-gap: 0.8rem;
    background-color: white;
    min-width: 100%;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        grid-template-columns: repeat(3, 1fr);
        padding: 2rem;

        @media ${breakpoints.heightsQueries.minHeights.flexible("1365px")} {
            grid-template-columns: 1fr 1fr;
        }
    }
`;
