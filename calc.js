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
    var field = document.querySelector(".field"), AC = document.querySelector("#AC"), equiv = document.querySelector("#equiv"), numbers = document.querySelectorAll(".number, .doubled, #comma"), signs = document.querySelectorAll(".sign"), extra = document.querySelectorAll(".extra");
    var calc = new Calculator();
    var isLongType = false, isRepeated = false, isPressed = false, isNewInput = true, isWaiting = true, isTyped = false, a, b, func = null;
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
    }
    function numberInput(input) {
        if (input.length > 9) {
        }
        if ((field.innerHTML === "0" || !isWaiting) && !isLongType || isNewInput) {
            if (!isWaiting) {
                isTyped = true;
                isLongType = true;
            }
            isNewInput = false;
            field.innerHTML = input;
        }
        else {
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
    }
    function equivNumbers() {
        if (isTyped || isWaiting || isPressed) {
            if (!isRepeated) {
                b = Number(field.innerHTML);
            }
            else {
                a = Number(field.innerHTML);
            }
            field.innerHTML = func(a, b);
            isNewInput = true;
            isRepeated = true;
            isWaiting = true;
            isTyped = false;
            isLongType = false;
        }
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
    }
    AC.addEventListener("click", clear);
    var _loop_1 = function (i) {
        numbers[i].addEventListener("click", function () {
            if (numbers[i].innerHTML !== ".") {
                numberInput(numbers[i].innerHTML);
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
    equiv.addEventListener("click", equivNumbers);
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
            console.log(field);
            isRepeated = false;
        }
    });
}
addEvents();
