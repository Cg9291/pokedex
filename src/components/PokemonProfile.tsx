import { useState, useEffect } from "react";
import styled from "styled-components";
import ContainerPrototype from "./prototypes/ContainerPrototype.tsx";
import { PokemonInfoInt } from "./types.tsx";
import getPokemonData from "../functions/api_calls/getPokemonData.tsx";
import capitalizeWords from "../functions/utilities/capitalizeWords.tsx";
import { useParams } from "react-router-dom";
import typesColors, { TypesColorsInt } from "../objects/typesColors.tsx";

const Container = styled(ContainerPrototype)<{ mainType: string }>`
	flex-direction: column;
	justify-content: center;
	background-color: ${props =>
		typesColors[props.mainType as keyof TypesColorsInt]};
`;
const ImageContainer = styled(ContainerPrototype)`
	max-height: 40%;
`;
const PokeNumber = styled.span``;
const PokemonName = styled.span``;
const SvgImg = styled.svg`
	width: 100%;
	height: 100%;
`;
const PokemonImg = styled.image`
	width: 200;
	aspect-ratio: 1/1;
`;

const ProfileContainer = styled(ContainerPrototype)`
	max-height: 60%;
`;

export default function PokemonProfile(): JSX.Element {
	const [pokemonInfo, setPokemonInfo] = useState<
		PokemonInfoInt | { [key: string]: any }
	>({});

	const paramId: number = Number(useParams().id); //review involved logic of this hook

	async function getData(pokeNumber: number): Promise<PokemonInfoInt | {}> {
		const data: PokemonInfoInt = await getPokemonData(pokeNumber);
		setPokemonInfo(data);
		return pokemonInfo;
	}

	useEffect(() => {
		getData(paramId);
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
		weight,
	} = pokemonInfo;

	return (
		<Container mainType={types && types[0].type.name}>
			<ImageContainer>
				<PokeNumber>{id && id}</PokeNumber>
				<PokemonName>{name && capitalizeWords(name)}</PokemonName>
				{sprites && (
					<SvgImg>
						<PokemonImg
							href={sprites.front_default}
							// alt="a pokemon image"
							width="325"
							height="325"
						/>
					</SvgImg>
				)}
			</ImageContainer>
			<ProfileContainer></ProfileContainer>
		</Container>
	);
}
