function getRandomNaturalNumberByInterval(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomUniqueIndex(list, maxIndexValue) {
    let index = getRandomNaturalNumberByInterval(0, maxIndexValue);

    while (list.includes(index)) {
        index = getRandomNaturalNumberByInterval(0, maxIndexValue);
    }

    return index;
}

function updateCellsByEvenness(cell1, cell2, usedRowsAmount) {
    if (usedRowsAmount % 2 == 0) {
        cell1.classList.add(colorClass1);
        cell2.classList.add(colorClass1);
    } else {
        cell1.classList.add(colorClass2);
        cell2.classList.add(colorClass2);
    }
}

const latingAdage = [
    '"Consuetudo est altera natura"',
    '"Nota bene"',
    '"Nulla calamitas sola"',
    '"Per aspera ad astra"'
]

const russianAdageAnalog = [
    '"Привычка - вторая натура"',
    '"Заметьте хорошо!"',
    '"Беда не приходит одна"',
    '"Через тернии к звёздам"'
]

const adageAmount = latingAdage.length;
const everyAdageIsUsedMessage = 'Фразы закончились';

const colorClass1 = '_class1';
const colorClass2 = '_class2';

// Task 4.1.
const tbody41 = document.getElementById('tbody-task-4-1');
const btnTask41 = document.getElementById('btn-task-4-1');

let usedRowsAmount = 0;
let usedRowsIndexes = [];

btnTask41.addEventListener('click', function () {
    if (usedRowsAmount < adageAmount) {
        let adageIndex = getRandomUniqueIndex(usedRowsIndexes, adageAmount);
        usedRowsAmount += 1;
        usedRowsIndexes.push(adageIndex);

        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');

        const customCellClassName = '_table-cell';
        cell1.classList.add(customCellClassName);
        cell2.classList.add(customCellClassName);

        updateCellsByEvenness(cell1, cell2, usedRowsAmount);

        cell1.innerHTML = latingAdage[adageIndex];
        cell2.innerHTML = russianAdageAnalog[adageIndex];

        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody41.appendChild(row);
    } else {
        alert(everyAdageIsUsedMessage);
    }
});