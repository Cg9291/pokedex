import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import { useNavigate } from "react-router-dom";
import { FilterInfoInterface } from "../../interfaces/miscInterfaces";
import { typesColors } from "../../objects/typesColors";
import { capitalizeWords } from "../../functions/utilities/capitalizeWords";

export function FilteredSearchModal(): React.ReactElement {
    const [filterInfo, setFilterInfo] = useState<FilterInfoInterface>({
        type: { name: "type", value: "undefined", style: "button" },
        type2: { name: "type2", value: "undefined", style: "button" },
        height: { name: "height", value: 0, style: "slider" },
        weight: { name: "weight", value: 0, style: "slider" }
    });
    const navigate = useNavigate();
    const filterParameters = { ...filterInfo };

    //LOGIC/HANDLER FUNCTIONS
    const handleButtonClick = (buttonTitle: string, buttonCategory: string, parameterName: string): void => {
        filterParameters[parameterName as keyof typeof filterParameters].value = buttonTitle;
        setFilterInfo(filterParameters);
    };

    const handleSubmit = () => {
        navigate(buildUrl());
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
            <OptionsButtonWrapper onClick={() => handleButtonClick(props.title, props.category, props.parameterName)}>
                <TypeTitle>{props.title}</TypeTitle>
            </OptionsButtonWrapper>
        ) : (
            <Sliders parameterName={props.parameterName} />
        );
    }

    function SubmitButton(): React.ReactElement {
        return <SubmitButtonContainer onClick={() => handleSubmit()}>Search</SubmitButtonContainer>;
    }

    function Sliders(props: { parameterName: string }): React.ReactElement {
        const [sliderValue, setSliderValue] = useState<number>(0);

        const handleSliderChange = (e: React.FormEvent<HTMLInputElement>) => {
            setSliderValue(Number(e.currentTarget.value));
            console.log(props.parameterName);
        };

        useEffect(() => {
            const infoObj = { ...filterInfo };
            infoObj[props.parameterName as keyof FilterInfoInterface].value = sliderValue;
            console.log(filterInfo);
        }, [handleSliderChange]);

        return (
            <OptionsSliderWrapper>
                <OptionsSliderInput type="range" min="0" max="100" value={sliderValue} onChange={handleSliderChange} />
                <>{sliderValue}</>
            </OptionsSliderWrapper>
        );
    }

    return (
        <Container>
            <Title>Filters</Title>
            {displayFilters()}
            <SubmitButton />
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
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
const OptionsButtonWrapper = styled.button.attrs({ type: "button" })`
    width: max-content;
    height: 2rem;
    margin: 0 0.1rem;
    padding: 0 0.5rem;
    border: 0.1rem solid transparent;
    &:focus {
        border: 0.1rem solid;
    }
`;
const TypeTitle = styled.h6``;

const SubmitButtonContainer = styled.button.attrs({ type: "button" })`
    width: 4rem;
    height: 2rem;
`;

const OptionsSliderWrapper = styled.div`
    width: 100%;
`;

const OptionsSliderInput = styled.input`
    width: 100%;
`;
