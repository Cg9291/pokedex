import React from "react";
import styled from "styled-components/macro";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import { capitalizeWords } from "../../../../functions/utilities/capitalizeWords";
import { OptionsRow } from "./OptionsRow";

export function Filters(props: { styleOfFilter: string; nameOfFilter: string }): React.ReactElement {
    return (
        <Container>
            <FiltersHeadersContainer>
                <FiltersHeadersValue>{capitalizeWords(props.nameOfFilter)}</FiltersHeadersValue>
            </FiltersHeadersContainer>
            <OptionsContainer $styleOfFilter={props.styleOfFilter}>
                <OptionsRow styleOfFilter={props.styleOfFilter} nameOfFilter={props.nameOfFilter} />
            </OptionsContainer>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    overflow: hidden;
    flex: 1 1 0;
    row-gap: 5%;
    @media (orientation: landscape) {
        flex: 0 0 33vh;
    }
`;

const FiltersHeadersContainer = styled(ContainerPrototype)`
    align-items: center;
    flex: 0 0 content;
`;

const OptionsContainer = styled(ContainerPrototype)<{ $styleOfFilter: string }>`
    overflow-x: ${(props) => (props.$styleOfFilter === "slider" ? "hidden" : "scroll")};
    overflow-y: hidden;
    align-items: flex-start;
    flex: 1 0 0;
    column-gap: 2vw;
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
        //width: 5%;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;
const FiltersHeadersValue = styled.p`
    //line-height: normal;
    font-size: 0.85em;
    font-weight: bold;
`;
