import styled from "styled-components/macro";
import { pokemonTypesIcons, PokemonTypesIcons } from "../assets";

export function SvgIcon(props: { pokeType: string }): React.ReactElement {
    return (
        <Container
            $BgColor={pokemonTypesIcons[props.pokeType.toLowerCase() as keyof PokemonTypesIcons].styling.background}
            $BoxShadow={pokemonTypesIcons[props.pokeType.toLowerCase() as keyof PokemonTypesIcons].styling.boxShadow}
        >
            {pokemonTypesIcons[props.pokeType.toLowerCase() as keyof PokemonTypesIcons].icon}
        </Container>
    );
}

const Container = styled.div<{ $BgColor: string; $BoxShadow: string }>`
    border-radius: 100%;
    height: 100px;
    width: 100px;
    margin: auto;
    background: ${(props) => props.$BgColor};
    box-shadow: ${(props) => props.$BoxShadow};

    svg {
        height: 60%;
        width: 60%;
        margin: 20%;
    }
`;
