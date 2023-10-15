import styled from "styled-components";

const TypePrototype = styled.div<{ $bgColor: string }>`
	margin: 0 1rem 0.5rem 0;
	padding: 0.2rem 1rem;
	background-color: ${props => props.$bgColor};
	border-radius: 50px;
`;

export default TypePrototype;
