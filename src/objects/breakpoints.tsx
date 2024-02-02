import { css } from "styled-components";
import { CSS, Interpolation, RuleSet, StyledObject, Styles } from "styled-components/dist/types";

interface BreakpointsWidths {
    mobileS: string;
    mobileM: string;
    mobileL: string;
    tablet: string;
    laptop: string;
    laptopL: string;
    desktop: string;
}

interface BreakpointsHeights {
    mobileS: string;
    mobileM: string;
    mobileL: string;
    tablet: string;
    laptop: string;
    laptopL: string;
    desktop: string;
}

interface WidthsQueries {
    minWidths: MinWidths;
    maxWidths: MaxWidths;
}

interface HeightsQueries {
    minHeights: MinHeights;
    maxHeights: MaxHeights;
}

interface MinWidths {
    mobileS: string;
    mobileM: string;
    mobileL: string;
    tablet: string;
    laptop: string;
    laptopL: string;
    desktop: string;
    desktopL: string;
    //flexible: (width:string ) => typeof css<object>;
}

interface MaxWidths {
    mobileS: string;
    mobileM: string;
    mobileL: string;
    tablet: string;
    laptop: string;
    laptopL: string;
    desktop: string;
    desktopL: string;
    flexible: (maxWidth: string) => string;
}

interface MinHeights {
    mobileS: string;
    mobileM: string;
    mobileL: string;
    tablet: string;
    laptop: string;
    laptopL: string;
    desktop: string;
    desktopL: string;
}

interface MaxHeights {
    mobileS: string;
    mobileM: string;
    mobileL: string;
    tablet: string;
    laptop: string;
    laptopL: string;
    desktop: string;
    desktopL: string;
}

const breakpointsWidths: BreakpointsWidths = {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tablet: "768px",
    laptop: "1024px",
    laptopL: "1440px",
    desktop: "2560px"
};

const breakpointsHeights: BreakpointsHeights = {
    mobileS: "640px",
    mobileM: "667px",
    mobileL: "932px",
    tablet: "1024px",
    laptop: "768px",
    laptopL: "900px",
    desktop: "1440px"
};

export const widthsQueries: WidthsQueries = {
    minWidths: {
        mobileS: `(min-width: ${breakpointsWidths.mobileS})`,
        mobileM: `(min-width: ${breakpointsWidths.mobileM})`,
        mobileL: `(min-width: ${breakpointsWidths.mobileL})`,
        tablet: `(min-width: ${breakpointsWidths.tablet})`,
        laptop: `(min-width: ${breakpointsWidths.laptop})`,
        laptopL: `(min-width: ${breakpointsWidths.laptopL})`,
        desktop: `(min-width: ${breakpointsWidths.desktop})`,
        desktopL: `(min-width: ${breakpointsWidths.desktop})`
        // flexible: (width: string) => `(min-width):${width}`
    },
    maxWidths: {
        mobileS: `(max-width: ${breakpointsWidths.mobileS})`,
        mobileM: `(max-width: ${breakpointsWidths.mobileM})`,
        mobileL: `(max-width: ${breakpointsWidths.mobileL})`,
        tablet: `(max-width: ${breakpointsWidths.tablet})`,
        laptop: `(max-width: ${breakpointsWidths.laptop})`,
        laptopL: `(max-width: ${breakpointsWidths.laptopL})`,
        desktop: `(max-width: ${breakpointsWidths.desktop})`,
        desktopL: `(max-width: ${breakpointsWidths.desktop})`,
        flexible: (maxWidth: string) => `(max-width: ${maxWidth})`
    }
};

export const heightsQuerie: HeightsQueries = {
    minHeights: {
        mobileS: `(min-height: ${breakpointsHeights.mobileS})`,
        mobileM: `(min-height: ${breakpointsHeights.mobileM})`,
        mobileL: `(min-height: ${breakpointsHeights.mobileL})`,
        tablet: `(min-height: ${breakpointsHeights.tablet})`,
        laptop: `(min-height: ${breakpointsHeights.laptop})`,
        laptopL: `(min-height: ${breakpointsHeights.laptopL})`,
        desktop: `(min-height: ${breakpointsHeights.desktop})`,
        desktopL: `(min-height: ${breakpointsHeights.desktop})`
        // flexible: (width: string) => `(min-width):${width}`
    },
    maxHeights: {
        mobileS: `(max-height: ${breakpointsHeights.mobileS})`,
        mobileM: `(max-height: ${breakpointsHeights.mobileM})`,
        mobileL: `(max-height: ${breakpointsHeights.mobileL})`,
        tablet: `(max-height: ${breakpointsHeights.tablet})`,
        laptop: `(max-height: ${breakpointsHeights.laptop})`,
        laptopL: `(max-height: ${breakpointsHeights.laptopL})`,
        desktop: `(max-height: ${breakpointsHeights.desktop})`,
        desktopL: `(max-height: ${breakpointsHeights.desktop})`
        //flexible: (maxWidth: string) => `(max-width: ${maxWidth})`
    }
};
