import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import LinkPrototype from "../prototypes/LinkPrototype";
import { PokemonProfilesNavElementsInt } from "../../interfaces&types/interfaces";

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
	navElementsNames: PokemonProfilesNavElementsInt;
	setNavElementsNames: React.Dispatch<
		React.SetStateAction<PokemonProfilesNavElementsInt>
	>;
}): JSX.Element {
	const navElementsNames = props.navElementsNames;
	const setNavElementsNames = props.setNavElementsNames;

	const focusHandler = (): void => {
		let nextState = navElementsNames;
		for (let obj in navElementsNames) {
			if (obj === props.value) {
				nextState[obj as keyof PokemonProfilesNavElementsInt].isFocused = true;
			} else {
				nextState[obj as keyof PokemonProfilesNavElementsInt].isFocused = false;
			}
		}

		setNavElementsNames((navElementsNames: PokemonProfilesNavElementsInt) => ({
			...navElementsNames,
		}));
	};

	const isElementFocused: boolean =
		navElementsNames[props.value as keyof PokemonProfilesNavElementsInt]
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
