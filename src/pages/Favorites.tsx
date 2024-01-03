import styled from "styled-components/macro";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import React from "react";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import { typesColors } from "../objects/typesColors";

export function Favorites(): React.ReactElement {
    const favoritedPokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");
    const numberOfFavoritedPokemons = favoritedPokemons.length;
    const mapPictureCards = (): React.ReactElement[] =>
        favoritedPokemons.map((number: number, index: number) => (
            <PokemonPictureCard id={number} key={index} isLink={true} />
        ));

    return (
        <Container>
            <Title>Favorites</Title>
            <SubTitle>
                This is a list of your favorite pokemons!
                <br />
                Number of favorite pokemons:{numberOfFavoritedPokemons}
            </SubTitle>
            <FavoritesContainer>
                {numberOfFavoritedPokemons !== 0 ? mapPictureCards() : "No Favorite Pokemons to display"}
            </FavoritesContainer>
        </Container>
    );
}
const Container = styled(ContainerPrototype)`
    flex-direction: column;
    max-height: 100%;
    overflow-y: hidden;
`;

export const FavoritesContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: fit-content;
    padding: 1vh 1vw 90px;
    row-gap: 1rem;
    overflow: scroll;
`;

const Title = styled.h1`
    color: ${typesColors.black};
    font-weight: normal;
    padding: 1rem 1rem 0.5rem;
`;

const SubTitle = styled.h4`
    color: ${typesColors.black};
    font-weight: normal;
    padding: 0 1rem 1rem;
`;
