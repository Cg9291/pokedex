import { Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import ContainerPrototype from "./components/prototypes/ContainerPrototype.tsx";
import Homepage from "./pages/Homepage.tsx";
import About from "./pages/About.tsx";
import NoMatch from "./pages/NoMatch.tsx";
import PokemonProfile from "./components/PokemonProfile.tsx";

/*
TODO

*add type to index
*figure out keys for mapped elements
*/

const Container = styled(ContainerPrototype)`
	background-color: white;
`;

function App(): JSX.Element {
	/* const id2 = Number(useParams().id2);
	console.log(id2); */
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
			{/* 	<Route
					path="/pokemons/:id"
					element={<PokemonProfile id={id2} />}
				/> */}
				<Route
					path="*"
					element={<NoMatch />}
				/>
			</Routes>
		</Container>
	);
}

export default App;
