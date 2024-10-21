import { IncomingMessage, ServerResponse } from 'http';
import { join } from 'path';
import { validate } from 'uuid';
import { HttpMethod } from '../types/HttpMethod';
import { getUsers, getUser, createUser } from '../services/userService';
import { parseBody } from '../services/bodyParserService';

export const baseControllerUrl = '/api/users';

export async function userController(req: IncomingMessage, res: ServerResponse, pathname: string) {
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
    if (method === HttpMethod.POST) {
        if (pathname === baseControllerUrl) {
            const body = await parseBody(req);
            try {
                const { username, age, hobbies } = body;
                if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ message: 'Invalid or missing user data' }));
                }

                const newUser = createUser({ username, age, hobbies });
                res.statusCode = 201;
                return res.end(JSON.stringify(newUser));
            } catch {
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'Invalid JSON format' }));
            }
        }
    }

    res.statusCode = 404;
    return res.end(JSON.stringify({ message: 'Endpoint not found' }));
}
