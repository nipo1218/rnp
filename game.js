// game.js

let currentPlayerIndex = 0; // 現在のプレイヤーのインデックス
let players = []; // プレイヤー情報を保持する配列
let selectedPlayers = []; // 選択されたプレイヤーを格納する配列
const playerCount = 2; // プレイヤーの人数を定義

// プレイヤーの選択と初期化
function initPlayers(playerCount) {
    players = [];
    for (let i = 0; i < playerCount; i++) {
        players.push(`player${i + 1}.png`);
    }
}

// プレイヤーのキャラクターを選択する処理
document.querySelectorAll('.playerImage').forEach(img => {
    img.addEventListener('click', function() {
        const isSelected = this.classList.toggle('selected');
        const playerIndex = parseInt(this.dataset.index);

        if (isSelected) {
            if (selectedPlayers.length < playerCount) {
                selectedPlayers.push(players[playerIndex]);
            } else {
                this.classList.remove('selected');
                alert(`プレイヤーは${playerCount}人選択してください`);
            }
        } else {
            selectedPlayers = selectedPlayers.filter(player => player !== players[playerIndex]);
        }

        // 決定ボタンを有効にする
        document.getElementById('decisionButton').disabled = selectedPlayers.length !== playerCount;
    });
});

// 決定ボタンがクリックされたときの処理
document.getElementById('decisionButton').addEventListener('click', function() {
    if (selectedPlayers.length === playerCount) {
        // ゲーム盤面を表示する
        showGameBoard();

        // ここで選択した画像の情報をサーバーに送信する処理を追加する
        console.log('選択されたプレイヤー画像:', selectedPlayers);
    } else {
        alert(`プレイヤーは${playerCount}人選択してください`);
    }
});

// ゲーム盤面を表示する処理
function showGameBoard() {
    document.getElementById('decisionButton').style.display = 'none';
    document.getElementById('message').textContent = `プレイヤー ${currentPlayer} の番です`;

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.style.display = 'table';

    // テーブルを生成してゲーム盤面を表示する
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('td');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', cellClickHandler);
            row.appendChild(cell);
        }
        gameBoard.appendChild(row);
    }
}

// セルがクリックされたときの処理
function cellClickHandler(event) {
    const cell = event.target;
    if (!cell.textContent) {
        cell.innerHTML = `<img src="${selectedPlayers[currentPlayerIndex]}" alt="Player ${currentPlayer}" class="character">`;
        // ゲームの勝敗判定などの処理を追加する
        // 現在のプレイヤーを切り替える
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        document.getElementById('message').textContent = `プレイヤー ${currentPlayer} の番です`;
    }
}

// プレイヤー名を入力して部屋に入るボタンがクリックされたときの処理
document.getElementById('enterRoomButton').addEventListener('click', function() {
    const playerName = document.getElementById('playerNameInput').value;
    // プレイヤー名をサーバーに送信する処理を追加する
    // サーバーにプレイヤー名を送信する部分を追加
    const data = {
        type: 'playerSelection',
        player: playerName
    };
    // サーバーにデータを送信
    ws.send(JSON.stringify(data));
});

// ゲームの初期化
function initGame(playerCount) {
    initPlayers(playerCount);
    currentPlayerIndex = 0; // 最初のプレイヤーから開始
}
