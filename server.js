require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

console.log("API KEY EXISTS:", !!process.env.GROQ_API_KEY);

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY
});

app.post("/chat", async (req, res) => {
  console.log("Chat request received");

try {

const userMessage = req.body.message;

const response =
await groq.chat.completions.create({

messages: [
{
role: "system",
content:
"You are an educational AI tutor. Explain clearly with examples."
},
{
role: "user",
content: userMessage
}
],

model: "llama-3.1-8b-instant"

});

res.json({
reply:
response.choices[0].message.content
});

} catch(error){

console.error("FULL ERROR:");
console.error(error);

res.status(500).json({
reply: error.message
});

}

});

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});