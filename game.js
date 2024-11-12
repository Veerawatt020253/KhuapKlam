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
  "กรุงเทพ เมืองหลวงของไทย",
  "ปรบมือให้กับผู้ชนะ",
  "พระปรางค์วัดอรุณสว่างไสว",
];

let currentWord = "";
let score = 0;
let timeLeft = 15;
let timerInterval;
let recognition = null;

// เตรียมเสียงตอบถูก
const correctSound = new Audio('./sound/correct.mp3');

// ดึง element คำที่ต้องพูด
const wordElement = document.getElementById("word");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("startButton");

// ฟังก์ชันเริ่มต้นสำหรับ Speech Recognition
function initSpeechRecognition() {
  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "th-TH";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function (event) {
      const spokenWord = event.results[0][0].transcript.trim();
      console.log(`User said: ${spokenWord}`);
      if (spokenWord === currentWord) {
        // เล่นเสียงตอบถูก
        correctSound.play();
        
        score++;
        resetTimer();
        selectNewWord();
      } else {
        Swal.fire({
          title: "พูดไม่ตรง",
          text: `คุณพูดว่า: "${spokenWord}" ลองอีกครั้ง`,
          icon: "error",
        });
      }
    };

    recognition.onend = function () {
      if (timeLeft > 0) {
        recognition.start();
      }
    };
  } else {
    Swal.fire({
      title: "ไม่รองรับ",
      text: "เบราว์เซอร์ของคุณไม่รองรับ Speech Recognition",
      icon: "error",
    });
  }
}

// ฟังก์ชันสำหรับเลือกคำใหม่
function selectNewWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordElement.textContent = `พูดคำว่า: "${currentWord}"`; // แสดงคำที่ต้องพูด
}

// ฟังก์ชันเริ่มเกม
function startGame() {
  score = 0;
  timeLeft = 15;
  timerElement.textContent = timeLeft;
  startButton.disabled = true;
  selectNewWord();
  startTimer();

  if (!recognition) {
    initSpeechRecognition();
  }
  recognition.start();
}

// ฟังก์ชันสำหรับเริ่มตัวจับเวลา
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

// ฟังก์ชันสำหรับรีเซ็ตเวลา
function resetTimer() {
  timeLeft = 15;
  timerElement.textContent = timeLeft;
}

// ฟังก์ชันเมื่อจบเกม
function endGame() {
  clearInterval(timerInterval);
  if (recognition) {
    recognition.stop();
  }
  Swal.fire({
    title: "จบเกม!",
    text: `คะแนนที่คุณได้คือ: ${score}`,
    icon: "success",
  });
  startButton.disabled = false;
  wordElement.textContent = "สวัสดี"; // รีเซ็ตคำที่ต้องพูดเมื่อจบเกม
}

// กดปุ่มเริ่มเกม
startButton.addEventListener("click", startGame);