"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var Router_1 = require("./Router");
var socketService_1 = require("./services/socketService");
var providers_1 = require("@/providers");
var services_1 = require("@/services");
var theme = (0, material_1.createTheme)({
    palette: {
        primary: {
            main: "#2563eb"
        },
        secondary: {
            main: "#6b7280"
        },
        success: {
            main: "#10b981"
        },
        error: {
            main: "#ef4444"
        },
        warning: {
            main: "#f59e0b"
        },
        info: {
            main: "#3b82f6"
        }
    }
});
function App() {
    (0, react_1.useEffect)(function () {
        socketService_1["default"].connect();
        (0, services_1.initializeTasks)()["catch"](function (error) {
            console.error("Error initializing tasks:", error);
        });
        return function () {
            socketService_1["default"].disconnect();
        };
    }, []);
    return (react_1["default"].createElement(providers_1.QueryProvider, null,
        react_1["default"].createElement(material_1.ThemeProvider, { theme: theme },
            react_1["default"].createElement(material_1.CssBaseline, null),
            react_1["default"].createElement(Router_1["default"], null))));
}
exports["default"] = App;
