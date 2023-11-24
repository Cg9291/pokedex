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
        console.log(localTransmittedData);
        setTransmittedData(localTransmittedData);
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

    const displayOptions = (styleOfParentFilter: string, nameOfParentFilter: string) => {
        const myArr: React.ReactElement[] = [];

        if (styleOfParentFilter === "button") {
            if (nameOfParentFilter.includes("type")) {
                let keyValue = 0;
                for (const oneType in typesColors) {
                    myArr.push(
                        <OptionsOfFilters
                            key={keyValue}
                            optionValue={capitalizeWords(oneType)}
                            optionStyle={styleOfParentFilter}
                            nameOfParentFilter={nameOfParentFilter}
                        />
                    );
                    keyValue++;
                }
                return myArr;
            } else if (nameOfParentFilter === "generation") {
                return pokemonGenerationsList.map((x: PokemonGenerationsListInterface, index: number) => (
                    <OptionsOfFilters
                        key={index}
                        optionValue={capitalizeWords(`${x.generation}`)}
                        optionStyle={styleOfParentFilter}
                        nameOfParentFilter={nameOfParentFilter}
                    />
                ));
            }
        } else if (styleOfParentFilter === "slider") {
            return (
                <OptionsOfFilters
                    optionStyle={styleOfParentFilter}
                    optionValue="Slider"
                    nameOfParentFilter={nameOfParentFilter}
                />
            );
        }
    };

    //JSX COMPONENTS
    function Filters(props: { styleOfFilter: string; nameOfFilter: string }): React.ReactElement {
        return (
            <ContainerOfFilters>
                <HeadersOfFilters headerValue={capitalizeWords(props.nameOfFilter)} />
                <OptionsContainer>{displayOptions(props.styleOfFilter, props.nameOfFilter)}</OptionsContainer>
            </ContainerOfFilters>
        );
    }

    function HeadersOfFilters(props: { headerValue: string }): React.ReactElement {
        return (
            <ContainerOfHeadersOfFilters>
                <ValueOfHeadersOfFilters>{props.headerValue}</ValueOfHeadersOfFilters>
            </ContainerOfHeadersOfFilters>
        );
    }

    function OptionsOfFilters(props: {
        optionValue: string;
        optionStyle: string;
        nameOfParentFilter: string;
    }): React.ReactElement {
        return props.optionStyle === "button" ? (
            <OptionsButtonContainer>
                <OptionsButtonLabel>
                    {props.nameOfParentFilter === "generation" ? (
                        <>
                            <OptionValue>{` Generation ${Number(props.optionValue)}`}</OptionValue>
                            <ButtonInput name={props.nameOfParentFilter} value={props.optionValue} required />
                        </>
                    ) : (
                        <>
                            <OptionValue>{props.optionValue}</OptionValue>
                            <ButtonInput name={props.nameOfParentFilter} value={props.optionValue} />
                        </>
                    )}
                </OptionsButtonLabel>
            </OptionsButtonContainer>
        ) : (
            <Sliders nameOfParentFilter={props.nameOfParentFilter} />
        );
    }

    function Sliders(props: { nameOfParentFilter: string }): React.ReactElement {
        const [sliderMinValue, setSliderMinValue] = useState<number>(0);
        const [sliderMaxValue, setSliderMaxValue] = useState<number>(props.nameOfParentFilter === "height" ? 20 : 1000);

        const handleSliderMinChange = (e: React.FormEvent<HTMLInputElement>, isSliderMax?: boolean) => {
            isSliderMax
                ? setSliderMaxValue(Number(e.currentTarget.value))
                : setSliderMinValue(Number(e.currentTarget.value));
        };

        return (
            <OptionsSliderContainer>
                <OptionsSliderLabel>
                    <OptionsSliderInput
                        name={`min${capitalizeWords(props.nameOfParentFilter)}`}
                        type="range"
                        min="0"
                        max={props.nameOfParentFilter === "height" ? 20 : 1000}
                        step={1}
                        value={sliderMinValue}
                        onChange={(e) => handleSliderMinChange(e)}
                    />
                </OptionsSliderLabel>
                <OptionsSliderLabel>
                    <OptionsSliderInput
                        name={`max${capitalizeWords(props.nameOfParentFilter)}`}
                        type="range"
                        min="0"
                        max={props.nameOfParentFilter === "height" ? 20 : 1000}
                        step={1}
                        value={sliderMaxValue}
                        onChange={(e) => handleSliderMinChange(e, true)}
                    />
                </OptionsSliderLabel>
                <OptionsSliderValuesRow>
                    <OptionsSliderValue>
                        {props.nameOfParentFilter === "height" ? `${sliderMinValue}m` : `${sliderMinValue}kgs`}
                    </OptionsSliderValue>
                    <OptionsSliderValue>
                        {props.nameOfParentFilter === "height" ? `${sliderMaxValue}m` : `${sliderMaxValue}kgs`}
                    </OptionsSliderValue>
                </OptionsSliderValuesRow>
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
    position: absolute;
    flex-direction: column;
    z-index: 2;
    height: 100vh;
    width: 100%;
    background-color: white;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    padding: 0 1rem 5rem;
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
    margin: 1rem 0 0 1rem;
`;
const ContainerOfFilters = styled(ContainerPrototype)`
    height: 5rem;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    flex-direction: column;
    border: 0.1rem solid red;
`;
const ContainerOfHeadersOfFilters = styled.div``;
const ValueOfHeadersOfFilters = styled.h5`
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

const OptionValue = styled.h6`
    width: 100%;
    height: 100%;
`;

const SubmitButtonContainer = styled.button.attrs({ type: "submit" })`
    width: 4rem;
    height: 2rem;
    justify-self: flex-end;
    margin-top: auto;
`;

const OptionsSliderLabel = styled.label`
    max-width: 100%;
    width: 100%;
    height: 1em;
    background-color: grey;
    display: flex;
    align-items: center;
    position: absolute;
`;

const OptionsSliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    //overflow-x: hidden;
`;

const OptionsSliderInput = styled.input`
    position: absolute;
    margin-top: 0.5rem;
    width: 100%;
    pointer-events: none;

    &::-webkit-slider-runnable-track,
    & {
        -webkit-appearance: none;
    }

    background: none; /* get rid of white Chrome background */
    color: #000;
    font: inherit; /* fix too small font-size in both Chrome & Firefox */
    margin: 0;
    pointer-events: none; /* let clicks pass through */

    &::-webkit-slider-thumb {
        pointer-events: auto;
    }
`;

const OptionsSliderValuesRow = styled(ContainerPrototype)`
    justify-content: space-between;
`;

const OptionsSliderValue = styled.div`
    align-self: flex-start;
    /* background-color: blue; */
`;
