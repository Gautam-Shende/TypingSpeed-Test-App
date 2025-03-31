


let testText = "I am a Frontend Developer and i Know how to code."
let timeLimit = 60;
let timeLeft = timeLimit;
let timer = null;
let wpm = 0;
let accuracy = 0;
let totalCharsTyped = 0;
let correctCharsTyped = 0;
let isTestActive = false;


const textDisplay = document.getElementById("textDisplay");
const inputArea = document.getElementById("inputArea");
const timeLeftDisplay = document.getElementById("timeLeft");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");


inputArea.addEventListener("input", processInput);
startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", resetTest);


function startTest() {
  if (isTestActive) return;
  
  resetTest();
  textDisplay.textContent = testText;
  inputArea.removeAttribute("disabled");
  inputArea.focus();
  isTestActive = true;
  
  timer = setInterval(updateTimer, 1000);
}


function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeLeftDisplay.textContent = `Time: ${timeLeft}s`;
  } else {
    clearInterval(timer);
    finishTest();
  }
}


function processInput() {
  totalCharsTyped++;
  
  const inputText = inputArea.value;
  const currentIndex = inputText.length - 1;
  
  
  if (inputText[currentIndex] === testText[currentIndex]) {
    correctCharsTyped++;
  }
  
  
  const minutes = (timeLimit - timeLeft) / 60;
  wpm = Math.round((correctCharsTyped / 5) / minutes);
  accuracy = Math.round((correctCharsTyped / totalCharsTyped) * 100);
  
  wpmDisplay.textContent = `WPM: ${wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
  
  
  if (inputText === testText) {
    finishTest();
  }
}


function finishTest() {
  inputArea.setAttribute("disabled", true);
  isTestActive = false;
  startBtn.textContent = "Restart Test";
  

  alert(`Test Complete!\n\nWPM: ${wpm}\nAccuracy: ${accuracy}%`);
}


function resetTest() {
  inputArea.value = "";
  timeLeft = timeLimit;
  timeLeftDisplay.textContent = `Time: ${timeLeft}s`;
  wpmDisplay.textContent = `WPM: 0`;
  accuracyDisplay.textContent = `Accuracy: 0%`;
  totalCharsTyped = 0;
  correctCharsTyped = 0;
  isTestActive = false;
  clearInterval(timer);
  inputArea.setAttribute("disabled", true);
  startBtn.textContent = "Start Test";
}
