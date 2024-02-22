import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { PokemonInterface } from "../interfaces/pokemonInterface";
import { PokemonSpeciesInterface } from "../interfaces/pokemonSpeciesInterface";
import { getPokemonData } from "../functions/api/singleApiCalls/getPokemonData";
import { capitalizeWords } from "../functions/utilities/capitalizeWords";
import { useNavigate, useParams } from "react-router-dom";
import { typesColors } from "../objects/typesColors";
import { TypesColorsInt } from "../interfaces/miscInterfaces";
import { NumOrString } from "../interfaces/miscTypes";
import { getPokemonSpeciesData } from "../functions/api/singleApiCalls/getPokemonSpeciesData";
import { displayFormattedId } from "../functions/utilities/displayFormattedId";
import { AxiosError } from "axios";
import { PokemonProfilesNavElementsInterface } from "../interfaces/miscInterfaces";
import { NavElement } from "../components/pokemonProfiles/NavElement";
import { Moves } from "../components/pokemonProfiles/profileNavBodies/Moves";
import { Evolution } from "../components/pokemonProfiles/profileNavBodies/Evolution";
import { BaseStats } from "../components/pokemonProfiles/profileNavBodies/BaseStats";
import { About } from "../components/pokemonProfiles/profileNavBodies/About";
import { profileTabsPropsInterface } from "../interfaces/miscInterfaces";
import { LoadingSpinnerPrototype } from "../components/prototypes/LoadingSpinnerPrototype";
import { HeartIcon } from "../assets/heartIcon";
import {
    addPokemonToFavorites,
    isPokemonFavorited,
    removePokemonFromFavorites
} from "../functions/utilities/useLocalStorage";
import * as breakpoints from "../objects/breakpoints";

