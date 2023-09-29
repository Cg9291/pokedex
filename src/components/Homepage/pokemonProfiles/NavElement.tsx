import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype";

const Container = styled(ContainerPrototype)`
	width: 1fr;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

export default function NavElement(props: { value: string }): JSX.Element {
	return <Container>{props.value}</Container>;
}
