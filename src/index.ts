import http from 'http';
import dotenv from 'dotenv';
import { requestHandler } from './services/requestHandler';

dotenv.config();

const port: number = Number(process.env.PORT) || 4000;

const server = http.createServer(requestHandler);

server.listen(port, () => console.log(`SERVER IS RUNNING ON PORT: ${port}`));
