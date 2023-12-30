export const breakpointsWidths = {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tablet: "768px",
    laptop: "1024px",
    laptopL: "1440px",
    desktop: "2560px"
};

export const breakpointsHeights = {
    one: "667px",
    two: "812px",
    three: "844px"
};

export const widthsQueries = {
    mobileS: `(min-width: ${breakpointsWidths.mobileS})`,
    mobileM: `(min-width: ${breakpointsWidths.mobileM})`,
    mobileL: `(min-width: ${breakpointsWidths.mobileL})`,
    tablet: `(min-width: ${breakpointsWidths.tablet})`,
    laptop: `(min-width: ${breakpointsWidths.laptop})`,
    laptopL: `(min-width: ${breakpointsWidths.laptopL})`,
    desktop: `(min-width: ${breakpointsWidths.desktop})`,
    desktopL: `(min-width: ${breakpointsWidths.desktop})`
};

export const heightsQueries = {
    one: `(min-height:${breakpointsHeights.one})`,
    two: `(min-height:${breakpointsHeights.two})`
};
