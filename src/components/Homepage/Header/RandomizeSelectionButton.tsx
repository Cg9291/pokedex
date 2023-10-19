import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype.tsx";
import { useContext } from "react";
import pokemonLookupNumber from "../../../functions/utilities/randomizePokemonSelection.tsx";
import RandomPokemonSelectionContext from "../../../contexts/randomPokemonSelectionContext.tsx";

const Container = styled(ContainerPrototype)`
	width: fit-content;
	height: 2rem;
	position: fixed;
	top: 0.5rem;
	right: 0.5rem;
	z-index: 1;
`;

const Button = styled.button.attrs({ type: "button" })`
	width: 100%;
	border-radius: 5%;
	padding:0 0.5rem;
	border: none;
`;

export default function RandomizeSelectionButton(): JSX.Element {
	const localRandomPokemonSelection = useContext(RandomPokemonSelectionContext);
	const { setRandomPokemonSelection } = localRandomPokemonSelection;

	const randomize = () => {
		if (setRandomPokemonSelection) {
			setRandomPokemonSelection(pokemonLookupNumber());
		}
	};

	return (
		<Container>
			<Button onClick={() => randomize()}>Randomize</Button>
		</Container>
	);
}
