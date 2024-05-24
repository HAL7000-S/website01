
var memoryMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];


function updateMatrix() {
    const x1 = parseFloat(document.getElementById('input1').value) || 0;
    const x2 = parseFloat(document.getElementById('input2').value) || 0;
    const x3 = parseFloat(document.getElementById('input3').value) || 0;

    const x11 = x1 * x1, x22 = x2 * x2, x33 = x3 * x3;
    const x12 = x1 * x2, x23 = x2 * x3, x31 = x3 * x1;

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

    // memoryMatrixの更新
    memoryMatrix[0][0] += x11;
    memoryMatrix[0][1] += x12;
    memoryMatrix[0][2] += x31;
    memoryMatrix[1][0] += x12;
    memoryMatrix[1][1] += x22;
    memoryMatrix[1][2] += x23;
    memoryMatrix[2][0] += x31;
    memoryMatrix[2][1] += x23;
    memoryMatrix[2][2] += x33;

    const memoryMatrixTex = `
    M
    = \\sum_t X_t
    = \\begin{pmatrix}
    ${memoryMatrix[0][0]} & ${memoryMatrix[0][1]} & ${memoryMatrix[0][2]} \\\\
    ${memoryMatrix[1][0]} & ${memoryMatrix[1][1]} & ${memoryMatrix[1][2]} \\\\
    ${memoryMatrix[2][0]} & ${memoryMatrix[2][1]} & ${memoryMatrix[2][2]}
    \\end{pmatrix}
`;

    document.getElementById('memoryMatrix').innerHTML = `$$ ${memoryMatrixTex} $$`;
    MathJax.typesetPromise([document.getElementById('memoryMatrix')]);

    const y1 = phi(memoryMatrix[0][0])*x1 + phi(memoryMatrix[0][1])*x2 + phi(memoryMatrix[0][2])*x3;
    const y2 = phi(memoryMatrix[1][0])*x1 + phi(memoryMatrix[1][1])*x2 + phi(memoryMatrix[1][2])*x3;
    const y3 = phi(memoryMatrix[2][0])*x1 + phi(memoryMatrix[2][1])*x2 + phi(memoryMatrix[2][2])*x3;
    
    const outputVectorTex = `
    \\boldsymbol{y} 
    = \\phi(\\phi(M)\\boldsymbol{x})
    =\\begin{pmatrix}
    ${phi(y1)} \\\\
    ${phi(y2)} \\\\
    ${phi(y3)}
    \\end{pmatrix}
`;

    document.getElementById('outputVector').innerHTML = `$$ ${outputVectorTex} $$`;
    MathJax.typesetPromise([document.getElementById('outputVector')]);
}

function phi(value) {
    if (value > 1) {
        return 1;
    } else if (value < 1) {
        return -1;
    } else {
        return 0;
    }
}