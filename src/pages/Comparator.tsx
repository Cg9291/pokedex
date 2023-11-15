import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { getPokemonData } from "../functions/api/singleApiCalls/getPokemonData";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";

export function Comparator(): React.ReactElement {
    const [modalIsActive, setModalIsActive] = useState<boolean>(false);
    const pokemonImages: { topImg: string; bottomImg: string } = {
        topImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
        bottomImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    };

    /* const randomizeButtonImage =
        "https://cdn4.iconfinder.com/data/icons/game-design-flat-icons-2/512/13_dice_roll_random_game_design_flat_icon-512.png";
 */ // [NOTE!] To be used later

    return (
        <Container isActive={modalIsActive}>
            <Header>
                <HeaderTitle>Comparator</HeaderTitle>
                <HeaderDescription>Select the two Pokemon that you would like to compare.</HeaderDescription>
            </Header>
            <ComparatorBody>
                <ComparatorPokemonCards imgUrl={pokemonImages.topImg} setModalIsActive={setModalIsActive} />
                <RandomizeButton></RandomizeButton>
                <ComparatorPokemonCards imgUrl={pokemonImages.bottomImg} setModalIsActive={setModalIsActive} />
                <CompareButton> COMPARE!</CompareButton>
            </ComparatorBody>
            <ComparatorPokemonSearchModal isActive={modalIsActive} setModalIsActive={setModalIsActive} />
        </Container>
    );
}

function ComparatorPokemonCards(props: {
    imgUrl: string;
    setModalIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement {
    return (
        <ComparatorPokemonCardsContainer>
            <ChangeSelectionButton onFocus={() => props.setModalIsActive(true)}>Switch</ChangeSelectionButton>
            <PokemonImg src={props.imgUrl} />
        </ComparatorPokemonCardsContainer>
    );
}

function ComparatorPokemonSearchModal(props: {
    isActive: boolean;
    setModalIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement {
    const [searchedPokemonId, setSearchedPokemonId] = useState<number>();

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const transmittedData = Object.fromEntries(formData.entries()).searchInput;
        const name = transmittedData.toString().toLowerCase();
        const pokemonData = await getPokemonData(name);
        await setSearchedPokemonId(pokemonData.id);
        return;
    };

    return (
        <ComparatorSearchModalContainer isActive={props.isActive} onBlur={() => props.setModalIsActive(false)}>
            {/* [NOTE]theonblur attribute is a quick fix(partial) for focus loss detection,will update */}
            <SearchModalHeader>Choose a Pokemon</SearchModalHeader>
            <Form onSubmit={handleSearch}>
                <Label>
                    <Input />
                </Label>
            </Form>
            {searchedPokemonId && <PokemonPictureCard id={searchedPokemonId} />}
        </ComparatorSearchModalContainer>
    );
}

const Container = styled(ContainerPrototype)<{ isActive: boolean }>`
    padding: 0 1rem;
    flex-direction: column;
    background-color: ${(props) => (props.isActive ? `rgba(0, 0, 0, 0.4)` : "inherit")};
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

const ChangeSelectionButton = styled.button.attrs({ type: "button" })`
    //Will review
    position: absolute;
    width: fit-content;
    aspect-ratio: 1/1;
    margin-left: -80%;
`;

const ComparatorSearchModalContainer = styled(ContainerPrototype)<{ isActive: boolean }>`
    flex-direction: column;
    display: ${(props) => (props.isActive ? "flex" : "none")};
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 7vh;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 1;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding: 2rem 1rem;
`;

const SearchModalHeader = styled.h2``;

const Form = styled.form.attrs({
    method: "get"
})`
    width: 100%;
    display: flex;
`;

const Label = styled.label`
    flex: 3 0 85%;
`;

const Input = styled.input.attrs({
    placeholder: "Search a Pokemon",
    name: "searchInput"
})`
    width: 100%;
    height: 3rem;
    border-radius: 99px;
    margin-top: 1rem;
    padding-left: 1rem;
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
