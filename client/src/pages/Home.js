"use strict";
exports.__esModule = true;
exports.Home = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var constants_1 = require("@/constants");
var Home = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        navigate(constants_1.ROUTES.DASHBOARD);
    }, [navigate]);
    return null;
};
exports.Home = Home;
