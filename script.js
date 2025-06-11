const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const statusMessage = document.getElementById("status-message");

let conversationHistory = [];

function isWithinBusinessHours() {
  const now = new Date();
  const day = now.getDay(); // 0 = domingo, 6 = sábado
  const hour = now.getHours();

  const isWeekday = day >= 1 && day <= 5;
  const isWithinTime = hour >= 7 && hour < 17;

  return isWeekday && isWithinTime;
}

function updateStatusMessage() {
  if (!isWithinBusinessHours()) {
    statusMessage.textContent = "Fora do horário de atendimento. Se estiver em risco, ligue 188 ou procure o CAPS mais próximo.";
  } else {
    statusMessage.textContent = "";
  }
}

function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  conversationHistory.push(`${sender === 'user' ? 'Você' : 'Apoio'}: ${text}`);
}

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  userInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(message);
    appendMessage(reply, "bot");
  }, 600);
}

function getBotReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("triste") || msg.includes("mal")) {
    return "Sinto muito por isso. Quer conversar mais sobre isso?";
  } else if (msg.includes("ninguém me entende") || msg.includes("morrer") || msg.includes("estou triste")) {
    return "Você não está só. Pode contar comigo para conversar. Pode Falar com o especialista apertando a tecla abaixo:Falar com Especialista.";
  } else if (msg.includes("morrer") || msg.includes("suicídio") || msg.includes("mutilação") || msg.includes("mutilando") || msg.includes("cortes") || msg.includes("cortando")) {
    return "Você é muito importante. Ligue 84 3332-4955 e Procure. Quer ajuda para isso?";
  } else {
    return "Obrigado por compartilhar. Estou aqui para te ouvir.";
  }
}

function sendToWhatsApp() {
  if (!isWithinBusinessHours()) {
    alert("Fora do horário de atendimento. Por favor, tente novamente entre 07h e 17h, de segunda a sexta.");
    return;
  }

  const number = "5584991179178"; // Substitua pelo número real do WhatsApp
  const text = encodeURIComponent(conversationHistory.join("\n"));
  const url = `https://wa.me/${number}?text=${text}`;
  window.open(url, "_blank");
}

function callCAPS() {
  if (!isWithinBusinessHours()) {
    alert("O CAPS atende de segunda a sexta, das 07h às 17h.");
    return;
  }

  const capsNumber = "558433324955"; // Substitua pelo número fixo do CAPS
  window.location.href = `tel:${capsNumber}`;
}

updateStatusMessage();
