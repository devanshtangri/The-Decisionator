let toss = [], count = 0, positiveOutcomes = 0, negativeOutcomes = 0;
const positiveProgress = document.querySelector("#positiveProgress");
const negativeProgress = document.querySelector("#negativeProgress");


function EvenOdd (N) {
    return (N % 2 === 0) ? 1 : 0;
}
function getResult () {
    if (count++ < speed) {
        let randomValue = Math.round(Math.random() * 20);
        randomValue = EvenOdd(randomValue);
        toss.push(randomValue);
        if (randomValue !== toss[0]) {
            toss = [];
            count = 0;
        }
        setTimeout(getResult, 5);
    } else {
        const progressBox = document.createElement("div");
        progressBox.className = "progressBoxes";

        if (toss.every(v => { return v === 0 })) {
            positiveOutcomes++;
            positiveProgress.lastChild.style.animation = "none";
            if (positiveOutcomes === 10) { winEvent(true); return; }
            positiveProgress.appendChild(progressBox);
        } else {
            negativeOutcomes++;
            negativeProgress.lastChild.style.animation = "none";
            progressBox.style.backgroundColor = "#b22222";
            if (negativeOutcomes === 10) { winEvent(false); return; }
            negativeProgress.appendChild(progressBox);
        }

        count = 0;
        toss = [];
        setTimeout(getResult, 5)
    }
}