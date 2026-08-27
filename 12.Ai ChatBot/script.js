const prompt = document.querySelector("#prompt");
const submitBtn = document.querySelector("#submit");
const chatContainer = document.querySelector("#chatContainer");
const imageBtn = document.querySelector("#image");
const attachIcon = document.querySelector("#attachIcon");
const imageInput = document.querySelector("#image input");

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=Your-Api-Key";

let user = {
    message: null,
    file: {
        mime_type: null,
        data: null
    }
};

function scrollToBottom() {
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
}

function createBubble(html, type) {
    const div = document.createElement("div");
    div.classList.add(type === "user" ? "user-chat-box" : "ai-chat-box");
    div.innerHTML = html;
    return div;
}

async function generateResponse(aiBubbleEl) {
    const textEl = aiBubbleEl.querySelector(".ai-bubble");

    const parts = [{ text: user.message }];
    if (user.file.data) {
        parts.push({ inline_data: user.file });
    }

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts }]
        })
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        const rawText = data.candidates[0].content.parts[0].text;
        textEl.innerHTML = rawText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").trim();
    } catch (error) {
        textEl.innerHTML = "Something went wrong. Please try again.";
        console.error(error);
    } finally {
        scrollToBottom();
        resetImageState();
    }
}

function resetImageState() {
    attachIcon.src = "img.svg";
    imageBtn.classList.remove("has-image");
    user.file = { mime_type: null, data: null };
}

function handleChat(message) {
    if (!message.trim()) return;

    user.message = message;
    prompt.value = "";

    const userHtml = `
        <div class="bubble-wrap">
            <img src="user.png" alt="You" class="bubble-avatar">
            <div class="user-bubble">
                ${user.message}
                ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" alt="attachment">` : ""}
            </div>
        </div>`;

    chatContainer.appendChild(createBubble(userHtml, "user"));
    scrollToBottom();

    setTimeout(() => {
        const aiHtml = `
            <div class="bubble-wrap">
                <img src="ai.png" alt="AI" class="bubble-avatar">
                <div class="ai-bubble">
                    <div class="loading-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>`;

        const aiBox = createBubble(aiHtml, "ai");
        chatContainer.appendChild(aiBox);
        scrollToBottom();
        generateResponse(aiBox);
    }, 500);
}

prompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat(prompt.value);
    }
});

submitBtn.addEventListener("click", () => {
    handleChat(prompt.value);
});

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const base64 = e.target.result.split(",")[1];
        user.file = { mime_type: file.type, data: base64 };
        attachIcon.src = `data:${file.type};base64,${base64}`;
        imageBtn.classList.add("has-image");
    };
    reader.readAsDataURL(file);
});

imageBtn.addEventListener("click", () => {
    imageInput.click();
});
