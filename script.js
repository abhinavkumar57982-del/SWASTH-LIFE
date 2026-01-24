// ---------------- OCR ----------------
function extractText(){
    const file = document.getElementById("imageInput").files[0];
    const status = document.getElementById("ocrStatus");
    const result = document.getElementById("ocrResult");
    const nextBtn = document.getElementById("nextBtn");
    if(!file) return alert("Please select an image");

    status.innerText = "Processing image...";
    result.innerText = "";
    nextBtn.disabled = true;

    const reader = new FileReader();
    reader.onload = function(e){
        const imgData = e.target.result;
        Tesseract.recognize(imgData, 'eng', { logger: m => console.log(m) })
        .then(({ data: { text }}) => {
            status.innerText = "Extraction complete!";
            result.innerText = text;
            localStorage.setItem("extractedText", text);
            nextBtn.disabled = false;
        })
        .catch(err => {
            status.innerText = "Failed to extract text";
            console.error(err);
        });
    };
    reader.readAsDataURL(file);
}

function goToResult(){ window.location.href = "result.html"; }

// ---------------- BOT ----------------
let recognition;
const botChat = document.getElementById("botChat");

function micOn() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Browser doesn't support speech recognition");
        return;
    }
    recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();
    recognition.onresult = function(event){
        let transcript = event.results[0][0].transcript;
        document.getElementById("botQuery").value = transcript;
        botAsk();
    };
}

function botAsk() {
    const q = document.getElementById("botQuery").value.toLowerCase().trim();
    if(!q) return;

    botChat.innerHTML += `You: ${q}\n`;

    // --- Navigation Commands ---
    if(q.includes("male")) { window.location.href='male.html'; return; }
    if(q.includes("female")) { window.location.href='female.html'; return; }
    if(q.includes("infant")) { window.location.href='infantcare.html'; return; }
    if(q.includes("mental")) { window.location.href='mentalhealth.html'; return; }
    if(q.includes("result")) { window.location.href='result.html'; return; }

    // --- Nearby Store ---
    if(q.includes("nearby store") || q.includes("pharmacy")) {
        window.location.href='result.html';
        return;
    }

    // --- Mock medicine responses ---
    const mockDB = {
        "paracetamol": "Paracetamol is used for pain relief and fever. Take as per doctor's advice.",
        "ibuprofen": "Ibuprofen is a pain reliever and anti-inflammatory. Avoid if allergic."
    };
    let response = "Sorry, I don't know about that medicine.";

    for(let key in mockDB){
        if(q.includes(key)){ response = mockDB[key]; break; }
    }

    botChat.innerHTML += `Bot: ${response}\n`;
    botChat.scrollTop = botChat.scrollHeight;

    // Speech
    const utter = new SpeechSynthesisUtterance(response);
    speechSynthesis.speak(utter);

    document.getElementById("botQuery").value = "";
}
