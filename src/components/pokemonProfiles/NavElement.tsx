import styled from "styled-components/macro";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import { LinkPrototype } from "../prototypes/LinkPrototype";
import { PokemonProfilesNavElementsInterface } from "../../interfaces/miscInterfaces";
import React from "react";

export function NavElement(props: {
    value: string;
    navElementsNames: PokemonProfilesNavElementsInterface;
    setNavElementsNames: React.Dispatch<React.SetStateAction<PokemonProfilesNavElementsInterface>>;
}): React.ReactElement {
    const navElementsNames = props.navElementsNames;
    const setNavElementsNames = props.setNavElementsNames;
    const isElementFocused: boolean =
        navElementsNames[props.value as keyof PokemonProfilesNavElementsInterface].isFocused === true;

    const focusHandler = (): void => {
        const nextState = { ...navElementsNames };
        for (const obj in nextState) {
            if (obj === props.value) {
                nextState[obj as keyof PokemonProfilesNavElementsInterface].isFocused = true;
            } else {
                nextState[obj as keyof PokemonProfilesNavElementsInterface].isFocused = false;
            }
        }
        setNavElementsNames(nextState);
    };

    return (
        <Container onFocus={focusHandler} onClick={focusHandler}>
            <Link>{props.value}</Link>
            <SelectionUnderlineBar $visibility={isElementFocused ? "visible" : "hidden"} />
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    flex: 1 0 content;
    justify-content: center;
    align-items: center;
    row-gap: 10%;
`;

const Link = styled(LinkPrototype)`
    color: black;
    flex: 0 1 content;
    text-align: center;
    font-size: 5vw;
    font-weight: 500;
`;

const SelectionUnderlineBar = styled.div<{ $visibility: string }>`
    width: 100%;
    height: 100%;
    flex: 0 0 15%;
    border-radius: 12px;
    background-color: red;
    visibility: ${(props) => props.$visibility};
`;
