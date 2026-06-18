require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY
});

app.post("/chat", async (req, res) => {

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
