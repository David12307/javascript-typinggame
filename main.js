let sentences;

function fetchJson(category) {
    return fetch("sentences.json")
        .then(response => {
            if (!response.ok) throw new Error("Error fetching the json file.");
            return response.json();
        })
        .then(data => {
            return data[category];
        })
        .catch(err => {
            console.error("Error ", err);
        });
}
  
const textInput = document.getElementById("textInput");
textInput.value = '';
let sentence;

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

    textInput.style.width = `${textWidth + 20}px`;
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("container").style.display = 'none';
    document.getElementById("results-div").style.display = 'none';
    document.getElementById('difficulty-input').value = 'medium';
    document.getElementById("category-input").value = 'quotes';
    adjustPosition();
    window.addEventListener("resize", adjustPosition);
});

let totalSeconds;

document.getElementById('start-button').addEventListener('click', async () => {
    document.getElementById("start-menu").style.display = 'none';
    const difficulty = document.getElementById("difficulty-input").value;
    const category = document.getElementById("category-input").value;
    const timer = document.getElementById("timer");
    if (difficulty === 'medium') {
        startTimer(60, timer);
        timer.textContent = '60 seconds';
        totalSeconds = 60;
    }
    else startTimer(30, timer), totalSeconds = 30;

    sentences = await fetchJson(category);

    sentence = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById("sentence").innerHTML = sentence.text;
    document.getElementById('ref-text').innerHTML = sentence.reference;

    document.getElementById("container").style.display = 'block';
    textInput.focus();
    adjustPosition();
});

let mistakes = 0;
let completed = 0;
let charactersTyped = 0;
let correctChars = 0;
textInput.addEventListener("input", () => {
    const text = textInput.value;
    textInput.maxLength = sentence.text.length;

    if (text[text.length-1] === sentence.text[text.length-1]) {
        console.log(true);
        correctChars += 1;
    } else {
        textInput.maxLength = 0;
        mistakes += 1;
    }
    charactersTyped += 1;

    // Check winning conditions
    if (textInput.value.length === sentence.text.length && textInput.value === sentence.text) {
        completed += 1;
        sentence = sentences[Math.floor(Math.random() * sentences.length)];
        document.getElementById("sentence").innerHTML = sentence.text;
        document.getElementById('ref-text').innerHTML = sentence.reference;
        textInput.value = '';
        adjustPosition();
    }
    if (completed === 5) {
        displayStats();
    }
});

function displayStats() {
    let perMinute = totalSeconds = 30 ? 0.5 : 1;
    const wpmText = document.getElementById("wpm");
    const accText = document.getElementById("accuracy");
    const typingSpeedText = document.getElementById("typingspeed");
    const nomistakes = document.getElementById("nomistakes");
    const sentencesCompleted = document.getElementById("sentencesCompleted");

    wpmText.textContent = Math.round(charactersTyped / (5 * perMinute));
    accText.textContent = `${Math.round((correctChars / charactersTyped) * 100)}%`;
    typingSpeedText.textContent = charactersTyped / perMinute;
    nomistakes.textContent = mistakes;
    sentencesCompleted.textContent = completed;

    document.getElementById("container").style.display = 'none';
    document.getElementById("results-div").style.display = 'block';
    document.getElementById("tryAgain-button").addEventListener('click', () => location.reload());
}

function startTimer(duration, display) {
    var timer = duration-1, seconds;
    setInterval(() => {
        seconds = parseInt(timer % 60, 10);
        display.textContent = `${seconds} seconds`;
        if (--timer < 0) {
            timer = 0;
            displayStats();
        }
    }, 1000)
}