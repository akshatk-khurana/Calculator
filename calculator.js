var num1 = '';
var num2 = '';
var operator = '';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.container > div').forEach(div => {
        div.addEventListener('click', () => {
            onClick(div);
        })
    })
    document.getElementById('change').addEventListener('click', () => {
        changeBgColor();
    })
})

function onClick(div) {
    const display = document.getElementById('display');
    if (div.id !== 'equal' && div.id !== 'ac' && div.id !== 'display' && div.id !== 'copy' && div.id !== 'ce') {
        if ((num1 === '' || num1.length > 0) && num2 == '' && operator === '') {
            if (isNum(div.innerHTML)) {
                num1 = num1 + div.innerHTML;
                display.innerHTML = num1;
            } else if (num1 !== '') {
                operator = div.innerHTML;
                display.innerHTML = operator;
            }
        } else if (operator === '' && num1 !== '') {
            if (!isNum(div.innerHTML)) {
                operator = div.innerHTML;
                display.innerHTML = operator;
            }
        } else if ((num2 === '' || num2.length > 0) && operator !== '' && num1 !== '') {
            if (isNum(div.innerHTML)) {
                num2 = num2 + div.innerHTML;
                display.innerHTML = num2;
            }
        }
    } else if (div.id === 'ac') {
        allClear();
    } else if (div.id === 'equal') {
        if (num1 === '' && num2 === '' && operator === '' ) {
            changeWarningText('ERROR! NO INPUT');
            display.innerHTML = '';
        } else {
            findResult();
        }
    } else if (div.id === 'copy') {
        if (display.innerHTML !== '') {
            navigator.clipboard.writeText(display.innerHTML);
            changeWarningText('COPIED!');
        }
    } else if (div.id === 'ce') {
        clearEntry();
    }
}

function findResult() {
    var result = 0;

    if (String(num1).includes('π')) {
        if (String(num1) === 'π') {
            num1 = Math.PI;
        } else if (num1[num1.length - 1] === 'π') {
            num1 = Math.PI * Number(num1.slice(0,num1.length - 1));
        } else {
            result = '';
        }
    }

    if (String(num2).includes('π')) {
        if (String(num2) === 'π') {
            num2 = Math.PI;
        } else if (num2[num2.length - 1] === 'π') {
            num2 = Math.PI * Number(num2.slice(0,num2.length - 1));
        } else {
            result = '';
        }
    }

    if (String(num1).length > 0 && num2 === '' && operator === '') {
        result = num1;
    }

    if (operator === '+') {
        result = Number(num1) + Number(num2);
    } else if (operator === '-') {
        result = Number(num1) - Number(num2);
    } else if (operator === '×') {
        result = Number(num1) * Number(num2);
    } else if (operator === '÷') {
        result = Number(num1) / Number(num2);
    }

    if (isNaN(result)) {
        changeWarningText('UNDEFINED');
        result = '';
    }

    allClear();

    document.getElementById('display').innerHTML = result;

    num1 = String(result);
}

function isNum(str) {
    if ('1234567890.π'.includes(str)) {
        return true;
    } else {
        return false;
    }
}

function allClear() {
    document.getElementById('display').innerHTML = '';
    num1 = '';
    num2 = '';
    operator = '';
}

function changeWarningText(text) {
    const warning = document.getElementById('warning');
    warning.style.marginTop = '80px';
    warning.style.display = 'block';
    document.getElementById('text').innerHTML = text;
    document.querySelector('.container').style.marginTop = '20px';

    setTimeout(() => {
        warning.style.marginTop = '0px';
        warning.style.display = 'none';
        document.querySelector('.container').style.marginTop = '130px';
    }, 5000)
}

function clearEntry() {
    const display = document.getElementById('display');
    display.innerHTML = display.innerHTML.slice(0, display.innerHTML.length - 1);

    if (num1.length > 0 && num2 === '' && operator === '') {
        num1 = String(num1).slice(0, String(num1).length - 1);
    } else if (num2.length > 0 && num1 !== '' && operator !== '') {
        num2 = String(num2).slice(0, String(num2).length - 1);
    } else if (operator !== '') {
        operator = '';
    } 
}

function changeBgColor() {
    const changer = document.getElementById('change');
    const body = document.querySelector('body');
    if (changer.className === 'green-linear') {
        changer.className = 'red-linear';
        body.className = 'red-linear';
    } else if (changer.className === 'red-linear') {
        changer.className = 'blue-linear';
        body.className = 'blue-linear';
    } else if (changer.className === 'blue-linear') {
        changer.className = 'black-linear';
        body.className = 'black-linear';
    } else if (changer.className === 'black-linear') {
        changer.className = 'purple-linear';
        body.className = 'purple-linear';
    } else if (changer.className === 'purple-linear') {
        changer.className = 'green-linear';
        body.className = 'green-linear';
    }
}