# 🚑 Emergency NFC Medical System

A powerful emergency healthcare platform that uses NFC-enabled devices (wristbands, cards, keychains, stickers) to allow instant access to vital medical information and emergency contacts. Designed to save lives by providing quick access to essential data without requiring a login.

🌐 **Live Demo:** [https://ice-beacon-zup4.vercel.app/](https://ice-beacon-zup4.vercel.app/)

---

## 📱 Platform Overview

This project includes:

- 🌐 **Website** (built with Next.js + TypeScript)
- 📦 **Firebase backend** (Auth + Firestore)
- 📲 **NFC integration** (read-only via tag scan)
- 🛒 **E-commerce section** to purchase NFC products
- 📖 **Medical history management**
- 🧑‍⚕️ **Doctor login access** to view full health records
- 📦 Planned: **Mobile App** with health reminders & tracking

---

## 🧠 How It Works

1. **User Registration:**
   - Enters name, age, blood group, known conditions, emergency contact, etc.
   - Data is stored securely in Firebase Firestore.

2. **NFC Tag Generation:**
   - A unique link is generated for each user.
   - That link is written onto an NFC tag (via NFC Tools App).

3. **Emergency Scan:**
   - Anyone can scan the NFC tag with their phone.
   - The browser opens and shows only **vital emergency info** (no login required).

4. **Full History Access:**
   - Doctors or users can log in with credentials to view full records & prescriptions.

5. **E-Commerce:**
   - Users can purchase NFC wristbands, cards, keychains, and stickers directly from the website.

---

## 🚀 Tech Stack

| Layer        | Technology                      |
|-------------|----------------------------------|
| Frontend    | Next.js + TypeScript + Tailwind  |
| Backend     | Firebase (Auth + Firestore)      |
| NFC Tags    | NFC Tools App (manual write)     |
| Hosting     | Firebase Hosting / Vercel        |

---

## 🛠️ Project Structure

project-root/
│
├── firebase/ # Firebase config (auth, firestore)
├── pages/ # Next.js pages
│ ├── index.tsx # Landing page
│ ├── login.tsx # User login
│ ├── register.tsx # User registration
│ ├── dashboard/ # User & doctor dashboards
│ ├── emergency/[id].tsx # Public emergency info page via NFC
│
├── components/ # Reusable UI components
├── public/ # Static assets
├── styles/ # Global styles
├── .gitignore
├── README.md
└── package.json




---

## 🔒 Security

- Sensitive medical data is stored securely in Firestore with proper access rules.
- Public emergency data is minimal and anonymized.
- Only logged-in users or verified doctors can access full history.

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/emergency-nfc-website.git
cd emergency-nfc-website

Create a firebase/firebaseConfig.ts with your own Firebase credentials:

ts
Copy
Edit
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_BUCKET',
  messagingSenderId: 'YOUR_MSG_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


Run the App
npm run dev

🛒 NFC Products
We plan to sell:

🔴 NFC Wristbands (Men, Women, Kids)

🟢 NFC Cards

🔵 NFC Stickers

🟡 NFC Keychains

You can write the unique emergency link to these devices using the NFC Tools app.

🧪 Future Scope
📲 Mobile App (Expo) with:

Health tracking

Pill reminders

Doctor chat

🧠 AI recommendations (e.g., based on conditions)

🏥 Integration with hospitals & ambulance networks

