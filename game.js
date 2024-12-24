const words = [
  // ชุด 1
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
  // ชุด 2
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
  // ชุด 3
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
  // ชุด 4
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
  // ชุด 5
  "ปลาทูทอดกรอบรสอร่อย",
  "โปรแกรมเมอร์เขียนโค้ดด้วยความตั้งใจ",
  "ขวดน้ำประดับด้วยคริสตัล",
  "กล้วยไม้ผลิบานงดงาม",
  "ประทัดดังสนั่นในงานวัด",
  "ครกหินบดพริกในครัว",
  "กรุงเทพ เมืองหลวงของไทย",
  "ปรบมือให้กับผู้ชนะ",
  "พระปรางค์วัดอรุณสว่างไสว",
  "กระเช้าดอกไม้ประดับห้อง",
  // ชุด 6
  "ปลาหมอแหวกว่ายในคลอง",
  "กระท่อมริมธารน้ำใส",
  "ประดับไฟในสวนสวย",
  "พระอาทิตย์ส่องแสงทอง",
  "ขลุ่ยฟังเพลงกล่อมใจ",
  "กระเทียมเจียวหอมกรุ่น",
  "กราบพระประจำบ้าน",
  "โปรดปรานอาหารไทย",
  "กระเช้าต้นไม้ประดับ",
  "ประจบผู้ใหญ่ในงาน",
  // ชุด 7
  "โปรดระวังไฟแดง",
  "กระโดดข้ามรั้วสูง",
  "ประดับเพชรที่หัวเข็มขัด",
  "กระเบื้องหลังคาสีฟ้า",
  "ปลากระพงทอดกรอบ",
  "พระปรมาภิไธยในราชวงศ์",
  "กรงนกทำจากไม้สัก",
  "ประตูเหล็กหนักมาก",
  "กระจกเงาสะท้อนภาพ",
  "ประภาคารกลางทะเล",
  // ชุด 8
  "ประมงพื้นบ้านจับปลา",
  "กรอบรูปวาดพระบรมฉายาลักษณ์",
  "กระป๋องน้ำสีแดง",
  "ขลุ่ยไม้แกะสลัก",
  // "ปราสาทโบราณอายุหลายร้อยปี",
  "กรณีศึกษาสำคัญในประวัติศาสตร์",
  "ปราณีตในการปักผ้า",
  "กระแสน้ำพัดแรง",
  "ประโยชน์ของการอ่านหนังสือ",
  "พระปรางค์สูงเสียดฟ้า",
];

let currentWord = "";
let score = 0;
let timeLeft = 15;
let timerInterval;
let recognition = null;

// เตรียมเสียงตอบถูก
const correctSound = document.getElementById("correctsound");

// ดึง element คำที่ต้องพูด
const wordElement = document.getElementById("word");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const textButton = document.getElementById("textButton")

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

        // startButton.addEventListener("click", endGame);
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
  // If click button again
  if (textButton.textContent === "หยุด") {
    startButton.classList.add("text-box-s")
    startButton.classList.remove("text-box-r")
    recognition.stop();
    endGame()
    return
  }

  score = 0;
  timeLeft = 15;
  timerElement.textContent = timeLeft;
  // startButton.disabled = true;
  textButton.textContent = "หยุด"
  startButton.classList.add("text-box-r")
  startButton.classList.remove("text-box-s")
  // textButton.className = ".text-c-r";

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
  resetTimer()
  clearInterval(timerInterval);
  if (recognition) {
    recognition.stop();
  }
  textButton.textContent = "เริ่มอีกครั้ง";
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
