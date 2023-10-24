import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import PokemonProfileInfo from "./PokemonProfileInfo";
import PokemonInterface from "../../interfaces/pokemonInterface";
import GetPokemonData from "../../functions/api/GetPokemonData";
import capitalizeWords from "../../functions/utilities/capitalizeWords";
import { useParams } from "react-router-dom";
import typesColors from "../../objects/typesColors";
import { TypesColorsInt } from "../../interfaces/miscInterfaces";
import { NumOrString } from "../../interfaces/miscTypes";
import PokemonSpeciesInterface from "../../interfaces/pokemonSpeciesInterface";
import getPokemonSpeciesData from "../../functions/api/getPokemonSpeciesData";
import VitalsContext from "../../contexts/vitalscontext";

export default function PokemonProfile(): React.ReactElement {
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInterface>();
    const [pokemonSpeciesInfo, setPokemonSpeciesInfo] = useState<PokemonSpeciesInterface>();
    const { id: paramId, name: paramName } = useParams();

    async function getData(pokeId: NumOrString): Promise<void> {
        const pokemonData = await GetPokemonData(pokeId);
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
    }, []);

    if (pokemonInfo && pokemonSpeciesInfo) {
        const { id, name, sprites, height, weight, abilities, stats, types } = pokemonInfo;
        const { color, flavor_text_entries } = pokemonSpeciesInfo;
        const AboutProps = {
            flavor_text_entries: flavor_text_entries,
            height: height,
            weight: weight,
            color: color,
            types: types,
            abilities: abilities
        };

        return (
            <Container mainType={types[0].type.name}>
                <ImageContainer>
                    <PokeNumber>{id}</PokeNumber>
                    <PokemonName>{capitalizeWords(name)}</PokemonName>
                    <SvgImg>
                        <PokemonImg href={sprites.front_default} />
                    </SvgImg>
                </ImageContainer>
                <ProfileContainer>
                    <PokemonProfileInfo AboutProps={AboutProps} />
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
`;
