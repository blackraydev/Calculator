"use strict";

function justifyContent() {
    const calc = document.querySelector(".calc");

    calc.style.top = `${(document.documentElement.clientHeight - calc.clientHeight) / 2}px`;
    calc.style.left = `${(document.documentElement.clientWidth - calc.clientWidth) / 2}px`;
}

justifyContent();