import React, { useState } from "react";
import { Options } from "./Options";
import { capitalizeWords } from "../../../../functions/utilities/capitalizeWords";
import { pokemonGenerationsList } from "../../../../objects/pokemonGenerationsList";
import { typesColors } from "../../../../objects/typesColors";
import { PokemonGenerationsListInterface } from "../../../../interfaces/miscInterfaces";
import { FocusedFilterOptionsInterface, FocusedFilterOptionsKitInterface } from "../../../../pages/FilteredSearch";

export interface myProps {
    styleOfParentFilter: string;
    nameOfParentFilter: string;
}

export function OptionsRow(props: myProps): React.ReactElement {
    const [focusedFiltersOptions, setFocusedFiltersOptions] = useState<FocusedFilterOptionsInterface>({
        generation: null,
        type: null,
        type2: null
    });
    const { styleOfParentFilter, nameOfParentFilter } = props;
    const focusedFiltersOptionsKit: FocusedFilterOptionsKitInterface = {
        focusedFiltersOptions: focusedFiltersOptions,
        setFocusedFiltersOptions: setFocusedFiltersOptions
    };
    const myArr: React.ReactElement[] = [];

    const displayTypeOptions = (): React.ReactElement[] => {
        let keyValue = 0;
        for (const oneType in typesColors) {
            myArr.push(
                <Options
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
    };

    const displayGenerationOptions = (): React.ReactElement[] => {
        return pokemonGenerationsList.map((x: PokemonGenerationsListInterface, index: number) => (
            <Options
                key={index}
                optionValue={capitalizeWords(`${x.generation}`)}
                optionStyle={styleOfParentFilter}
                filtersName={nameOfParentFilter}
                focusedFiltersOptionsKit={focusedFiltersOptionsKit}
            />
        ));
    };

    const sliderOption: React.ReactElement = (
        <Options optionStyle={styleOfParentFilter} optionValue="Slider" filtersName={nameOfParentFilter} />
    );

    const inputStyle = {
        typeButton: styleOfParentFilter === "button" && nameOfParentFilter.includes("type"),
        generationButton: styleOfParentFilter === "button" && nameOfParentFilter === "generation",
        slider: styleOfParentFilter === "slider"
    };

    return (
        <>
            {inputStyle.typeButton ? (
                displayTypeOptions()
            ) : inputStyle.generationButton ? (
                displayGenerationOptions()
            ) : inputStyle.slider ? (
                sliderOption
            ) : (
                <></>
            )}
        </>
    );
}
