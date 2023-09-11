import "./App.css";
import styled from "styled-components";
import ContainerPrototype from "./components/Prototypes/ContainerPrototype.tsx";
import Homepage from "./components/Homepage/Homepage.tsx";
import getPokemonData from "./api_calls/getPokemonData.tsx";

/*
TODO

*add type to index
*/

const Container = styled(ContainerPrototype)`
	background-color: white;
`;

function App(): JSX.Element {
	return (
		<Container>
			<Homepage />
		</Container>
	);
}

export default App;
