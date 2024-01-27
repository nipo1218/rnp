const WebSocket = require('ws');
const readline = require('readline');
const ws = new WebSocket('ws://localhost:8080');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let playerName = ''; // プレイヤーの名前

ws.onopen = function() {
    console.log('WebSocket connected');
};

ws.onmessage = function(event) {
    console.log('Received: ' + event.data);
    const data = JSON.parse(event.data);
    if (data.type === 'onlinePlayers') {
        // オンラインプレイヤーの名前を表示
        console.log('Online players:', data.players.join(', '));
    }
};

// プレイヤー名を入力して部屋に入るボタンがクリックされたときの処理
document.getElementById('enterRoomButton').addEventListener('click', function() {
    const playerName = document.getElementById('playerNameInput').value;
    // プレイヤー名をサーバーに送信する処理を追加する
    const data = {
        type: 'playerSelection',
        player: playerName
    };
    // サーバーにデータを送信
    ws.send(JSON.stringify(data));
});

// ゲームが開始された場合の処理
function startGame() {
    console.log('Game started!');
    // ゲームの開始処理を追加
}

// ゲーム開始命令を受け取る
rl.on('line', function(input) {
    if (input === 'start') {
        startGame();
    }
});
