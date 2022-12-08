const rowsNumber = 3;
const columnsNumber = 8;

let currentTile;
let otherTile;
        
let checkedTiles = [];

const figureTiles = document.getElementById('figure-wrapper');
const puzzleTiles = document.getElementById('puzzle-wrapper');

window.onload = () => {
    // Initialize the 8x3 board
    for (let rowId = 0; rowId < rowsNumber; rowId++) {
        for (let columnId = 0; columnId < columnsNumber; columnId++) {
            let tile = document.createElement('img');
            tile.src = '/static/images/blank.jpg';

            makeTileDraggable(tile);
            
            puzzleTiles.append(tile);
        }
    }

    const tilesAmount = 4;
    const tilesLocation = '/static/images/dachshund/'
    const tilesExtention = '.png';

    const tilesId = getFilledTilesId(tilesAmount);
    mixFigureTiles(tilesId, tilesAmount);

    for (let i = 0; i < tilesAmount; i++) {
        let tile = document.createElement('img');
        tile.src = tilesLocation + tilesId[i] + tilesExtention;

        changeTileDataGivenItsProperty(tile);
        makeTileDraggable(tile);
        tile.style.rotate = `${90 * Math.floor(Math.random() * tilesAmount)}deg`;

        figureTiles.append(tile);
    }

    const turnCheckedTilesBtn = document.getElementById('turn-tiles');

    turnCheckedTilesBtn.addEventListener('click', () => {
        checkedTiles.forEach((tile) => {
            let currentRotation = tile.style.rotate;
            currentRotation = currentRotation.replace('deg', '');
            currentRotation = Number(currentRotation);
            currentRotation += 90;
            tile.style.rotate = `${currentRotation}deg`;
        });
    });
}

function getFilledTilesId(tilesAmount) {
    let tilesId = [];

    for (let i = 1; i <= tilesAmount; i++) {
        tilesId.push(i.toString());
    }

    return tilesId;
}

function mixFigureTiles(tilesId, tilesAmount) {
    for (let i = 0; i < tilesAmount; i++) {
        let j = Math.floor(Math.random() * tilesAmount);

        let temp = tilesId[i];
        tilesId[i] = tilesId[j];
        tilesId[j] = temp;
    }
}

function changeTileDataGivenItsProperty(tile) {
    const checkedClassName = '_checked';

    tile.addEventListener('click', () => {
        if (tile.classList.contains(checkedClassName)) {
            tile.classList.remove(checkedClassName);
            checkedTiles.splice(checkedTiles.indexOf(tile), 1);
        } else {
            tile.classList.add(checkedClassName);
            checkedTiles.push(tile);
        }
    });
}

function makeTileDraggable(tile) {
    tile.addEventListener('dragstart', dragStart);
    tile.addEventListener('dragover', dragOver);
    tile.addEventListener('dragenter', dragEnter);
    tile.addEventListener('dragleave', dragLeave);
    tile.addEventListener('drop', dragDrop);
    tile.addEventListener('dragend', dragEnd);
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