const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

const text = [
  "Information Systems Student",
  "Frontend Developer",
  "UI/UX Designer",
];

let speed = 100;
let textIndex = 0;
let charIndex = 0;

const typing = document.getElementById("typing");

function typeEffect() {

  if (charIndex < text[textIndex].length) {

    typing.innerHTML += text[textIndex].charAt(charIndex);

    charIndex++;

    setTimeout(typeEffect, speed);

  } else {

    setTimeout(eraseEffect, 1500);

  }

}

function eraseEffect() {

  if (charIndex > 0) {

    typing.innerHTML = text[textIndex].substring(0, charIndex - 1);

    charIndex--;

    setTimeout(eraseEffect, 50);

  } else {

    textIndex++;

    if (textIndex >= text.length) {
      textIndex = 0;
    }

    setTimeout(typeEffect, 500);

  }

}

window.onload = typeEffect;


const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const originalBtnText = submitBtn.innerText;
  submitBtn.innerText = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch(e.target.action, {
      method: contactForm.method,
      body: new FormData(contactForm),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert("Message Sent Successfully!");
      contactForm.reset(); // Kosongkan form otomatis setelah berhasil terkirim
    } else {
      alert("Oops! There was a problem sending your message.");
    }
  } catch (error) {
    alert("Error sending message. Please check your internet connection.");
  } finally {
    // Kembalikan tombol ke keadaan semula
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
  }
});

const chatbotBtn = document.getElementById("chatbot-btn");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("close-chat");

const sendBtnAI = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

chatbotBtn.addEventListener("click", () => {
  chatbot.style.display = "flex";
});

closeChat.addEventListener("click", () => {
  chatbot.style.display = "none";
});

function addMessage(text, sender) {

  const div = document.createElement("div");

  div.className =
    sender === "user"
      ? "user-message"
      : "bot-message";

  div.textContent = text;

  chatBody.appendChild(div);

  chatBody.scrollTo({
    top: chatBody.scrollHeight,
    behavior: "smooth"
  });
}

async function askGemini(message) {

  const response = await fetch(
    "/api/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message
      })
    }
  );

  const data = await response.json();

  return data.reply;
}

async function sendMessage() {

  const message =
    userInput.value.trim();

  if (!message) return;

  addMessage(message, "user");

  userInput.value = "";

  addMessage("•••", "bot");

  const typingMessage =
    document.querySelector(
      ".bot-message:last-child"
    );

  try {

    const reply =
      await askGemini(message);

    typingMessage.textContent =
      reply;

  } catch (error) {

    console.error(error);

    typingMessage.textContent =
      "AI sedang sibuk, coba beberapa detik lagi.";

  }
}

sendBtnAI.addEventListener(
  "click",
  sendMessage
);

userInput.addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }
);