import styled from "styled-components/macro";
import { Slider } from "./Slider";
import { FocusedFilterOptionsInterface, FocusedFilterOptionsKitInterface } from "../../../../pages/FilteredSearch";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";

export function Options(props: {
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
        console.log(props.optionValue);
    };

    const isOptionFocused =
        props.focusedFiltersOptionsKit?.focusedFiltersOptions[
            props.filtersName as keyof FocusedFilterOptionsInterface
        ] === props.optionValue;

    return props.optionStyle === "button" ? (
        <ButtonContainer $isFocused={isOptionFocused ? true : false}>
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
        </ButtonContainer>
    ) : (
        <Slider nameOfParentFilter={props.filtersName} />
    );
}

const ButtonContainer = styled(ContainerPrototype)<{ $isFocused?: boolean }>`
    justify-content: center;
    align-items: center;
    aspect-ratio: 2/1;
    //margin: 0 0.6rem 0.7rem 0;
    //padding: 0 0.5rem;
    border-radius: 7px;
    //border: ${(props) => (props.$isFocused ? "0.1rem solid grey" : "0.1rem solid transparent")};
    background-color: ${(props) => (props.$isFocused ? "rgba(108, 122, 137, 0.23)" : "inherit")};
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
    justify-content: center;
    width: 100%;
    height: 100%;
`;
