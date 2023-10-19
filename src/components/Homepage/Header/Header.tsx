import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype.tsx";
import Search from "./Search.tsx";
import RandomizeSelectionButton from "./RandomizeSelectionButton.tsx";

const Container = styled(ContainerPrototype)`
	max-height: 13rem;
	flex-direction: column;
	justify-content: center;
	background-color: darkred;
	padding: 0.5rem 0.5rem;
	border-bottom-left-radius: 25px;
	border-bottom-right-radius: 25px;
	position: fixed;
`;

const HeaderText = styled.h2`
	height: fit-content;
	margin-top: 3.7rem;
	max-width: 85%;
	color: white;
	text-align: start;
	padding:0 0 1rem;
`;

export default function Header(): JSX.Element {
	return (
		<Container>
			<RandomizeSelectionButton />
			<HeaderText>
				What Pokemon
				<br /> would you like to find?
			</HeaderText>
			<Search />
		</Container>
	);
}
