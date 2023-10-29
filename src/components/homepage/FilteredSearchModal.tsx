import React, { useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import { useNavigate, useParams } from "react-router-dom";
import { FilterInfoInterface } from "../../interfaces/miscInterfaces";
import { typesColors } from "../../objects/typesColors";
import { capitalizeWords } from "../../functions/utilities/capitalizeWords";

export function FilteredSearchModal(): React.ReactElement {
    const [filterInfo, setFilterInfo] = useState<FilterInfoInterface>({
        type: { name: "type", value: undefined },
        type2: { name: "type2", value: undefined }
    });
    const { gen } = useParams();
    const filterParameters = { ...filterInfo };
    const navigate = useNavigate();

    /*  const getData = async (pokeGen: number): Promise<void> => {
        try {
            const generationData: GenerationsInterface = await getGenerationsData(pokeGen);
            const pokemonSpecies: PokemonSpecy[] = generationData.pokemon_species;
            console.log("ps", pokemonSpecies);
            const generationPokemonList: { name: string; id: number; types: Type[] }[] = await Promise.all(
                pokemonSpecies.map(async (x: PokemonSpecy) => await getPokemonNameAndTypes(x.name))
            );
            setMyState(generationPokemonList);
        } catch (err) {
            console.log(err);
            return;
        }
    }; */

    /*  useEffect(() => {
        getData(Number(gen));
    }, [gen]); */

    /*     const applyFilter = () => {
        if (myState) {
            return myState
                .filter((x) => x.types[0].type.name === filterInfo.type && x.types[1]?.type.name === filterInfo.type2)
                .map((y) => <PokemonPictureCard id={y.id} />);
        }
    }; */

    const displayFilters = () => {
        const myArr: React.ReactElement[] = [];
        for (const param in filterInfo) {
            myArr.push(
                <FiltersContainer>
                    <FiltersHeaders title={capitalizeWords(param)} />
                    <TypesContainer> {displayTypesOptions(param)}</TypesContainer>
                </FiltersContainer>
            );
        }
        return myArr;
    };

    const displayTypesOptions = (categoryParam: string) => {
        const myArr: React.ReactElement[] = [];
        for (const oneType in typesColors) {
            myArr.push(<TypesOptions title={capitalizeWords(oneType)} category={categoryParam} />);
        }
        return myArr;
    };

    const handleButtonClick = (buttonTitle: string, buttonCategory: string): void => {
        filterParameters[buttonCategory as keyof typeof filterParameters].value = buttonTitle;
    };

    const handleSubmit = (/* e: React.FormEvent<HTMLFormElement> */) => {
        //e.preventDefault();
        console.log("fff", filterParameters);
        navigate(
            `/filtered-search/${filterParameters.type.name}/${filterParameters.type.value}/${filterParameters.type2.name}/${filterParameters.type2.value}`
        );
    };

    function FiltersHeaders(props: { title: string }): React.ReactElement {
        return (
            <FiltersHeadersContainer>
                <FiltersHeadersTitle>{props.title}</FiltersHeadersTitle>
            </FiltersHeadersContainer>
        );
    }

    function TypesOptions(props: { title: string; category: string }): React.ReactElement {
        return (
            <TypeWrapper onClick={() => handleButtonClick(props.title, props.category)}>
                <TypeTitle>{props.title}</TypeTitle>
            </TypeWrapper>
        );
    }

    function SubmitButton(): React.ReactElement {
        return <SubmitButtonContainer onClick={() => handleSubmit()}>Search</SubmitButtonContainer>;
    }

    return (
        <Container>
            <Title>Filters</Title>
            {displayFilters()}
            <SubmitButton />
        </Container>
    );
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
`;
const Title = styled.h3`
    margin: 1rem 0 0 1rem;
`;
const FiltersContainer = styled(ContainerPrototype)`
    height: 5rem;
    flex-direction: column;
    border: 0.1rem solid red;
`;
const FiltersHeadersContainer = styled.div``;
const FiltersHeadersTitle = styled.h5`
    margin: 1rem 0 0 1rem;
`;

const TypesContainer = styled(ContainerPrototype)`
    max-width: 100%;
    height: 3rem;
    overflow-x: scroll;
`;
const TypeWrapper = styled.button.attrs({ type: "button" })`
    width: max-content;
    height: 2rem;
    margin: 0 0.1rem;
    padding: 0 0.5rem;
    border: 0.1rem solid transparent;
    &:focus {
        border: 0.1rem solid;
    }
`;
const TypeTitle = styled.h6``;

const SubmitButtonContainer = styled.button.attrs({ type: "button" })`
    width: 4rem;
    height: 2rem;
`;
