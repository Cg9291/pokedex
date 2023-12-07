import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import React from "react";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import { typesColors } from "../objects/typesColors";

export function Favorites(): React.ReactElement {
    const favoritedPokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");
    const mapPictureCards = (): React.ReactElement[] =>
        favoritedPokemons.map((number: number, index: number) => (
            <PokemonPictureCard id={number} key={index} isLink={true} />
        ));

    return (
        <Container>
            <Title>Favourites</Title>
            <SubTitle>This is a list of your favourite pokemons</SubTitle>
            <FavoritesContainer>
                {favoritedPokemons.length !== 0 ? mapPictureCards() : "No Favorite Pokemons to display"}
            </FavoritesContainer>
        </Container>
    );
}
const Container = styled(ContainerPrototype)`
    display: block;
`;

export const FavoritesContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100vh;
    padding: 1vh 1vw 90px;
    overflow: scroll;
`;

const Title = styled.h2`
    color: ${typesColors.black};
    font-weight: normal;
    padding: 1rem 1rem 0.5rem;
`;

const SubTitle = styled.h2`
    color: ${typesColors.black};
    font-weight: normal;
    font-size: 20px;
    padding: 0 1rem 1rem;
`;
