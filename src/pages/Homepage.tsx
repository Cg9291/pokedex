import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import Header from "../components/homepage/header/Header";
import PokemonPictureCard from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import React from "react";

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

export default function Homepage(): React.ReactElement {
    const pokemonLookupNumber = (): number[] => {
        const numberArray: number[] = [];
        const randomNum = (): void => {
            for (let i = 0; i < 6; i++) {
                numberArray.push(Math.floor(Math.random() * (255 - 1) + 1));
            }
        };
        randomNum();
        //console.log(numberArray)
        return numberArray;
    };

    const mapPictureCards = (): React.ReactElement[] => pokemonLookupNumber().map((i) => <PokemonPictureCard id={i} />);

    return (
        <Container>
            <Header />
            <MainContainer>{mapPictureCards()}</MainContainer>
        </Container>
    );
}
