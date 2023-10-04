import { Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import ContainerPrototype from "./components/prototypes/ContainerPrototype.tsx";
import Homepage from "./pages/Homepage.tsx";
import About from "./components/About.tsx";
import NoMatch from "./pages/NoMatch.tsx";
import PokemonProfile from "./components/Homepage/pokemonProfiles/PokemonProfile.tsx";

/*
TODO

*add type to index
*figure out keys for mapped elements
*review focusHandler() in NavElements file
*/

const Container = styled(ContainerPrototype)`
	background-color: white;
`;

function App(): JSX.Element {
	return (
		<Container>
			<Routes>
				<Route
					path="/"
					element={<Homepage />}
				/>
				<Route
					path="/about"
					element={<About />}
				/>
				<Route
					path={["/pokemons/:id", "/pokemons/:name"]}
					element={<PokemonProfile />}
				/>
				<Route
					path="*"
					element={<NoMatch />}
				/>
			</Routes>
		</Container>
	);
}

export default App;
