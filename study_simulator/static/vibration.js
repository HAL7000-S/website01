function updateGraph() {
    // 入力からパラメータを取得
    const mass = parseFloat(document.getElementById('mass').value);
    const dampingCoefficient = parseFloat(document.getElementById('damping').value);
    const springConstant = parseFloat(document.getElementById('spring').value);
    const angularFrequency = parseFloat(document.getElementById('omega0').value);
    const dampingRatio = parseFloat(document.getElementById('zeta').value);
    const initialPosition = parseFloat(document.getElementById('initialPosition').value);
    const initialVelocity = parseFloat(document.getElementById('initialVelocity').value);

    // 振動数式の表示
    const equationText = `振動数式: x(t) = A * exp(-ζωnt) * cos(ωdt + φ)`;
    document.getElementById('equation').innerText = equationText;

    // グラフの更新
    updateChart(mass, dampingCoefficient, springConstant, angularFrequency, dampingRatio, initialPosition, initialVelocity);
}

//方式選択
function showResult() {
    // ラジオボタンの値を取得
    var selectedWay = document.querySelector('input[name="way"]:checked');

    // 結果を表示する要素の取得
    var resultElement = document.getElementById('result');

    // 選択された方式によって結果を表示
    if (selectedWay) {
        var selectedValue = selectedWay.value;
        resultElement.textContent = "選択された方式: " + selectedValue;
    } else {
        resultElement.textContent = "方式が選択されていません。";
    }
}

function updateChart(m, c, k, ωn, ζ, initialPosition, initialVelocity) {
    // 既存のチャートを取得
    var existingChart = Chart.getChart("vibrationChart");
    // 既存のチャートが存在する場合は破棄
    if (existingChart) {
        existingChart.destroy();
    }
    const canvas = document.getElementById('vibrationChart');
    const ctx = canvas.getContext('2d');

    // グラフのデータ生成
    const data = generateVibrationData(m, c, k, ωn, ζ, initialPosition, initialVelocity);

    // Chart.jsを使用してグラフを描画
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.time,
            datasets: [{
                label: '振動',
                data: data.displacement,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    type: 'linear',
                    position: 'left'
                }
            }
        }
    });
}

function generateVibrationData(m, c, k, ωn, ζ, initialPosition, initialVelocity) {
    // グラフのデータ生成
    const time = [];
    const displacement = [];
    const dt = 0.1; // 時間刻み
    let x = initialPosition;
    let v = initialVelocity;

    for (let t = 0; t <= 20; t += dt) {
        const acceleration = (-c * v - k * x) / m;
        v += acceleration * dt;
        x += v * dt;

        time.push(t);
        displacement.push(x);
    }

    return { time, displacement };
}