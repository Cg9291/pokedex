import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/macro";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import { LoadingSpinnerPrototype } from "../prototypes/LoadingSpinnerPrototype";
import { PokemonPictureCard } from "../homepage/pokemonPictureCards/PokemonPictureCard";
import { PokemonNotFound } from "../../pages/PokemonNotFound";
import { handleOutsideClicks } from "../../functions/utilities/handleOutsideClicks";
import { IsModalActiveInterface } from "../../interfaces/comparatorInterfaces";
import { ComparatorPokemonInfoInterface } from "../../interfaces/comparatorInterfaces";
import { Search } from "../homepage/header/search/Search";
import * as breakpoints from "../../objects/breakpoints";
import { whereUsedValues } from "../../objects/whereUsedValues";

export interface ComparatorPokemonSearchModalInterface {
    isModalActiveKit: IsModalActiveKitInterface;
    pokemonImagesKit: PokemonImagesKitInterface;
}

export interface IsModalActiveKitInterface {
    isModalActive: IsModalActiveInterface;
    setIsModalActive: React.Dispatch<React.SetStateAction<IsModalActiveInterface>>;
}

export interface PokemonImagesKitInterface {
    pokemonImages: ComparatorPokemonDataInterface;
    setPokemonImages: React.Dispatch<React.SetStateAction<ComparatorPokemonDataInterface>>;
}

export interface ComparatorPokemonDataInterface {
    topPokemon: ComparatorPokemonInfoInterface;
    bottomPokemon: ComparatorPokemonInfoInterface;
}

export function ComparatorsPokemonSearchModal(props: ComparatorPokemonSearchModalInterface): React.ReactElement {
    const [searchedPokemonId, setSearchedPokemonId] = useState<string | number | null>(null);
    const [searchStatusTracker, setSearchStatusTracker] = useState<string>("");
    const modalRef = useRef<HTMLDivElement>(null);
    handleOutsideClicks(modalRef, props.isModalActiveKit.setIsModalActive);

    /*  useEffect(() => {
        console.log("changed", searchedPokemonId);
    }, [searchedPokemonId, searchStatusTracker]); */

    const searchStatusOptions: readonly [string, string, string] = ["searching", "searchError", "found"];

    return (
        <Container $isModalActive={props.isModalActiveKit.isModalActive.isActive} ref={modalRef}>
            <SearchModalHeader>Choose a Pokemon</SearchModalHeader>
            <Search
                usesNavigation={false}
                hasFilter={false}
                searchedPokemonId={searchedPokemonId}
                isModalActiveKit={props.isModalActiveKit}
                setSearchedPokemonId={setSearchedPokemonId}
                setSearchStatusTracker={setSearchStatusTracker}
            />
            <ResultsSection $foundPokemon={searchedPokemonId ? true : false}>
                {searchStatusTracker === searchStatusOptions[0] && <LoadingAnimation />}
                {searchStatusTracker === searchStatusOptions[1] && <PokemonNotFound />}
                {searchedPokemonId && searchStatusTracker === searchStatusOptions[2] && (
                    <PokemonPictureCard
                        id={searchedPokemonId}
                        pokemonImagesKit={props.pokemonImagesKit}
                        isModalActiveKit={props.isModalActiveKit}
                        isLink={false}
                        whereUsed={whereUsedValues.searchModal}
                        setSearchedPokemonId={setSearchedPokemonId}
                    />
                )}
            </ResultsSection>
        </Container>
    );
}

const Container = styled(ContainerPrototype)<{ $isModalActive: boolean }>`
    grid-template-columns: 1fr;
    grid-template-rows: min-content 12% 1rem 1fr; //flex basis of empty row should equal that of padding
    grid-template-areas:
        "header"
        "searchBar"
        "emptyRow"
        "results";
    display: ${(props) => (props.$isModalActive ? "grid" : "none")};
    position: absolute;
    background-color: white;
    z-index: 1;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding: 1rem;
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    height: 85%;
    bottom: 0;
    @media (orientation: landscape) {
        z-index: 15;
    }
`;

const SearchModalHeader = styled.h2`
    text-align: center;
    font-size: 2.2rem;
    grid-area: header;
`;

const ResultsSection = styled(ContainerPrototype)<{ $foundPokemon?: boolean }>`
    align-items: center;
    padding: 0 5vw;
    background-color: rgba(122, 122, 122, 0.1);
    border-radius: 1rem;
    grid-area: results;
    box-sizing: border-box;
    overflow-y: hidden;
    align-self: center;

    @media (orientation: landscape) {
        padding-inline: 20vw;
    }
`;
const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    border-bottom-color: yellow;
    margin: 0 auto;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        max-width: 50vh;
        max-height: 50vh;
    }
`;
