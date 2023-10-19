import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import LinkPrototype from "../prototypes/LinkPrototype";
import { PokemonProfilesNavElementsInterface } from "../../interfaces&types/misc_Interfaces";

const Container = styled(ContainerPrototype)`
	flex-direction: column;
	width: 1fr;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

const Link = styled(LinkPrototype)`
	color: black;
`;

const SelectionUnderlineBar = styled.div<{ $visibility: string }>`
	width: 100%;
	height: 10%;
	background-color: red;
	visibility: ${props => props.$visibility};
`;

export default function NavElement(props: {
	value: string;
	navElementsNames: PokemonProfilesNavElementsInterface;
	setNavElementsNames: React.Dispatch<
		React.SetStateAction<PokemonProfilesNavElementsInterface>
	>;
}): JSX.Element {
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

	return (
		<Container onFocus={focusHandler}>
			<Link>{props.value}</Link>
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
