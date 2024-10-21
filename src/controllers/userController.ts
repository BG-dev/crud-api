import { IncomingMessage, ServerResponse } from 'http';
import { join } from 'path';
import { validate } from 'uuid';
import { HttpMethod } from '../types/HttpMethod';
import { getUsers, getUser } from '../services/userService';

export const baseControllerUrl = '/api/users';

export function userController(req: IncomingMessage, res: ServerResponse, pathname: string) {
    const method = req.method || '';
    const idMatch = pathname.match(/^\/api\/users\/([0-9a-fA-F-]+)$/);
    const id = idMatch ? idMatch[1] : null;

    if (method === HttpMethod.GET) {
        if (pathname === baseControllerUrl) {
            const users = getUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(users));
        }
        if (id && pathname === join(baseControllerUrl, id)) {
            if (!validate(id)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Invalid user ID format' }));
                return;
            }

            const user = getUser(id);
            if (!user) {
            }
            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(user));
        }
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
    return;
}
