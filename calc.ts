"use strict";

interface Calc {
    operations: object;
    sum: number;
}

class Calculator implements Calc {
    operations: object;
    sum: number;

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

        this.sum = 0;
    }
}

// Event listeners for all the buttons
function addEvents() {
    const field   = document.querySelector(".field"),
          AC      = document.querySelector("#AC"),
          numbers = document.querySelectorAll(".number, .doubled, #comma"),
          signs   = document.querySelectorAll(".sign"),
          equiv   = document.querySelector("#equiv");

    const calc: Calculator = new Calculator();

    let repeated: boolean = false;
    let toggler: boolean = false;
    let calced: boolean = false;
    let access: boolean = false;
    let storage: string;
    let a, b: number;
    let func;

    // Initial zeroing of the field
    field.innerHTML = "0";

    // Event for button 'AC' - Zeroing
    AC.addEventListener("click", function() {
        calc.sum = 0;
        field.innerHTML = String(calc.sum);
        
        toggler = false;
        calced = false;
        repeated = false;
        access = false;
    });

    // Events for 'Number' buttons
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function() {
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
    }

    // Events for 'Sign' buttons
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener("click", function() {
            let tempSign = signs[i].innerHTML;

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
    }

    equiv.addEventListener("click", function() {
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