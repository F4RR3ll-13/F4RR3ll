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
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
    mouse.classList.add('mouse'); // присваиваем класс для mouse
}
createMouse();
