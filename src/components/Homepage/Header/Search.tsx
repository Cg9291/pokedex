import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype.tsx";
import handleSubmit from "../../../functions/utilities/handleSubmit.tsx";

const Container = styled(ContainerPrototype)``;

const Form = styled.form.attrs({
	method: "post",
	onSubmit: handleSubmit,
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
	margin-top: auto;
	padding-left: 1rem;
`;

const Button = styled.button.attrs({ type: "submit" })`
	flex: 1 0 15%;
	border-radius: 10px;
	margin-left: 0.2rem;
`;

export default function Search(): JSX.Element {
	return (
		<Container>
			<Form>
				<Label>
					<Input />
				</Label>
				<Button>Search</Button>
			</Form>
		</Container>
	);
}
