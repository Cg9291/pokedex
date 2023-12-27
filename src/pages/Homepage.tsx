import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { Header } from "../components/homepage/header/Header";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import React, { useState } from "react";
import { pickRandomPokemonNumbers } from "../functions/utilities/pickRandomPokemonNumbers";

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
            <MainContainer>{mapPictureCards()}</MainContainer>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
`;

export const MainContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    padding: 1vh 1vw;
`;
