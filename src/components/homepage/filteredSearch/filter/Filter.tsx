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
            <OptionsContainer>
                <OptionsRow styleOfParentFilter={props.styleOfFilter} nameOfParentFilter={props.nameOfFilter} />
            </OptionsContainer>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    overflow: hidden;
    flex: 1 1 0;
    @media (orientation: landscape) {
        flex: 0 0 33vh;
    }
`;

const FiltersHeadersContainer = styled(ContainerPrototype)`
    align-items: center;
    flex: 0 0 40%;
`;

const OptionsContainer = styled(ContainerPrototype)`
    overflow-x: scroll;
    align-items: flex-start;
    flex: 1 0 0;
    column-gap: 2vw;
    //padding-block: 1vh;
`;
const FiltersHeadersValue = styled.h4``;
