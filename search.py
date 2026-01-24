from fastapi import FastAPI, Form
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from gtts import gTTS
import os, uuid, json
from openai import OpenAI

# ---------------- CONFIG ----------------
API_KEY = "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"
MODEL_NAME = "openai/gpt-oss-120b"
BASE_URL = "https://api.groq.com/openai/v1"

client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

# ---------------- APP SETUP ----------------
app = FastAPI()
os.makedirs("audio", exist_ok=True)
CHAT_FILE = "chat_memory.json"

# Serve audio folder
app.mount("/audio", StaticFiles(directory="audio"), name="audio")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chat memory
if not os.path.exists(CHAT_FILE):
    with open(CHAT_FILE, "w") as f:
        json.dump([], f)

def save_chat(user, bot):
    with open(CHAT_FILE, "r") as f:
        chats = json.load(f)
    chats.append({"user": user, "bot": bot})
    with open(CHAT_FILE, "w") as f:
        json.dump(chats, f)

def load_chat():
    with open(CHAT_FILE, "r") as f:
        return json.load(f)

# ---------------- Serve HTML ----------------
@app.get("/")
def index():
    return FileResponse("templates/index.html")

# ---------------- Chatmon AI ----------------
@app.post("/ask")
async def ask_ai(question: str = Form(...)):
    try:
        # Try real API call
        response = client.responses.create(
            model=MODEL_NAME,
            input=question
        )

        answer = ""
        if hasattr(response, "output") and response.output:
            if len(response.output) > 0 and hasattr(response.output[0], "content"):
                answer = "".join([c.text for c in response.output[0].content if hasattr(c, "text")])
        if not answer:
            answer = "Sorry, I could not generate a response."

    except Exception as e:
        print("Error in /ask:", e)
        # fallback response if API fails
        answer = "Hello! I am Chatmon. Your question was: '" + question + "'. (Dummy response because API failed.)"

    save_chat(question, answer)

    # Save audio
    filename = f"audio/{uuid.uuid4()}.mp3"
    gTTS(answer, lang="en").save(filename)

    return JSONResponse({"text": answer, "audio": filename})
