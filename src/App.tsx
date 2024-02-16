import "./App.css";
import styled from "styled-components/macro";
import ContainerPrototype from "./components/prototypes/ContainerPrototype";
import { RoutesStructure } from "./components/RoutesStructure";
import React from "react";
import { Navigation } from "./components/navigation/Navigation";
import * as breakpoints from "./objects/breakpoints";

/*
TODO

*update all containerPrototypes imports/export
*handle odd pokemons[deoxys,eeviee,]
*/

function App(): React.ReactElement {
    return (
        <Container>
            <RoutesStructure />
            <Navigation />
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    background-color: white;
    flex-direction: column;
    max-height: 100vh;
    max-width: 100vw;
    overflow-y: hidden;
    //justify-content: flex-start;
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        flex-direction: column-reverse;
    }
`;

export default App;
