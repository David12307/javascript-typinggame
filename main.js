const sentences = [
    "I can do all things through Christ who strengthens me.",
    "For God so loved the world that He gave His only Son.",
    "The Lord is my shepherd; I shall not want.",
    "Trust in the Lord with all your heart and lean not on your own understanding.",
    "Be strong and courageous. Do not be afraid; do not be discouraged.",
    "For I know the plans I have for you, declares the Lord.",
    "This is the day that the Lord has made; let us rejoice and be glad in it.",
    "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
    "Let all that you do be done in love.",
    "Cast all your anxiety on Him because He cares for you.",
    "Do not be overcome by evil, but overcome evil with good.",
    "In the beginning, God created the heavens and the earth.",
    "The joy of the Lord is your strength.",
    "Come to me, all who are weary and burdened, and I will give you rest.",
    "And we know that in all things God works for the good of those who love Him.",
    "God is our refuge and strength, an ever-present help in trouble.",
    "Faith is the assurance of things hoped for, the conviction of things not seen.",
    "Do to others as you would have them do to you.",
    "The light shines in the darkness, and the darkness has not overcome it.",
    "For where your treasure is, there your heart will be also."
];
  
const textInput = document.getElementById("textInput");
textInput.value = '';
let sentence = sentences[Math.floor(Math.random() * sentences.length)];
document.getElementById("sentence").innerHTML = sentence;

const sentenceArray = sentence.split(" ");
const wordsArray = [];

function adjustPosition() {
    const sentenceElement = document.getElementById("sentence");
    const textInput = document.getElementById("textInput");

    // Create a temporary span element with the attributes of the sentence and measure its width
    const span = document.createElement("span");
    span.textContent = sentenceElement.textContent;

    span.style.fontSize = window.getComputedStyle(sentenceElement).fontSize;
    span.style.fontFamily = window.getComputedStyle(sentenceElement).fontFamily;
    span.style.visibility = 'hidden';

    document.body.appendChild(span);
    const textWidth = span.offsetWidth;
    document.body.removeChild(span);

    textInput.style.width = `${textWidth + 10}px`;
}

adjustPosition();

startTimer(30, document.getElementById("timer"));

let mistakes = 0;
let completed = 0;
let charactersTyped = 0;
let correctChars = 0;
textInput.addEventListener("input", () => {
    const text = textInput.value;
    textInput.maxLength = sentence.length;

    if (text[text.length-1] === sentence[text.length-1]) {
        console.log(true);
        correctChars += 1;
    } else {
        textInput.maxLength = 0;
        mistakes += 1;
    }
    charactersTyped += 1;

    // Check winning conditions
    if (textInput.value.length === sentence.length && textInput.value === sentence) {
        completed += 1;
        sentence = sentences[Math.floor(Math.random() * sentences.length)];
        document.getElementById("sentence").innerHTML = sentence;
        textInput.value = '';
    }
});

function displayStats() {
    alert(`
        WPM: ${charactersTyped / (5 * 0.5)},
        Accuracy: ${(correctChars / charactersTyped) * 100},
        Typing speed: ${charactersTyped / 0.5},
        Total time: 30 seconds,
        Number of mistakes: ${mistakes}
    `)
}

function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(() => {
        seconds = parseInt(timer % 60, 10);
        display.textContent = `${seconds} seconds`;
        if (--timer < 0) {
            timer = 0;
            displayStats();
            location.reload();
        }
    }, 1000)
}