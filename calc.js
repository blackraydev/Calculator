"use strict";
var Calculator = (function () {
    function Calculator() {
        var _a;
        this.operations = (_a = {},
            _a["+"] = function (a, b) {
                return String(a + b);
            },
            _a["-"] = function (a, b) {
                return String(a - b);
            },
            _a["×"] = function (a, b) {
                return String(a * b);
            },
            _a["÷"] = function (a, b) {
                return String(a / b);
            },
            _a);
    }
    return Calculator;
}());
function addEvents() {
    var field = document.querySelector(".field"), equiv = document.querySelector("#equiv"), AC = document.querySelector("#AC"), numbers = document.querySelectorAll(".number, .doubled, #comma"), signs = document.querySelectorAll(".sign"), extra = document.querySelectorAll(".extra");
    var calc = new Calculator();
    var mathSigns = {
        "÷": signs[0],
        "×": signs[1],
        "-": signs[2],
        "+": signs[3],
    };
    var isLongType = false, isRepeated = false, isPressed = false, isNewInput = true, isWaiting = true, isTyped = false, pressedSign = null, a, b = null, func = null;
    field.innerHTML = "0";
    function clear() {
        field.innerHTML = "0";
        isNewInput = true;
        isWaiting = true;
        isTyped = false;
        isLongType = false;
        isRepeated = false;
        isPressed = false;
        func = null;
        a = b = 0;
        if (pressedSign) {
            pressedSign.setAttribute("style", "");
        }
    }
    function cutFloatNum() {
        if (field.innerHTML.length > 7) {
            field.innerHTML = Number(field.innerHTML).toFixed(7 -
                Math.floor(Number(field.innerHTML)).toString().length);
            while (field.innerHTML[field.innerHTML.length - 1] === "0") {
                field.innerHTML = field.innerHTML.slice(0, field.innerHTML.length - 1);
            }
            if (field.innerHTML[field.innerHTML.length - 1] === ".") {
                field.innerHTML = field.innerHTML.slice(0, field.innerHTML.length - 1);
            }
        }
    }
    function numberInput(input) {
        if ((field.innerHTML === "0" || !isWaiting) && !isLongType || isNewInput) {
            if (!isWaiting) {
                isTyped = true;
                isLongType = true;
            }
            isNewInput = false;
            field.innerHTML = input;
        }
        else {
            if (field.innerHTML.length <= 8)
                field.innerHTML += input;
        }
    }
    function signInput(input) {
        if (input === "*")
            input = "×";
        if (input === "/")
            input = "÷";
        if (isWaiting) {
            a = Number(field.innerHTML);
            isWaiting = false;
        }
        else if (isTyped) {
            b = Number(field.innerHTML);
            field.innerHTML = func(a, b);
            a = Number(field.innerHTML);
            isPressed = true;
        }
        isNewInput = true;
        isTyped = false;
        isLongType = false;
        isRepeated = false;
        func = calc.operations[input];
        cutFloatNum();
        if (pressedSign) {
            pressedSign.setAttribute("style", "");
        }
        pressedSign = mathSigns[input];
        pressedSign.setAttribute("style", "border: 1px solid black");
    }
    function equivNumbers() {
        if (isTyped || isWaiting || isPressed) {
            if (!isRepeated) {
                b = Number(field.innerHTML);
            }
            else {
                a = Number(field.innerHTML);
            }
            if (func) {
                field.innerHTML = func(a, b);
                pressedSign.setAttribute("style", "");
            }
            isNewInput = true;
            isRepeated = true;
            isWaiting = true;
            isTyped = false;
            isLongType = false;
        }
        else if (func) {
            if (!b) {
                field.innerHTML = func(a, a);
                b = a;
            }
            else {
                field.innerHTML = func(a, b);
            }
            a = Number(field.innerHTML);
        }
        cutFloatNum();
    }
    function extraInput(input) {
        if (input === "+/-" || input === "–") {
            if (!isTyped)
                a = -a;
            else
                b = -b;
            field.innerHTML = String(-Number(field.innerHTML));
        }
        else {
            field.innerHTML = String(Number(field.innerHTML) * 0.01);
        }
        isNewInput = true;
        if (field.innerHTML.length > 8) {
            field.innerHTML = Number(field.innerHTML).toFixed(field.innerHTML.length -
                Math.floor(Number(field.innerHTML)).toString().length);
        }
        cutFloatNum();
    }
    AC.addEventListener("click", clear);
    var _loop_1 = function (i) {
        numbers[i].addEventListener("click", function () {
            if (numbers[i].innerHTML !== ".") {
                numberInput(numbers[i].innerHTML);
            }
            else if (isNewInput && numbers[i].innerHTML === ".") {
                field.innerHTML = "0.";
                isNewInput = false;
            }
            else if (field.innerHTML.indexOf(".") === -1) {
                field.innerHTML += ".";
            }
            isRepeated = false;
        });
    };
    for (var i = 0; i < numbers.length; i++) {
        _loop_1(i);
    }
    var _loop_2 = function (i) {
        signs[i].addEventListener("click", function () {
            signInput(signs[i].innerHTML);
        });
    };
    for (var i = 0; i < signs.length; i++) {
        _loop_2(i);
    }
    equiv.addEventListener("click", function () {
        equivNumbers();
    });
    var _loop_3 = function (i) {
        extra[i].addEventListener("click", function () {
            extraInput(extra[i].innerHTML);
        });
    };
    for (var i = 0; i < extra.length; i++) {
        _loop_3(i);
    }
    document.body.addEventListener("keydown", function (e) {
        if (e.key !== " ") {
            if (Number(e.key) >= 0 && Number(e.key) <= 9) {
                numberInput(e.key);
            }
            else if (e.key === "." && field.innerHTML.indexOf(".") === -1) {
                field.innerHTML += ".";
            }
            else if (e.key === "Escape") {
                clear();
            }
            else if (e.key === "*" || e.key === "/" || e.key === "+" || e.key === "-") {
                signInput(e.key);
            }
            else if (e.key === "Enter") {
                equivNumbers();
            }
            else if (e.key === "–" || e.key === "%") {
                extraInput(e.key);
            }
        }
    });
}
function main() {
    addEvents();
}
main();
