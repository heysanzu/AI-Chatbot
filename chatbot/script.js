const BOT_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <circle cx="12" cy="17" r=".5" fill="white"/>
  </svg>
`;

// Note: MUSKAN Bro!, Ye sirf demo responses hai, API connect kar lo
const responses = [
  {
    match: ["can you do", "what can", "capabilities", "features", "help me with"],
    reply: "I can answer questions, give recommendations, help you plan, summarize topics, write content, solve problems, and have natural conversations — all in real time, 24/7.",
    chips: ["Tell me a fact", "Recommend a book", "How do I start?"]
  },
  {
    match: ["fact", "trivia", "interesting", "did you know"],
    reply: "The human brain processes images 60,000 times faster than text, and 90% of information sent to the brain is visual. That is why good design matters so much in communication.",
    chips: ["Another fact", "Tell me more", "Science facts"]
  },
  {
    match: ["recommend", "suggestion", "suggest", "best"],
    reply: "Based on general popularity and quality, here are a few recommendations:\n\n1. For productivity — use time-blocking and the Pomodoro method.\n2. For learning — spaced repetition beats re-reading every time.\n3. For focus — single-tasking outperforms multitasking by up to 40%.",
    chips: ["Recommend a book", "Recommend a tool", "More tips"]
  },
  {
    match: ["plan", "planning", "schedule", "organise", "organize"],
    reply: "Great, let us plan together. A solid plan usually has three parts: a clear goal, a list of steps broken into small tasks, and a realistic timeline. What are you planning — a project, a trip, or something else?",
    chips: ["Plan a project", "Plan a trip", "Daily routine"]
  },
  {
    match: ["book", "read", "novel", "author"],
    reply: "Some timeless reads across genres:\n\n- Fiction: One Hundred Years of Solitude by Gabriel Garcia Marquez\n- Non-fiction: Thinking, Fast and Slow by Daniel Kahneman\n- Productivity: Deep Work by Cal Newport\n- Tech: The Innovators by Walter Isaacson",
    chips: ["More books", "Summarise one", "Other genres"]
  },
  {
    match: ["tool", "app", "software", "productivity"],
    reply: "Top tools worth your time:\n\n- Notion — for notes and wikis\n- Linear — for project tracking\n- Figma — for design\n- Obsidian — for connected thinking\n- Raycast — for fast Mac workflows",
    chips: ["Tell me more", "Free tools only", "For developers"]
  },
  {
    match: ["trip", "travel", "destination", "visit"],
    reply: "A few destinations worth considering:\n\n- For culture: Kyoto, Japan\n- For nature: Patagonia, Argentina\n- For beaches: Algarve, Portugal\n- For adventure: Queenstown, New Zealand\n\nWhere are you thinking of going?",
    chips: ["Budget travel", "Solo travel", "Best time to visit"]
  },
  {
    match: ["project", "manage", "team", "deadline"],
    reply: "For project success, keep three things tight: scope, communication, and milestones. Use a simple Kanban board — To Do, In Progress, Done. Daily standups under 15 minutes keep teams aligned without burnout.",
    chips: ["Tools for this", "Remote teams", "Meet deadlines"]
  },
  {
    match: ["routine", "habit", "morning", "daily"],
    reply: "A productive morning routine in four steps:\n\n1. No phone for the first 30 minutes\n2. Drink water, move your body briefly\n3. Review your top 3 goals for the day\n4. Start with your hardest task first\n\nConsistency beats perfection here.",
    chips: ["Evening routine", "Work habits", "Sleep better"]
  },
  {
    match: ["another fact", "more fact", "next fact", "one more"],
    reply: "Octopuses have three hearts, nine brains, and blue blood. Two hearts pump blood to the gills, one pumps it to the body — and each arm has its own mini-brain that can act independently.",
    chips: ["One more", "Animals only", "Science facts"]
  },
  {
    match: ["developer", "coding", "code", "programming"],
    reply: "Key tools for developers:\n\n- VS Code or Cursor for editing\n- GitHub Copilot for AI assistance\n- Docker for containerisation\n- Vercel or Railway for deployment\n- Postman for API testing",
    chips: ["Best languages", "Learn to code", "Open source"]
  },
  {
    match: ["sleep", "rest", "tired", "insomnia"],
    reply: "Sleep hygiene that actually works:\n\n- Keep a consistent wake time, even on weekends\n- No screens 45 minutes before bed\n- Keep your room cool — around 18 to 19 degrees Celsius\n- Avoid caffeine after 2 PM\n\nSeven to nine hours is the adult sweet spot.",
    chips: ["Improve focus", "Stress relief", "Health tips"]
  },
  {
    match: ["stress", "anxiety", "mental", "wellness", "focus"],
    reply: "Techniques that research backs:\n\n- Box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s\n- A 10-minute walk reduces cortisol noticeably\n- Writing worries down externalises them from your mind\n- Limit news consumption to once per day",
    chips: ["Meditation basics", "Work-life balance", "Focus tips"]
  },
  {
    match: ["learn", "study", "skill", "course"],
    reply: "The fastest way to learn anything:\n\n1. Learn the minimum viable knowledge first\n2. Apply it immediately — even imperfectly\n3. Get feedback early and often\n4. Use spaced repetition for retention\n5. Teach it to someone else to cement it",
    chips: ["Learn to code", "Learn a language", "Online courses"]
  },
  {
    match: ["language", "speak", "translate", "english", "hindi"],
    reply: "Learning a new language tips:\n\n- 20 minutes daily beats 3-hour weekend sessions\n- Use apps like Anki for vocabulary\n- Watch content in your target language with subtitles\n- Find a conversation partner early — even imperfect speaking accelerates progress",
    chips: ["Best language apps", "Most spoken", "Translation help"]
  },
  {
    match: ["ai", "artificial intelligence", "machine learning", "chatbot"],
    reply: "AI today covers a wide spectrum — from narrow tools like recommendation engines to large language models that can reason, write, and code. The key distinction: current AI is very good at pattern recognition but does not truly understand context the way humans do.",
    chips: ["Future of AI", "AI in business", "How LLMs work"]
  },
  {
    match: ["business", "startup", "entrepreneur", "founder"],
    reply: "Early-stage startup advice:\n\n- Talk to 50 potential customers before building anything\n- Your first version should embarrass you slightly — ship it anyway\n- Revenue beats funding in the early days\n- Solve one problem extremely well before expanding",
    chips: ["Fundraising tips", "Build in public", "Product-market fit"]
  },
  {
    match: ["science", "physics", "space", "universe"],
    reply: "A mind-bending space fact: if you could fold a piece of paper 42 times, it would reach the Moon. The observable universe contains an estimated 2 trillion galaxies, each with billions of stars — and we have explored a fraction of our own.",
    chips: ["Black holes", "Mars mission", "Quantum physics"]
  },
  {
    match: ["hello", "hi", "hey", "greet", "good morning", "good evening"],
    reply: "Hello! Great to have you here. I am ready to help with questions, recommendations, planning, learning, or just a good conversation. What would you like to explore?",
    chips: ["What can you do?", "Tell me a fact", "Recommend something"]
  },
  {
    match: ["thank", "thanks", "appreciate", "great", "awesome", "good"],
    reply: "You are welcome — happy to help anytime. Feel free to ask anything else, day or night. I am always here.",
    chips: ["Ask another question", "Give feedback", "Start over"]
  },
  {
    match: ["bye", "goodbye", "see you", "later"],
    reply: "Take care! Come back whenever you need help. I am available 24/7, no waiting required.",
    chips: ["Talk again", "One last thing"]
  },
  {
    match: ["how", "what", "why", "when", "where", "who"],
    reply: "That is a great question. To give you the most accurate answer, could you share a bit more detail about what you are looking for? I want to make sure my response is useful and specific to your situation.",
    chips: ["What can you do?", "Give an example", "Browse topics"]
  }
];

const defaultReply = {
  reply: "I am not sure I caught that — could you rephrase? You can also tap one of the suggestions below to get started.",
  chips: ["What can you do?", "Tell me a fact", "Recommend something", "Help me plan"]
};

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function findReply(text) {
  const lower = text.toLowerCase();
  for (const entry of responses) {
    if (entry.match.some(keyword => lower.includes(keyword))) {
      return entry;
    }
  }
  return defaultReply;
}

function buildBotAvatar() {
  const div = document.createElement("div");
  div.className = "msg-avatar";
  div.innerHTML = BOT_ICON;
  return div;
}

function buildChips(chipLabels) {
  const container = document.createElement("div");
  container.className = "chips";
  chipLabels.forEach(label => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = label;
    chip.addEventListener("click", () => handleSend(label));
    container.appendChild(chip);
  });
  return container;
}

function scrollToBottom() {
  const messages = document.getElementById("messages");
  messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(text) {
  const messages = document.getElementById("messages");

  const row = document.createElement("div");
  row.className = "msg user";

  const body = document.createElement("div");
  body.className = "msg-body";

  const sender = document.createElement("div");
  sender.className = "msg-sender";
  sender.textContent = "You";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  const time = document.createElement("div");
  time.className = "time";
  time.textContent = getTime();

  body.appendChild(sender);
  body.appendChild(bubble);
  body.appendChild(time);
  row.appendChild(body);
  messages.appendChild(row);
  scrollToBottom();
}

function addTypingIndicator() {
  const messages = document.getElementById("messages");

  const row = document.createElement("div");
  row.className = "msg bot";
  row.id = "typing-indicator";

  const body = document.createElement("div");
  body.className = "msg-body";

  const sender = document.createElement("div");
  sender.className = "msg-sender";
  sender.textContent = "AI Assistant";

  const wrap = document.createElement("div");
  wrap.className = "typing-wrap";
  wrap.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;

  body.appendChild(sender);
  body.appendChild(wrap);
  row.appendChild(buildBotAvatar());
  row.appendChild(body);
  messages.appendChild(row);
  scrollToBottom();
}

function removeTypingIndicator() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

function addBotMessage(responseObj) {
  const messages = document.getElementById("messages");

  const row = document.createElement("div");
  row.className = "msg bot";

  const body = document.createElement("div");
  body.className = "msg-body";

  const sender = document.createElement("div");
  sender.className = "msg-sender";
  sender.textContent = "AI Assistant";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = responseObj.reply;

  const time = document.createElement("div");
  time.className = "time";
  time.textContent = getTime();

  body.appendChild(sender);
  body.appendChild(bubble);
  body.appendChild(time);

  if (responseObj.chips && responseObj.chips.length > 0) {
    body.appendChild(buildChips(responseObj.chips));
  }

  row.appendChild(buildBotAvatar());
  row.appendChild(body);
  messages.appendChild(row);
  scrollToBottom();
}

function handleSend(text) {
  const value = text.trim();
  if (!value) return;

  const input = document.getElementById("inp");
  input.value = "";

  addUserMessage(value);
  addTypingIndicator();

  const delay = 750 + Math.random() * 450;
  setTimeout(() => {
    removeTypingIndicator();
    addBotMessage(findReply(value));
  }, delay);
}

document.getElementById("sendBtn").addEventListener("click", () => {
  handleSend(document.getElementById("inp").value);
});

document.getElementById("inp").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSend(document.getElementById("inp").value);
  }
});

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => handleSend(chip.textContent));
});

const menuBtn  = document.getElementById("menuBtn");
const sidebar  = document.querySelector(".sidebar");
const overlay  = document.getElementById("overlay");

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

menuBtn.addEventListener("click", () => {
  sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
});

overlay.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
});
