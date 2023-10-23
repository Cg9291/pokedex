import ContainerPrototype from "../prototypes/ContainerPrototype";
import { Link } from "react-router-dom";
import styled from "styled-components";

import pokeBallIcon from "../../assets/icons8-pokeball-100.png";
import homeIcon from "../../assets/icons8-home-100.png";
import WTPIcon from "../../assets/icons8-egg-pokemon-100.png";

type NavIconsType = { name: string; icon: string; linkUrl: string }[];

export default function Navigation(): React.ReactElement {
    const navIcons: NavIconsType = [
        {
            name: "Home",
            icon: homeIcon,
            linkUrl: "/"
        },
        {
            name: "Wtp",
            icon: WTPIcon,
            linkUrl: "/wtp"
        },
        {
            name: "Favorites",
            icon: pokeBallIcon,
            linkUrl: "/favorites"
        }
    ];

    const displayNavIcons = () =>
        navIcons.map((icon) => <NavElement name={icon.name} iconInfo={icon.icon} linkUrl={icon.linkUrl} />);

    return <Container>{displayNavIcons()}</Container>;
}

function NavElement(props: { name: string; iconInfo: string; linkUrl: string }): React.ReactElement {
    return (
        <NavElementContainer to={props.linkUrl}>
            <SvgImg>
                {/* <SvgPath d={props.pathInfo}></SvgPath> */}
                <NavImg href={props.iconInfo}></NavImg>
            </SvgImg>
            <NavElementName>{props.name}</NavElementName>
        </NavElementContainer>
    );
}

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

const NavImg = styled.image.attrs({})`
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
`;
/* const SvgPath = styled.path`
    width: 200;
    aspect-ratio: 1/1;
    fill: black;
    color: yellow;
`; */
