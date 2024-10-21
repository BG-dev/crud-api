"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBody = void 0;
const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            }
            catch {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', reject);
    });
};
exports.parseBody = parseBody;
//# sourceMappingURL=bodyParserService.js.map