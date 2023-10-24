import React, { useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import NavElement from "./NavElement";
import { AboutComponentProps, PokemonProfilesNavElementsInterface } from "../../interfaces/miscInterfaces";
import BaseStats from "./profileNavBodies/BaseStats";
import About from "./profileNavBodies/About";
import Moves from "./profileNavBodies/Moves";
import Evolution from "./profileNavBodies/Evolution";

export default function PokemonProfileInfo(props: { AboutProps: AboutComponentProps }): React.ReactElement {
    const [navElementsNames, setNavElementsNames] = useState<PokemonProfilesNavElementsInterface>({
        About: { isFocused: true, element: <About ownProps={props.AboutProps} /> },
        "Base Stats": {
            isFocused: false,
            element: <BaseStats />
        },
        Evolution: { isFocused: false, element: <Evolution /> },
        Moves: { isFocused: false, element: <Moves /> }
    });
    

    const displayNavHeaders = (): React.ReactElement[] =>
        Object.keys(navElementsNames).map(
            (key: string): React.ReactElement => (
                <NavElement value={key} navElementsNames={navElementsNames} setNavElementsNames={setNavElementsNames} />
            )
        );

    const displayNavBody = (): React.ReactNode => {
        //maybe review this function
        const focusedElement: string | undefined = Object.keys(navElementsNames).find(
            (key: string) => navElementsNames[key as keyof PokemonProfilesNavElementsInterface].isFocused
        );
        if (!focusedElement) {
            throw new Error("find() has not found!");
        }
        return navElementsNames[focusedElement as keyof PokemonProfilesNavElementsInterface].element;
    };

    return (
        <Container>
            <InfoNavBar>{displayNavHeaders()}</InfoNavBar>
            <InfoNavBody>{displayNavBody()}</InfoNavBody>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
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
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
`;

const InfoNavBody = styled(ContainerPrototype)`
    height: 90%;
    padding: 1rem;
`;
