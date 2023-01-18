let startTime = 60;
let content= document.getElementById("content");
let timer = document.getElementById("counter");
let typingArea = document.getElementById("typing_area");

function timing() {
    let counterInt = setInterval(() => {
        startTime--;
        timer.innerHTML = "Timing: "+startTime; 
    }, 1000);

    let checkInt = setInterval(() => {
        if (startTime < 0) { 
            timer.innerHTML = "Game Over" 
            typingArea.disabled = true;
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
            typingArea.value = "";
            content.innerHTML = "";
            let arrContents = res.content.split("");
            arrContents.forEach((element) => {
                const textSpan = document.createElement("span");
                textSpan.innerText = element;
                content.appendChild(textSpan);
            });
        })
}

typingArea.addEventListener("keyup", () => {
    let contentQuote = content.querySelectorAll("span");
    let inpValue = typingArea.value.split('');

    if (inpValue.length > contentQuote.length) {
        getRandomContents();

        return;
    }

    contentQuote.forEach((exact, index) => {

        const contentVal = inpValue[index];
        if (contentVal) {
            exact.classList.remove();
            if (contentVal === exact.innerText) {
                exact.className = "correct";
            }
            if (contentVal !== exact.innerText) {
                
                exact.className = "mistake";
            }
        }
        if (index > inpValue.length) {
            contentQuote[index - 1].className = "";
        }
    })
})
