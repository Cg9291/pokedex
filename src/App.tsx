import "./App.css";
import styled from "styled-components";
import PrototypeContainer from "./components/PrototypeContainer.tsx";
import Homepage from "./components/Homepage.tsx";

/*
TODO

*add type to index
*/

const Container = styled(PrototypeContainer)`
	background-color: red;
`;

function App(): JSX.Element {
	return (
		<Container>
			<Homepage />
		</Container>
	);
}

export default App;
