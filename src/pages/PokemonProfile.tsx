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

    const favoriteHandler = (id: number) => {
        if (isPokemonFavorited(id)) {
            removePokemonFromFavorites(id);
            setIsFavorite(false);
        } else {
            addPokemonToFavorites(id);
            setIsFavorite(true);
        }

        console.log("is this pokemon in favs? ", isPokemonFavorited(id));
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
                <ImageContainer $mainType={types[0].type.name}>
                    <PokeNumber>{displayFormattedId(id)}</PokeNumber>
                    <PokemonName>
                        {capitalizeWords(name)}
                        <p
                            onClick={() => {
                                favoriteHandler(id);
                            }}
                        >
                            <HeartIcon favorite={isFavorite} />
                        </p>
                    </PokemonName>
                    <SvgImg>
                        <PokemonImg href={sprites.front_default} />
                    </SvgImg>
                </ImageContainer>
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
    justify-content: center;
    align-items: center;
    z-index: 0;
    position: relative;
    overflow-y: hidden;
`;
const ImageContainer = styled(ContainerPrototype)<{ $mainType: string }>`
    background-image: ${(props) =>
        `linear-gradient(${typesColors[props.$mainType as keyof TypesColorsInt]},65%, white 95%)`};
    flex-direction: column;
    align-items: center;
    // justify-content: space-around;
    max-height: 40%;
`;

const PokeNumber = styled.span``;
const PokemonName = styled.span``;

const SvgImg = styled.svg`
    width: 100%;
    height: 100%;
`;
const PokemonImg = styled.image`
    width: 100%;
    height: 100%;
    border: solid black;
`;

const ProfileContainer = styled(ContainerPrototype)`
    overflow-y: hidden;
    padding-bottom: 9%;
`;

const PokemonProfileInfoContainer = styled(ContainerPrototype)`
    flex-direction: column;
    z-index: 1;
    height: 62%;
    top: 38%;
    background-color: white;
    position: absolute;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
`;

const InfoNavBar = styled(ContainerPrototype)`
    height: 10%;
    padding: 0 1rem;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    //position: absolute;
    background-color: inherit;
`;

const InfoNavBody = styled(ContainerPrototype)`
    //max-height: 20rem;
    //margin-top: 10%;
    overflow-y: scroll;
    padding: 0 1rem;
    //background-color: rgba(0, 0, 0, 0.03);
`;

const LoadingAnimation = styled(LoadingSpinnerPrototype)`
    border-bottom-color: yellow;
`;
