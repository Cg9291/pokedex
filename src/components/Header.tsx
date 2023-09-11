import styled from "styled-components";
import PrototypeContainer from "./PrototypeContainer";

const Container = styled(PrototypeContainer)`
	height: 15rem;
	flex-direction: column;
	justify-content: center;
	background-color: darkred;
	padding: 0.5rem 1rem;
`;

const HeaderText = styled.h2`
	height: fit-content;
	margin-top: 7rem;
	color: white;
	text-align: start;
`;

const Input = styled.input`
	width: 75%;
	height: 3rem;
	border-radius: 99px;
	margin-top: auto;
	padding-left: 1rem;
`;

export default function Header(): JSX.Element {
	return (
		<Container>
			<HeaderText>What pokemon would you like to find?</HeaderText>
			<Input placeholder="Search anything related to a pokemon" />
		</Container>
	);
}
