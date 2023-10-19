import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype.tsx";
import getPokemonData from "../../../functions/api_calls/getPokemonData.tsx";
import PokemonInterface from "../../../interfaces&types/pokemonInterface.tsx";
import { ObjectPlaceHolderInterface } from "../../../interfaces&types/misc_Interfaces.tsx";

const Container = styled(ContainerPrototype)``;

const Form = styled.form.attrs({
	method: "get",
})`
	width: 100%;
	display: flex;
`;

const Label = styled.label`
	flex: 3 0 85%;
`;

const Input = styled.input.attrs({
	placeholder: "Search anything related to a pokemon",
	name: "myInput",
})`
	width: 100%;
	height: 3rem;
	border-radius: 99px;
	margin: auto;
	padding-left: 1rem;
`;

const Button = styled.button.attrs({ type: "submit" })`
	width: 100%;
	height: 100%;
	border-radius: 10px;
`;

export default function Search(): JSX.Element {
	const navigate = useNavigate();

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<PokemonInterface | ObjectPlaceHolderInterface> => {
		e.preventDefault();
		let data: PokemonInterface | ObjectPlaceHolderInterface = {};
		const formData = new FormData(e.currentTarget);
		const transmittedData = Object.fromEntries(formData.entries()).myInput;
		const name = transmittedData.toString().toLowerCase();

		try {
			data = await getPokemonData(name);
			navigate(`/pokemons/name/${name}`);
		} catch (err) {
			console.log(err);
			navigate(`*`);
		}

		return data;
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Label>
					<Input />
				</Label>
				<Button>Search</Button>
			</Form>
		</Container>
	);
}
