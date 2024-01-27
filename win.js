// win.js

// ゲーム盤面のサイズ
const BOARD_SIZE = 10;
// プレイヤーの数
let PLAYER_COUNT = 2; // 初期値は2人

let currentPlayer = 1;
let gameBoard = [];
let winner = null;
let onlinePlayers = []; // オンラインプレイヤーの名前を格納する配列

function initGame() {
    // ゲーム盤面の初期化
    gameBoard = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
    // 勝利者をリセット
    winner = null;
}

// 勝利条件の判定を修正
function checkWinner(row, col) {
    const directions = [
        [-1, 0], [1, 0], // 縦方向
        [0, -1], [0, 1], // 横方向
        [-1, -1], [1, 1], // 斜め（左上から右下）
        [-1, 1], [1, -1]  // 斜め（右上から左下）
    ];

    for (const [dx, dy] of directions) {
        let count = 1;

        // 同じ方向に進みながらチェック
        for (let i = 1; i < 4; i++) {
            const x = row + dx * i;
            const y = col + dy * i;

            // ゲーム盤面の範囲内かどうかを確認
            if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) break;

            // プレイヤーのキャラクターが連続しているかどうかを確認
            if (gameBoard[x][y] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        // 4つ連続した場合、勝利を返す
        if (count >= 4) {
            return true;
        }
    }

    // どの方向でも4つ連続しない場合、勝利ではない
    return false;
}

// ゲーム盤面を更新する処理を修正
function updateBoard(row, col) {
    // ゲーム盤面を更新
    gameBoard[row][col] = currentPlayer;
    // 画像を表示
    const cell = document.getElementById(`cell-${row}-${col}`);
    cell.innerHTML = `<img src="player${currentPlayer}.png" class="character">`;

    // 勝利判定
    if (checkWinner(row, col)) {
        winner = currentPlayer;
        const playerName = onlinePlayers[currentPlayer - 1] || `プレイヤー ${currentPlayer}`;
        document.getElementById('message').textContent = `${playerName} の勝利！🤍`;
    } else {
        // 次のプレイヤーへ
        currentPlayer = currentPlayer === PLAYER_COUNT ? 1 : currentPlayer + 1;
        const nextPlayerName = onlinePlayers[currentPlayer - 1] || `プレイヤー ${currentPlayer}`;
        document.getElementById('message').textContent = `${nextPlayerName} のターン`;
    }
}

// オンラインプレイヤーの名前を設定する処理を追加
function setOnlinePlayers(names) {
    onlinePlayers = names.slice(0, PLAYER_COUNT);
}

// ページロード時にゲームを初期化
document.addEventListener('DOMContentLoaded', function () {
    initGame();
    const board = document.getElementById('gameBoard');
    // 盤面を生成
    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement('td');
            cell.id = `cell-${i}-${j}`;
            cell.addEventListener('click', () => handleClick(i, j));
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
});
