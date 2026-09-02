# AI Chatbot

A client-side chatbot demo built with vanilla HTML, CSS, and JavaScript. No framework, no build step, no server.

<p align="left">
  <img src="chatbot.png" alt="AI Chatbot" width="80">
</p>

[![Demo](https://img.shields.io/badge/▶_Demo-grey?style=for-the-badge)](https://heysanzu.github.io/AI-Chatbot/)
[![Live](https://img.shields.io/badge/▶_Live-blue?style=for-the-badge)](https://heysanzu.github.io/sanzuAgent)

## Setup

Download all three files into one folder and open `index.html` in a browser.

```
chatbot/
├── index.html
├── style.css
└── script.js
```

---

## Connect to an API

By default the bot uses pre-written responses. To enable real generative replies, replace the `handleSend` timeout block in `script.js` with a live API call.

```js
// Replace this block in handleSend()
const delay = 750 + Math.random() * 450;
setTimeout(() => {
  removeTypingIndicator();
  addBotMessage(findReply(value));
}, delay);
```

```js
// With this
addTypingIndicator();

const res = await fetch("https://api.muxbite.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY",
    "muxbite-version": "2026-06-01"
  },
  body: JSON.stringify({
    model: "muxbite-mb1",
    max_tokens: 1024,
    messages: [{ role: "user", content: value }]
  })
});

const data = await res.json();
removeTypingIndicator();
addBotMessage({ reply: data.content[0].text, chips: [] });
```

Works with any REST API - MUXBITE, OpenAI, Gemini, or your own backend. Just swap the endpoint, headers, and response path.


## Customisation

**Add a response** - append an entry to the `responses` array in `script.js`:
```js
{ match: ["keyword"], reply: "Your reply.", chips: ["Follow-up"] }
```

**Change colours** - edit the CSS variables at the top of `style.css`:
```css
:root {
  --black: #0f0f0f;
  --grey-900: #1a1a1a;
  --white: #ffffff;
}
```

---

Maintained by [@heysanzu](https://github.com/heysanzu)
