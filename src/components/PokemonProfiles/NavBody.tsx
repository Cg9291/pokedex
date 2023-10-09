import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";

import styled from "styled-components";

const Container = styled(ContainerPrototype)`
	background-color: red;
`;

export default function NavBody(props: { children: any }): JSX.Element {
	return <Container>{props.children}</Container>;
}
