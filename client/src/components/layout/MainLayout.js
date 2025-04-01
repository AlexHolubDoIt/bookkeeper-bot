"use strict";
exports.__esModule = true;
exports.MainLayout = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var react_router_dom_1 = require("react-router-dom");
var Dashboard_1 = require("@mui/icons-material/Dashboard");
var SmartToy_1 = require("@mui/icons-material/SmartToy");
var Assignment_1 = require("@mui/icons-material/Assignment");
var Menu_1 = require("@mui/icons-material/Menu");
var constants_1 = require("@/constants");
var MainLayout = function (_a) {
    var children = _a.children;
    var location = (0, react_router_dom_1.useLocation)();
    var theme = (0, material_1.useTheme)();
    var isMobile = (0, material_1.useMediaQuery)(theme.breakpoints.down("md"));
    var _b = react_1["default"].useState(false), mobileOpen = _b[0], setMobileOpen = _b[1];
    var handleDrawerToggle = function () {
        setMobileOpen(!mobileOpen);
    };
    var isActive = function (path) {
        return location.pathname === path;
    };
    var navItems = [
        { path: constants_1.ROUTES.DASHBOARD, label: "Dashboard", icon: react_1["default"].createElement(Dashboard_1["default"], null) },
        {
            path: constants_1.ROUTES.BOT_MANAGEMENT,
            label: "Bot Management",
            icon: react_1["default"].createElement(SmartToy_1["default"], null)
        },
        {
            path: constants_1.ROUTES.TASK_ANALYTICS,
            label: "Task Analytics",
            icon: react_1["default"].createElement(Assignment_1["default"], null)
        },
    ];
    var drawer = (react_1["default"].createElement(material_1.Box, null,
        react_1["default"].createElement(material_1.Box, { sx: {
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            } },
            react_1["default"].createElement(material_1.Typography, { variant: "h6", component: react_router_dom_1.Link, to: "/", sx: { color: "primary.main", textDecoration: "none" } }, "BookkeeperBot")),
        react_1["default"].createElement(material_1.Divider, null),
        react_1["default"].createElement(material_1.List, null, navItems.map(function (item) { return (react_1["default"].createElement(material_1.ListItem, { key: item.path, component: react_router_dom_1.Link, to: item.path, selected: isActive(item.path), sx: {
                color: isActive(item.path) ? "primary.main" : "text.primary",
                bgcolor: isActive(item.path) ? "primary.lighter" : "transparent",
                "&:hover": {
                    bgcolor: isActive(item.path)
                        ? "primary.lighter"
                        : "action.hover"
                }
            } },
            react_1["default"].createElement(material_1.ListItemIcon, { sx: { color: isActive(item.path) ? "primary.main" : "inherit" } }, item.icon),
            react_1["default"].createElement(material_1.ListItemText, { primary: item.label }))); }))));
    return (react_1["default"].createElement(material_1.Box, { sx: { display: "flex", minHeight: "100vh" } },
        react_1["default"].createElement(material_1.CssBaseline, null),
        react_1["default"].createElement(material_1.AppBar, { position: "fixed", color: "default", elevation: 1, sx: {
                zIndex: function (theme) { return theme.zIndex.drawer + 1; },
                bgcolor: "background.paper"
            } },
            react_1["default"].createElement(material_1.Toolbar, null,
                isMobile && (react_1["default"].createElement(material_1.IconButton, { color: "inherit", "aria-label": "open drawer", edge: "start", onClick: handleDrawerToggle, sx: { mr: 2 } },
                    react_1["default"].createElement(Menu_1["default"], null))),
                react_1["default"].createElement(material_1.Typography, { variant: "h6", component: "div", sx: { flexGrow: 1, fontWeight: "bold", color: "primary.main" } }, "BookkeeperBot"),
                !isMobile && (react_1["default"].createElement(material_1.Box, { sx: { display: "flex", gap: 1 } }, navItems.map(function (item) { return (react_1["default"].createElement(material_1.Button, { key: item.path, component: react_router_dom_1.Link, to: item.path, color: isActive(item.path) ? "primary" : "inherit", variant: isActive(item.path) ? "contained" : "text", startIcon: item.icon, sx: { mx: 0.5 } }, item.label)); }))))),
        react_1["default"].createElement(material_1.Drawer, { variant: "temporary", open: mobileOpen, onClose: handleDrawerToggle, ModalProps: {
                keepMounted: true
            }, sx: {
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 }
            } }, drawer),
        !isMobile && (react_1["default"].createElement(material_1.Drawer, { variant: "permanent", sx: {
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 }
            }, open: true }, drawer)),
        react_1["default"].createElement(material_1.Box, { component: "main", sx: {
                flexGrow: 1,
                p: 3,
                width: { md: "calc(100% - 240px)" },
                ml: { md: "240px" },
                mt: "64px",
                bgcolor: "background.default"
            } }, children)));
};
exports.MainLayout = MainLayout;
