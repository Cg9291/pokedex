import React, { useState, useRef } from "react";
import { AxiosError } from "axios";
import styled from "styled-components/macro";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import { LoadingSpinnerPrototype } from "../prototypes/LoadingSpinnerPrototype";
import { PokemonPictureCard } from "../homepage/pokemonPictureCards/PokemonPictureCard";
import { PokemonNotFound } from "../../pages/PokemonNotFound";
import { getPokemonData } from "../../functions/api/singleApiCalls/getPokemonData";
import { handleOutsideClicks } from "../../functions/utilities/handleOutsideClicks";
import { IsModalActiveInterface } from "../../interfaces/comparatorInterfaces";
import { ComparatorPokemonInfoInterface } from "../../interfaces/comparatorInterfaces";

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
    const [searchedPokemonId, setSearchedPokemonId] = useState<number | null>(null);
    const [searchError, setSearchError] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);
    handleOutsideClicks(modalRef, props.isModalActiveKit.setIsModalActive);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const transmittedData = Object.fromEntries(formData.entries()).searchInput;
        const name = transmittedData.toString().toLowerCase();

        searchError && setSearchError(false);
        searchedPokemonId && setSearchedPokemonId(null);

        try {
            setIsSearching(true);
            const pokemonData = await getPokemonData(name);
            setSearchedPokemonId(pokemonData.id);
        } catch (err) {
            if (err instanceof AxiosError && err.response?.status === 404) {
                setSearchError(true);
            }
        } finally {
            setIsSearching(false);
        }
        return;
    };

    return (
        <ComparatorSearchModalContainer $isModalActive={props.isModalActiveKit.isModalActive.isActive} ref={modalRef}>
            <SearchModalHeader>Choose a Pokemon</SearchModalHeader>
            <Form onSubmit={handleSearch}>
                <Label>
                    <Input required />
                </Label>
            </Form>
            <ResultsSection $foundPokemon={searchedPokemonId ? true : false}>
                {isSearching && <LoadingAnimation />}
                {searchError && <PokemonNotFound />}
                {searchedPokemonId && (
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

const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    border-bottom-color: green;
`;

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
const SearchModalHeader = styled.h2``;

const ResultsSection = styled.div<{ $foundPokemon?: boolean }>`
    padding: ${(props) => (props.$foundPokemon ? "1rem 25% 0" : "1rem 0 0")};
`;
