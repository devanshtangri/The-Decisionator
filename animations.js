let disabled = false, barClicked = false, speed = 6;


// Set Cookie //
function setCookie (name, value) {
    document.cookie = `${name}=${value}; expires=Sun, 1 January 2100 12:00:00 UTC;`;
}
// Set Cookie //


// Get Cookie //
function getCookie (name) {
    let value = null;
    document.cookie.split("; ").forEach((v) => {
        v = v.split("=");
        if (v[0] === name) {
            value = v[1];
        }
    });

    return value;
}
// Get Cookie //



// Handle typewriter effect in the input bar //
const inputBox = document.querySelector("#userPrompt");
let prompts = [
    "wear pajamas to work?",
    "start a band even if I can't play an instrument?",
    "make a cake shaped like my face?",
    "build a blanket fort and work inside it?",
    "order pizza for the third night in a row?",
    "train my cat to fetch the mail?",
    "bring a rubber chicken to the next meeting?",
    "replace my desk chair with a beanbag?",
    "rearrange my furniture at 3 a.m.?",
    "quit my job and become a full-time pirate?",
    "buy the new iPhone?",
    "switch to only using pirate slang?",
    "have ice cream for lunch?",
    "dye my hair the color of a highlighter?",
    "start speaking in rhymes for a whole day?",
    "eat cereal for dinner all week?",
    "name my baby after a video game character?",
    "build a pillow fort instead of doing chores?",
    "text my ex “just to say hi”?",
    "eat cake for breakfast?",
    "adopt a llama and take it to the office?",
    "speak in an accent for the rest of the day?",
    "try cooking something I can't even pronounce?",
    "skip laundry and just buy new clothes?",
    "turn my living room into a mini golf course?",
    "try to become TikTok famous?",
    "start a band even if I can't play an instrument?",
    "wear a cape to the grocery store?",
    "learn to moonwalk before Monday?",
    "buy matching tracksuits for me and my pet?",
    "try to break a world record for fun?"
];
function shufflePrompts () {
    return prompts
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

prompts = shufflePrompts();
let i = 0, j = 0, deleting = false, currentPhraze = "";
function typewriter () {
    if (!barClicked) {
        if (deleting) {
            if (inputBox.value.length != 0) {
                inputBox.value = currentPhraze.substring(0, currentPhraze.length - i++);
                setTimeout(typewriter, 20);
            } else {
                i = 0;
                deleting = false;
                if (j > 9) j = 0;
                setTimeout(typewriter);
            }
        } else if (i < prompts[j].length) {
            inputBox.value += prompts[j].charAt(i++);
            setTimeout(typewriter, 30);
        } else {
            setTimeout(() => {
                deleting = true;
                currentPhraze = prompts[j];
                j++;
                i = 0;
                if (j > 9) j = 0;
                typewriter();
            }, 1500);
        }
    }
}
typewriter();
// Handle typewriter effect in the input bar //


// Disable typewrite effect on focus //
inputBox.addEventListener("click", () => {
    barClicked = true;
    inputBox.value = "";
}, { once: true });
// Disable typewrite effect on focus //


// Handle mode highlight animation //
const highlight = document.querySelector("#highlight");
function moveHighlight (target) {
    if (!disabled) {
        const { offsetLeft, offsetWidth } = target;
        highlight.style.left = `${offsetLeft}px`;
        highlight.style.width = `${offsetWidth}px`;

        document.querySelectorAll(".mode").forEach(m => m.classList.remove('selected'));
        target.classList.add("selected");
    }
}

if (getCookie("selectedSpeed") !== null) moveHighlight(document.querySelector(`#${getCookie("selectedSpeed")}`));
else moveHighlight(document.querySelector(`#Fast`));

document.querySelectorAll(".mode").forEach(mode => {
    mode.addEventListener("click", () => moveHighlight(mode));
});
// Handle mode highlight animation //


// Handle start event and display alert when no input given //
const startButton = document.querySelector("#startProcess");
const processBox = document.querySelector("#process");
startButton.addEventListener("click", startProcess);
document.addEventListener("keypress", startProcess);

function startProcess (e) {
    if (e.key === "Enter" || e.type === "click") {
        if (inputBox.value === "" || !barClicked) {
            inputBox.style.border = "10px solid rgb(236, 92, 65)";
            inputBox.style.padding = "0 2rem";
            document.querySelector("#promptAlert").style.visibility = "visible";
            document.querySelector("#promptAlert").style.opacity = "1";
            setTimeout(() => {
                inputBox.style.padding = "0 1rem";
                inputBox.style.border = "0px solid transparent";
                document.querySelector("#promptAlert").style.visibility = "hidden";
                document.querySelector("#promptAlert").style.opacity = "0";
            }, 2000);
            return;
        }
        document.removeEventListener("keypress", startProcess);
        processBox.style.height = "22.5rem";

        startButton.disabled = true;
        disabled = true

        speed = document.querySelector(".selected").getAttribute("value");
        setCookie("selectedSpeed", document.querySelector(".selected").getAttribute("id"))

        const progressBox1 = document.createElement("div");
        progressBox1.className = "progressBoxes";
        positiveProgress.appendChild(progressBox1);

        const progressBox2 = document.createElement("div");
        progressBox2.className = "progressBoxes";
        progressBox2.style.backgroundColor = "#b22222";
        negativeProgress.appendChild(progressBox2);

        setTimeout(() => {
            for (i = 0; i < 50; i++) Math.random();
            getResult();
        }, 100);
    }
}
// Handle start event and display alert when no input given //


// Handle win event and display message //
const positiveResponses = [
    "Yes, and I think you should lean into it with absolutely no hesitation.",
    "Definitely yes — this has all the makings of a great story later.",
    "Yes, and I'm confident you'll handle whatever follows with style.",
    "Absolutely — just remember to act like you planned it all along.",
    "Yes, because sometimes the best decisions are the ones that feel a little reckless.",
    "Go for it — the world is ready for this version of you.",
    "Yes, and I suggest doing it like you've been waiting your whole life for this moment.",
    "Absolutely — the opportunity is too good to let pass.",
    "Yes, and I have a feeling it's going to work out better than you expect.",
    "Definitely yes — consider this your official go-ahead.",
    "Yes, and you should enjoy every second of it.",
    "Without a doubt — this is your cue to step forward.",
    "Yes, and I can already tell this will be memorable.",
    "Absolutely — there's no better time than right now.",
    "Yes, and I hope you do it with a big grin.",
    "For sure — this is one of those choices you won't regret.",
    "Yes, and I expect you to tell me how it goes.",
    "Absolutely — fortune clearly favors you today.",
    "Yes, and I'd recommend going all in on it.",
    "Definitely yes — you've got this in the bag."
];

const negativeResponses = [
    "No, and I think you'll thank yourself later for holding back.",
    "Not this time — it's one of those ideas best left on the shelf.",
    "No, because even a little patience might make the outcome way better.",
    "I'd say no, only because the timing just isn't on your side right now.",
    "No, and I promise it's not because I'm trying to ruin your fun.",
    "Let's not — this might be one of those things that's better in theory.",
    "No, and that's coming from a place of deep, supportive wisdom.",
    "Probably not — the stars just gave me a polite but firm shake of the head.",
    "No, because even adventures need an intermission sometimes.",
    "Not today — but I'm not ruling it out for the future.",
    "No, and it's probably for the best in the long run.",
    "Let's skip this one — it feels like the wrong moment.",
    "No, and I think you already knew that deep down.",
    "Not today — the mood just isn't right for it.",
    "No, but that doesn't mean never.",
    "Let's save this for a time when the odds are better.",
    "No, and I'm quietly relieved about it.",
    "Not now — patience will pay off later.",
    "No, but you can still dream about it.",
    "Let's pass — there's a better idea waiting around the corner."
];

const resultBox = document.querySelector("#resultBox");
function winEvent (result) {
    resultBox.style.animation = "processEnd 0.5s ease-in-out 1 normal forwards";
    if (result) {
        resultBox.innerHTML = positiveResponses[Math.round(Math.random() * 19)];
    } else {
        resultBox.style.backgroundColor = "#b22222";
        resultBox.innerHTML = negativeResponses[Math.round(Math.random() * 19)];
    }
    resultBox.innerHTML += "<button id='refresh'>Reload the Chaos</button>";

    document.querySelector("#refresh").addEventListener("click", () => { window.location.reload(); })
}
// Handle win event and display message //