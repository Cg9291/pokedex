import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../../prototypes/ContainerPrototype.tsx";
import PokemonTypesElement from "./PokemonTypesElement.tsx";
import getPokemonData from "../../../../functions/apiCalls/getPokemonData.tsx";
import capitalizeWords from "../../../../functions/utilities/capitalizeWords.tsx";
import {
	ObjectPlaceHolderInterface,
	PokemonNumberPropsInterface,
} from "../../../../interfacesAndTypes/miscInterfaces.tsx";
import PokemonInterface, {
	Type,
} from "../../../../interfacesAndTypes/pokemonInterface.tsx";
import typesColors from "../../../../objects/typesColors.tsx";
import { TypesColorsInt } from "../../../../interfacesAndTypes/miscInterfaces.tsx";

const Container = styled(Link)<{ $mainType: string }>`
	width: 10rem;
	height: 7.5rem;
	padding: 0.5rem;
	border-radius: 25px;
	text-decoration: none;
	background-color: ${props =>
		typesColors[props.$mainType as keyof TypesColorsInt]};
`;

const Wrapper = styled(ContainerPrototype)`
	display: flex;
	flex-direction: column;
	border-radius: 25px;
`;

const PokeName = styled.h3`
	height: 20%;
	color: white;
`;

const SubContainer = styled(ContainerPrototype)``;

const PokemonTypesContainer = styled(ContainerPrototype)`
	width: 50%;
	flex-direction: column;
	justify-content: end;
`;

const PokemonImgWrapper = styled.div`
	width: 50%;
`;

const SvgImg = styled.svg.attrs({ viewBox: "50 50 200 200" })`
	width: 100%;
	height: 100%;
`;
const PokemonImg = styled.image`
	width: 20rem;
	aspect-ratio: 1/1;
`;

export default function PokemonPictureCard(
	props: PokemonNumberPropsInterface,
): JSX.Element {
	const [pokemonInfo, setPokemonInfo] = useState<
		PokemonInterface | ObjectPlaceHolderInterface
	>({});

	async function getData(
		pokeNumber: number,
	): Promise<PokemonInterface | ObjectPlaceHolderInterface> {
		try {
			const data: PokemonInterface = await getPokemonData(pokeNumber);
			setPokemonInfo(data);
		} catch (err) {
			console.log(err);
		}
		return pokemonInfo;
	}

	useEffect(() => {
		getData(props.id);
	}, [props.id]);

	const { id, name, sprites, types } = pokemonInfo;

	const displayPokemonTypes = (): JSX.Element[] | undefined => {
		if (types) {
			return types
				.toReversed()
				.map((x: Type) => (
					<PokemonTypesElement typeName={capitalizeWords(x.type.name)} />
				));
		} else {
			return;
		}
	};

	return (
		<Container
			to={`/pokemons/id/${id}/About`}
			$mainType={types && types[0].type.name}
		>
			<Wrapper>
				<PokeName>{capitalizeWords(name)}</PokeName>
				<SubContainer>
					<PokemonTypesContainer>{displayPokemonTypes()}</PokemonTypesContainer>
					<PokemonImgWrapper>
						{sprites && (
							<SvgImg>
								<PokemonImg
									href={sprites.front_default}
									/* 	alt="a pokemon image" */
								/>
							</SvgImg>
						)}
					</PokemonImgWrapper>
				</SubContainer>
			</Wrapper>
		</Container>
	);
}
