import React from "react";
import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";

export function Comparator(): React.ReactElement {
    const pokemonImages: { topImg: string; bottomImg: string } = {
        topImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
        bottomImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    };

    return (
        <Container>
            <Header>
                <HeaderTitle>Comparator</HeaderTitle>
                <HeaderDescription>Select the two Pokemon that you would like to compare.</HeaderDescription>
            </Header>
            <ComparatorBody>
                <ComparatorPokemonCards imgUrl={pokemonImages.topImg} />
                <ComparatorPokemonCards imgUrl={pokemonImages.bottomImg} />
            </ComparatorBody>
        </Container>
    );
}

function ComparatorPokemonCards(props: { imgUrl: string }): React.ReactElement {
    return (
        <ComparatorPokemonCardsContainer>
            <PokemonImg src={props.imgUrl}></PokemonImg>
        </ComparatorPokemonCardsContainer>
    );
}

const Container = styled(ContainerPrototype)`
    padding: 0 1rem;
    flex-direction: column;
`;

const Header = styled(ContainerPrototype)`
    min-height: fit-content;
    height: max-content;
    flex-direction: column;
    flex-wrap: wrap;
`;

const HeaderTitle = styled.h1`
    margin-bottom: 0.5rem;
`;

const HeaderDescription = styled.p`
    min-height: fit-content;
`;

const ComparatorBody = styled(ContainerPrototype)`
    flex-direction: column;
`;

const ComparatorPokemonCardsContainer = styled(ContainerPrototype)`
    height: 30%;
    margin: 1rem 0;
    //padding-top: 1rem;
    background-color: lightgrey;
    justify-content: center;
    border-radius: 12px;
    align-items: center;
`;

const PokemonImg = styled.img`
    width: 7rem;
    height: 7rem;
    aspect-ratio: 1/1;
`;
