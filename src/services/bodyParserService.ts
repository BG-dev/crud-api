import { IncomingMessage } from 'http';

export const parseBody = (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject): void => {
        let body = '';

        req.on('data', (chunk) => (body += chunk));
        req.on('end', (): void => {
            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', reject);
    });
};
