# SWASTH-LIFE
SWASTH LIFE is a web-based healthcare assistant that analyzes prescription images using OCR, identifies medicines, and provides usage, precautions, and side effects. It also offers medicine reminders, nearby pharmacy maps, and daily health logs for better care
# 🏥 SWASTH LIFE – Smart Digital Healthcare Assistant

SWASTH LIFE is a **student-built digital healthcare assistant** designed to make healthcare information, prescription understanding, and medicine management **simple, accessible, and user-friendly**, especially for students and people in resource-limited or rural areas.

The platform focuses on **prescription analysis, medicine awareness, reminders, and nearby medical store navigation**, all from a single web interface.

---

## 🚀 Problem Statement

Many people struggle with:
- Understanding handwritten or complex medical prescriptions
- Remembering medicine timings
- Finding nearby medical stores
- Accessing reliable medicine information in emergencies

This problem becomes more serious in **rural and student communities** where medical guidance is limited.

---

## 💡 Our Solution

SWASTH LIFE provides a **single digital platform** that:
- Reads prescriptions using OCR
- Identifies possible medicine names
- Explains medicine usage, precautions, and side effects
- Helps users set medicine reminders
- Shows nearby pharmacies on a live map
- Maintains a personal health diary

All without storing sensitive personal data.

---

## ✨ Key Features

### 📄 Prescription Analyzer (OCR-Based)
- Upload a prescription image
- Extracts text using **OCR (Tesseract.js)**
- Detects possible medicine names
- Fetches medicine details from **Wikipedia**
  - How to use
  - Precautions
  - Side effects
- Educational & awareness-focused

---

### 🗺️ Nearby Medical Store Locator
- Uses **Geolocation API**
- Displays nearby pharmacies on **OpenStreetMap (Leaflet.js)**
- Helps users quickly find medicine stores

---

### ⏰ Medicine Reminder System
- Set medicine name and time
- Reminders stored locally using **LocalStorage**
- Option to add reminder to **Google Calendar**
- No account or login required

---

### 📔 Daily Health Log / Diary
- Log daily:
  - Meals
  - Mood
  - Medicine intake
  - General health notes
- Stored privately in browser
- Simple and judgment-free

---

### 🌗 User-Friendly Interface
- Clean, modern, mobile-responsive UI
- Designed for ease of use
- Accessible for non-technical users

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Libraries & APIs
- **Tesseract.js** – Client-side OCR
- **Wikipedia REST API** – Medicine information
- **Leaflet.js + OpenStreetMap** – Map & navigation
- **GEMINI 2.5 FLASH API** - ChatBot
- **Google Calendar (Event Link Integration)**

---

## 🧠 Architecture Overview

