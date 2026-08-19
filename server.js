const WebSocket = require('wss');
const wss = new WebSocket.Server({ port: 3000 });

const clients = new Map();

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'register') {
            clients.set(data.username, ws);
        } else if (data.target && clients.has(data.target)) {
            clients.get(data.target).send(message);
        }
    });
    ws.on('close', () => {
        // Cleanup disconnected peers
    });
});