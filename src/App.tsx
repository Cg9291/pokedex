import "./App.css";
import styled from "styled-components";
import ContainerPrototype from "./components/prototypes/ContainerPrototype";
import { RoutesStructure } from "./components/RoutesStructure";
import React from "react";
import { Navigation } from "./components/navigation/Navigation";

/*
TODO

*update all containerPrototypes imports/export
*/

const Container = styled(ContainerPrototype)`
    background-color: white;
`;

function App(): React.ReactElement {
    return (
        <Container>
            <RoutesStructure />
            <Navigation />
        </Container>
    );
}

export default App;
