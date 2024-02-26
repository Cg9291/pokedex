import styled from "styled-components/macro";
import { pokemonTypesIcons, PokemonTypesIcons } from "../assets";
import * as breakpoints from "../objects/breakpoints";

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
    width: 100%;
    height: 100%;
    flex: 0 1 0;
    aspect-ratio: 1/1;
    background: ${(props) => props.$BgColor};
    box-shadow: ${(props) => props.$BoxShadow};

    svg {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        //overflow: hidden;
    }
`;
