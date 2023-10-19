import { useState, useContext, useEffect } from "react";
import ContainerPrototype from "../../prototypes/ContainerPrototype.tsx";
import styled from "styled-components";
import MovesContext from "../../../contexts/movesContext.tsx";
import { Mfe } from "../../../interfaces&types/pokemonInterface.tsx";
import capitalizeWords from "../../../functions/utilities/capitalizeWords.tsx";
import getPokemonMovesTypesData from "../../../functions/api_calls/getPokemonMovesTypesData.tsx";
import { PokemonMovesInterface } from "../../../interfaces&types/pokemonMovesInterface.tsx";
import { ObjectPlaceHolderInterface } from "../../../interfaces&types/misc_Interfaces.tsx";
import typesColors from "../../../objects/typesColors.tsx";
import { TypesColorsInt } from "../../../interfaces&types/misc_Interfaces.tsx";

const Container = styled(ContainerPrototype)`
	margin:2rem 0 0 0;
	flex-direction: column;
`;

const MoveContainer = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 0.1rem solid grey;
	padding: 0.8rem 0;
`;

const MoveNameContainer = styled.div`
display:flex;
align-items:center;
`;

const MoveTypeContainer = styled.div<{ $typeName: "string" }>`
	width: 2.5rem;
	aspect-ratio: 1/1;
	border-radius: 50%;
	background-color: ${props =>
		typesColors[props.$typeName as keyof TypesColorsInt]};
	margin-right: 1rem;
`;

export default function Moves(): JSX.Element {
	const myMovesContext = useContext(MovesContext);

	const displayMoves = (): JSX.Element[] => {
		return myMovesContext.map((x: Mfe) => {
			return (
				<IntanceOfMove
					moveName={x.move.name}
					moveUrl={x.move.url}
				/>
			);
		});
	};

	return <Container>{displayMoves()}</Container>;
}

function IntanceOfMove(props: {
	moveName: string;
	moveUrl: string;
}): JSX.Element {
	const [PokemonType, setPokemonType] = useState<
		PokemonMovesInterface | ObjectPlaceHolderInterface
	>({ type: { name: "default" } });

	const getData = async (
		moveDataUrl: string,
	): Promise<PokemonMovesInterface | ObjectPlaceHolderInterface> => {
		try {
			const response = await getPokemonMovesTypesData(moveDataUrl);
			setPokemonType(response);
		} catch (err) {
			console.log(err);
		}
		return PokemonType;
	};

	useEffect(() => {
		getData(props.moveUrl);
	}, []);

	const { type } = PokemonType;

	return (
		<MoveContainer>
			<MoveNameContainer>{capitalizeWords(props.moveName)}</MoveNameContainer>
			<MoveTypeContainer $typeName={type.name} />
		</MoveContainer>
	);
}
