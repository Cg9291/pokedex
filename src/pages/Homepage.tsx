import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import Header from "../components/homepage/header/Header";
import PokemonPictureCard from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import React from "react";

export default function Homepage(): React.ReactElement {
    const pickRandomPokemonNumbers = (): number[] => {
        const numberArray: number[] = [];
        for (let i = 0; i < 6; i++) {
            numberArray.push(Math.floor(Math.random() * (255 - 1) + 1));
        }
        return numberArray;
    };

    const mapPictureCards = (): React.ReactElement[] =>
        pickRandomPokemonNumbers().map((i) => <PokemonPictureCard id={i} />);

    return (
        <Container>
            <Header />
            <MainContainer>{mapPictureCards()}</MainContainer>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
`;

const MainContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    padding: 1vh 1vw;
`;
