import styled from "styled-components/macro";

export const LoadingSpinnerPrototype = styled.div`
    width: 50%;
    border: 1rem solid grey;
    border-bottom: 1rem solid red;
    border-radius: 50%;
    aspect-ratio: 1/1;
    animation: 2s linear infinite spinner;
    @keyframes spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
