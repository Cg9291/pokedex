import React, { useState } from "react";
import styled from "styled-components/macro";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { Filters } from "../components/homepage/filteredSearch/filter/Filter";
import { useNavigate } from "react-router-dom";
import { FilterInfoInterface } from "../interfaces/miscInterfaces";

export interface LocalTransmittedDataInterface {
    generation?: string;
    type?: string;
    type2?: string;
    height?: string;
    weight?: string;
}

export interface InputThumbsRefsInterface {
    min: HTMLInputElement | null;
    max: HTMLInputElement | null;
}

export interface FocusedFilterOptionsInterface {
    generation: string | null;
    type: string | null;
    type2: string | null;
}

export interface FocusedFilterOptionsKitInterface {
    focusedFiltersOptions: FocusedFilterOptionsInterface;
    setFocusedFiltersOptions: React.Dispatch<React.SetStateAction<FocusedFilterOptionsInterface>>;
}

export function FilteredSearch(): React.ReactElement {
    const [filterInfo] = useState<FilterInfoInterface>({
        generation: { name: "generation", style: "button" },
        type: { name: "type", style: "button" },
        type2: { name: "type2", style: "button" },
        height: { name: "height", style: "slider" },
        weight: { name: "weight", style: "slider" }
    });

    const navigate = useNavigate();

    //LOGIC/HANDLER FUNCTIONS

    const buildUrl = (obj: LocalTransmittedDataInterface) => {
        const urlObject = [`/filtered-search/`];
        for (const x in obj) {
            urlObject.push(`${x}/${obj[x as keyof typeof obj]}/`);
        }
        return urlObject.join("");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        const formData = new FormData(e.currentTarget);
        const localTransmittedData = Object.fromEntries(formData.entries());
        navigate(buildUrl(localTransmittedData));
    };

    //DISPLAY/MAP/HYBRID FUNCTIONS
    const displayFilters = (): React.ReactElement[] => {
        const myArr: React.ReactElement[] = [];
        let keyValue = 0;
        for (const key in filterInfo) {
            const styleOfFilter: string = filterInfo[key as keyof FilterInfoInterface].style;
            const nameOfFilter: string = filterInfo[key as keyof FilterInfoInterface].name;

            myArr.push(<Filters key={keyValue} styleOfFilter={styleOfFilter} nameOfFilter={nameOfFilter} />);
            keyValue++;
        }
        return myArr;
    };

    //JSX COMPONENTS

    function SubmitButton(): React.ReactElement {
        return <SubmitButtonContainer>Search</SubmitButtonContainer>;
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Filters</Title>
                {displayFilters()}
                <SubmitButton />
            </Form>
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
    overflow: hidden;
`;

const Form = styled.form.attrs({
    method: "get",
    encType: "multipart/form-data"
})`
    flex-direction: inherit;
    width: 100%;
    height: 100%;
    display: flex;
`;
const Title = styled.h3`
    margin: 1rem 0 1rem 1rem;
`;

const SubmitButtonContainer = styled.button.attrs({ type: "submit" })`
    width: 20rem;
    height: 20rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 12px;
    background-color: gold;
    font-size: 1.2em;
    font-weight: 600;
`;
