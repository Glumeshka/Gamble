let minValue, maxValue, answerNumber, orderNumber, gameRun, orderNumberField, answerField, units, teens, dozens, hundreds;  // Обьявляем переменные которые будем использывать в наших функциях

const openPopUp = document.querySelector('#open_pop_up');
const closePopUp = document.querySelector('#pop_up_close');
const popUp = document.querySelector('#pop_up');
const cardBody = document.querySelector('#card-body'); 
const btnRetry = document.querySelector('#btnRetry'); 
const answerFieldString = document.querySelector('#answerField');
const cardHeader = document.querySelector('#card-header');
const newGame = document.querySelector('#newGame');
const welcome = document.querySelector('#welcome');

openPopUp.addEventListener('click', function(e){
    e.preventDefault();
    popUp.classList.add('active');
})

closePopUp.addEventListener('click', function(e){
    e.preventDefault();
    popUp.classList.remove('active');
    cardBody.classList.add('active');
    btnRetry.classList.add('active');
    answerFieldString.classList.add('active');
    cardHeader.classList.add('active');
    newGame.classList.add('active');
    welcome.classList.add('active');
    startGame(); // <-- запуск игры
})

function startGame () { // Функция для запуска игры
    minValue = parseInt(document.querySelector('#minValue').value);
    maxValue = parseInt(document.querySelector('#maxValue').value);
    checkDigits();
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;

    orderNumberField = document.querySelector('#orderNumberField');
    answerField = document.querySelector('#answerField');

    orderNumberField.innerText = orderNumber;
    answerQuestion();
}

function checkDigits() { // Функция проверки на NaN и органичения
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
   
    if (isNaN(minValue)) {
        minValue = 0
    }

    if (isNaN(maxValue)) {
        maxValue = 100
    }

    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue];
    }

}

function toMore () { // Функция для Кнопки Больше
    if (gameRun){
        if (minValue === maxValue){
            badDigit();
            answerField.innerText = answerPhrase;
            gameRun = false;        
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerQuestion();
        }
    }
}

function toLess () { // Функция для Кнопки Меньше
    if (gameRun){
        if (minValue === maxValue || minValue == answerNumber){
            badDigit();
            answerField.innerText = answerPhrase;
            gameRun = false;           
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerQuestion();
        }
    }
}

function badDigit () { // <-- функция ответа на плохое число с вариантами
    const phraseRandom = Math.floor(Math.random() * 5 + 1);
        switch (phraseRandom) {
            case 1:
                answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`
            break;

            case 2:
                answerPhrase = `Я сдаюсь..\n\u{1F92F}`
            break;

            case 3:
                answerPhrase = `Это невозможно!\n\u{1F629}`
            break;

            case 4:
                answerPhrase = `Вы меня обманываете!\n\u{1F62D}`
            break;

            case 5:
                answerPhrase = `Ещё одну попытку! \n\u{1F64F}`
            break;
        }
}

function goodDigit () { // <-- функция ответа на правильное число
    const phraseRandom = Math.floor(Math.random() * 5 + 1);
        switch (phraseRandom) {
            case 1:
                answerPhrase = `Я всегда угадываю!\n\u{1F60E}`
            break;

            case 2:
                answerPhrase = `Замурчательно!\n\u{1F63A}`
            break;

            case 3:
                answerPhrase = `Это было не сложно.\n\u{1F60C}`
            break;

            case 4:
                answerPhrase = `Для этого меня и создали!\n\u{1F607}`
            break;

            case 5:
                answerPhrase = `Ещё разок? \n\u{1F609}`
            break;
        }
}

function answerQuestion () { // <-- функция генерации ответов
    const phraseRandom = Math.floor(Math.random() * 5 + 1);
        switch (phraseRandom) {
            case 1:
                answerPhrase = `Наверное, это число `
            break;

            case 2:
                answerPhrase = `Возможно это число `
            break;

            case 3:
                answerPhrase = `Вы загадали число `
            break;

            case 4:
                answerPhrase = `Скорее всего это число `
            break;

            case 5:
                answerPhrase = `Вероятно это число `
            break;
        }
    answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `${answerPhrase} ${numberToText()}?` : `${answerPhrase} ${answerNumber}?` : numberToText().length < 20 ? `${answerPhrase} минус ${numberToText()}?` : `${answerPhrase} ${answerNumber}?`;
}

function numberToText() { // Функция преобразования числа из цифр в слова (числа от -999 до 999).
    units = ['', ' один', ' два', ' три', ' четыре', ' пять', ' шесть', ' семь', ' восемь', ' девять'];
    teens = ['', ' десять', ' одинадцать', ' двенадцать', ' тринадцать', ' четырнадцать', ' пятнадцать', ' шестнадцать', ' семнадцать', ' восемнадцать', ' девятнадцать'];
    dozens = ['', ' двадцать', ' тридцать', ' сорок', ' пятьдесят', ' шестьдесят', ' семьдесят', ' восемьдесят', ' девяносто'];
    hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    let number = Math.abs(answerNumber);
    let text = '';

    if (number == 0) {
        text = '0';
        return text;
    }

    if (number <= 9) {
        return units[Math.floor(Math.abs(number) / 1)];
    }

    if (number > 9 && number < 20) {
        return teens[Math.floor(number / 10 + number % 10)];
    }

    if (number >= 20 && number <= 99) {
        return dozens[(Math.floor(number / 10)) - 1] + "" + units[Math.floor(number % 10)];
    }

    if (number >= 100 && number <= 999) {
        return hundreds[Math.floor(number / 100)] + "" + numberToTextHundreds();
    }
}

function numberToTextHundreds() { // Функция вычисления остатка от сотого числа и преобразования его в числа из цифр в слова (числа от 0 до 99) для последующего присоединения к функции numberToText() расчитывающей сотни hundreds.
    let unitsTeensDozens = Math.abs(answerNumber) % 100;

    if (unitsTeensDozens <= 9) {
        return units[Math.floor(unitsTeensDozens / 1)];
    }

    if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
        return teens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
    }

    if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
        return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + "" + units[Math.floor(unitsTeensDozens % 10)];
    }
}

document.querySelector('#btnRetry').addEventListener('click', (e) => { // события при кликах не кнопки
    popUp.classList.add('active');
    
})

document.querySelector('#btnOver').addEventListener('click', (e) => {
    toMore();
})

document.querySelector('#btnLess').addEventListener('click', (e) => {
    toLess();
})

document.querySelector('#btnEqual').addEventListener('click', (e) => {
    if (gameRun){
        goodDigit ()
        answerField.innerText = answerPhrase;
        gameRun = false;
    }
})