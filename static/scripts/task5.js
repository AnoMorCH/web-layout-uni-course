const rowsNumber = 3;
const columnsNumber = 8;

const tilesAmount = 4;

let currentTile;
let otherTile;

let checkedTiles = [];

const figureTiles = document.getElementById('figure-wrapper');
const puzzleTiles = document.getElementById('puzzle-wrapper');

window.onload = () => {
    initialize8x3Board();

    const tilesLocation = '/static/images/dachshund/'
    const tilesExtention = '.png';

    const tilesId = getFilledTilesId();
    mixFigureTiles(tilesId);

    for (let i = 0; i < tilesAmount; i++) {
        let tile = document.createElement('img');
        tile.src = tilesLocation + tilesId[i] + tilesExtention;

        changeTileDataGivenItsProperty(tile);
        makeElementDraggable(tile);
        setRandomRotationForElement(tile);

        figureTiles.append(tile);
    }

    const turnCheckedTilesBtn = document.getElementById('turn-tiles');

    turnCheckedTilesBtn.addEventListener('click', () => {
        checkedTiles.forEach((tile) => {
            let currentRotation = tile.style.rotate;
            currentRotation = getCurrentRotationNumPlus90Deg(currentRotation);
            tile.style.rotate = `${currentRotation}deg`;
        });
    });
}

function initialize8x3Board() {
    for (let rowId = 0; rowId < rowsNumber; rowId++) {
        for (let columnId = 0; columnId < columnsNumber; columnId++) {
            let tile = document.createElement('img');
            tile.src = '/static/images/blank.jpg';

            makeElementDraggable(tile);

            puzzleTiles.append(tile);
        }
    }
}

function getCurrentRotationNumPlus90Deg(currentRotation) {
    currentRotation = currentRotation.replace('deg', '');
    currentRotation = Number(currentRotation);
    currentRotation += 90;
    return currentRotation;
}

function setRandomRotationForElement(element) {
    element.style.rotate = `${90 * Math.floor(Math.random() * tilesAmount)}deg`;
}

function getFilledTilesId() {
    let tilesId = [];

    for (let i = 1; i <= tilesAmount; i++) {
        tilesId.push(i.toString());
    }

    return tilesId;
}

function mixFigureTiles(tilesId) {
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

function makeElementDraggable(tile) {
    tile.addEventListener('dragstart', dragStart);
    tile.addEventListener('dragover', dragOver);
    tile.addEventListener('dragenter', dragEnter);
    tile.addEventListener('dragleave', dragLeave);
    tile.addEventListener('drop', dragDrop);
    tile.addEventListener('dragend', dragEnd);
}

// Set up drag functions.

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