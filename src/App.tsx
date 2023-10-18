import "./App.css";
import styled from "styled-components";
import ContainerPrototype from "./components/prototypes/ContainerPrototype.tsx";
import MapPathsToElement from "./components/MapPathsToElement.tsx";
import Navigation from "./components/Navigation/Navigation.tsx";
import BackButton from "./components/Navigation/BackButton.tsx";
import { useNavigate } from "react-router-dom";

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
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	return (
		<Container>
			<BackButton action={goBack} />
			<MapPathsToElement />
			<Navigation />
		</Container>
	);
}

export default App;

