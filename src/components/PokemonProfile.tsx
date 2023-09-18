import { useState, useEffect } from "react";
import styled from "styled-components";
import ContainerPrototype from "./prototypes/ContainerPrototype";
import { PokemonNumber } from "./types";
import getPokemonData from "../functions/api_calls/getPokemonData";
import capitalizeWords from "../functions/utilities/capitalizeWords";
import { useParams } from "react-router-dom";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
	justify-content: center;
	background-color: red;
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

export default function PokemonProfile(props: PokemonNumber): JSX.Element {
	const [pokemonInfo, setPokemonInfo] = useState<{ [key: string]: any }>({});

	const paramId = useParams().id; //review involved logic of this hook

	async function getData(pokeNumber: number): void {
		const data: PokemonInfo = await getPokemonData(pokeNumber);
		setPokemonInfo(data);
	}

	useEffect(() => {
		getData(paramId);
		console.log(paramId);
	}, [paramId]);

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
		<Container>
			<ImageContainer>
				<PokeNumber>{id && id}</PokeNumber>
				<PokemonName>{name && capitalizeWords(name)}</PokemonName>
				{sprites && (
					<SvgImg>
						<PokemonImg
							href={sprites.front_default}
							alt="a pokemon image"
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
