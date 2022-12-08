const navButtons = document.getElementsByClassName('burger-list')[0];

navButtons.addEventListener('click', function(event) {
    const scrollDestination = getScrollDestination(event);

    scrollDestination.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
    });
});

function getScrollDestination(event) {
    const clickedButtonElement = event.target;
    const clickedButtonName = clickedButtonElement.getAttribute('id');

    let scrollDestination = null;

    switch (clickedButtonName) {
        case 'task-1':
            scrollDestination = document.getElementsByClassName('task-1')[0];
            break;
        case 'task-2':
            scrollDestination = document.getElementsByClassName('task-2')[0];
            break;
        case 'task-3':
            scrollDestination = document.getElementsByClassName('task-3')[0];
            break;
        case 'task-4':
            scrollDestination = document.getElementsByClassName('task-4')[0];
            break;
        case 'task-5':
            scrollDestination = document.getElementsByClassName('task-5')[0];
            break;
    }

    return scrollDestination;
}