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

function updateElementsByEvenness(elementsList, usedAdagesAmount) {
    if (usedAdagesAmount % 2 == 0) {
        elementsList.forEach(function (element) {
            element.classList.add(colorClass1);
        });
    } else {
        elementsList.forEach(function (element) {
            element.classList.add(colorClass2);
        });
    }
}

function showAdagesRandomlyUsingTable() {
    const tbody = document.getElementById('tbody-task-4-1');
    const btn = document.getElementById('btn-task-4-1');

    let usedAdagesAmount = 0;
    let usedAdagesIndexes = [];

    btn.addEventListener('click', function () {
        if (usedAdagesAmount < adageAmount) {
            let adageIndex = getRandomUniqueIndex(usedAdagesIndexes, adageAmount);
            usedAdagesAmount += 1;
            usedAdagesIndexes.push(adageIndex);

            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');

            const customCellClassName = '_table-cell';
            cell1.classList.add(customCellClassName);
            cell2.classList.add(customCellClassName);

            updateElementsByEvenness([cell1, cell2], usedAdagesAmount);

            cell1.innerHTML = latinAdage[adageIndex];
            cell2.innerHTML = russianAdageAnalog[adageIndex];

            row.appendChild(cell1);
            row.appendChild(cell2);
            tbody.appendChild(row);
        } else {
            alert(everyAdageIsUsedMessage);
        }
    });
}

function showAdagesRandomnlyUsingPTag() {
    const body = document.getElementById('rand');
    const btn = document.getElementById('btn-task-4-2');

    let usedAdagesAmount = 0;
    let usedAdagesIndexes = [];

    btn.addEventListener('click', function () {
        if (usedAdagesAmount < adageAmount) {
            let adageIndex = getRandomUniqueIndex(usedAdagesIndexes, adageAmount);
            usedAdagesAmount += 1;
            usedAdagesIndexes.push(adageIndex);

            const sentence = document.createElement('p');

            sentence.innerHTML =
                `<span class="_underline">n = ${usedAdagesAmount - 1}</span> ` +
                `${latinAdage[adageIndex]} ` +
                `${russianAdageAnalog[adageIndex]}`;

            updateElementsByEvenness([sentence], usedAdagesAmount);

            body.appendChild(sentence);
        } else {
            alert(everyAdageIsUsedMessage);
        }
    });
}

function showAdagesRandomlyUsingList() {
    const body = document.getElementById('aside-ol');
    const btn = document.getElementById('btn-task-4-3');

    let usedAdagesAmount = 0;
    let usedAdagesIndexes = [];

    btn.addEventListener('click', function () {
        if (usedAdagesAmount < adageAmount) {
            let adageIndex = getRandomUniqueIndex(usedAdagesIndexes, adageAmount);
            usedAdagesAmount += 1;
            usedAdagesIndexes.push(adageIndex);

            const sentence = document.createElement('li');

            sentence.innerHTML =
                `${latinAdage[adageIndex]}` +
                `<ul><li>${russianAdageAnalog[adageIndex]}</li></ul>`;

            updateElementsByEvenness([sentence], usedAdagesAmount);

            body.appendChild(sentence);
        } else {
            alert(everyAdageIsUsedMessage);
        }
    });
}

function repaintEvenStrings() {
    const bodiesList = [
        document.getElementById('tbody-task-4-1'),
        document.getElementById('rand'),
        document.getElementById('aside-ol')
    ]

    const btn = document.getElementById('btn-repaint');
    let countClicksOnBtn = 0;

    btn.addEventListener('click', function () {
        bodiesList.forEach(function (body) {
            for (let i = 0; i < body.children.length; i++) {
                if (i % 2 != 0) {
                    if (countClicksOnBtn % 2 == 0) {
                        body.children[i].style.fontWeight = 'bold';
                    } else {
                        body.children[i].style.fontWeight = 'normal';
                    }
                }
            }
        });

        countClicksOnBtn += 1;
    });
}

const latinAdage = [
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

const adageAmount = latinAdage.length;
const everyAdageIsUsedMessage = 'Фразы закончились';

const colorClass1 = '_class1';
const colorClass2 = '_class2';

showAdagesRandomlyUsingTable(); // Task 4.1.
showAdagesRandomnlyUsingPTag(); // Task 4.2.
showAdagesRandomlyUsingList(); // Task 4.3.
repaintEvenStrings(); // Repaint Button
