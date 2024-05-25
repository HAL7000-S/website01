var inputVector = [0,0,0]
var memoryMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

var counter = 0;


function updateInputMatrix() {

    const inputVectorTex = `
    \\boldsymbol{x}
    = \\begin{pmatrix}
    x_1 \\\\
    x_2 \\\\
    x_3
    \\end{pmatrix}
    = \\begin{pmatrix}
    ${inputVector[0]} \\\\
    ${inputVector[1]} \\\\
    ${inputVector[2]}
    \\end{pmatrix}`;
    document.getElementById('inputVector').innerHTML = `$$ ${inputVectorTex} $$`;
    MathJax.typesetPromise([document.getElementById('inputVector')]);


    const x11 = inputVector[0] * inputVector[0], x22 = inputVector[1] * inputVector[1], x33 = inputVector[2] * inputVector[2];
    const x12 = inputVector[0] * inputVector[1], x23 = inputVector[1] * inputVector[2], x31 = inputVector[2] * inputVector[0];

    const inputMatrixTex = `X
        = \\boldsymbol{x}\\boldsymbol{x}^T
        = \\begin{pmatrix}
        x_1x_1 & x_1x_2 & x_1x_3 \\\\
        x_2x_1 & x_2x_2 & x_2x_3 \\\\
        x_3x_1 & x_3x_2 & x_3x_3
        \\end{pmatrix}
        = \\begin{pmatrix}
        ${x11} & ${x12} & ${x31} \\\\
        ${x12} & ${x22} & ${x23} \\\\
        ${x31} & ${x23} & ${x33}
        \\end{pmatrix}`;

    document.getElementById('inputMatrix').innerHTML = `$$ ${inputMatrixTex} $$`;
    MathJax.typesetPromise([document.getElementById('inputMatrix')]);
}

function updateMemoryOutput() {
    // memoryMatrixの更新
    const x11 = inputVector[0] * inputVector[0], x22 = inputVector[1] * inputVector[1], x33 = inputVector[2] * inputVector[2];
    const x12 = inputVector[0] * inputVector[1], x23 = inputVector[1] * inputVector[2], x31 = inputVector[2] * inputVector[0];
    // memoryMatrix[0][0] += x11;
    memoryMatrix[0][1] += x12;
    memoryMatrix[0][2] += x31;
    memoryMatrix[1][0] += x12;
    // memoryMatrix[1][1] += x22;
    memoryMatrix[1][2] += x23;
    memoryMatrix[2][0] += x31;
    memoryMatrix[2][1] += x23;
    // memoryMatrix[2][2] += x33;

    counter += 1;

    const memoryMatrixTex = `
    M
    = \\sum_{t=1}^${counter} X_t - ${counter}I
    = \\begin{pmatrix}
    ${memoryMatrix[0][0]} & ${memoryMatrix[0][1]} & ${memoryMatrix[0][2]} \\\\
    ${memoryMatrix[1][0]} & ${memoryMatrix[1][1]} & ${memoryMatrix[1][2]} \\\\
    ${memoryMatrix[2][0]} & ${memoryMatrix[2][1]} & ${memoryMatrix[2][2]}
    \\end{pmatrix}
`;

    document.getElementById('memoryMatrix').innerHTML = `$$ ${memoryMatrixTex} $$`;
    MathJax.typesetPromise([document.getElementById('memoryMatrix')]);

    const y1 = phi(phi(memoryMatrix[0][0])*inputVector[0] + phi(memoryMatrix[0][1])*inputVector[1] + phi(memoryMatrix[0][2])*inputVector[2]);
    const y2 = phi(phi(memoryMatrix[1][0])*inputVector[0] + phi(memoryMatrix[1][1])*inputVector[1] + phi(memoryMatrix[1][2])*inputVector[2]);
    const y3 = phi(phi(memoryMatrix[2][0])*inputVector[0] + phi(memoryMatrix[2][1])*inputVector[1] + phi(memoryMatrix[2][2])*inputVector[2]);
    
    const outputVectorTex = `
    \\boldsymbol{y} 
    = \\phi(\\phi(M)\\boldsymbol{x})
    = \\phi(\\begin{pmatrix}
    ${phi(memoryMatrix[0][0])} & ${phi(memoryMatrix[0][1])} & ${phi(memoryMatrix[0][2])} \\\\
    ${phi(memoryMatrix[1][0])} & ${phi(memoryMatrix[1][1])} & ${phi(memoryMatrix[1][2])} \\\\
    ${phi(memoryMatrix[2][0])} & ${phi(memoryMatrix[2][1])} & ${phi(memoryMatrix[2][2])}
    \\end{pmatrix}
    \\begin{pmatrix}
    ${inputVector[0]} \\\\
    ${inputVector[1]} \\\\
    ${inputVector[2]}
    \\end{pmatrix}
    )
    =\\begin{pmatrix}
    ${y1} \\\\
    ${y2} \\\\
    ${y3}
    \\end{pmatrix}`;

    document.getElementById('outputVector').innerHTML = `$$ ${outputVectorTex} $$`;
    MathJax.typesetPromise([document.getElementById('outputVector')]);


    // ラインの色と太さを変更
    var line = document.getElementById("arrow12");
    line.setAttribute('style', getLineStyle(memoryMatrix[0][1]));
    var line = document.getElementById(`arrow23`);
    line.setAttribute('style', getLineStyle(memoryMatrix[1][2]));
    var line = document.getElementById(`arrow31`);
    line.setAttribute('style', getLineStyle(memoryMatrix[2][0]));

    var element = document.getElementById('text12');
    element.textContent = memoryMatrix[0][1].toString();
    var element = document.getElementById('text23');
    element.textContent = memoryMatrix[1][2].toString();
    var element = document.getElementById('text31');
    element.textContent = memoryMatrix[2][0].toString();

    outputChangeColor([y1, y2, y3]);
}

