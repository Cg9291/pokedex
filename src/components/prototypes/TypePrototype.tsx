import styled from "styled-components";

export const TypePrototype = styled.div<{ $bgColor: string; $value?: string }>`
    display: flex;
    justify-content: center;
    margin: 0 1rem 0.5rem 0;
    padding: 0.2rem 1rem;
    background-color: ${(props) => (props.$value === "none" ? "rgba(255,255,255,0)" : props.$bgColor)};
    border: ${(props) => (props.$value === "none" ? "solid yellow " : "none")};
    border-radius: 50px;
`;
