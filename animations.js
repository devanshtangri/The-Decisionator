let disabled = false, barClicked = false, speed = 6;
let modalVerb = document.querySelector("#modalVerb");

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

if (getCookie("modalVerb") !== null) modalVerb.value = getCookie("modalVerb");

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
        setCookie("selectedSpeed", document.querySelector(".selected").getAttribute("id"));
        setCookie("modalVerb", modalVerb.value);

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
const responses = [[
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
], [
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
], [
    "Yes, you absolutely could — the potential is right there for you.",
    "Definitely yes — the possibilities are wide open.",
    "Yes, and I think you'd surprise yourself with how well it turns out.",
    "For sure — nothing's stopping you but hesitation.",
    "Absolutely — the opportunity is well within your reach.",
    "Yes, and I'd say you're more capable than you realize.",
    "Without a doubt — you could, and it might even be fun.",
    "Yes, and honestly, why wouldn't you?",
    "Totally — you've got the tools to pull it off.",
    "Yes, and I think the odds are tilted in your favor.",
    "Definitely — you could, and I bet it'll feel easier than you expect.",
    "Yes, and I can already see you making it work.",
    "Absolutely — the door is open for you.",
    "Yes, and I think this could be the start of something bigger.",
    "For sure — the answer is sitting right in your hands.",
    "Yes, and you might even enjoy proving yourself right.",
    "Definitely yes — your capability is not in question.",
    "Yes, and you might look back and laugh at how simple it was.",
    "Absolutely — you could, and you probably should try.",
    "Yes, and I think you'll be glad you gave it a shot."
], [
    "Not this time — technically possible, but not worth the effort.",
    "No, and honestly, it'd take way too much out of you.",
    "Probably not — at least not without making life harder than it needs to be.",
    "No, because the timing's off for pulling this off well.",
    "Not today — the odds just aren't in your corner.",
    "No, and even if you could, should you really?",
    "Let's say no — this one would be more stress than reward.",
    "Not now — you'd just be forcing it.",
    "No, and you'd thank yourself later for passing on it.",
    "Probably not — the universe seems to have other plans.",
    "No, and it would be a bigger hassle than you're imagining.",
    "Not this time — the energy just isn't there.",
    "No, and that's a solid call for your peace of mind.",
    "Let's pass — the cost would outweigh the payoff.",
    "No, and honestly, I think you already know why.",
    "Not right now — the conditions just don't line up.",
    "Probably not — it would take way more than you're prepared for.",
    "No, and that's actually a smart move.",
    "Not today — you could try, but it wouldn't stick.",
    "Let's skip it — this isn't the hill to climb."
], [
    "Yes, and I can already see it happening.",
    "Absolutely — the future is leaning your way.",
    "Definitely yes — it's practically written in stone.",
    "Yes, and sooner than you think.",
    "Without a doubt — destiny seems to agree with you.",
    "Yes, and I bet it'll feel like everything lined up perfectly.",
    "Absolutely — the path is clearing just for you.",
    "Yes, and it's going to be better than you imagine.",
    "Definitely yes — this one's already set in motion.",
    "Yes, and the momentum is all on your side.",
    "For sure — this is one of those inevitabilities.",
    "Yes, and when it happens, you'll wonder why you ever doubted it.",
    "Absolutely — the signs are pointing directly at yes.",
    "Yes, and the timing will feel just right.",
    "Definitely yes — the future looks bright.",
    "Yes, and you'll probably smile when it all clicks together.",
    "Absolutely — you're on track and unstoppable.",
    "Yes, and honestly, it was always going to go this way.",
    "Without question — this outcome is yours.",
    "Yes, and you'll be glad you waited for it."
], [
    "Not this time — the future has other plans.",
    "No, and that's actually a blessing in disguise.",
    "Probably not — at least not the way you're picturing it.",
    "No, because the timing just doesn't sync up.",
    "Not today — the outcome isn't lining up for you.",
    "No, and I think that's the universe's polite way of saying ‘try again later.'",
    "Let's say no — it's not in the cards right now.",
    "Not now — the road isn't leading there just yet.",
    "No, and honestly, that might be for the best.",
    "Probably not — the momentum is heading elsewhere.",
    "No, and I think you'll understand why soon enough.",
    "Not this time — the signs are pointing away from it.",
    "No, because something better is around the corner.",
    "Let's pass on this — it doesn't look set to happen.",
    "No, and you might end up grateful for that.",
    "Not yet — the future is still undecided, but leaning no.",
    "No, and forcing it would only make things worse.",
    "Probably not — this one just isn't written for you.",
    "No, and that's okay — not everything is meant to be.",
    "Let's skip it — destiny has a different plan."
]];

const resultBox = document.querySelector("#resultBox");
function winEvent (result) {
    resultBox.style.animation = "processEnd 0.5s ease-in-out 1 normal forwards";
    if (result) {
        resultBox.innerHTML = responses[Number(modalVerb.value)][Math.round(Math.random() * 19)];
    } else {
        resultBox.style.backgroundColor = "#b22222";
        resultBox.innerHTML = responses[Number(modalVerb.value) + 1][Math.round(Math.random() * 19)];
    }
    resultBox.innerHTML += "<button id='refresh'>Reload the Chaos</button>";

    document.querySelector("#refresh").addEventListener("click", () => { window.location.reload(); })
}
// Handle win event and display message //