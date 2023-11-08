import React, { useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import { useNavigate } from "react-router-dom";
import { FilterInfoInterface, PokemonGenerationsListInterface } from "../../interfaces/miscInterfaces";
import { typesColors } from "../../objects/typesColors";
import { capitalizeWords } from "../../functions/utilities/capitalizeWords";
import { pokemonGenerationsList } from "../../objects/pokemonGenerationsList";

export function FilteredSearchModal(): React.ReactElement {
    const [filterInfo] = useState<FilterInfoInterface>({
        generation: { name: "generation", style: "button" },
        type: { name: "type", style: "button" },
        type2: { name: "type2", style: "button" },
        height: { name: "height", style: "slider" },
        weight: { name: "weight", style: "slider" }
    });

    interface LocalTransmittedDataInterface {
        generation?: string;
        type?: string;
        type2?: string;
        height?: string;
        weight?: string;
    }
    const [, setTransmittedData] = useState<LocalTransmittedDataInterface>();
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
        //e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const localTransmittedData = Object.fromEntries(formData.entries());
        setTransmittedData(localTransmittedData);
        navigate(buildUrl(localTransmittedData));
    };

    //DISPLAY/MAP/HYBRID FUNCTIONS
    const displayFilters = (): React.ReactElement[] => {
        const myArr: React.ReactElement[] = [];

        for (const parameter in filterInfo) {
            const parameterStyle = filterInfo[parameter as keyof FilterInfoInterface].style;
            const parameterName = filterInfo[parameter as keyof FilterInfoInterface].name;

            myArr.push(<Filters parameter={parameter} parameterStyle={parameterStyle} parameterName={parameterName} />);
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
                        title={capitalizeWords(`${x.generation}`)}
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
    function Filters(props: { parameter: string; parameterStyle: string; parameterName: string }): React.ReactElement {
        return (
            <ContainerOfFilters>
                <HeadersOfFilters title={capitalizeWords(props.parameter)} />
                <OptionsContainer>{displayOptions(props.parameterStyle, props.parameterName)}</OptionsContainer>
            </ContainerOfFilters>
        );
    }

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
                    {props.parameterName === "generation" ? (
                        <>
                            <OptionTitle>{` Generation ${Number(props.title)}`}</OptionTitle>
                            <ButtonInput name={props.parameterName} value={props.title} required />
                        </>
                    ) : (
                        <>
                            <OptionTitle>{props.title}</OptionTitle>
                            <ButtonInput name={props.parameterName} value={props.title} />
                        </>
                    )}
                </OptionsButtonLabel>
            </OptionsButtonContainer>
        ) : (
            <Sliders parameterName={props.parameterName} />
        );
    }

    function Sliders(props: { parameterName: string }): React.ReactElement {
        const [sliderValue, setSliderValue] = useState<number>(0);

        const handleSliderChange = (e: React.FormEvent<HTMLInputElement>) => {
            setSliderValue(Number(e.currentTarget.value));
        };

        return (
            <OptionsSliderContainer>
                <OptionsSliderLabel>
                    <OptionsSliderInput
                        name={props.parameterName}
                        type="range"
                        min="0"
                        max={props.parameterName === "height" ? 20 : 1000}
                        step={1}
                        value={sliderValue}
                        onChange={handleSliderChange}
                    />
                    <>{props.parameterName === "height" ? `${sliderValue}m` : `${sliderValue}kgs`}</>
                </OptionsSliderLabel>
            </OptionsSliderContainer>
        );
    }

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
`;

const Form = styled.form.attrs({
    method: "get",
    encType: "multipart/form-data"
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
    flex-direction: column;
    width: inherit;
    height: inherit;
`;

const ButtonInput = styled.input.attrs({ type: "radio" })`
    /*    height: 0;
    width: 0; */
`;

const OptionTitle = styled.h6`
    width: 100%;
    height: 100%;
`;

const SubmitButtonContainer = styled.button.attrs({ type: "submit" })`
    width: 4rem;
    height: 2rem;
`;

const OptionsSliderLabel = styled.label`
    width: inherit;
    height: inherit;
`;
const OptionsSliderContainer = styled.div`
    width: 100%;
`;

const OptionsSliderInput = styled.input`
    width: 100%;
`;
