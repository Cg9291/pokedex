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
                        whereUsed="searchmodal"
                        setSearchedPokemonId={setSearchedPokemonId}
                    />
                )}
            </ResultsSection>
        </Container>
    );
}

const Container = styled(ContainerPrototype)<{ $isModalActive: boolean }>`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 12% 50%;
    grid-template-areas:
        "header"
        "searchBar"
        "results";
    display: ${(props) => (props.$isModalActive ? "grid" : "none")};
    position: fixed;
    top: 12vh;
    background-color: white;
    z-index: 1;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding: 2rem 1rem;
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
`;

const SearchModalHeader = styled.h2`
    text-align: center;
    font-size: 2.2rem;
    grid-area: header;
`;

const ResultsSection = styled.div<{ $foundPokemon?: boolean }>`
    display: flex;
    align-items: center;
    padding: ${(props) => (props.$foundPokemon ? "8vh 16vw" : "1rem 0 0")};
    background-color: rgba(122, 122, 122, 0.1);
    border-radius: 1rem;
    margin: 1rem 0;
    grid-area: results;
    box-sizing: border-box;
    overflow-y: hidden;

    /*  @media ${breakpoints.heightsQueries.minHeights.flexible("700px")} {
        margin: 1rem 0 5rem;
    }
    @media ${breakpoints.heightsQueries.minHeights.flexible("800px")} {
        margin: 1rem 0 5.5rem;
    } */
`;
const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    border-bottom-color: yellow;
    margin: 0 auto;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        max-width: 50vh;
        max-height: 50vh;
    }
`;
