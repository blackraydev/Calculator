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
          equiv   = document.querySelector("#equiv"),
          AC      = document.querySelector("#AC"),
          numbers = document.querySelectorAll(".number, .doubled, #comma"),
          signs   = document.querySelectorAll(".sign"),
          extra   = document.querySelectorAll(".extra");

    const calc: Calculator = new Calculator();

    const mathSigns = {
        "÷": signs[0],
        "×": signs[1],
        "-": signs[2],
        "+": signs[3],
    }

    let isLongType: boolean  = false, // Long number is typed
        isRepeated: boolean  = false, // Tapping "=" sign two or more times in a roll
        isPressed: boolean   = false, // Calculating w/ tapping math. signs
        isNewInput: boolean  = true,  // Tapping numbers after calculating
        isWaiting: boolean   = true,  // Initially tapping the math. sign
        isTyped: boolean     = false, // Initially input of digit
        pressedSign: Element = null,  // Contains the last pressed math. sign as Element
        a, b: number         = null,  // Two terms
        func                 = null;  // Contains the last pressed math. sign as Function

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
        a = b = 0;

        if (pressedSign) {
            pressedSign.setAttribute("style", "");
        }
    }

    // Cutting long floating numbers
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
            if (field.innerHTML.length <= 8)
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

        cutFloatNum();

        if (pressedSign) {
            pressedSign.setAttribute("style", "");
        }
        
        pressedSign = mathSigns[input];
        pressedSign.setAttribute("style", "border: 1px solid black");
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

        if (field.innerHTML.length > 8) {
            field.innerHTML = Number(field.innerHTML).toFixed(field.innerHTML.length -
                              Math.floor(Number(field.innerHTML)).toString().length);
        }

        cutFloatNum();
    }

    // Button "AC" - event by mouse clicking
    AC.addEventListener("click", clear);

    // Buttons "Numbers" - event by mouse clicking
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function() {
            if (numbers[i].innerHTML !== ".") {
                numberInput(numbers[i].innerHTML);
            }
            else if (isNewInput && numbers[i].innerHTML === ".") {
                field.innerHTML = "0.";
                isNewInput = false;
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
    equiv.addEventListener("click", function() {
        equivNumbers();
    });

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
        }
    })
}

function main() {
    addEvents();
}

main();