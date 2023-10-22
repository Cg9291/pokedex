import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";
import LinkPrototype from "../prototypes/LinkPrototype.tsx";
import { PokemonProfilesNavElementsInterface } from "../../interfacesAndTypes/miscInterfaces.tsx";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import VitalsContext from "../../contexts/vitalsContext.tsx";

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
	navElementsNames: PokemonProfilesNavElementsInterface;
	setNavElementsNames: React.Dispatch<
		React.SetStateAction<PokemonProfilesNavElementsInterface>
	>;
}): JSX.Element {
	const myVitalsContext = useContext(VitalsContext);
	const { id, name } = myVitalsContext;
	const navElementsNames = props.navElementsNames;
	const setNavElementsNames = props.setNavElementsNames;

	const focusHandler = (): void => {
		let nextState = navElementsNames;
		for (let obj in nextState) {
			if (obj === props.value) {
				nextState[obj as keyof PokemonProfilesNavElementsInterface].isFocused =
					true;
			} else {
				nextState[obj as keyof PokemonProfilesNavElementsInterface].isFocused =
					false;
			}
		}

		setNavElementsNames(
			(navElementsNames: PokemonProfilesNavElementsInterface) => ({
				...navElementsNames, //this function works but shouldnt...review
			}),
		);
	};

	const isElementFocused: boolean =
		navElementsNames[props.value as keyof PokemonProfilesNavElementsInterface]
			.isFocused === true;

	const location = useLocation();
	const checkPath =
		location.pathname.search(`/pokemons/id/${id}`) !== -1
			? `/pokemons/id/${id}/${props.value}`
			: location.pathname.search(`/pokemons/name/${name}`) !== -1
			? `/pokemons/name/${name}/${props.value}`
			: "*";

	console.log(`${location.pathname}`);
	return (
		<Container onFocus={focusHandler}>
			<NavLink to={checkPath}>{props.value}</NavLink>
			<SelectionUnderlineBar
				$visibility={isElementFocused ? "visible" : "hidden"}
			/>
		</Container>
	);
	/* 	} else {
		return (
			<Container onFocus={focusHandler}>
				<Link>{props.value}</Link>
				<SelectionUnderlineBar $visibility={"hidden"} />
			</Container>
		);
	} */
}
