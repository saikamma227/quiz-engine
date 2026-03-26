const express = require('express');
const generatePDF = require('./generatePDF');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// ✅ allow certificate access
app.use('/certs', express.static(path.join(__dirname, 'certs')));

// Quiz Data (10 questions)
const quiz = [
  { question: "What is 2 + 2?", options: ["3","4","5","6"], answer: 1 },
  { question: "Capital of India?", options: ["Delhi","Mumbai","Chennai","Kolkata"], answer: 0 },
  { question: "Which language is used for web?", options: ["Python","Java","JavaScript","C++"], answer: 2 },
  { question: "Which is not a programming language?", options: ["HTML","Java","Python","C"], answer: 0 },
  { question: "Which company created Java?", options: ["Google","Microsoft","Sun Microsystems","Apple"], answer: 2 },
  { question: "Which keyword is used in JavaScript?", options: ["int","var","define","letvar"], answer: 1 },
  { question: "Which data structure uses FIFO?", options: ["Stack","Queue","Tree","Graph"], answer: 1 },
  { question: "HTML stands for?", options: ["Hyper Trainer","Hyper Text Markup Language","Hyper Tool","High Text"], answer: 1 },
  { question: "JS comment symbol?", options: ["//","#","<!-- -->","**"], answer: 0 },
  { question: "React is developed by?", options: ["Google","Facebook","Amazon","Microsoft"], answer: 1 }
];

console.log("Quiz length:", quiz.length);

// GET quiz
app.get('/quiz', (req, res) => {
  res.json(quiz);
});

// SUBMIT quiz
app.post('/submit', async (req, res) => {
  const { name, answers } = req.body;

  let score = 0;

  quiz.forEach((q, i) => {
    if (answers[i] == q.answer) score++;
  });

  const filePath = await generatePDF(name, score, quiz.length);

  res.json({
    score,
    total: quiz.length,
    certificate: filePath
  });
});

// START server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});