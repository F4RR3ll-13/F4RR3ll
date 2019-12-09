//часть первая. 
//1- создание игрового поля
let field = document.createElement('div'); // создаем div в html через createElement
document.body.appendChild(field); // добавляем div в body через document.body.appendChild
field.classList.add('field'); // присваиваем диву имя field

// 2 - разбиваем поле на ячейки
//цикл создающий и записывающий 100 ячеек в игровое поле
for (let i = 1; i < 101; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel); // добовляем div excel внутрь div field
    excel.classList.add('excel'); // добавляем каждой ячейке внутри поля класс excel
}

// 3 - присваиваем координаты каждой ячейке

let excel = document.getElementsByClassName('excel'); // запись всех ячеек в переменную.
let x = 1,
    y = 10;
//прогоняем все ячейки через цикл чтобы прогнать каждую ячейку в поле и присвоить ей координату 
for (let i = 0; i < excel.length; i++) {
    if (x > 10) { // сто итераций х должен повышаться на 1 как только х будет равен 11 ряд понижатся
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
}

// часть вторая .
// 1 - создание змеи

function generateSnake() { // выдает два рандомных значения в массиве от 1 до 10 (одно по оси Х другое по оси У)
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}

let coordinates = generateSnake(); // запишем результат нашей функции в переменную
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
    document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
    document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]')
];

// добавим классы телу и голове змейки

for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');


//2 - создание еды для змейки

let mouse;

function createMouse() {
    function generateMouse() { // выдает два рандомных значения в массиве от 1 до 10 (одно по оси Х другое по оси У)
        let posX = Math.round(Math.random() * (10 - 3) + 3);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }

    let mouseCoordinates = generateMouse();
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]'); // мышь должна занимать на поле ячейку с координатами из generalmouse

    while (mouse.classList.contains('snakeBody')) {
        let mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]'); // цикл для избежания ошибки совпадения координат мыши и змеи
    }

    mouse.classList.add('mouse'); // присваиваем класс для mouse
}
createMouse();

let direction = 'right';
let steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 20px;
display: block;
`;

let score = 0;
input.value = 'ваши очки: ' + score;

// 3 - пропишем движение  для змейки

function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')] //получим координаты головы
    snakeBody[0].classList.remove('head'); // удаляем класс head 
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop(); // удаляем последний элемент массива

    if (direction == 'right') {
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]')); // с помощью метода unshift на первое место массива помещаем соседнюю ячейку с классом head
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }

    } else if (direction == 'left') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
        }

    } else if (direction == 'up') {
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
        }

    } else if (direction == 'down') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + +snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1] - 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
        }

    }
    // учим есть мышь
    if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse');
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createMouse();
        score++;
        input.value = 'ваши очки: ' + score;
    }
    // окончание игры

    if (snakeBody[0].classList.contains('snakeBody')) {
        clearInterval(interval);
        snakeBody[0].style.background = 'url(death.png) center no-repeat';
        snakeBody[0].style.backgroundSize = 'contain';
        setTimeout(() => {
            alert('Игра окончена');
        }, 200);

    }

    snakeBody[0].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }

    steps = true;
}
let interval = setInterval(move, 150);

// часть третья 
//пропишем движение во всех направлениях

window.addEventListener('keydown', function (e) {
    if (steps == true) {
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps = false;
        } else if (e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            steps = false;
        } else if (e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            steps = false;
        } else if (e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            steps = false;
        }

    }
});