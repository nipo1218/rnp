const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function() {
    console.log('WebSocket connected');
    // 画像を選択した場合の処理
    const selectedImage = 'player2.png'; // 仮にplayer2.pngを選択したとする
    const message = {
        type: 'playerSelection',
        player: selectedImage
    };
    ws.send(JSON.stringify(message));
};

ws.onmessage = function(event) {
    console.log('Received: ' + event.data);
    // ゲームが開始された場合の処理
    const data = JSON.parse(event.data);
    if (data.type === 'gameStart') {
        console.log('Game started!');
        // ゲームの開始処理を追加
    }
};
