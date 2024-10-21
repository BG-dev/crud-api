import { IncomingMessage, ServerResponse } from 'http';
import { userController, baseControllerUrl } from '../controllers/userController';
import { parse } from 'url';

const routes: Record<string, Function> = {
    [baseControllerUrl]: userController,
};

export function requestHandler(req: IncomingMessage, res: ServerResponse) {
    try {
        res.setHeader('Content-Type', 'application/json');
        const parsedUrl = parse(req.url || '', true);
        const pathname = parsedUrl.pathname || '';

        const route = Object.keys(routes).find((routeKey) => pathname.startsWith(routeKey));
        if (route) {
            routes[route]?.call(null, req, res, pathname);
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'Sorry! Endpoint not found' }));
        }
    } catch {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Internal server error' }));
    }
}
