// server.js

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let onlinePlayers = []; // オンラインプレイヤーの名前を格納する配列

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);

        const data = JSON.parse(message);
        if (data.type === 'playerSelection') {
            const playerName = data.player;
            // オンラインプレイヤーの名前を配列に追加
            onlinePlayers.push(playerName);
            // オンラインプレイヤーの名前を他のクライアントに送信
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'onlinePlayers', players: onlinePlayers }));
                }
            });
        }
    });
});
