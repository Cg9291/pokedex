//import { createGlobalStyle } from "styled-components";
import * as styled from "styled-components";

export const GlobalStyle = styled.createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    body {
        height: 100dvh;
        width: 100dvw;
        padding: 0;
        margin: 0;
        overflow-x: hidden;
    }
    #root {
        height: 100%;
        width: 100%;
        margin: 0;
    }
`;
