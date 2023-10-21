import "./App.css";
import styled from "styled-components";
import ContainerPrototype from "./components/prototypes/ContainerPrototype.tsx";
import MapPathsToElement from "./components/MapPathsToElement.tsx";
import NavigationBar from "./components/Navigation/NavigationBar.tsx";
import BackButton from "./components/Navigation/BackButton.tsx";
import { useState } from "react";
import RandomPokemonSelectionContext from "./contexts/randomPokemonSelectionContext.tsx";
import pokemonLookupNumber from "./functions/utilities/randomizePokemonSelection.tsx";

/*
TODO

*replace usages of Object placeholders by using the type extension way (TS)
*add label/form elements to backbuttons
*maybe add icons in About elements
*figure out keys for mapped elements
*/

const Container = styled(ContainerPrototype)`
	background-color: white;
`;

function App(): JSX.Element {
	const [randomPokemonSelection, setRandomPokemonSelection] = useState<
		number[]
	>(pokemonLookupNumber());

	return (
		<Container>
			<BackButton />
			<RandomPokemonSelectionContext.Provider
				value={{
					randomPokemonSelection: randomPokemonSelection,
					setRandomPokemonSelection: setRandomPokemonSelection,
				}}
			>
				<MapPathsToElement />
			</RandomPokemonSelectionContext.Provider>
			<NavigationBar />
		</Container>
	);
}

export default App;
