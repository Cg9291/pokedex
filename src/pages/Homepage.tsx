import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { Header } from "../components/homepage/header/Header";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import React, { useState } from "react";
import { pickRandomPokemonNumbers } from "../functions/utilities/pickRandomPokemonNumbers";
import { FilteredSearchModal } from "../components/homepage/FilteredSearchModal";

export function Homepage(): React.ReactElement {
    const [randomPokemonSelection, setRandomPokemonSelection] = useState<number[]>(pickRandomPokemonNumbers());
    const [isFilterModalActive, setIsFilterModalActive] = useState<boolean>(false);

    const mapPictureCards = (): React.ReactElement[] =>
        randomPokemonSelection.map((number, index) => <PokemonPictureCard id={number} isLink={true} key={index} />);

    return (
        <Container>
            <Header
                randomPokemonSelection={randomPokemonSelection}
                setRandomPokemonSelection={setRandomPokemonSelection}
                FiltersModalStatus={{ setIsFilterModalActive }}
            />
            <MainContainer>
                {mapPictureCards()} {isFilterModalActive && <FilteredSearchModal />}
            </MainContainer>
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
    height: 400px;
    padding: 1vh 1vw;
    margin-top: 13rem;
`;
