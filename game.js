const words = [
  "กระต่ายกระโดดข้ามรั้ว",
  "ปราสาทประดับเพชร",
  "ปลาว่ายในแม่น้ำลำธาร",
  "แสงแดดส่องประกายระยิบ",
  "ประตูบ้านประดับลายไม้",
  "ดอกไม้บานระบัดกลิ่นหอม",
  "ครูตรวจการบ้านนักเรียน",
  "ปลาสร้อยกระโดดข้ามโขดหิน",
  "ประสานใจเพื่อความสงบสุข",
  "โปรดอย่าลืมปิดประตู",
  "ปราชญ์ผู้ชาญฉลาด",
  "กรอบภาพประดับลวดลายทอง",
  "พรายน้ำสะท้อนแสงแดด",
  "กวางป่ากระโดดข้ามทุ่ง",
  "วัดประจำหมู่บ้าน",
  "พยุงประตูให้คงที่",
  "กรุงเก่ามีปราสาท",
  "พระเจ้าประดับด้วยเพชร",
  "การรณรงค์เพื่อความสงบสุข",
  "ขลุ่ยไม้ไผ่บรรเลงเพลงเพราะ",
  "ปลาสร้อยลอยตามลำธาร",
  "ปราสาทสวยงามระยับ",
  "กรวดน้ำหลังจากไหว้พระ",
  "ปรากฏการณ์ท้องฟ้าสีทอง",
  "ประมงจับปลาด้วยแห",
  "กระเพราหอมกรุ่นในกระทะ",
  "ปราบโจรร้ายที่ปล้นบ้าน",
  "ขับรถประจำทางในกรุงเทพ",
  "กระบี่ของพระนเรศวร",
  "ประคองเด็กเล็กข้ามถนน",
  "พลอยประดับในกรอบทอง",
  "ลำธารใสและปลาสร้อยแหวกว่าย",
  "กระเป๋าหนังจระเข้สีดำ",
  "ขลุ่ยไทยบรรเลงเพลงกล่อม",
  "กระจกรถสะท้อนแสงแดด",
  "ปรากฏตัวในงานเลี้ยง",
  "ประตูใหญ่ถูกลมกระแทก",
  "พลับพลากลางน้ำในกรุงเก่า",
  "ครูประจำชั้นดูแลนักเรียน",
  "ขวัญใจคนไทยทั้งประเทศ",
  "ปลาทูทอดกรอบรสอร่อย",
  "โปรแกรมเมอร์เขียนโค้ดด้วยความตั้งใจ",
  "ขวดน้ำประดับด้วยคริสตัล",
  "กล้วยไม้ผลิบานงดงาม",
  "ประทัดดังสนั่นในงานวัด",
  "ครกหินบดพริกในครัว",
  "กรุงเทพฯ เมืองหลวงของไทย",
  "ปรบมือให้กับผู้ชนะ",
  "พระปรางค์วัดอรุณสว่างไสว",
];

let currentWord = "";
let score = 0;
let timeLeft = 10;
let timerInterval;
let recognition = null;

const wordElement = document.getElementById("word");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("startButton");
const gameOverElement = document.getElementById("gameOver");
const finalScoreElement = document.getElementById("finalScore");

function initSpeechRecognition() {
  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "th-TH";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function (event) {
      const spokenWord = event.results[0][0].transcript.trim();
      if (spokenWord === currentWord) {
        score++;
        scoreElement.textContent = `คะแนน: ${score}`;
        resetTimer();
        selectNewWord();
      }
    };

    recognition.onend = function () {
      if (timeLeft > 0) {
        recognition.start();
      }
    };
  }
}

function selectNewWord() {
  const newWord = words[Math.floor(Math.random() * words.length)];
  currentWord = newWord;
  wordElement.textContent = newWord;
}

function startGame() {
  score = 0;
  timeLeft = 10;
  scoreElement.textContent = `คะแนน: ${score}`;
  timerElement.textContent = timeLeft;
  gameOverElement.style.display = "none";
  startButton.disabled = true;

  selectNewWord();
  startTimer();
  if (!recognition) {
    initSpeechRecognition();
  }
  if (recognition) {
    recognition.start();
  }
}

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = setInterval(function () {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function resetTimer() {
  timeLeft = 10;
  timerElement.textContent = timeLeft;
}

function endGame() {
  clearInterval(timerInterval);
  if (recognition) {
    recognition.stop();
  }
  wordElement.textContent = "";
  timerElement.textContent = "0";
  gameOverElement.style.display = "block";
  finalScoreElement.textContent = score;
  startButton.disabled = false;

  Swal.fire({
    title: "Game Over",
    text: `คะแนน: ${score}`,
    icon: "error",
  });
}

startButton.addEventListener("click", startGame);
