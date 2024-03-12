import React, { useState, useRef } from "react";
import styled from "styled-components/macro";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import { capitalizeWords } from "../../../../functions/utilities/capitalizeWords";
import { InputThumbsRefsInterface } from "../../../../pages/FilteredSearch";

export function Slider(props: { nameOfParentFilter: string }): React.ReactElement {
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
        <SliderContainer>
            <SliderInputContainer>
                <SliderLabel>
                    <SliderInput
                        name={`min${capitalizeWords(props.nameOfParentFilter)}`}
                        type="range"
                        min="0"
                        max={props.nameOfParentFilter === "height" ? 20 : 1000}
                        step={1}
                        value={sliderMinValue}
                        onChange={(e) => handleSliderChange(e)}
                        ref={(node) => (inputThumbsRefs.current.min = node)}
                    />
                </SliderLabel>
                <SliderLabel>
                    <SliderInput
                        name={`max${capitalizeWords(props.nameOfParentFilter)}`}
                        type="range"
                        min="0"
                        max={props.nameOfParentFilter === "height" ? 20 : 1000}
                        step={1}
                        value={sliderMaxValue}
                        onChange={(e) => handleSliderChange(e, true)}
                        ref={(node) => (inputThumbsRefs.current.max = node)}
                    />
                </SliderLabel>
            </SliderInputContainer>
            <ValuesRow>
                <SliderValue>
                    {props.nameOfParentFilter === "height" ? `${sliderMinValue}m` : `${sliderMinValue}kgs`}
                </SliderValue>
                <SliderValue>
                    {props.nameOfParentFilter === "height" ? `${sliderMaxValue}m` : `${sliderMaxValue}kgs`}
                </SliderValue>
            </ValuesRow>
        </SliderContainer>
    );
}

const SliderContainer = styled(ContainerPrototype)`
    flex-direction: column;
    padding: 0 0.1rem;
    overflow-y: hidden;
`;

const SliderInputContainer = styled(ContainerPrototype)`
    //min-height: 1em;
    position: relative;
`;

const SliderLabel = styled.label``;
const SliderInput = styled.input`
    -webkit-appearance: none;
    position: absolute;
    left: 0;
    top: 50%;
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

const ValuesRow = styled(ContainerPrototype)`
    //margin-top: 0.9rem;
    justify-content: space-between;
`;

const SliderValue = styled.div`
    align-self: flex-start;
`;
