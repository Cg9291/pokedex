import { useContext, useEffect, useState } from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype.tsx";
import styled from "styled-components";
import EvolutionChainContext from "../../../contexts/evolutionChainContext.tsx";
import getPokemonEvolutionChainData from "../../../functions/apiCalls/getPokemonEvolutionChainData.tsx";
import PokemonEvolutionChainInterface from "../../../interfacesAndTypes/pokemonEvolutionChainInterface.tsx";
import {
	ObjectPlaceHolderInterface,
	TypesColorsInt,
} from "../../../interfacesAndTypes/miscInterfaces.tsx";
import {
	Chain,
	EvolvesTo,
} from "../../../interfacesAndTypes/pokemonEvolutionChainInterface.tsx";
import PokemonInterface from "../../../interfacesAndTypes/pokemonInterface.tsx";
import getPokemonData from "../../../functions/apiCalls/getPokemonData.tsx";
import { NumOrString } from "../../../interfacesAndTypes/miscTypes.tsx";
import TypePrototype from "../../prototypes/TypePrototype.tsx";
import typesColors from "../../../objects/typesColors.tsx";
import capitalizeWords from "../../../functions/utilities/capitalizeWords.tsx";

const Container = styled(ContainerPrototype)`
	align-items: center;
	justify-content: center;
	height: fit-content;
	margin-top: 5.5rem;
`;

const PokemonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 33.33%;
	height: max-content;
`;
const SvgImg = styled.svg.attrs({ viewBox: "0 0 25 25" })<{ $bgColor: string }>`
	border: solid ${props => props.$bgColor};
	border-radius: 50%;
	width: 90%;
`;
const PokemonImage = styled.image`
	width: 100%;
	height: 100%;
`;

const PokemonIdentifiers = styled.div`
	display: flex;
	margin: 1rem 0;
`;
const PokemonName = styled.span`
	font-size: 0.9em;
`;
const PokemonNumber = styled.span`
	margin-left: 0.3rem;
	font-size: 0.7em;
`;
const PokemonType = styled(TypePrototype)`
	margin: 0;
`;

export default function Evolution(): JSX.Element {
	const [evolutionChainData, setEvolutionChainData] = useState<
		PokemonEvolutionChainInterface | ObjectPlaceHolderInterface
	>({ default: "default" });

	const myEvolutionChain = useContext(EvolutionChainContext);
	const evolutionChainUrl: string = myEvolutionChain.url;

	const getData = async (
		url: string,
	): Promise<PokemonEvolutionChainInterface | ObjectPlaceHolderInterface> => {
		try {
			const data = await getPokemonEvolutionChainData(url);
			setEvolutionChainData(data);
		} catch (err) {
			console.log(err);
		}
		return evolutionChainData;
	};

	useEffect(() => {
		getData(evolutionChainUrl);
	}, []);

	const fetchEvolutions = () => {
		let evolutionsArray: string[] = [];
		if (!evolutionChainData.hasOwnProperty("default")) {
			const targetObject: Chain = evolutionChainData.chain;

			if (targetObject.hasOwnProperty("species")) {
				evolutionsArray.push(targetObject.species.name);
				if (
					targetObject.hasOwnProperty("evolves_to") &&
					targetObject.evolves_to[0]
				) {
					const secondFormLocation: EvolvesTo = targetObject.evolves_to[0];
					evolutionsArray.push(secondFormLocation.species.name);
					if (
						secondFormLocation.hasOwnProperty("evolves_to") &&
						secondFormLocation.evolves_to[0]
					) {
						const thirdFormLocation: EvolvesTo =
							secondFormLocation.evolves_to[0];
						evolutionsArray.push(thirdFormLocation.species.name);
					}
				}
			}
		}
		return evolutionsArray;
	};

	const displayPokemons = (): JSX.Element[] =>
		fetchEvolutions().map((x: string) => <PokemonEvolutionStage name={x} />);

	return <Container>{displayPokemons()}</Container>;
}

function PokemonEvolutionStage(props: { name: string }): JSX.Element {
	const [pokeEvolutionInfo, setPokeEvolutionInfo] = useState<
		PokemonInterface | ObjectPlaceHolderInterface
	>({});

	const getData = async (
		pokeId: NumOrString,
	): Promise<PokemonInterface | ObjectPlaceHolderInterface> => {
		try {
			const data = await getPokemonData(props.name);
			setPokeEvolutionInfo(data);
		} catch (err) {
			console.log(err);
		}
		return pokeEvolutionInfo;
	};

	useEffect(() => {
		getData(props.name);
	});

	const { id, sprites, types } = pokeEvolutionInfo;

	const displayId = (idArg: number) => {
		return idArg.toString().length === 3
			? `#${idArg}`
			: idArg.toString().length === 2
			? `#0${idArg}`
			: `#00${idArg}`;
	};

	const typeColor = types
		? typesColors[types[0].type.name as keyof TypesColorsInt]
		: "white";

	return (
		<PokemonContainer>
			<SvgImg $bgColor={typeColor}>
				<PokemonImage href={sprites ? sprites.front_default : undefined} />→
			</SvgImg>
			<PokemonIdentifiers>
				<PokemonName>{capitalizeWords(props.name)}</PokemonName>
				<PokemonNumber>{id && displayId(id)}</PokemonNumber>
			</PokemonIdentifiers>
			<PokemonType $bgColor={typeColor}>
				{types ? capitalizeWords(types[0].type.name) : undefined}
			</PokemonType>
		</PokemonContainer>
	);
}
