import { useState, useEffect } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";
import PokemonProfileInfo from "./PokemonProfileInfo.tsx";
import PokemonInterface from "../../interfaces&types/pokemonInterface.tsx";
import getPokemonData from "../../functions/api_calls/getPokemonData.tsx";
import capitalizeWords from "../../functions/utilities/capitalizeWords.tsx";
import { useParams } from "react-router-dom";
import typesColors from "../../objects/typesColors.tsx";
import {
	ObjectPlaceHolderInterface,
	TypesColorsInt,
} from "../../interfaces&types/misc_Interfaces.tsx";
import StatsContext from "../../contexts/statsContext.tsx";
import { NumOrString } from "../../interfaces&types/misc_Types.tsx";
import PokemonSpeciesInterface from "../../interfaces&types/pokemonSpeciesInterface.tsx";
import getPokemonSpeciesData from "../../functions/api_calls/getPokemonSpeciesData.tsx";
import VitalsContext from "../../contexts/vitalsContext.tsx";
import EvolutionChainContext from "../../contexts/evolutionChainContext.tsx";
import MovesContext from "../../contexts/movesContext.tsx";

let spriteUrl: string;
let maintype: string;

const Container = styled(ContainerPrototype)<{ $mainType: string }>`
	//mainType is written with a $ because otherwiswe compiler confuses it with a dom attribute because it has a capital letter
	flex-direction: column;
	justify-content: center;
	background-color: ${props =>
		typesColors[props.$mainType as keyof TypesColorsInt]};
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
const PokemonImg = styled.image.attrs(props => ({
	href: spriteUrl,
	alt: "a pokemon image",
}))`
	width: 100%;
	height: 100%;
	border: solid black;
`;

const ProfileContainer = styled(ContainerPrototype)`
	max-height: 60%;
	overflow-y:hidden;
`;

export default function PokemonProfile(): JSX.Element {
	const [pokemonInfo, setPokemonInfo] = useState<
		PokemonInterface | ObjectPlaceHolderInterface
	>({});

	const [pokemonSpeciesInfo, setPokemonSpeciesInfo] = useState<
		PokemonSpeciesInterface | ObjectPlaceHolderInterface
	>({});

	const { id: paramId, name: paramName } = useParams();

	async function getData(
		pokeId: NumOrString,
	): Promise<
		[PokemonInterface, PokemonSpeciesInterface] | ObjectPlaceHolderInterface
	> {
		try {
			const pokemonData = await getPokemonData(pokeId);
			const pokemonSpeciesData = await getPokemonSpeciesData(pokeId);
			setPokemonInfo(pokemonData);
			setPokemonSpeciesInfo(pokemonSpeciesData);
		} catch (err) {
			console.log(err);
		}
		return [pokemonInfo, pokemonSpeciesInfo];
	}

	useEffect(() => {
		if (paramId) {
			getData(Number(paramId));
		} else if (paramName) {
			getData(paramName);
		}
	}, []);

	const { abilities, height, id, moves, name, sprites, stats, types, weight } =
		pokemonInfo;

	const { color, evolution_chain, flavor_text_entries } = pokemonSpeciesInfo;

	if (sprites) {
		spriteUrl = sprites.front_default;
	}

	if (types) {
		//moved from inline to here for formatting purposes/bug
		maintype = types[0].type.name;
	}

	console.log(moves);

	return (
		<Container $mainType={maintype}>
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
				<VitalsContext.Provider
					value={{
						height,
						weight,
						color,
						abilities,
						types,
						flavor_text_entries,
					}}
				>
					<StatsContext.Provider value={stats}>
						<EvolutionChainContext.Provider value={evolution_chain}>
							<MovesContext.Provider value={moves}>
								<PokemonProfileInfo />
							</MovesContext.Provider>
						</EvolutionChainContext.Provider>
					</StatsContext.Provider>
				</VitalsContext.Provider>
			</ProfileContainer>
		</Container>
	);
}
