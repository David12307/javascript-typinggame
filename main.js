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
const sentence = sentences[Math.floor(Math.random() * sentences.length)];
document.getElementById("sentence").innerHTML = sentence;

let mistakes = 0;
textInput.addEventListener("input", () => {
    const text = textInput.value;
    textInput.maxLength = sentence.length;

    if (text[text.length-1] === sentence[text.length-1]) {
        console.log(true);
    } else {
        textInput.maxLength = 0;
        mistakes += 1;
    }
    if (textInput.value.length === sentence.length && textInput.value === sentence) {
        alert(`Yay! You finished it with ${mistakes} mistake(s)!`);
        location.reload();
    }
});