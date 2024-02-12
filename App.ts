import http from 'http'
import dotenv from 'dotenv'

import requestListener from './src/requestListener'


const host = 'localhost';

dotenv.config();
const port = process.env.PORT as unknown as number;

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});