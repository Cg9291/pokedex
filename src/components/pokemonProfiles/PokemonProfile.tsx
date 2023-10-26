import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import PokemonInterface from "../../interfaces/pokemonInterface";
import getPokemonData from "../../functions/api/getPokemonData";
import capitalizeWords from "../../functions/utilities/capitalizeWords";
import { useParams } from "react-router-dom";
import typesColors from "../../objects/typesColors";
import {
    AboutComponentProps,
    BaseStatsComponentProps,
    EvolutionComponentProps,
    MovesComponentProps,
    TypesColorsInt
} from "../../interfaces/miscInterfaces";
import { NumOrString } from "../../interfaces/miscTypes";
import PokemonSpeciesInterface from "../../interfaces/pokemonSpeciesInterface";
import getPokemonSpeciesData from "../../functions/api/getPokemonSpeciesData";
import { displayFormattedId } from "../../functions/utilities/displayFormattedId";
import { PokemonProfilesNavElementsInterface } from "../../interfaces/miscInterfaces";
import NavElement from "./NavElement";
import Moves from "./profileNavBodies/Moves";
import Evolution from "./profileNavBodies/Evolution";
import BaseStats from "./profileNavBodies/BaseStats";
import About from "./profileNavBodies/About";

export default function PokemonProfile(): React.ReactElement {
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInterface>();
    const [pokemonSpeciesInfo, setPokemonSpeciesInfo] = useState<PokemonSpeciesInterface>();
    const [navElementsNames, setNavElementsNames] = useState<PokemonProfilesNavElementsInterface>();
    const { id: paramId, name: paramName } = useParams();

    async function getData(pokeId: NumOrString): Promise<void> {
        const pokemonData = await getPokemonData(pokeId);
        const pokemonSpeciesData = await getPokemonSpeciesData(pokeId);
        setPokemonInfo(pokemonData);
        setPokemonSpeciesInfo(pokemonSpeciesData);
        return;
    }

    useEffect(() => {
        if (paramId) {
            getData(Number(paramId));
        } else if (paramName) {
            getData(paramName);
        }
    }, [paramId, paramName]);

    const setNavNames = async (
        A: AboutComponentProps,
        B: BaseStatsComponentProps,
        E: EvolutionComponentProps,
        M: MovesComponentProps
    ) => {
        if (pokemonInfo && pokemonSpeciesInfo) {
            await setNavElementsNames({
                About: { isFocused: true, element: <About ownProps={A} /> },
                "Base Stats": {
                    isFocused: false,
                    element: <BaseStats ownProps={B} />
                },
                Evolution: { isFocused: false, element: <Evolution ownProps={E} /> },
                Moves: { isFocused: false, element: <Moves ownProps={M} /> }
            });
        }
    };

    const displayNavBody = (): React.ReactNode => {
        //maybe review this function
        if (navElementsNames) {
            const focusedElement: string | undefined = Object.keys(navElementsNames).find(
                (key: string) => navElementsNames[key as keyof PokemonProfilesNavElementsInterface].isFocused
            );
            if (!focusedElement) {
                throw new Error("find() has not found!");
            }
            return navElementsNames[focusedElement as keyof PokemonProfilesNavElementsInterface].element;
        }
    };

    const displayNavHeaders = (): React.ReactElement[] => {
        if (navElementsNames) {
            return Object.keys(navElementsNames).map(
                (key: string): React.ReactElement => (
                    <NavElement
                        value={key}
                        navElementsNames={navElementsNames}
                        setNavElementsNames={setNavElementsNames}
                    />
                )
            );
        } else {
            throw new Error("No nav elements");
        }
    };

    if (pokemonInfo && pokemonSpeciesInfo) {
        const { id, name, sprites, height, weight, abilities, stats, types, moves } = pokemonInfo;
        const { color, evolution_chain, flavor_text_entries } = pokemonSpeciesInfo;

        const myProps = {
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

        setNavNames(myProps.AboutProps, myProps.BaseStatsProps, myProps.EvolutionProps, myProps.MovesProps);

        return (
            <Container mainType={types[0].type.name}>
                <ImageContainer>
                    <PokeNumber>{displayFormattedId(id)}</PokeNumber>
                    <PokemonName>{capitalizeWords(name)}</PokemonName>
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
        return <Container mainType="none">Loading</Container>;
    }
}

const Container = styled(ContainerPrototype)<{ mainType: string }>`
    flex-direction: column;
    justify-content: center;
    background-color: ${(props) => typesColors[props.mainType as keyof TypesColorsInt]};
    z-index: 0;
    position: relative;
    overflow-y: hidden;
`;
const ImageContainer = styled(ContainerPrototype)`
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    max-height: 40%;
`;

const PokeNumber = styled.span``;
const PokemonName = styled.span``;

const SvgImg = styled.svg`
    width: 100%;
    height: 50%;
`;
const PokemonImg = styled.image`
    width: 100%;
    height: 100%;
    border: solid black;
`;

const ProfileContainer = styled(ContainerPrototype)`
    max-height: 60%;
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
    position: absolute;
    background-color: inherit;
`;

const InfoNavBody = styled(ContainerPrototype)`
    //height: fit-content;
    max-height: 20rem;
    margin-top: 10%;
    overflow-y: scroll;
    padding: 0 1rem;
    background-color: rgba(0, 0, 0, 0.03);
`;
