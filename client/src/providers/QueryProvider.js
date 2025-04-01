"use strict";
exports.__esModule = true;
exports.QueryProvider = exports.queryClient = void 0;
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var react_query_devtools_1 = require("@tanstack/react-query-devtools");
exports.queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 30000
        }
    }
});
var QueryProvider = function (_a) {
    var children = _a.children;
    return (react_1["default"].createElement(react_query_1.QueryClientProvider, { client: exports.queryClient },
        children,
        react_1["default"].createElement(react_query_devtools_1.ReactQueryDevtools, { initialIsOpen: false })));
};
exports.QueryProvider = QueryProvider;
