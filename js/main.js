/* Variables */

let body = document.body;

let title = document.getElementById('title');

let mode = document.getElementById('mode'),
    darkBtn = document.getElementById('dark'),
    lightkBtn = document.getElementById('light'),
    activeBtn = document.getElementById('active');

let calculator = document.getElementById('calculator');

let screen = document.querySelector('.row input'),
    buttons = Array.from(document.querySelectorAll('.row button.display')),
    clearBtn = document.getElementById('clear'),
    deleteBtn = document.getElementById('delete'),
    signBtn = document.getElementById('sign'),
    calc = document.getElementById('calc');

let numChar,// total number of typed characters
    currentChar, prevChar, // store current & previous character
    firstChar = screen.value.charAt(0);

let operations = ['+', '-', '*', '/'];

var result;
let equalPressed = 0;

/* Events */

for (i = 0; i < buttons.length; i++) {
    if (result !== '' && calc.clicked) {
        result = ''
    }
    buttons[i].onclick = function () {
        if (equalPressed == 1) {
            screen.value = "";
            equalPressed = 0;
        }
        display(this.innerHTML);
    }
}

signBtn.addEventListener('click', signOp);

/* Functions */

// Switch mode Dark & Light

function darkMode() {
    darkBtnBg();
    darkBodyBg();
    showDarkCalc();
}

function lightMode() {
    lightBtnBg();
    lightBodyBg();
    showLightCalc();
}

function lightBodyBg() {
    body.style.background = 'linear-gradient(21deg, #3d3949, #6772a4)';
    title.style.color = '#e3e3d3';
}

function darkBodyBg() {
    body.style.background = 'linear-gradient(21deg, #129185b3, #f5f5f5)';
    title.style.color = '#1b213c';
}

function darkBtnBg() {
    activeBtn.classList.add('dark');
    activeBtn.classList.remove('light');
    mode.style.backgroundColor = '#f5f5f5';
}

function lightBtnBg() {
    activeBtn.classList.add('light');
    activeBtn.classList.remove('dark');
    mode.style.backgroundColor = '#1b213c';
}

function showDarkCalc() {
    calculator.classList.add('light-calculator');
    calculator.classList.remove('dark-calculator');
}

function showLightCalc() {
    calculator.classList.add('dark-calculator');
    calculator.classList.remove('light-calculator');
}

// Calculate

function display(v) {
    screen.value += v;
    numChar = screen.value.length;
    if (screen.value.length > 12) {
        screen.value = screen.value.substring(0, 12);
    }
    currentChar = v;
    getPrevChar();
}

clearBtn.onclick = function () {
    screen.value = '';
}

function calculate() {
    equalPressed = 1;
    if (screen.value == '') {
        return;
    }
    if (screen.value !== '') {
        if (screen.value !== '' && operations.includes(currentChar)) {
            screen.value = 'Error';
        }
        try {
            result = eval(screen.value);
        } catch (error) {
            screen.value = 'Error'
        }
        if (Number.isInteger(result)) {
            screen.value = result;
        } else {
            screen.value = result.toFixed(2);
        }
    }
}

function getPrevChar() {
    prevChar = screen.value.substring(numChar - 2, numChar - 1);
    checkChar();
}

function checkChar() {
    if (currentChar == '*' && numChar == 1
        || currentChar == "/" && numChar == 1) {
        removeChar();
    }
    if (operations.includes(prevChar) && operations.includes(currentChar)) {
        if (currentChar === prevChar) {
            removeChar();
        } else {
            overWrite();
        }
    }
    if (operations.includes(prevChar) && currentChar == '.') {
        prevChar = 0;
    }
}

function removeChar() {
    screen.value = screen.value.substring(0, numChar - 1);
}

function overWrite() {
    screen.value = screen.value.slice(0, numChar - 2) + screen.value.slice(numChar - 1, numChar);
}

function deleteChar() {
    screen.value = screen.value.slice(0, -1)
}

function signOp() {
    if (parseInt(screen.value) >= 0) {
        screen.value = screen.value * (-1);
    }
    else {
        screen.value = screen.value * (-1);
    }

}