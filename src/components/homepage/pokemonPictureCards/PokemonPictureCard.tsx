import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype";
import PokemonTypesElement from "./PokemonTypesElement";

import GetPokemonData from "../../../functions/api/GetPokemonData";
import capitalizeWords from "../../../functions/utilities/capitalizeWords";
import { PokemonNumberPropsInterface, TypesColorsInt } from "../../../interfaces/miscInterfaces";
import PokemonInterface, { Type } from "../../../interfaces/pokemonInterface";
import typesColors from "../../../objects/typesColors";

export default function PokemonPictureCard(props: PokemonNumberPropsInterface): React.ReactElement {
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInterface>();

    async function getData(pokeNumber: number): Promise<void> {
        try {
            const data: PokemonInterface = await GetPokemonData(pokeNumber);
            setPokemonInfo(data);
        } catch (err) {
            console.log(err);
            return;
        }
    }

    useEffect(() => {
        getData(props.id);
    }, []);

    const renderPokemonTypes = (typesArray: Type[]): JSX.Element[] =>
        typesArray.reverse().map((x: Type) => <PokemonTypesElement typeName={capitalizeWords(x.type.name)} />);

    return (
        <Container
            to={`/pokemons/id/${pokemonInfo?.id}`}
            $mainType={pokemonInfo ? pokemonInfo.types[0].type.name : "unavailable"}
        >
            <Wrapper>
                <PokeName>{pokemonInfo?.name && capitalizeWords(pokemonInfo.name)}</PokeName>
                <SubContainer>
                    <PokemonTypesContainer>
                        {pokemonInfo?.types && renderPokemonTypes(pokemonInfo.types)}
                    </PokemonTypesContainer>
                    <PokemonImgWrapper>
                        {pokemonInfo?.sprites && (
                            <SvgImg>
                                <PokemonImg
                                    href={pokemonInfo.sprites.front_default}
                                    /* 	alt="a pokemon image" */
                                    width="325"
                                    height="325" //move these to attrs
                                />
                            </SvgImg>
                        )}
                    </PokemonImgWrapper>
                </SubContainer>
            </Wrapper>
        </Container>
    );
}

const Container = styled(Link)<{ $mainType: string }>`
    width: 45%;
    height: 19vh;
    padding: 0.5rem;
    border-radius: 25px;
    text-decoration: none;
    background-color: ${(props) => typesColors[props.$mainType as keyof TypesColorsInt]};
`;

const Wrapper = styled(ContainerPrototype)`
    display: flex;
    flex-direction: column;
    border-radius: 25px;
`;

const PokeName = styled.h3`
    height: 20%;
    color: white;
`;

const SubContainer = styled(ContainerPrototype)``;

const PokemonTypesContainer = styled(ContainerPrototype)`
    width: 50%;
    flex-direction: column;
    justify-content: end;
`;

const PokemonImgWrapper = styled.div`
    width: 50%;
`;

const SvgImg = styled.svg.attrs({ viewBox: "50 50 200 200" })`
    width: 100%;
    height: 100%;
`;
const PokemonImg = styled.image`
    width: 300px; // [NOTE] I dont know what you mean by 200 so I put px
    aspect-ratio: 1/1;
`;
