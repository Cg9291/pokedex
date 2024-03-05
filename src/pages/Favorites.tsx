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
            <PokemonPictureCard id={number} key={index} isLink={true} whereUsed="favorites" />
        ));

    return (
        <Container>
            <Wrapper>
                <Title>Favorites</Title>
                <SubTitle>
                    This is a list of your favorite pokemons!
                    <br />
                    Number of favorite pokemons: {numberOfFavoritedPokemons}
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
    flex: 1 0 0;
    overflow: hidden;
    padding: 0 1rem;
    @media (orientation: landscape) {
        padding-bottom: 11vh;
    }
`;

const Wrapper = styled(ContainerPrototype)`
    flex-direction: column;
    flex: 1 0 0;
    background-color: white;
    overflow: hidden;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        position: relative;
        padding: 0 5vw;
    }
`;
const FavoritesContainer = styled(ContainerPrototype)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: max-content;
    gap: 2vh;
    padding: 2vh 0;
    overflow-y: scroll;
    flex: 1 0 0;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        grid-auto-rows: 20vh;
    }

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        column-gap: 3rem;
        padding: 3vh 3vw;
    }

    @media (orientation: landscape) {
        grid-auto-rows: 35vh;
    }
`;

const Title = styled.h1`
    color: ${typesColors.black};
    font-size: 3em;
    font-weight: bold;
    flex: 0 0 content;
    overflow: hidden;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        margin-left: 0.7rem;
        margin-bottom: 0.2rem;
        //padding-top: 1rem;
        font-size: 4rem;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        margin-left: unset;
        margin-bottom: 0.2rem;
        padding-top: 0;
        font-size: 5em;
    }
`;

const SubTitle = styled.h4`
    color: ${typesColors.black};
    font-size: 1.1em;
    //margin-bottom: 0.1rem;
    font-weight: normal;
    flex: 0 0 content;
    overflow: hidden;

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        margin-left: 0.7rem;
        margin-bottom: 0.2rem;
        //padding-top: 1rem;
        font-size: 1.4em;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        margin: 0;
        font-size: 1.6em;
    }
`;
