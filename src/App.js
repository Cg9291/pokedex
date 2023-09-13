"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
require("./App.css");
var styled_components_1 = require("styled-components");
var ContainerPrototype_tsx_1 = require("./components/Prototypes/ContainerPrototype.tsx");
var Homepage_tsx_1 = require("./components/Homepage/Homepage.tsx");
/*
TODO

*add type to index
*/
var Container = (0, styled_components_1["default"])(ContainerPrototype_tsx_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tbackground-color: white;\n"], ["\n\tbackground-color: white;\n"])));
function App() {
    return (<Container>
			<Homepage_tsx_1["default"] />
		</Container>);
}
exports["default"] = App;
var templateObject_1;
