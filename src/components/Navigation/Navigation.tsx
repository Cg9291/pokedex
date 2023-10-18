import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";
import { Link } from "react-router-dom";

const Container = styled(ContainerPrototype)`
	height: 9%;
	background-color: white;
	position: fixed;
	bottom: 0;
	padding: 2.5% 0;
`;

const NavElementContainer = styled(Link)`
	display: flex;
	width: 100%;
	text-decoration: none;
	color: black;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	overflow-y: hidden;
`;

const NavElementName = styled.span`
	display: flex;
	align-items: center;
	font-size: 0.8em;
	height: fit-content;
`;

const SvgImg = styled.svg.attrs({ viewBox: "0 0 24 24" })`
	min-height: 60%;
`;
const SvgPath = styled.path`
	width: 200;
	aspect-ratio: 1/1;
	fill: black;
	color: yellow;
`;

type NavIconsType = { name: string; path: string; linkUrl: string }[];

export default function Navigation(): JSX.Element {
	const navIcons: NavIconsType = [
		{
			name: "Home",
			path: "M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z",
			linkUrl: "/",
		},
		{
			name: "Wtp",
			path: "M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z",
			linkUrl: "/wtp",
		},
		{
			name: "Favorites",
			path: "M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z",
			linkUrl: "/favorites",
		},
	];

	const displayNavIcons = () =>
		navIcons.map(icon => (
			<NavElement
				name={icon.name}
				pathInfo={icon.path}
				linkUrl={icon.linkUrl}
			/>
		));

	return <Container>{displayNavIcons()}</Container>;
}

function NavElement(props: {
	name: string;
	pathInfo: string;
	linkUrl: string;
}): JSX.Element {
	return (
		<NavElementContainer to={props.linkUrl}>
			<SvgImg>
				<SvgPath d={props.pathInfo}></SvgPath>
			</SvgImg>
			<NavElementName>{props.name}</NavElementName>
		</NavElementContainer>
	);
}
