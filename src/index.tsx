import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyle } from "./components/styles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components/macro";

export const MobileWrapper = styled.div`
    max-width: 375px;
    height: 950px;
    margin: 0 auto;
    border-style: none;
    border-color: inherit;
    border-width: 0px;
    -webkit-transform: scale(1);
    -webkit-transform-origin: 0 0;
    display: block;
    background: gray;
    border-radius: 20px;
    overflow: hidden;
`;

export const FullWrapper = styled.div`
    max-width: 100%;
    height: 100%;
    background: lightsteelblue;
`;
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <GlobalStyle />
        <BrowserRouter>
            <FullWrapper>
                <MobileWrapper>
                    <App />
                </MobileWrapper>
            </FullWrapper>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log(""));
