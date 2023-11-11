import React from "react";
import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";

export function Comparator(): React.ReactElement {
    const pokemonImages: { topImg: string; bottomImg: string } = {
        topImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
        bottomImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    };

    /* const randomizeButtonImage =
        "https://cdn4.iconfinder.com/data/icons/game-design-flat-icons-2/512/13_dice_roll_random_game_design_flat_icon-512.png";
 */ // [NOTE!] To be used later

    return (
        <Container>
            <Header>
                <HeaderTitle>Comparator</HeaderTitle>
                <HeaderDescription>Select the two Pokemon that you would like to compare.</HeaderDescription>
            </Header>
            <ComparatorBody>
                <ComparatorPokemonCards imgUrl={pokemonImages.topImg} />
                <RandomizeButton></RandomizeButton>
                <ComparatorPokemonCards imgUrl={pokemonImages.bottomImg} />
                <CompareButton> COMPARE!</CompareButton>
            </ComparatorBody>
        </Container>
    );
}

function ComparatorPokemonCards(props: { imgUrl: string }): React.ReactElement {
    return (
        <ComparatorPokemonCardsContainer>
            <PokemonImg src={props.imgUrl} />
        </ComparatorPokemonCardsContainer>
    );
}

const Container = styled(ContainerPrototype)`
    padding: 0 1rem;
    flex-direction: column;
`;

const Header = styled(ContainerPrototype)`
    height: max-content;
    flex-direction: column;
    margin-bottom: 1.5rem;
`;

const HeaderTitle = styled.h1`
    margin-bottom: 0.5rem;
`;

const HeaderDescription = styled.p`
    min-height: fit-content;
`;

const ComparatorBody = styled(ContainerPrototype)`
    flex-direction: column;
    align-items: center;
`;

const ComparatorPokemonCardsContainer = styled(ContainerPrototype)`
    height: 30%;
    background-color: lightgrey;
    justify-content: center;
    border-radius: 12px;
    align-items: center;
`;

const PokemonImg = styled.img`
    width: 9rem;
    aspect-ratio: 1/1;
`;

const CompareButton = styled.button.attrs({ type: "button" })`
    height: 3rem;
    width: 100%;
    background-color: gold;
    border-radius: 15px;
    border: none;
    font-weight: 600;
    font-size: 1.2em;
    margin-top: 1rem;
`;

const RandomizeButton = styled.button.attrs({ type: "button" })`
    width: 3rem;
    aspect-ratio: 1/1;
    margin: -0.9rem 0;
    z-index: 1;
    border-radius: 50%;
    background-color: white;
    border: none;
`;
