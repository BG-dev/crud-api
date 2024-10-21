"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseControllerUrl = void 0;
exports.userController = userController;
const path_1 = require("path");
const uuid_1 = require("uuid");
const HttpMethod_1 = require("../types/HttpMethod");
const userService_1 = require("../services/userService");
const bodyParserService_1 = require("../services/bodyParserService");
exports.baseControllerUrl = '/api/users';
async function userController(req, res, pathname) {
    const method = req.method || '';
    const idMatch = pathname.match(/^\/api\/users\/([0-9a-fA-F-]+)$/);
    const id = idMatch ? idMatch[1] : null;
    if (method === HttpMethod_1.HttpMethod.GET) {
        if (pathname === exports.baseControllerUrl) {
            const users = (0, userService_1.getUsers)();
            res.statusCode = 200;
            return res.end(JSON.stringify(users));
        }
        if (id && pathname === (0, path_1.join)(exports.baseControllerUrl, id)) {
            if (!(0, uuid_1.validate)(id)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Invalid user ID format' }));
                return;
            }
            const user = (0, userService_1.getUser)(id);
            if (!user) {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: 'User not found' }));
            }
            res.statusCode = 200;
            return res.end(JSON.stringify(user));
        }
    }
    if (method === HttpMethod_1.HttpMethod.POST) {
        if (pathname === exports.baseControllerUrl) {
            const body = await (0, bodyParserService_1.parseBody)(req);
            try {
                const { username, age, hobbies } = body;
                if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ message: 'Invalid or missing user data' }));
                }
                const newUser = (0, userService_1.createUser)({ username, age, hobbies });
                res.statusCode = 201;
                return res.end(JSON.stringify(newUser));
            }
            catch {
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'Invalid JSON format' }));
            }
        }
    }
    if (method === HttpMethod_1.HttpMethod.PUT) {
        if (id && pathname === (0, path_1.join)(exports.baseControllerUrl, id)) {
            if (!(0, uuid_1.validate)(id)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Invalid user ID format' }));
                return;
            }
            const userExists = (0, userService_1.getUser)(id);
            if (!userExists) {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: 'User not found' }));
                return;
            }
            const body = await (0, bodyParserService_1.parseBody)(req);
            try {
                const { username, age, hobbies } = body;
                if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ message: 'Invalid or missing user data' }));
                }
                const updatedUser = (0, userService_1.updateUser)(id, { username, age, hobbies });
                res.statusCode = 200;
                return res.end(JSON.stringify(updatedUser));
            }
            catch {
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'Invalid JSON format' }));
            }
        }
    }
    if (method === HttpMethod_1.HttpMethod.DELETE) {
        if (id && pathname === (0, path_1.join)(exports.baseControllerUrl, id)) {
            if (!(0, uuid_1.validate)(id)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Invalid user ID format' }));
                return;
            }
            const isDeleted = (0, userService_1.deleteUser)(id);
            if (isDeleted) {
                res.statusCode = 204;
                return res.end(JSON.stringify({ message: 'User has been deleted' }));
            }
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: 'User not found' }));
        }
    }
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: 'Endpoint not found' }));
}
//# sourceMappingURL=userController.js.map