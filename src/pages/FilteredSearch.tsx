import React, { useRef, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { useNavigate } from "react-router-dom";
import { FilterInfoInterface, PokemonGenerationsListInterface } from "../interfaces/miscInterfaces";
import { typesColors } from "../objects/typesColors";
import { capitalizeWords } from "../functions/utilities/capitalizeWords";
import { pokemonGenerationsList } from "../objects/pokemonGenerationsList";
import { Interface } from "readline";

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

export function FilteredSearchModal(): React.ReactElement {
    const [filterInfo] = useState<FilterInfoInterface>({
        generation: { name: "generation", style: "button" },
        type: { name: "type", style: "button" },
        type2: { name: "type2", style: "button" },
        height: { name: "height", style: "slider" },
        weight: { name: "weight", style: "slider" }
    });

    const [focusedFiltersOptions, setFocusedFiltersOptions] = useState<FocusedFilterOptionsInterface>({
        generation: null,
        type: null,
        type2: null
    });

    const focusedFiltersOptionsKit: FocusedFilterOptionsKitInterface = {
        focusedFiltersOptions: focusedFiltersOptions,
        setFocusedFiltersOptions: setFocusedFiltersOptions
    };

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

    const displayOptions = (styleOfParentFilter: string, nameOfParentFilter: string) => {
        const myArr: React.ReactElement[] = [];

        if (styleOfParentFilter === "button") {
            if (nameOfParentFilter.includes("type")) {
                let keyValue = 0;
                for (const oneType in typesColors) {
                    myArr.push(
                        <FiltersOption
                            key={keyValue}
                            optionValue={capitalizeWords(oneType)}
                            optionStyle={styleOfParentFilter}
                            filtersName={nameOfParentFilter}
                            focusedFiltersOptionsKit={focusedFiltersOptionsKit}
                        />
                    );
                    keyValue++;
                }
                return myArr;
            } else if (nameOfParentFilter === "generation") {
                return pokemonGenerationsList.map((x: PokemonGenerationsListInterface, index: number) => (
                    <FiltersOption
                        key={index}
                        optionValue={capitalizeWords(`${x.generation}`)}
                        optionStyle={styleOfParentFilter}
                        filtersName={nameOfParentFilter}
                        focusedFiltersOptionsKit={focusedFiltersOptionsKit}
                    />
                ));
            }
        } else if (styleOfParentFilter === "slider") {
            return (
                <FiltersOption
                    optionStyle={styleOfParentFilter}
                    optionValue="Slider"
                    filtersName={nameOfParentFilter}
                />
            );
        }
    };

    //JSX COMPONENTS
    function Filters(props: { styleOfFilter: string; nameOfFilter: string }): React.ReactElement {
        //const focusedElements = { generation };
        return (
            <FiltersContainer>
                <FiltersHeader headerValue={capitalizeWords(props.nameOfFilter)} />
                <OptionsContainer>{displayOptions(props.styleOfFilter, props.nameOfFilter)}</OptionsContainer>
            </FiltersContainer>
        );
    }

    function FiltersHeader(props: { headerValue: string }): React.ReactElement {
        return (
            <FiltersHeadersContainer>
                <FiltersHeadersValue>{props.headerValue}</FiltersHeadersValue>
            </FiltersHeadersContainer>
        );
    }

    function FiltersOption(props: {
        optionValue: string;
        optionStyle: string;
        filtersName: string;
        focusedFiltersOptionsKit?: FocusedFilterOptionsKitInterface;
    }): React.ReactElement {
        const handleClick = () => {
            props.focusedFiltersOptionsKit?.setFocusedFiltersOptions({
                ...props.focusedFiltersOptionsKit.focusedFiltersOptions,
                [props.filtersName]: props.optionValue
            });
        };

        const isOptionFocused =
            props.focusedFiltersOptionsKit?.focusedFiltersOptions[
                props.filtersName as keyof FocusedFilterOptionsInterface
            ] === props.optionValue;

        return props.optionStyle === "button" ? (
            <OptionsButtonContainer $isFocused={isOptionFocused ? true : false}>
                <OptionsButtonLabel>
                    {props.filtersName === "generation" ? (
                        <>
                            <OptionValue>{` Generation ${Number(props.optionValue)}`}</OptionValue>
                            <ButtonInput
                                name={props.filtersName}
                                value={props.optionValue}
                                checked={isOptionFocused ? true : false}
                                onClick={handleClick}
                                readOnly //this is necessary because the input has a checked attribute whose changes are handled not by the onchange event but the onclick event + state
                                required
                            />
                        </>
                    ) : (
                        <>
                            <OptionValue>{props.optionValue}</OptionValue>
                            <ButtonInput
                                name={props.filtersName}
                                value={props.optionValue}
                                checked={isOptionFocused ? true : false}
                                onClick={handleClick}
                                readOnly //this is necessary because the input has a checked attribute whose changes are handled not by the onchange event but the onclick event + state
                            />
                        </>
                    )}
                </OptionsButtonLabel>
            </OptionsButtonContainer>
        ) : (
            <Sliders nameOfParentFilter={props.filtersName} />
        );
    }

    function Sliders(props: { nameOfParentFilter: string }): React.ReactElement {
        const [sliderMinValue, setSliderMinValue] = useState<number>(0);
        const [sliderMaxValue, setSliderMaxValue] = useState<number>(props.nameOfParentFilter === "height" ? 20 : 1000);
        const inputThumbsRefs = useRef<InputThumbsRefsInterface>({ min: null, max: null });

        const handleSliderChange = (e: React.FormEvent<HTMLInputElement>, isSliderMax?: boolean) => {
            const currentSliderValue = Number(e.currentTarget.value);
            if (isSliderMax) {
                if (currentSliderValue > sliderMinValue) {
                    setSliderMaxValue(currentSliderValue);
                } else {
                    inputThumbsRefs.current.max?.focus();
                    setSliderMaxValue(currentSliderValue);
                    setSliderMinValue(currentSliderValue);
                }
            } else {
                if (currentSliderValue < sliderMaxValue) {
                    setSliderMinValue(currentSliderValue);
                } else {
                    inputThumbsRefs.current.min?.focus();
                    setSliderMinValue(currentSliderValue);
                    setSliderMaxValue(currentSliderValue);
                }
            }
        };

        return (
            <OptionsSliderContainer>
                <OptionsSliderInputContainer>
                    <OptionsSliderLabel>
                        <OptionsSliderInput
                            name={`min${capitalizeWords(props.nameOfParentFilter)}`}
                            type="range"
                            min="0"
                            max={props.nameOfParentFilter === "height" ? 20 : 1000}
                            step={1}
                            value={sliderMinValue}
                            onChange={(e) => handleSliderChange(e)}
                            ref={(node) => (inputThumbsRefs.current.min = node)}
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
                            onChange={(e) => handleSliderChange(e, true)}
                            ref={(node) => (inputThumbsRefs.current.max = node)}
                        />
                    </OptionsSliderLabel>
                </OptionsSliderInputContainer>
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
`;
const FiltersHeadersValue = styled.h5`
    //margin: 1rem 0 0 1rem;
`;

const OptionsContainer = styled(ContainerPrototype)`
    max-width: 100%;
    height: max-content;
    overflow-x: scroll;
    padding: 0.5rem 0.5rem 0 0.5rem;
`;

const OptionsButtonContainer = styled.div<{ $isFocused?: boolean }>`
    display: flex;
    align-items: center;
    width: max-content;
    height: 2rem;
    margin: 0 0.6rem 0.7rem 0;
    padding: 0 0.5rem;
    border-radius: 7px;
    border: 0.1rem solid grey;
    background-color: ${(props) => (props.$isFocused ? "lightgrey" : "inherit")};
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
    display: none;
    /* opacity: 0; */
    pointer-events: none;
`;

const OptionValue = styled.h6`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const SubmitButtonContainer = styled.button.attrs({ type: "submit" })`
    width: 20rem;
    height: 20rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 12px;
    background-color: gold;
`;

const OptionsSliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 0.1rem;
`;

const OptionsSliderInputContainer = styled.div`
    min-height: 1em;
    position: relative;
`;

const OptionsSliderLabel = styled.label`
    /*     position: absolute;
    top: 0;
    min-width: 100%;
    max-width: 100%;
    width: inherit;
    height: 1em;

    -webkit-appearance: none;
    display: flex;
    align-items: center;
    z-index: 0;
    min-height: 100%;
    background-color: grey; */
`;
const OptionsSliderInput = styled.input`
    -webkit-appearance: none;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    pointer-events: none;
    background: none; /* get rid of white Chrome background */
    color: #000;
    font: inherit; /* fix too small font-size in both Chrome & Firefox */
    margin: 0;
    pointer-events: none; /* let clicks pass through */

    &::-webkit-slider-runnable-track,
    & {
        -webkit-appearance: none;
        background: grey;
        height: 0.2em;
        width: 100%;
        cursor: pointer;
        border-radius: 1px;
        border: 0;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        position: relative;
        z-index: 1;
        height: 1em;
        width: 1em;
        border-radius: 25px;
        pointer-events: auto;
        position: relative;
        margin-top: -0.45em;
        cursor: pointer;
        background-color: orange;
    }

    &:focus {
        &::-webkit-slider-thumb {
            z-index: 2;
            //background-color: green;
        }
    }
`;

const OptionsSliderValuesRow = styled(ContainerPrototype)`
    margin-top: 0.9rem;
    justify-content: space-between;
`;

const OptionsSliderValue = styled.div`
    align-self: flex-start;
`;
