import styled from "styled-components/macro";
import { pokemonTypesIcons, PokemonTypesIcons } from "../assets";
/* import * as breakpoints from "../objects/breakpoints"; */
import { whereUsedValues } from "../objects/whereUsedValues";

export function SvgIcon(props: { pokeType: string; whereUsed?: string }): React.ReactElement {
    {
        return props.pokeType !== "none" ? (
            <Container
                $BgColor={pokemonTypesIcons[props.pokeType as keyof PokemonTypesIcons].styling.background}
                $BoxShadow={pokemonTypesIcons[props.pokeType as keyof PokemonTypesIcons].styling.boxShadow}
                $whereUsed={props.whereUsed}
            >
                {pokemonTypesIcons[props.pokeType as keyof PokemonTypesIcons].icon}
            </Container>
        ) : (
            <></>
        );
    }
}

const Container = styled.div<{ $BgColor: string; $BoxShadow: string; $whereUsed?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    height: 100%;
    max-height: ${(props) => props.$whereUsed !== whereUsedValues.aboutSection.maintype && " 7.9vw"};
    aspect-ratio: 1/1;
    background: ${(props) => props.$BgColor};
    box-shadow: ${(props) => props.$BoxShadow};
    padding: 0;

    svg {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
`;
