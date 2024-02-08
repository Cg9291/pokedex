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

    /*   const searchStatusKit = {
        searchStatus: searchStatusTracker,
        setSearchStatus: setSearchStatusTracker,
        searchStatusOptions: searchStatusOptions
    }; */
    useEffect(() => {
        console.log("changed", searchedPokemonId);
    }, [searchedPokemonId, searchStatusTracker]);

    const searchStatusOptions: readonly [string, string, string] = ["searching", "searchError", "found"];

    return (
        <ComparatorSearchModalContainer $isModalActive={props.isModalActiveKit.isModalActive.isActive} ref={modalRef}>
            <SearchModalHeader>Choose a Pokemon</SearchModalHeader>
            <Search
                usesNavigation={false}
                hasFilter={false}
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
                    />
                )}
            </ResultsSection>
        </ComparatorSearchModalContainer>
    );
}

const ComparatorSearchModalContainer = styled(ContainerPrototype)<{ $isModalActive: boolean }>`
    flex-direction: column;
    display: ${(props) => (props.$isModalActive ? "flex" : "none")};
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 12vh;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 1;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding: 2rem 1rem;
`;

const SearchModalHeader = styled.h2`
    margin-bottom: 1rem;
`;

const ResultsSection = styled.div<{ $foundPokemon?: boolean }>`
    padding: ${(props) => (props.$foundPokemon ? "1rem 25% 0" : "1rem 0 0")};
`;
const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    border-bottom-color: yellow;
    margin: 0 auto;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        max-width: 50vh;
        max-height: 50vh;
    }
`;
