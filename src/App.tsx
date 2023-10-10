import { Routes, Route, useParams, useRoutes, Router } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import ContainerPrototype from "./components/prototypes/ContainerPrototype.tsx";
import Homepage from "./pages/Homepage.tsx";
import About from "./components/PokemonProfiles/About.tsx";
import NoMatch from "./pages/NoMatch.tsx";
import PokemonProfile from "./components/PokemonProfiles/PokemonProfile.tsx";
import MapPathsToElement from "./components/MapPathsToElement.tsx";

/*
TODO

*add type to index
*figure out keys for mapped elements
*review focusHandler() in NavElements file
*add handler for when a searched pokemon doesnt exist
*figure out best routing structure
*/

const Container = styled(ContainerPrototype)`
	background-color: white;
`;

function App(): JSX.Element {
	return (
		<Container>
			<MapPathsToElement />
		</Container>
	);
}

export default App;

{
	/* <Container>
			<Routes>
				<Route
					path="/"
					element={<Homepage />}
				/>
				<Route
					path="/about"
					element={<About />}
				/>

				<MapPathsToElement />
				<Route
					path="*"
					element={<NoMatch />}
				/>
			</Routes>
		</Container> */
}
