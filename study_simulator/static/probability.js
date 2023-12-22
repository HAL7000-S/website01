//グラフ描画状態
let chart;
//現在の分布のパラメータ
let mean;
let stdDev;
// 値を保存するための配列
let SavedDataList = [];

document.addEventListener('DOMContentLoaded', function () {
    generateNormalDistribution();
});

function generateNormalDistribution() {
    //データ初期化
    SavedDataList = [];
    const outputDiv1 = document.getElementById('OutputValue');
    const outputDiv2 = document.getElementById('OutputMean');
    const outputDiv3 = document.getElementById('OutputVariance');
    outputDiv1.textContent = '';
    outputDiv2.textContent = '';
    outputDiv3.textContent = '';

    const meanInput = document.getElementById('meanInput');
    const stdDevInput = document.getElementById('stdDevInput');

    mean = parseFloat(meanInput.value) || 0;
    stdDev = parseFloat(stdDevInput.value) || 1;

    const DATA = generateData(mean, stdDev);

    // 既存のChartオブジェクトがあれば破棄
    if (chart) {
        chart.destroy();
    }
    // 新しいChartオブジェクトを作成
    chart = plotChart(DATA);
}

//ランダム値生成
function generateRandomValue(mean, stdDev) {
    return mean + stdDev * randomStandardNormal();
}
function randomStandardNormal() {
    let u = 0;
    let v = 0;

    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();

    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}


// グラフ用ランダム値生成
function generateData(mean, stdDev) {
    const data = [];
    const step = 0.1;

    for (let x = mean - 4 * stdDev; x <= mean + 4 * stdDev; x += step) {
        const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
        data.push({ x, y });
    }

    return data;
}

//グラフ用標準正規分布
function standardNormalDistribution(x) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
}
function generateStandardNormalDistributionData() {
    const data = [];
    const step = 0.1;

    for (let x = -4; x <= 4; x += step) {
        const y = standardNormalDistribution(x);
        data.push({ x, y });
    }

    return data;
}


//グラフ表示
function plotChart(data) {
    const canvas = document.getElementById('chart');
    const ctx = canvas.getContext('2d');

    //比較用標準正規分布
    standardData = generateStandardNormalDistributionData();

    return new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: '正規分布',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    data: data,
                },
                {
                    label: '標準正規分布',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: standardData,
                },
            ],
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




// 値のサンプリング部分
function Sampling(){
    const randomValue = generateRandomValue(mean, stdDev);
    const randomSavedDataListpan = document.getElementById('randomValue');
    randomSavedDataListpan.textContent = randomValue.toFixed(4); // 4桁に丸める

    //データの保存
    SavedDataList.push(randomValue);
    // 平均と分散の計算
    const estimatedMean = calculateMean();
    const estimatedVariance = calculateVariance();

    printData("OutputValue",randomValue.toFixed(5));
    printData("OutputMean",estimatedMean.toFixed(5));
    printData("OutputVariance",estimatedVariance.toFixed(5));
}

// 平均を計算する関数
function calculateMean() {
    if (SavedDataList.length === 0) {
      return 0; // ゼロを返すか、エラー処理を行うなど、空の場合の対処を行います。
    }
    const sum = SavedDataList.reduce((total, value) => total + value, 0);
    return sum / SavedDataList.length;
}

  // 分散を計算する関数
function calculateVariance() {
    if (SavedDataList.length <= 1) {
        return 0; // 1つ以下の要素の場合、分散はゼロです。
    }
    const mean = calculateMean();
    const squaredDifferences = SavedDataList.map(value => Math.pow(value - mean, 2));
    const sumSquaredDifferences = squaredDifferences.reduce((total, value) => total + value, 0);
    return sumSquaredDifferences / (SavedDataList.length - 1);
}

// データを表示する関数
function printData(outputId, data) {
    var outputDiv = document.getElementById(outputId);

    if (!outputDiv) {
        console.error("Element with id '" + outputId + "' not found.");
        return;
    }
    
    var newElement = document.createElement('div');
    newElement.textContent = data;
    
    outputDiv.appendChild(newElement);

    var numDiv = document.getElementById("num");
    numDiv.textContent = SavedDataList.length;
    }