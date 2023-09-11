import styled from "styled-components";
import PrototypeContainer from "./PrototypeContainer.tsx";
import Header from "./Header.tsx";

const Container = styled(PrototypeContainer)``;

export default function Homepage(): JSX.Element {
	return (
		<Container>
			<Header />
		</Container>
	);
}