export function PokemonProfile(): React.ReactElement {
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInterface>();
    const [pokemonSpeciesInfo, setPokemonSpeciesInfo] = useState<PokemonSpeciesInterface>();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [navElementsNames, setNavElementsNames] = useState<PokemonProfilesNavElementsInterface>({
        About: { isFocused: true },
        "Base Stats": {
            isFocused: false
        },
        Evolution: { isFocused: false },
        Moves: { isFocused: false }
    });

    const { id: paramId, name: paramName } = useParams();
    const navigate = useNavigate();

    let profileTabsProps: profileTabsPropsInterface;

    useEffect(() => {
        if (paramId) {
            getData(Number(paramId));
        } else if (paramName) {
            getData(paramName);
        }
    }, [paramId, paramName]);

    useEffect(() => {
        setNavNames(profileTabsProps);
        pokemonInfo && setIsFavorite(isPokemonFavorited(Number(pokemonInfo.id)));
    }, [pokemonInfo, pokemonSpeciesInfo]);

    async function getData(pokeId: NumOrString): Promise<void> {
        try {
            const pokemonData = await getPokemonData(pokeId);
            const pokemonSpeciesData = await getPokemonSpeciesData(pokeId);
            setPokemonInfo(pokemonData);
            setPokemonSpeciesInfo(pokemonSpeciesData);
        } catch (err) {
            if (err instanceof AxiosError && err.response?.status === 404) {
                navigate(`/pokemon-not-found`);
            }
        }
        return;
    }

    const setNavNames = (tabProps: profileTabsPropsInterface) => {
        if (pokemonInfo && pokemonSpeciesInfo) {
            setNavElementsNames({
                About: { isFocused: true, element: <About ownProps={tabProps.AboutProps} /> },
                "Base Stats": {
                    isFocused: false,
                    element: <BaseStats pokemonStatsProps={tabProps.BaseStatsProps} />
                },
                Evolution: { isFocused: false, element: <Evolution ownProps={tabProps.EvolutionProps} /> },
                Moves: { isFocused: false, element: <Moves ownProps={tabProps.MovesProps} /> }
            });
        } else return;
    };

    const displayNavBody = (): React.ReactNode => {
        const focusedElement = Object.keys(navElementsNames).find(
            (key: string): boolean => navElementsNames[key as keyof PokemonProfilesNavElementsInterface].isFocused
        );
        if (!focusedElement) {
            throw new Error("find() has not found!");
        }
        return navElementsNames[focusedElement as keyof PokemonProfilesNavElementsInterface].element;
    };

    const displayNavHeaders = (): React.ReactElement[] | React.ReactElement => {
        return Object.keys(navElementsNames).map(
            (objectKey: string): React.ReactElement => (
                <NavElement
                    value={objectKey}
                    navElementsNames={navElementsNames}
                    setNavElementsNames={setNavElementsNames}
                    key={objectKey}
                />
            )
        );
    };

    if (pokemonInfo && pokemonSpeciesInfo) {
        const { id, name, sprites, height, weight, abilities, stats, types, moves } = pokemonInfo;
        const { color, evolution_chain, flavor_text_entries } = pokemonSpeciesInfo;

        profileTabsProps = {
            AboutProps: {
                flavor_text_entries: flavor_text_entries,
                height: height,
                weight: weight,
                color: color,
                types: types,
                abilities: abilities
            },
            BaseStatsProps: {
                stats: stats
            },
            EvolutionProps: { evolution_chain: evolution_chain },
            MovesProps: { moves: moves }
        };

        return (
            <Container>
                <ImageWrapper $mainType={types[0].type.name}>
                    <PokeNumber>{displayFormattedId(id)}</PokeNumber>
                    <PokemonName>{capitalizeWords(name)}</PokemonName>
                    <HeartIcon id={id} />
                    <ImageContainer viewBox="0 0 100 100 ">
                        <PokemonImage href={sprites.front_default} />
                    </ImageContainer>
                </ImageWrapper>
                <ProfileContainer>
                    <PokemonProfileInfoContainer>
                        <InfoNavBar>{displayNavHeaders()}</InfoNavBar>
                        <InfoNavBody>{displayNavBody()}</InfoNavBody>
                    </PokemonProfileInfoContainer>
                </ProfileContainer>
            </Container>
        );
    } else {
        return (
            <Container>
                <LoadingAnimation />
            </Container>
        );
    }
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    flex: 1 0 0;
    overflow: hidden;
`;
const ImageWrapper = styled(ContainerPrototype)<{ $mainType: string }>`
    display: grid;
    grid-template-columns: 3rem 1fr 3rem;
    grid-template-rows: 2rem auto 1fr;
    grid-template-areas:
        ". pokenumber status"
        ". pokename ."
        "pokeimage pokeimage pokeimage";
    background-image: ${(props) =>
        `linear-gradient(${typesColors[props.$mainType as keyof TypesColorsInt]},65%, white 95%)`};
    flex-direction: column;
    align-items: center;
    max-height: 40%;
`;

const PokeNumber = styled.span`
    grid-area: pokenumber;
    margin-right: auto;
    margin-left: auto;
    align-self: end;
`;
const PokemonName = styled.span`
    grid-area: pokename;
    margin: auto;
    font-size: 1.5rem;
`;

const ImageContainer = styled.svg`
    width: 100%;
    height: 100%;
    grid-area: pokeimage;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
    }
`;

const PokemonImage = styled.image`
    width: 100%;
    height: 100%;
    border: solid black;
`;

const ProfileContainer = styled(ContainerPrototype)``;

const PokemonProfileInfoContainer = styled(ContainerPrototype)`
    flex-direction: column;
`;

const InfoNavBar = styled(ContainerPrototype)`
    padding: 0 1rem;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    flex: 0 0 10%;
`;

const InfoNavBody = styled(ContainerPrototype)`
    overflow-y: scroll;
    padding: 0 1rem;
    flex: 1 0 0;
`;

const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    border-bottom-color: yellow;
    margin: auto;

    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        max-width: 50vh;
    }
`;
