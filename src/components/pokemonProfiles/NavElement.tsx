import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import LinkPrototype from "../prototypes/LinkPrototype";
import { PokemonProfilesNavElementsInterface } from "../../interfaces/miscInterfaces";
import React from "react";

export default function NavElement(props: {
    value: string;
    navElementsNames: PokemonProfilesNavElementsInterface;
    setNavElementsNames: React.Dispatch<React.SetStateAction<PokemonProfilesNavElementsInterface | undefined>>;
}): React.ReactElement {
    const navElementsNames = props.navElementsNames;
    const setNavElementsNames = props.setNavElementsNames;

    const focusHandler = (): void => {
        const nextState = { ...navElementsNames };
        for (const obj in nextState) {
            if (obj === props.value) {
                nextState[obj as keyof PokemonProfilesNavElementsInterface].isFocused = true;
            } else {
                nextState[obj as keyof PokemonProfilesNavElementsInterface].isFocused = false;
            }
        }

        setNavElementsNames(
            nextState //this function works but shouldn't...review
        );
    };

    const isElementFocused: boolean =
        navElementsNames[props.value as keyof PokemonProfilesNavElementsInterface].isFocused === true;

    return (
        <Container onFocus={focusHandler}>
            <Link>{props.value}</Link>
            <SelectionUnderlineBar $visibility={isElementFocused ? "visible" : "hidden"} />
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
    visibility: ${(props) => props.$visibility};
`;
