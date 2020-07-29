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
        this.sum = 0;
    }
    return Calculator;
}());
function addEvents() {
    var field = document.querySelector(".field"), AC = document.querySelector("#AC"), numbers = document.querySelectorAll(".number, .doubled, #comma"), signs = document.querySelectorAll(".sign"), equiv = document.querySelector("#equiv");
    var calc = new Calculator();
    var repeated = false;
    var toggler = false;
    var calced = false;
    var access = false;
    var storage;
    var a, b;
    var func;
    field.innerHTML = "0";
    AC.addEventListener("click", function () {
        calc.sum = 0;
        field.innerHTML = String(calc.sum);
        toggler = false;
        calced = false;
        repeated = false;
        access = false;
    });
    var _loop_1 = function (i) {
        numbers[i].addEventListener("click", function () {
            if ((field.innerHTML == "0" || toggler || calced) && !access) {
                field.innerHTML = numbers[i].innerHTML;
                if (calced) {
                    toggler = false;
                }
                if (toggler) {
                    access = true;
                }
            }
            else {
                field.innerHTML += numbers[i].innerHTML;
            }
            repeated = false;
        });
    };
    for (var i = 0; i < numbers.length; i++) {
        _loop_1(i);
    }
    var _loop_2 = function (i) {
        signs[i].addEventListener("click", function () {
            var tempSign = signs[i].innerHTML;
            if (!toggler || tempSign != storage) {
                a = Number(field.innerHTML);
                toggler = true;
                storage = tempSign;
                func = calc.operations[signs[i].innerHTML];
            }
            else {
                b = Number(field.innerHTML);
                if (!calced) {
                    calced = true;
                    field.innerHTML = calc.operations[signs[i].innerHTML](a, b);
                }
            }
            access = false;
            repeated = false;
        });
    };
    for (var i = 0; i < signs.length; i++) {
        _loop_2(i);
    }
    equiv.addEventListener("click", function () {
        if (toggler) {
            if (!repeated) {
                b = Number(field.innerHTML);
                if (calced) {
                    a = b;
                }
                field.innerHTML = func(a, b);
                repeated = true;
            }
            else {
                a = Number(field.innerHTML);
                field.innerHTML = func(a, b);
            }
            access = false;
        }
    });
}
addEvents();
