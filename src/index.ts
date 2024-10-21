import http from 'http';

const port: number = Number(process.env.PORT) || 4000;

const server = http.createServer();

server.listen(port, () => console.log(`SERVER IS RUNNING ON PORT: ${port}`));
