const rowsNumber = 3;
const columnsNumber = 8;
const tilesAmount = 4;
const checkedClassName = '_checked';

const tilesLocation = '/static/images/dachshund/'
const tilesExtention = '.png';

let currentTile;
let otherTile;

let checkedTiles = [];

const figureTiles = document.getElementById('figure-wrapper');
const puzzleTiles = document.getElementById('puzzle-wrapper');

window.onload = () => {
    initialize8x3Board();

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
            currentRotation = getRotateStyleAsNum(currentRotation) + 90;
            tile.style.rotate = `${currentRotation}deg`;
            checkIfPlayerSucceed();
        });
    });
}

function initialize8x3Board() {
    for (let rowId = 0; rowId < rowsNumber; rowId++) {
        for (let columnId = 0; columnId < columnsNumber; columnId++) {
            let tile = document.createElement('img');
            tile.src = '/static/images/blank.png';

            makeElementDraggable(tile);
            changeTileDataGivenItsProperty(tile);

            puzzleTiles.append(tile);
        }
    }
}

function getRotateStyleAsNum(currentRotation) {
    currentRotation = currentRotation.replace('deg', '');
    currentRotation = Number(currentRotation);
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

function getTileNumber(tile) {
    tile = tile.src.split('/');
    tile = tile[tile.length - 1];
    tile = tile.replace(tilesExtention, ' ');
    tile = Number(tile);
    return tile;
}

function isTileRotateCorrect(tileRotate) {
    return tileRotate % 360 == 0;
}

function isNextTileIdCorrect(nextTileId, index) {
    return nextTileId == index + 1;
}

function isTileStartOfFigure(tileId) {
    return tileId == 1;
}

function checkIfPlayerSucceed() {
    const tilesArray = Array.from(puzzleTiles.children);

    const rowsArray = [
        tilesArray.slice(columnsNumber * 0, columnsNumber * 1),
        tilesArray.slice(columnsNumber * 1, columnsNumber * 2),
        tilesArray.slice(columnsNumber * 2, columnsNumber * 3)
    ]

    rowsArray.forEach((row) => {
        for (let column = 0; column < columnsNumber; column++) {
            const tile = row[column];
            const tileId = getTileNumber(tile);

            if (isTileStartOfFigure(tileId)) {
                const tileRotate = getRotateStyleAsNum(tile.style.rotate);

                if (!isTileRotateCorrect(tileRotate)) {
                    return;
                }

                for (let i = 1; i < tilesAmount; i++) {
                    const nextTile = row[column + i];
                    const nextTileId = getTileNumber(nextTile);
                    const nextTileRotate = getRotateStyleAsNum(nextTile.style.rotate);

                    if (
                        !isNextTileIdCorrect(nextTileId, i)
                        || !isTileRotateCorrect(nextTileRotate)
                    ) {
                        return;
                    }
                }

                alert('Фигура собрана правильно!');
            }
        }
    });
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

    const currentImgSrc = currentTile.src;
    const currentImgRotate = currentTile.style.rotate;

    const otherImgSrc = otherTile.src;
    const otherImgRotate = otherTile.style.rotate;

    currentTile.src = otherImgSrc;
    currentTile.style.rotate = otherImgRotate;
    currentTile.classList.remove(checkedClassName);
    checkedTiles.slice(checkedTiles.indexOf(currentTile), 1);

    otherTile.src = currentImgSrc;
    otherTile.style.rotate = currentImgRotate;
    otherTile.classList.add(checkedClassName);
    checkedTiles.push(otherTile);

    checkIfPlayerSucceed();
}