function phi(value) {
    if (value >= 1) {
        return 1;
    } else if (value <= -1) {
        return -1;
    } else {
        return 0;
    }
}


// ノードのをクリックしたときの関数
function changeColor(element, index) { 
    if (element.classList.contains("highlighted-akane")) {
        element.classList.remove("highlighted-akane");
        element.classList.add("highlighted-aoi");
        inputVector[index] = -1;
    } else if (element.classList.contains("highlighted-aoi")) {
        element.classList.remove("highlighted-aoi");
        inputVector[index] = 0;
    } else { // class=="node"
        element.classList.add("highlighted-akane");
        inputVector[index] = 1;
    }
    updateInputMatrix();
}

// 出力するときのノードの色変更関数
function outputChangeColor(y_list){
    for (index = 1; index <= 3; index++){
        element = document.getElementById(`node${index}`)
        if (element.classList.contains("highlighted-akane")) {
            element.classList.remove("highlighted-akane");
        } else if (element.classList.contains("highlighted-aoi")) {
            element.classList.remove("highlighted-aoi");
        }

        if (y_list[index-1] == 1) {
            element.classList.add("highlighted-akane");
        } else if (y_list[index-1] == -1){
            element.classList.add("highlighted-aoi");
        }
        inputVector[index-1] = y_list[index-1]
    }

    updateInputMatrix();
}


document.getElementById("node1").addEventListener("click", function() {
    changeColor(this, 0);
});
document.getElementById("node2").addEventListener("click", function() {
    changeColor(this, 1);
});
document.getElementById("node3").addEventListener("click", function() {
    changeColor(this, 2);
});


// ラインの色と太さを決定する関数
function getLineStyle(value) {
    width = Math.min(20, Math.max(1, Math.abs(value*2)));
    if (value == 0){
        colorName = "black";
    } else if (value >= 1) {
        colorName = "red";
    } else if (value <= -1) {
        colorName = "blue";
    }

    return `stroke-width: ${width}; stroke: ${colorName};`;
}
