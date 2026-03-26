let quizData = [];

fetch('/quiz')
  .then(res => res.json())
  .then(data => {
    quizData = data;
    const div = document.getElementById('quiz');

    data.forEach((q, i) => {
      let html = `<div class="card">`;
      html += `<h3>${i + 1}. ${q.question}</h3>`;

      q.options.forEach((opt, j) => {
        html += `
          <label>
            <input type="radio" name="q${i}" value="${j}"> ${opt}
          </label><br>
        `;
      });

      html += `</div>`;
      div.innerHTML += html;
    });
  });

function submitQuiz() {
  const answers = [];

  quizData.forEach((q, i) => {
    const val = document.querySelector(`input[name="q${i}"]:checked`);
    answers.push(val ? val.value : -1);
  });

  fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: localStorage.getItem('name'),
      answers
    })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('result', JSON.stringify(data));
    window.location = 'result.html';
  });
}