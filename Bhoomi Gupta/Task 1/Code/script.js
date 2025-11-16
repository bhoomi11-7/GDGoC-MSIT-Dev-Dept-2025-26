let points = 0;
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const pointsDisplay = document.getElementById("points");
const messageDisplay = document.getElementById("message");
const progressBar = document.getElementById("progress");
const motivationalQuotes = [
  "🌟 Believe in yourself!",
  "💪 You can do it!",
  "🔥 Keep pushing forward!",
  "✨ Success is near!",
];
function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return alert("Enter a task!");
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button onclick="completeTask(this)">✅</button>
      <button onclick="editTask(this)">✏</button>
      <button onclick="deleteTask(this)">❌</button>
    </div> `;
  taskList.appendChild(li);
  taskInput.value = "";
}
function completeTask(btn) {
  const li = btn.parentElement.parentElement;
  if (!li.classList.contains("completed")) {
    li.classList.add("completed");
    points += 10;
    pointsDisplay.textContent = points;
    progressBar.style.width = (points % 100) + "%";
    showMessage();
  }
}
function editTask(btn) {
  const li = btn.parentElement.parentElement;
  const updated = prompt("Edit:", li.firstElementChild.textContent);
  if (updated && updated.trim()) li.firstElementChild.textContent = updated.trim();
}
function deleteTask(btn) {
  btn.parentElement.parentElement.remove();
}
function showMessage() {
  if (points % 50 === 0) {
    messageDisplay.textContent = "🌟 LEVEL UP!";
    messageDisplay.style.animation = "slideIn 0.6s";
    const quote = motivationalQuotes[Math.floor(Math.random()*motivationalQuotes.length)];
    const box = document.createElement("div");
    Object.assign(box.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      background: "rgba(255,255,255,0.9)",
      padding: "20px 40px",
      borderRadius: "20px",
      color: "#222",
      fontSize: "1.8em",
      textAlign: "center",
      zIndex: "1000",
      animation: "fadeQuote 2s forwards",
      boxShadow: "0 8px 25px rgba(0,0,0,0.4)"
    });
    box.textContent = quote;
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 2000);
  }
}
