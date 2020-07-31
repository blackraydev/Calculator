"use strict";

class Calculator {
    operations: object;
    
    constructor() {
        this.operations = {
            ["+"](a: number, b: number): string {
                return String(a + b);
            },
            ["-"](a: number, b: number): string {
                return String(a - b);
            },
            ["×"](a: number, b: number): string {
                return String(a * b);
            },
            ["÷"](a: number, b: number): string {
                return String(a / b);
            }
        };
    }
}

// Event listeners for all the buttons
function addEvents() {
    const field   = document.querySelector(".field"),
          AC      = document.querySelector("#AC"),
          equiv   = document.querySelector("#equiv"),
          numbers = document.querySelectorAll(".number, .doubled, #comma"),
          signs   = document.querySelectorAll(".sign"),
          extra   = document.querySelectorAll(".extra");

    const calc: Calculator = new Calculator();

    let isLongType: boolean = false, // Набор чисел с неоднозначным кол-вом знаков
        isRepeated: boolean = false, // Нажатие на знак "Равно" более одного раза подряд
        isPressed: boolean = false,  // Исполнение функции калькулятора мат. операциями
        isNewInput: boolean = true,  // 
        isWaiting: boolean = true,   // Было первое нажатие мат. знака
        isTyped: boolean = false,    // 
        a, b: number,
        func = null;

    // Initial zeroing of the field
    field.innerHTML = "0";

    // Clearing field by pressing button "AC"
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

    // Input numbers
    function numberInput(input: string) {
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

    // Input math signs - "+" "-" "*" "÷"
    function signInput(input: string) {
        if (input === "*") input = "×";
        if (input === "/") input = "÷";

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

    // Input equivalence - "="
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

    // Input "+/-" or "%" signs
    function extraInput(input: string) {
        if (input === "+/-" || input === "–") {
            if (!isTyped) a = -a;
            else b = -b;
            
            field.innerHTML = String(-Number(field.innerHTML));
        }
        else {
            field.innerHTML = String(Number(field.innerHTML) * 0.01);
        }

        isNewInput = true;
    }

    // Button "AC" - event by mouse clicking
    AC.addEventListener("click", clear);

    // Buttons "Numbers" - event by mouse clicking
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function() {
            if (numbers[i].innerHTML !== ".") {
                numberInput(numbers[i].innerHTML);
            }
            else if (field.innerHTML.indexOf(".") === -1){
                field.innerHTML += ".";
            }
            
            isRepeated = false;
        })
    }

    // Buttons "Signs" - event by mouse clicking
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener("click", function() {
            signInput(signs[i].innerHTML);
        });
    }

    // Button "Equivalence" - event by mouse clicking
    equiv.addEventListener("click", equivNumbers);

    // Buttons "Extra" - event by mouse clicking
    for (let i = 0; i < extra.length; i++) {
        extra[i].addEventListener("click", function() {
            extraInput(extra[i].innerHTML);
        })
    }

    // All buttons - events by pressing keyboard buttons
    document.body.addEventListener("keydown", function(e) {
        if (e.key !== " ") {
            if (Number(e.key) >= 0 && Number(e.key) <= 9) {
                numberInput(e.key);
            }
            else if (e.key === "." && field.innerHTML.indexOf(".") === -1){
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
            
            isRepeated = false;
        }
    })
}

addEvents();