# 🤖 Buddy AI Companion – Backend (Node.js + Express.js)

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
