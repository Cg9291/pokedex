import React from "react";
import "./App.css";
import styled from "styled-components/macro";
import ContainerPrototype from "./components/prototypes/ContainerPrototype";
import { useMatch } from "react-router-dom";
import { RoutesStructure } from "./components/RoutesStructure";
import { Navigation } from "./components/navigation/Navigation";
import * as breakpoints from "./objects/breakpoints";

/*
TODO

*update all containerPrototypes imports/export
*handle odd pokemons[deoxys,eeviee,]
*/

function App(): React.ReactElement {
    const match = useMatch("/filter/:gen");
    return (
        <Container $isRouteFilter={!!match}>
            <RoutesStructure />
            <Navigation />
        </Container>
    );
}

const Container = styled(ContainerPrototype)<{ $isRouteFilter: boolean }>`
    background-color: white;
    flex-direction: column;
    max-height: 100vh;
    overflow-y: hidden;
    @media (orientation: landscape) {
        overflow-y: scroll; /* ${(props) => (props.$isRouteFilter ? "hidden" : "scroll")}; */

        @media ${breakpoints.widthsQueries.minWidths.flexible("1180px")} {
            &::-webkit-scrollbar {
                height: 4px;
            }

            /* Track */
            &::-webkit-scrollbar-track {
                background: #f1f1f1;
            }

            /* Handle */
            &::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 10px;
            }

            /* Handle on hover */
            &::-webkit-scrollbar-thumb:hover {
                background: #555;
            }
        }
    }
`;

export default App;
