import styled from "styled-components/macro";
import { pokemonTypesIcons, PokemonTypesIcons } from "../assets";

export function SvgIcon(props: { pokeType: string }): React.ReactElement {
    {
        return props.pokeType !== "none" ? (
            <Container
                $BgColor={pokemonTypesIcons[props.pokeType as keyof PokemonTypesIcons].styling.background}
                $BoxShadow={pokemonTypesIcons[props.pokeType as keyof PokemonTypesIcons].styling.boxShadow}
            >
                {pokemonTypesIcons[props.pokeType as keyof PokemonTypesIcons].icon}
            </Container>
        ) : (
            <></>
        );
    }
}

const Container = styled.div<{ $BgColor: string; $BoxShadow: string }>`
    border-radius: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    //width: 1.5rem;
    margin: 0 0.5rem 0 0;
    background: ${(props) => props.$BgColor};
    box-shadow: ${(props) => props.$BoxShadow};

    svg {
        height: 60%;
        width: 60%;
        margin: 20%;
    }
`;
