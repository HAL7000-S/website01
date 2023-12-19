// グローバル変数
const canvas = document.getElementById('graphCanvas');
const context = canvas.getContext('2d');
const points = [];

// クリックイベントのリスナーを追加
canvas.addEventListener('click', handleCanvasClick);

// 削除ボタンのクリックイベントのリスナーを追加
const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', deleteClickHistory);

deleteClickHistory();

function handleCanvasClick(event) {
    // クリックした点の座標を取得
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    // グラフ上に点を描画
    drawPoint(mouseX, mouseY);

    // クリックした点を保存
    points.push({ x: mouseX, y: mouseY });

    // グラフを描画
    drawGraph();

    // 座標を表示
    displayCoordinates(mouseX, mouseY);
}

function drawPoint(x, y, color = '#000') {
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function drawGraph() {
    // グラフをクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 縦軸を描画
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.strokeStyle = '#888';
    context.stroke();
    context.closePath();

    // 横軸を描画
    context.beginPath();
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    context.stroke();
    context.closePath();

    // 目盛りを描画
    drawTicks();

    // 格子を描画
    drawGrid();

    // 点を再描画
    points.forEach((point, index) => {
        const color = (index === points.length - 1) ? '#FF0000' : '#000'; // 最新のデータの色を赤に設定
        drawPoint(point.x, point.y, color);
    });

    // 線を描画
    drawLines();
}

function drawTicks() {
    const tickLength = 5;

    // 縦軸の目盛り
    for (let y = 0; y < canvas.height; y += 20) {
        context.beginPath();
        context.moveTo(canvas.width / 2 - tickLength / 2, y);
        context.lineTo(canvas.width / 2 + tickLength / 2, y);
        context.strokeStyle = '#888';
        context.stroke();
        context.closePath();
    }

    // 横軸の目盛り
    for (let x = 0; x < canvas.width; x += 20) {
        context.beginPath();
        context.moveTo(x, canvas.height / 2 - tickLength / 2);
        context.lineTo(x, canvas.height / 2 + tickLength / 2);
        context.stroke();
        context.closePath();
    }
}

function drawGrid() {
    const gridSize = 20;
    context.strokeStyle = '#ddd';

    // 縦線を描画
    for (let x = canvas.width / 2; x < canvas.width; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
        context.closePath();

        context.beginPath();
        context.moveTo(canvas.width - x, 0);
        context.lineTo(canvas.width - x, canvas.height);
        context.stroke();
        context.closePath();
    }

    // 横線を描画
    for (let y = canvas.height / 2; y < canvas.height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
        context.closePath();

        context.beginPath();
        context.moveTo(0, canvas.height - y);
        context.lineTo(canvas.width, canvas.height - y);
        context.stroke();
        context.closePath();
    }
}

function displayCoordinates(x, y) {
    const coordinatesDiv = document.getElementById('coordinates');
    coordinatesDiv.textContent = `Clicked at: (${x}, ${y})`;
}

function drawLines() {
    // 線を描画
    context.beginPath();
    points.forEach((point, index) => {
        if (index === 0) {
            context.moveTo(point.x, point.y);
        } else {
            context.lineTo(point.x, point.y);
        }
    });
    context.strokeStyle = '#000';
    context.stroke();
    context.closePath();
}

function deleteClickHistory() {
    // クリックした点の履歴を削除
    points.length = 0;

    // グラフを再描画
    drawGraph();

    // 座標表示をクリア
    const coordinatesDiv = document.getElementById('coordinates');
    coordinatesDiv.textContent = '';
    displayCoordinates(0,0);
}
