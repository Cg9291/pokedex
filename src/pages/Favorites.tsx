import styled from "styled-components/macro";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import React from "react";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import { typesColors } from "../objects/typesColors";
import * as breakpoints from "../objects/breakpoints";
export function Favorites(): React.ReactElement {
    const favoritedPokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");
    const numberOfFavoritedPokemons = favoritedPokemons.length;
    const mapPictureCards = (): React.ReactElement[] =>
        favoritedPokemons.map((number: number, index: number) => (
            <PokemonPictureCard id={number} key={index} isLink={true} />
        ));

    console.log(favoritedPokemons);
    return (
        <Container>
            <Wrapper>
                <Title>Favorites</Title>
                <SubTitle>
                    This is a list of your favorite pokemons!
                    <br />
                    Number of favorite pokemons:{numberOfFavoritedPokemons}
                </SubTitle>
                <FavoritesContainer>
                    {numberOfFavoritedPokemons !== 0 ? mapPictureCards() : "No Favorite Pokemons to display"}
                </FavoritesContainer>
            </Wrapper>
        </Container>
    );
}
const Container = styled(ContainerPrototype)`
    flex-direction: column;
    max-height: 100%;
    overflow-y: hidden;
    padding: 0 1rem;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        padding: 0 12vw;
        background-color: #1b252f;
    }
`;

const Wrapper = styled(ContainerPrototype)`
    flex-direction: column;
    background-color: white;
`;
export const FavoritesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    column-gap: 0.8rem;
    width: 100%;
    height: max-content;
    padding: 1vh 0;
    row-gap: 0.7rem;
    overflow: scroll;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        column-gap: 3rem;
        padding: 1vh 3vw;
    }
`;

const Title = styled.h1`
    color: ${typesColors.black};
    font-size: 2em;
    font-weight: bold;
    @media ${breakpoints.heightsQueries.minHeights.laptop} {
        margin-left: 3rem;
        margin-bottom: 1rem;
    }
`;

const SubTitle = styled.h4`
    color: ${typesColors.black};
    font-weight: normal;
    @media ${breakpoints.heightsQueries.minHeights.laptop} {
        margin-left: 3rem;
        margin-bottom: 1rem;
    }
`;
