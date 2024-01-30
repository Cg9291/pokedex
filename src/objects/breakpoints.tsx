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
    one: string;
    two: string;
    three: string;
}

interface WidthsQueries {
    minWidths: MinWidths;
    maxWidths: MaxWidths;
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
    flexible: (width: string) => string;
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
    flexible: (width: string) => string;
}

export const breakpointsWidths: BreakpointsWidths = {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tablet: "768px",
    laptop: "1024px",
    laptopL: "1440px",
    desktop: "2560px"
};

export const breakpointsHeights: BreakpointsHeights = {
    one: "667px",
    two: "812px",
    three: "844px"
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
        desktopL: `(min-width: ${breakpointsWidths.desktop})`,
        flexible: (width: string) => `(min-width):${width}`
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
        flexible: (width: string) => `(max-width):${width}`
    }
};

export const heightsQueries = {
    one: `(min-height:${breakpointsHeights.one})`,
    two: `(min-height:${breakpointsHeights.two})`
};
