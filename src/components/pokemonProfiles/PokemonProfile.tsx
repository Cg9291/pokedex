import { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import PokemonProfileInfo from "./PokemonProfileInfo";
import PokemonInterface from "../../interfaces/pokemonInterface";
import getPokemonData from "../../functions/api/getPokemonData";
import capitalizeWords from "../../functions/utilities/capitalizeWords";
import { useParams } from "react-router-dom";
import typesColors from "../../objects/typesColors";
import { ObjectPlaceHolderInterface, TypesColorsInt } from "../../interfaces/miscInterfaces";
import StatsContext from "../../contexts/statscontext";
import { NumOrString } from "../../interfaces/miscTypes";
import PokemonSpeciesInterface from "../../interfaces/pokemonSpeciesInterface";
import getPokemonSpeciesData from "../../functions/api/getPokemonSpeciesData";
import VitalsContext from "../../contexts/vitalscontext";

let spriteUrl: string;
let maintype: string;

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
const PokemonImg = styled.image.attrs((props) => ({
    href: spriteUrl,
    alt: "a pokemon image"
}))`
    width: 100%;
    height: 100%;
    border: solid black;
`;

const ProfileContainer = styled(ContainerPrototype)`
    max-height: 60%;
    background-color: green;
`;

export default function PokemonProfile(): JSX.Element {
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInterface | ObjectPlaceHolderInterface>({});

    const [pokemonSpeciesInfo, setPokemonSpeciesInfo] = useState<PokemonSpeciesInterface | ObjectPlaceHolderInterface>(
        {}
    );

    const { id: paramId, name: paramName } = useParams();

    async function getData(pokeId: NumOrString): Promise<[PokemonInterface, PokemonSpeciesInterface]> {
        const pokemonData = await getPokemonData(pokeId);
        const pokemonSpeciesData = await getPokemonSpeciesData(pokeId);
        setPokemonInfo(pokemonData);
        setPokemonSpeciesInfo(pokemonSpeciesData);
        console.log("info is ", pokemonSpeciesData);
        return [pokemonData, pokemonSpeciesData];
    }

    useEffect(() => {
        if (paramId) {
            getData(Number(paramId));
        } else if (paramName) {
            getData(paramName);
        }
    }, []);

    const {
        abilities,
        base_experience,
        forms,
        game_indices,
        height,
        held_items,
        id,
        is_default,
        location_area_encounters,
        moves,
        name,
        order,
        past_types,
        species,
        sprites,
        stats,
        types,
        weight
    } = pokemonInfo;

    const {
        gender_rate,
        capture_rate,
        base_happiness,
        is_baby,
        is_legendary,
        is_mythical,
        hatch_counter,
        has_gender_differences,
        forms_switchable,
        growth_rate,
        pokedex_numbers,
        egg_groups,
        color,
        shape,
        evolves_from_species,
        evolution_chain,
        habitat,
        generation,
        names,
        flavor_text_entries,
        form_descriptions,
        genera,
        varieties
    } = pokemonSpeciesInfo;

    if (sprites) {
        spriteUrl = sprites.front_default;
    }

    if (types) {
        //moved from inline to here for formatting purposes/bug
        maintype = types[0].type.name;
    }

    return (
        <Container mainType={maintype}>
            <ImageContainer>
                <PokeNumber>{id && id}</PokeNumber>
                <PokemonName>{name && capitalizeWords(name)}</PokemonName>
                {sprites && (
                    <SvgImg>
                        <PokemonImg />
                    </SvgImg>
                )}
            </ImageContainer>
            <ProfileContainer>
                <VitalsContext.Provider value={{ height, weight, color, abilities, flavor_text_entries }}>
                    <StatsContext.Provider value={stats}>
                        <PokemonProfileInfo />
                    </StatsContext.Provider>
                </VitalsContext.Provider>
            </ProfileContainer>
        </Container>
    );
}
