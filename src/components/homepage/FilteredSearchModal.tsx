import React, { useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import { useNavigate } from "react-router-dom";
import {
    FilterInfoInterface,
    FilterInfoNumInterface,
    PokemonGenerationsListInterface
} from "../../interfaces/miscInterfaces";
import { typesColors } from "../../objects/typesColors";
import { capitalizeWords } from "../../functions/utilities/capitalizeWords";
import { pokemonGenerationsList } from "../../objects/pokemonGenerationsList";

export function FilteredSearchModal(): React.ReactElement {
    const [filterInfo, setFilterInfo] = useState<FilterInfoInterface>({
        generation: { name: "generation", value: 1, style: "button" },
        type: { name: "type", value: "undefined", style: "button" },
        type2: { name: "type2", value: "undefined", style: "button" },
        height: { name: "height", value: 0, style: "slider" },
        weight: { name: "weight", value: 0, style: "slider" }
    });
    const navigate = useNavigate();
    const filterParameters = { ...filterInfo };

    //LOGIC/HANDLER FUNCTIONS
    const handleButtonClick = (buttonTitle: string, buttonCategory: string, parameterName: string): void => {
        if (parameterName === "generation") {
            filterParameters[parameterName as keyof typeof filterParameters].value = Number(buttonTitle);
        } else {
            filterParameters[parameterName as keyof typeof filterParameters].value = buttonTitle;
            setFilterInfo(filterParameters);
        }
        return;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const transmittedData = Object.fromEntries(formData.entries()).type;
        const name = transmittedData.toString().toLowerCase();
        console.log(transmittedData, formData);
        //navigate(buildUrl());
    };

    const buildUrl = () => {
        const myArr = [`/filtered-search/`];
        for (const x in filterInfo) {
            myArr.push(
                `${filterInfo[x as keyof FilterInfoInterface].name}/${
                    filterInfo[x as keyof FilterInfoInterface].value
                }/`
            );
        }
        return myArr.join("");
    };

    //DISPLAY/MAP/HYBRID FUNCTIONS
    const displayFilters = () => {
        const myArr: React.ReactElement[] = [];

        for (const parameter in filterInfo) {
            const parameterStyle = filterInfo[parameter as keyof FilterInfoInterface].style;
            const parameterName = filterInfo[parameter as keyof FilterInfoInterface].name;

            myArr.push(
                //rewrite & extract component for clarity
                <ContainerOfFilters>
                    <HeadersOfFilters title={capitalizeWords(parameter)} />
                    <OptionsContainer>{displayOptions(parameterStyle, parameterName)}</OptionsContainer>
                </ContainerOfFilters>
            );
        }
        return myArr;
    };

    const displayOptions = (categoryParameter: string, categoryName: string) => {
        const myArr: React.ReactElement[] = [];

        if (categoryParameter === "button") {
            if (categoryName.includes("type")) {
                for (const oneType in typesColors) {
                    myArr.push(
                        <OptionsOfFilters
                            title={capitalizeWords(oneType)}
                            category={categoryParameter}
                            parameterName={categoryName}
                        />
                    );
                }
                return myArr;
            } else if (categoryName === "generation") {
                return pokemonGenerationsList.map((x: PokemonGenerationsListInterface) => (
                    <OptionsOfFilters
                        title={capitalizeWords(` ${x.generation}`)}
                        category={categoryParameter}
                        parameterName={categoryName}
                    />
                ));
            }
        } else if (categoryParameter === "slider") {
            return <OptionsOfFilters category={categoryParameter} title="Slider" parameterName={categoryName} />;
        }
    };

    //JSX COMPONENTS
    function HeadersOfFilters(props: { title: string }): React.ReactElement {
        return (
            <ContainerOfHeadersOfFilters>
                <TitleOfHeadersOfFilters>{props.title}</TitleOfHeadersOfFilters>
            </ContainerOfHeadersOfFilters>
        );
    }

    function OptionsOfFilters(props: { title: string; category: string; parameterName: string }): React.ReactElement {
        return props.category === "button" ? (
            <OptionsButtonContainer>
                <OptionsButtonLabel>
                    <ButtonInput
                        name={props.parameterName}
                        value={props.title}
                        /*     onClick={() => handleButtonClick(props.title, props.category, props.parameterName)} */
                    />
                    <TypeTitle>
                        {props.parameterName === "generation" ? ` Generation ${Number(props.title)}` : props.title}
                    </TypeTitle>
                </OptionsButtonLabel>
            </OptionsButtonContainer>
        ) : (
            <Sliders parameterName={props.parameterName} />
        );
    }

    function SubmitButton(): React.ReactElement {
        return <SubmitButtonContainer>Search</SubmitButtonContainer>;
    }

    function Sliders(props: { parameterName: string }): React.ReactElement {
        const [sliderValue, setSliderValue] = useState<number>(
            filterInfo[props.parameterName as keyof FilterInfoNumInterface].value
        );
        const filterParameters = { ...filterInfo };

        const handleSliderChange = (e: React.FormEvent<HTMLInputElement>) => {
            setSliderValue(Number(e.currentTarget.value));
            filterParameters[props.parameterName as keyof FilterInfoInterface].value = Number(e.currentTarget.value);
            //setFilterInfo(filterParameters);

            console.log(props.parameterName);
        };

        const handleBlur = (e: React.MouseEvent | React.TouchEvent<HTMLInputElement>) => {
            setFilterInfo(filterParameters);
        };

        return (
            <OptionsSliderWrapper>
                <OptionsSliderInput
                    type="range"
                    min="0"
                    max={props.parameterName === "height" ? 20 : 1000}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    onMouseUp={handleBlur}
                    onTouchEnd={handleBlur}
                />
                <>{sliderValue}</>
            </OptionsSliderWrapper>
        );
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
`;

const Form = styled.form.attrs({
    method: "get"
})`
    flex-direction: inherit;
    width: 100%;
    display: flex;
`;
const Title = styled.h3`
    margin: 1rem 0 0 1rem;
`;
const ContainerOfFilters = styled(ContainerPrototype)`
    height: 5rem;
    flex-direction: column;
    border: 0.1rem solid red;
`;
const ContainerOfHeadersOfFilters = styled.div``;
const TitleOfHeadersOfFilters = styled.h5`
    margin: 1rem 0 0 1rem;
`;

const OptionsContainer = styled(ContainerPrototype)`
    max-width: 100%;
    height: 3rem;
    overflow-x: scroll;
`;

const OptionsButtonContainer = styled.div`
    width: max-content;
    height: 2rem;
    margin: 0 0.1rem;
    padding: 0 0.5rem;
    border: 0.1rem solid transparent;
`;

const OptionsButtonLabel = styled.label`
    display: flex;
    width: inherit;
    height: inherit;
`;

const ButtonInput = styled.input.attrs({ type: "radio" })`
    /*     height: 0;
    width: 0; */
`;

const TypeTitle = styled.h6`
    width: 100%;
    height: 100%;
`;

const SubmitButtonContainer = styled.button.attrs({ type: "submit" })`
    width: 4rem;
    height: 2rem;
`;

const OptionsSliderWrapper = styled.div`
    width: 100%;
`;

const OptionsSliderInput = styled.input`
    width: 100%;
`;
