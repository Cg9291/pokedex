import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import NavElement from "./NavElement";

const NavElementsNames: string[] = [
	"About",
	"Base Stats",
	"Evolution",
	"Moves",
];

const Container = styled(ContainerPrototype)`
	z-index: 1;
	height: 62%;
	top: 38%;
	background-color: white;
	position: absolute;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
`;

const InfoNavBar = styled(ContainerPrototype)`
	height: 10%;
	padding: 0 1rem;
	//background-color: red;
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;
`;

const mapArrayToComponent = (): JSX.Element[] =>
	NavElementsNames.map(x => <NavElement value={x} />);

export default function PokemonProfileInfo(): JSX.Element {
	return (
		<Container>
			<InfoNavBar>{mapArrayToComponent()}</InfoNavBar>
		</Container>
	);
}
