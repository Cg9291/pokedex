import React from "react";
import ContainerPrototype from "../prototypes/ContainerPrototype";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import pokeBallIcon from "../../assets/icons8-pokeball-100.png";
import homeIcon from "../../assets/icons8-home-100.png";
import compareIcon from "../../assets/icons8-compare-24.png";
import WTPIcon from "../../assets/icons8-egg-pokemon-100.png";
import { NavIconsInterface } from "../../interfaces/miscInterfaces";
import { NavIconsType } from "../../interfaces/miscTypes";
import * as breakpoints from "../../objects/breakpoints";

export function Navigation(): React.ReactElement {
    const navIcons: NavIconsType = [
        {
            name: "Home",
            icon: homeIcon,
            linkUrl: "/"
        },
        { name: "Compare", icon: compareIcon, linkUrl: "/comparator" },
        {
            name: "Play",
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
        navIcons.map((icon) => (
            <NavElement name={icon.name} icon={icon.icon} linkUrl={icon.linkUrl} key={`${icon.name}_key`} />
        ));

    return <Container>{displayNavIcons()}</Container>;
}

function NavElement(props: NavIconsInterface): React.ReactElement {
    return (
        <NavElementContainer to={props.linkUrl}>
            <SvgImg>
                <NavImg href={props.icon}></NavImg>
            </SvgImg>
            <NavElementName>{props.name}</NavElementName>
        </NavElementContainer>
    );
}

const Container = styled(ContainerPrototype)`
    background-color: white;
    bottom: 0;
    padding: 0.5vh 0;
    border-top: 1px solid lightgrey;
    flex: 0 0 8vh;
    overflow: hidden;

    @media ${breakpoints.widthsQueries.minWidths.mobileM} {
        @media ${breakpoints.heightsQueries.minHeights.flexible("360px")} {
        }
    }

    @media ${breakpoints.widthsQueries.minWidths.tablet} {
        flex: 1 0 auto;
        font-size: 1.5rem;
    }
    @media ${breakpoints.widthsQueries.minWidths.laptop} {
        bottom: unset;
        top: 0;
        height: 6.8%;
        border-bottom: 1px solid black;
    }
`;

const NavElementContainer = styled(Link)`
    display: flex;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: black;
    flex-direction: column;
    align-items: center;
    overflow-y: hidden;
`;

const SvgImg = styled.svg.attrs({ viewBox: "0 0 24 24" })`
    height: 100%;
    flex: 0 0 60%;
`;

const NavImg = styled.image.attrs({})`
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
`;
const NavElementName = styled.span`
    display: flex;
    font-size: 0.8rem;
    line-height: 0.8rem;
    height: 100%;
    flex: 0 0 40%;
    align-items: center;

    @media ${breakpoints.heightsQueries.minHeights.flexible("896px")} {
        font-size: 0.95rem;
    }
`;
