// TODO. Clean code after everything.

const rowsNumber = 3;
const columnsNumber = 8;

let currentTile;
let otherTile;

window.onload = () => {
    // Initialize the 8x3 board
    for (let rowId = 0; rowId < rowsNumber; rowId++) {
        for (let columnId = 0; columnId < columnsNumber; columnId++) {
            let tile = document.createElement('img');
            tile.src = '/static/images/blank.jpg';

            tile.addEventListener('dragstart', dragStart);
            tile.addEventListener('dragover', dragOver);
            tile.addEventListener('dragenter', dragEnter);
            tile.addEventListener('dragleave', dragLeave);
            tile.addEventListener('drop', dragDrop);
            tile.addEventListener('dragend', dragEnd);

            document.getElementById('puzzle-wrapper').append(tile);
        }
    }

    const tilesAmount = 4;
    const tilesLocation = '/static/images/dachshund/'
    const tilesExtention = '.png';
    let tilesId = [];

    for (let i = 1; i <= tilesAmount; i++) {
        tilesId.push(i.toString());
    }

    for (let i = 0; i < tilesAmount; i++) {
        let j = Math.floor(Math.random() * tilesAmount);

        let temp = tilesId[i];
        tilesId[i] = tilesId[j];
        tilesId[j] = temp;
    }

    for (let i = 0; i < tilesAmount; i++) {
        let tile = document.createElement('img');
        tile.src = tilesLocation + tilesId[i] + tilesExtention;

        tile.addEventListener('dragstart', dragStart);
        tile.addEventListener('dragover', dragOver);
        tile.addEventListener('dragenter', dragEnter);
        tile.addEventListener('dragleave', dragLeave);
        tile.addEventListener('drop', dragDrop);
        tile.addEventListener('dragend', dragEnd);

        document.getElementById('figure-wrapper').append(tile);
    }
}

function dragStart() {
    currentTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() { }

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currentTile.src.includes('blank')) {
        return
    }

    let currentImg = currentTile.src;
    let otherImg = otherTile.src;

    currentTile.src = otherImg;
    otherTile.src = currentImg;
}