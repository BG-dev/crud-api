"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandler = requestHandler;
const userController_1 = require("../controllers/userController");
const url_1 = require("url");
const routes = {
    [userController_1.baseControllerUrl]: userController_1.userController,
};
async function requestHandler(req, res) {
    try {
        res.setHeader('Content-Type', 'application/json');
        const parsedUrl = (0, url_1.parse)(req.url || '', true);
        const pathname = parsedUrl.pathname || '';
        const route = Object.keys(routes).find((routeKey) => pathname.startsWith(routeKey));
        if (route) {
            await routes[route]?.call(null, req, res, pathname);
        }
        else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'Sorry! Endpoint not found' }));
        }
    }
    catch {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Internal server error' }));
    }
}
//# sourceMappingURL=requestHandler.js.map