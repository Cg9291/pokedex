import styled from "styled-components/macro";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { Header } from "../components/homepage/header/Header";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import React, { useState } from "react";
import { pickRandomPokemonNumbers } from "../functions/utilities/pickRandomPokemonNumbers";
import * as breakpoints from "../objects/breakpoints";
import { whereUsedValues } from "../objects/whereUsedValues";

export function Homepage(): React.ReactElement {
    const [randomPokemonSelection, setRandomPokemonSelection] = useState<number[]>(pickRandomPokemonNumbers());

    const mapPictureCards = (): React.ReactElement[] =>
        randomPokemonSelection.map((number, index) => (
            <PokemonPictureCard id={number} isLink={true} whereUsed={whereUsedValues.homepage} key={index} />
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
    flex: 1 0 0;
    overflow: hidden;
    @media (orientation: landscape) {
        flex-basis: content;
        padding-bottom: 11vh;
    }
`;

export const MainContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 2vw;
    justify-content: center;
    flex: 1 1 0;
    overflow: hidden;

    @media (orientation: landscape) {
        overflow: initial;
    }
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(
        2,
        calc((100vw - 4vw) / 2 - 1vw)
    ); //viewwidth - total inline padding / number of columns - half gap
    grid-template-rows: repeat(3, calc((100% - 4vw) / 3));
    gap: 2vw;
    background-color: white;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @media (max-aspect-ratio: 0.55) {
        grid-template-rows: repeat(4, calc((100% - 6vw) / 4));
    }

    //HEIGHTS MEDIA QUERIES

    @media (orientation: landscape) {
        grid-template-rows: repeat(3, 36vh);
    }
`;
