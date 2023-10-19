import "./App.css";
import styled from "styled-components";
import ContainerPrototype from "./components/prototypes/ContainerPrototype.tsx";
import MapPathsToElement from "./components/MapPathsToElement.tsx";
import Navigation from "./components/Navigation/Navigation.tsx";
import BackButton from "./components/Navigation/BackButton.tsx";
import { useNavigate } from "react-router-dom";
import RandomizeSelectionButton from "./components/Navigation/RandomizeSelectionButton.tsx";
import { useEffect, useState } from "react";
import RandomPokemonSelectionContext from "./contexts/randomPokemonSelectionContext.tsx";
import { Provider } from "react";
import pokemonLookupNumber from "./functions/utilities/randomizePokemonSelection.tsx";

/*
TODO

*add scrolltracker for homepage(reintroduce margins between cards)
*replace usages of Object placeholders by using the type extension way (TS)
*add label/form elements to backbuttons
*maybe add icons in About elements
*figure out keys for mapped elements
*review focusHandler() in NavElements file
*/

const Container = styled(ContainerPrototype)`
	background-color: white;
`;

function App(): JSX.Element {
	const [randomPokemonSelection, setRandomPokemonSelection] = useState<
		number[] | []
	>(pokemonLookupNumber());

	const navigate = useNavigate();
	const goBack = () => navigate(-1);
	useEffect(() => console.log("rs", randomPokemonSelection), []);

	return (
		<Container>
			<BackButton action={goBack} />
			<RandomPokemonSelectionContext.Provider
				value={{
					randomPokemonSelection: randomPokemonSelection,
					setRandomPokemonSelection: setRandomPokemonSelection,
				}}
			>
				<MapPathsToElement />
			</RandomPokemonSelectionContext.Provider>
			<Navigation />
		</Container>
	);
}

export default App;
