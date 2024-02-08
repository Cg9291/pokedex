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
    border-radius: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    margin: ${(props) => (props.$whereUsed === "homepage" ? " 0 0.1rem 0 0" : "0 0.5rem 0 0")};
    background: ${(props) => props.$BgColor};
    box-shadow: ${(props) => props.$BoxShadow};

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        margin: 0 0.5rem 0 0;
    }

    svg {
        height: 60%;
        width: 60%;
        margin: 20%;
    }
`;
