import "./App.css";
import styled from "styled-components";
import ContainerPrototype from "./components/prototypes/ContainerPrototype";
import MapPathsToElement from "./components/MapPathsToElement";
import React from "react";

/*
TODO

*add type to index
*figure out keys for mapped elements
*review focusHandler() in NavElements file
*add handler for when a searched pokemon doesnt exist
*figure out best routing structure
*review globalstyles implementatoion to ensure it wasnt overwritten
*/

const Container = styled(ContainerPrototype)`
    background-color: white;
`;

function App(): React.ReactElement {
    return (
        <Container>
            <MapPathsToElement />
        </Container>
    );
}

export default App;
