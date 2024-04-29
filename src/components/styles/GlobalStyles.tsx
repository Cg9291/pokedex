//import { createGlobalStyle } from "styled-components";
import * as styled from "styled-components";

export const GlobalStyle = styled.createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    html {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }
    body {
        width: 100%;
        height: 100%;
    }
    #root {
        height: 100%;
        width: 100%;
    }
`;
