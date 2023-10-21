import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
/* import { PokemonProfilesNavElementsInterface } from "../../interfaces&types/misc_Interfaces"; */
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import VitalsContext from "../../contexts/vitalsContext.tsx";
import ComponentContext from "../../contexts/componentContext.tsx";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
	width: 1fr;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

const NavLink = styled(Link)`
	color: black;
	text-decoration: none;
`;

const SelectionUnderlineBar = styled.div<{ $visibility: string }>`
	width: 100%;
	height: 10%;
	background-color: red;
	visibility: ${props => props.$visibility};
`;

export default function PokemonProfileNavElement(props: {
	value: string;
}): JSX.Element {
	const myComponentContext = useContext(ComponentContext);
	const myVitalsContext = useContext(VitalsContext);
	const { id, name } = myVitalsContext;

	const location = useLocation();
	const checkPath =
		location.pathname.search(`/pokemons/id/${id}`) !== -1
			? `/pokemons/id/${id}/${props.value}`
			: location.pathname.search(`/pokemons/name/${name}`) !== -1
			? `/pokemons/name/${name}/${props.value}`
			: "*";

	return (
		<Container>
			<NavLink to={checkPath}>{props.value}</NavLink>
			<SelectionUnderlineBar
				$visibility={
					myComponentContext?.name === props.value ? "visible" : "hidden"
				}
			/>
		</Container>
	);
}
