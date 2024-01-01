import React from "react";
import styled from "styled-components";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import { capitalizeWords } from "../../../../functions/utilities/capitalizeWords";
import { OptionsRow } from "./OptionsRow";

export function Filters(props: { styleOfFilter: string; nameOfFilter: string }): React.ReactElement {
    return (
        <FiltersContainer>
            <FiltersHeadersContainer>
                <FiltersHeadersValue>{capitalizeWords(props.nameOfFilter)}</FiltersHeadersValue>
            </FiltersHeadersContainer>
            <OptionsContainer>
                <OptionsRow styleOfParentFilter={props.styleOfFilter} nameOfParentFilter={props.nameOfFilter} />
            </OptionsContainer>
        </FiltersContainer>
    );
}

const FiltersContainer = styled(ContainerPrototype)`
    width: 100%;
    height: 1fr;
    flex-direction: column;
    overflow-x: hidden;
    //border: 0.1rem solid red;
`;

const FiltersHeadersContainer = styled.div`
    display: flex;
    align-items: start;
    padding: 0.5rem; //review
    height: 30%;
`;

const OptionsContainer = styled(ContainerPrototype)`
    max-width: 100%;
    height: 1fr;
    overflow-x: scroll;
    padding: 0.5rem 0.5rem 0 0.5rem;
`;
const FiltersHeadersValue = styled.h5``;
