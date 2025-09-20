# Buddy AI Companion – Frontend (Expo React Native)

This is the **frontend** for the Buddy AI Companion app.  
It provides the **chat interface**, handles user input, displays Buddy's responses with **emoji modulation**, and communicates with the backend via **Axios**.  

---

## 🎥 Demo

![Demo Screenshot](https://raw.githubusercontent.com/Dev-Skye/Buddy-Avatar-AI/main/AvyAI_Frontend/assets/images/DEMO1.png)
![Demo Screenshot](https://raw.githubusercontent.com/Dev-Skye/Buddy-Avatar-AI/main/AvyAI_Frontend/assets/images/DEMO2.png)
![Demo Screenshot](https://raw.githubusercontent.com/Dev-Skye/Buddy-Avatar-AI/main/AvyAI_Frontend/assets/images/DEMO3.png)
![Demo Screenshot](https://raw.githubusercontent.com/Dev-Skye/Buddy-Avatar-AI/main/AvyAI_Frontend/assets/images/DEMO4.png)



[Watch Demo Video](https://raw.githubusercontent.com/Dev-Skye/Buddy-Avatar-AI/main/AvyAI_Frontend/assets/demo/BuddyAiAvatar.mp4)  
[Watch Demo Video](https://raw.githubusercontent.com/Dev-Skye/Buddy-Avatar-AI/main/AvyAI_Frontend/assets/demo/BuddyAiAvatar2.mp4)



---

## 🛠️ Tech Stack
- **React Native (Expo)** → Mobile app framework  
- **Axios** → HTTP client for connecting to backend  
- **Ionicons** → Icons in chat UI 
- **React Hooks** → UseState, UseEffect, UseRef  
- **FlatList** → Efficient chat message rendering  
- **TextInput & TouchableOpacity** → Chat input and buttons  
- **Animations** → Lottie Animations
- **Avatar** → Ready Player Me  
  


---

## ⚙️ Setup Instructions

### 1️   Clone the repository

```bash
git clone https://github.com/Dev-Skye/Buddy-Avatar-AI.git
cd avyai_frontend

### 2️⃣ Install dependencies
npm install


### 3️⃣ Configure Backend URL
In screens/ChatScreen.js, update BACKEND_URL:
const BACKEND_URL = Platform.OS === "android"
  ? "http://<your-local-ip>:3000" // Use your PC's local IP for Android device
  : "http://localhost:3000";      // For iOS simulator
Note: The backend must be running first. See the backend repo README for setup.


### 4️⃣ Start the Expo App
npx expo start
•	Opens Expo DevTools in the browser.
•	Scan QR code with Expo Go on your device, or run on iOS/Android emulator.

### 🕟5️⃣ Usage
•	Type a message in the input box.
•	Buddy will reply with:
o	Text
o	Emojis based on detected emotion
o	Optional buttons for quick responses





# 🤖 Buddy AI Companion – BACKEND (Node.js + Express.js)

This is the **backend** for the Buddy AI Avatar app.  
It handles **emotion detection**, **response generation** and **emoji modulation** using **OpenAI GPT-4o Mini**, and serves the frontend via API endpoints.

---

## 🛠️ Tech Stack

- **Node.js** → Runtime environment  
- **Express.js** → Web framework for routing and API endpoints  
- **Axios** → HTTP client for calling OpenAI API  
- **dotenv** → Environment variable management  
- **express-rate-limit** → Protect API with request throttling  
- **CORS** → Enable frontend-backend communication  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Dev-Skye/openai-backend.git
cd openai_backend

### 2️⃣Install dependencies
npm install


### 3️⃣Configure Environment Variables
1.	Copy the example file:
cp .env.example .env
2.	Open .env and add your OpenAI API key:
OPENAI_API_KEY=sk-your_api_key_here
OPENAI_MODEL=gpt-4.0-mini
Get an API key from OpenAI.

### 4️⃣tart the Server
node server.js
•	Backend will run at: http://localhost:3000
•	Make sure this URL matches BACKEND_URL in the frontend repo.
