let startTime = 60;
let content= document.getElementById("words");
let timer = document.getElementById("timer");
let typing = document.getElementById("typing");

function timing() {
    let counterInt = setInterval(() => {
        startTime--;
        timer.innerHTML = "Timing: "+startTime; 
    }, 1000);

    let checkInt = setInterval(() => {
        if (startTime < 0) { 
            timer.innerHTML = "Game Over" 
            typing.disabled = true;
            clearInterval(counterInt);
            clearInterval(checkInt);
        }
    }, 400);

    getRandomContents();
}

timing();

function getRandomContents() {
    fetch("https://api.quotable.io/random")
        .then(e => e.json())
        .then(res => {
            typing.value = "";
            content.innerHTML = "";
            let arrContents = res.content.split("");
            arrContents.forEach((element) => {
                const textSpan = document.createElement("span");
                textSpan.innerText = element;
                content.appendChild(textSpan);
            });
        })
}

typing.addEventListener("keyup", () => {
    let contentwords = content.querySelectorAll("span");
    let inpValue = typing.value.split('');

    if (inpValue.length > contentwords.length) {
        getRandomContents();

        return;
    }

    contentwords.forEach((exact, index) => {

        const wordsVal = inpValue[index];
        if (wordsVal) {
            exact.classList.remove();
            if (wordsVal === exact.innerText) {
                exact.className = "correct";
            }
            if (wordsVal !== exact.innerText) {
                
                exact.className = "mistake";
            }
        }
        if (index > inpValue.length) {
            contentwords[index - 1].className = "";
        }
    })
})
