const SQUARE_SIZE = 2;
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const NUM_ROWS = 250;
const FILL_STYLES = [
  '#1f77b4', // Steel Blue
  '#ff7f0e', // Dark Orange
  '#2ca02c', // Forest Green
  '#d62728', // Brick Red
  '#9467bd', // Medium Purple
  '#8c564b', // Brown
  '#e377c2', // Pink
  '#7f7f7f', // Gray
  '#bcbd22', // Olive
  '#17becf', // Teal
  '#ff9896', // Light Red
  '#98df8a', // Light Green
  '#aec7e8', // Light Blue
  '#ffbb78', // Light Orange
  '#c5b0d5', // Light Purple
  '#c49c94', // Light Brown
  '#f7b6d2', // Light Pink
  '#dbdb8d', // Light Yellow
  '#9edae5', // Light Teal
  '#393b79'  // Dark Purple
];

let triangle;
function init() {
    triangle = [[1]];
    const lcm = 232792560;  // LCM of all numbers between 1 and 20
    for (let nRow = 1; nRow < NUM_ROWS; ++nRow) {
        let row = [1];
        const prevRow = triangle[triangle.length - 1];
        for (let nCol = 1; nCol < nRow; ++nCol) {
            row.push((prevRow[nCol-1] + prevRow[nCol]) % lcm);
        }
        row.push(1);
        triangle.push(row);
    }
}

function buildLegend() {
    const modSlider = document.getElementById('mod');
    const mod = parseInt(modSlider.value);
    const legendContainer = document.getElementById('legend');
    legendContainer.innerHTML = '';

    for (let i = 0; i < mod; i++) {
        const div = document.createElement('div');
        div.style.backgroundColor = FILL_STYLES[i];
        div.innerText = i;
        div.className = 'legendEntry';
        legendContainer.appendChild(div);
    }
}

function redraw() {
    const modSlider = document.getElementById('mod');
    const mod = parseInt(modSlider.value);
    document.getElementById('modValue').innerHTML = mod;
    buildLegend();
    const center = CANVAS_WIDTH / 2;
    const halfWidth = SQUARE_SIZE / 2;
    const ctx = document.getElementById('canvas').getContext('2d');
    for (let nRow = 0; nRow < NUM_ROWS; ++nRow) {
        const row = triangle[nRow];
        for (let nCol = 0; nCol < row.length; ++nCol) {
            ctx.fillStyle = FILL_STYLES[row[nCol] % mod];
            ctx.fillRect(
                center - halfWidth*nRow + SQUARE_SIZE*nCol,
                nRow*SQUARE_SIZE,
                SQUARE_SIZE,
                SQUARE_SIZE
            );
        }
    }
}
