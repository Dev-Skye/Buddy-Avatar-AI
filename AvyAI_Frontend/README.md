# 🤖 Buddy AI Companion – Frontend (Expo React Native)

This is the **frontend** for the Buddy AI Companion app.  
It provides the **chat interface**, handles user input, displays Buddy's responses with **emoji modulation**, and communicates with the backend via **Axios**.  

---

## 🎥 Demo

![Demo Screenshot](https://raw.githubusercontent.com/Dev-Skye/Buddy-Avatar-AI/main/AvyAI_Frontend/assets/images/DEMO1.png)
![Demo Screenshot](https://raw.githubusercontent.com/Dev-Skye/Buddy-Avatar-AI/main/AvyAI_Frontend/assets/images/DEMO2.png)
![Demo Screenshot](https://raw.githubusercontent.com/Dev-Skye/Buddy-Avatar-AI/main/AvyAI_Frontend/assets/images/DEMO3.png)
![Demo Screenshot](https://raw.githubusercontent.com/Dev-Skye/Buddy-Avatar-AI/main/AvyAI_Frontend/assets/images/DEMO4.png)



[Watch Demo Video](../assets/demo/BuddyAiAvatar.mp4)  
[Watch Demo Video](../assets/demo/BuddyAiAvatar2.mp4) 


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

