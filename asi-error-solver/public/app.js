const API_BASE = "/api";
const STORE_KEY = "asi.chats.v1";
const $ = (id) => document.getElementById(id);

const chat = $("chat"), welcome = $("welcome"), messages = $("messages");
const form = $("chat-form"), input = $("chat-input"), sendButton = $("send-button");
const sidebar = $("sidebar"), overlay = $("overlay"), historyEl = $("history");
const scrollBtn = $("scroll-btn"), titleEl = $("chat-title");

let chats = load();
let activeId = null;
let isSending = false;
let skipTyping = false; // set true by the stop button to finish the animation instantly

/* ---------- helpers ---------- */
function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch { return []; }
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(chats.slice(0, 50))); } catch {}
}
function el(tag, cls = "", text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, skipTyping ? 0 : ms));
const activeChat = () => chats.find((c) => c.id === activeId);

function nearBottom() {
  return chat.scrollHeight - chat.scrollTop - chat.clientHeight < 140;
}
function scrollToBottom(force = false) {
  if (force || nearBottom()) chat.scrollTo({ top: chat.scrollHeight });
}

/* ---------- typewriter ---------- */
async function typeInto(node, text, animate) {
  if (!animate || skipTyping) { node.textContent = text; return; }
  node.classList.add("typing-caret");
  const perFrame = Math.max(1, Math.ceil(text.length / 260)); // long text speeds up
  for (let i = 0; i < text.length; i += perFrame) {
    if (skipTyping) break;
    node.textContent = text.slice(0, i + perFrame);
    scrollToBottom();
    await new Promise((r) => setTimeout(r, 14));
  }
  node.textContent = text;
  node.classList.remove("typing-caret");
}

/* ---------- message builders ---------- */
function addUserMessage(text) {
  const wrap = el("div", "fade-up flex justify-end");
  wrap.append(el("div", "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-brand-50 px-4 py-3 text-[15px] leading-relaxed text-slate-800 dark:bg-brand-600/20 dark:text-slate-100", text));
  messages.append(wrap);
}

function assistantShell() {
  const row = el("div", "fade-up flex gap-3");
  row.append(el("div", "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white", "A"));
  const body = el("div", "min-w-0 flex-1 space-y-4");
  row.append(body);
  messages.append(row);
  return body;
}

function thinking() {
  const body = assistantShell();
  const line = el("div", "flex items-center gap-3 py-1.5 text-sm");
  const dots = el("div", "dots");
  dots.innerHTML = "<span></span><span></span><span></span>";
  line.append(dots, el("span", "shimmer", "Searching the knowledge base…"));
  body.append(line);
  return body.parentElement;
}

const P = "text-[15px] leading-7 text-slate-600 dark:text-slate-300 whitespace-pre-wrap break-words";

async function block(parent, cls = "") {
  const b = el("div", `fade-up ${cls}`);
  parent.append(b);
  await sleep(120);
  return b;
}

function section(label, cls = "") {
  const s = el("section", cls);
  s.append(el("h3", "mb-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400", label));
  return s;
}

async function renderSolution(body, e, animate) {
  const heading = await block(body);
  await typeInto(heading.appendChild(el("p", "font-semibold")), "I found a matching error.", animate);
  const intro = await block(body);
  await typeInto(intro.appendChild(el("p", P)), "Here's what may be causing the issue and how to resolve it.", animate);

  const card = await block(body, "space-y-5 rounded-2xl border border-slate-200 p-5 dark:border-white/10 dark:bg-ink-800/60");

  const meta = el("div", "flex flex-wrap items-center gap-2");
  if (e.error_code) meta.append(el("span", "rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500 dark:bg-white/10", e.error_code));
  if (e.technology) meta.append(el("span", "rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-600/20 dark:text-brand-400", e.technology));
  card.append(meta);

  const title = el("h2", "text-lg font-semibold leading-snug");
  card.append(title);
  await typeInto(title, e.error_title || "Error", animate);

  if (e.error_message) {
    const snip = el("div", "fade-up group relative");
    const code = el("pre", "overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-3.5 pr-16 font-mono text-[13px] text-slate-700 dark:bg-ink-900 dark:text-slate-300", e.error_message);
    const copy = el("button", "absolute right-2 top-2 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500 transition hover:text-brand-600 dark:border-white/10 dark:bg-ink-700", "Copy");
    copy.type = "button";
    copy.onclick = async () => {
      try { await navigator.clipboard.writeText(e.error_message); copy.textContent = "Copied"; } catch { copy.textContent = "Failed"; }
      setTimeout(() => (copy.textContent = "Copy"), 1500);
    };
    snip.append(code, copy);
    card.append(snip);
    await sleep(150);
  }

  for (const [label, text] of [["Root cause", e.root_cause], ["Recommended solution", e.solution]]) {
    if (!text) continue;
    const s = section(label, "fade-up");
    const p = el("p", P);
    s.append(p);
    card.append(s);
    scrollToBottom();
    await typeInto(p, text, animate);
  }

  if (e.solution_steps?.length) {
    const s = section("Step-by-step instructions", "fade-up");
    const ol = el("ol", "space-y-2");
    s.append(ol);
    card.append(s);
    let n = 1;
    for (const step of e.solution_steps) {
      const li = el("li", "fade-up flex gap-3");
      li.append(el("span", "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700 dark:bg-brand-600/20 dark:text-brand-400", String(n++)));
      const t = el("span", P);
      li.append(t);
      ol.append(li);
      scrollToBottom();
      await typeInto(t, step, animate);
    }
  }

  if (e.verification) {
    const v = el("div", "fade-up rounded-xl bg-brand-50 p-3.5 text-sm text-brand-700 dark:bg-brand-600/15 dark:text-brand-400");
    const strong = el("strong", "", "How to verify: ");
    const t = el("span");
    v.append(strong, t);
    card.append(v);
    await typeInto(t, e.verification, animate);
  }

  const outro = await block(body);
  await typeInto(outro.appendChild(el("p", P)), "Try these steps and let me know whether the error is resolved.", animate);
  addFeedback(body);
}

function addFeedback(body) {
  const fb = el("div", "fade-up flex flex-wrap items-center gap-2");
  const mk = (t) => {
    const b = el("button", "rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-slate-300", t);
    b.type = "button";
    return b;
  };
  const yes = mk("Yes, fixed"), no = mk("Not yet");
  yes.onclick = () => fb.replaceChildren(el("span", "text-sm text-brand-600", "Glad the solution worked!"));
  no.onclick = () => {
    fb.replaceChildren(el("span", "text-sm text-slate-500", "Share the latest error message or relevant code and we'll dig further."));
    input.focus();
  };
  fb.append(yes, no);
  body.append(fb);
}

async function renderNoResults(body, query, animate) {
  const h = await block(body);
  await typeInto(h.appendChild(el("p", "font-semibold")), "I couldn't find a verified match.", animate);
  const p = await block(body);
  await typeInto(p.appendChild(el("p", P)), `I searched the error catalog for "${query}", but no verified solution turned up.\n\nTry the exact error message, the technology you're using, or a short description of what happened.`, animate);
}

async function renderFailure(body, animate) {
  const h = await block(body);
  await typeInto(h.appendChild(el("p", "font-semibold text-red-600 dark:text-red-400")), "Couldn't reach the knowledge base.", animate);
  const p = await block(body);
  await typeInto(p.appendChild(el("p", P)), "Check that the ASI server is running, then send your message again.", animate);
}

function renderAssistant(body, msg, animate) {
  if (msg.kind === "solution") return renderSolution(body, msg.data, animate);
  if (msg.kind === "none") return renderNoResults(body, msg.query, animate);
  return renderFailure(body, animate);
}

/* ---------- sending ---------- */
function setBusy(busy) {
  isSending = busy;
  sendButton.querySelector(".icon-send").classList.toggle("hidden", busy);
  sendButton.querySelector(".icon-stop").classList.toggle("hidden", !busy);
  sendButton.setAttribute("aria-label", busy ? "Stop animation" : "Send message");
}

async function sendMessage(text) {
  const query = text.trim();
  if (isSending || !query) return;

  if (!activeChat()) {
    const c = { id: String(Date.now()), title: query.slice(0, 48), ts: Date.now(), messages: [] };
    chats.unshift(c);
    activeId = c.id;
  }
  const c = activeChat();
  c.ts = Date.now();
  c.messages.push({ role: "user", text: query });
  setBusy(true);
  skipTyping = false;
  showChatView();
  addUserMessage(query);
  scrollToBottom(true);
  renderHistory();

  const pending = thinking();
  scrollToBottom(true);

  let msg;
  try {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Search request failed.");
    const data = await res.json();
    msg = data.errors?.length
      ? { role: "assistant", kind: "solution", data: data.errors[0] }
      : { role: "assistant", kind: "none", query };
  } catch (err) {
    console.error(err);
    msg = { role: "assistant", kind: "error" };
  }

  pending.remove();
  const body = assistantShell();
  await renderAssistant(body, msg, true);
  c.messages.push(msg);
  save();
  setBusy(false);
  skipTyping = false;
  scrollToBottom(true);
  input.focus();
}

/* ---------- views & history ---------- */
function showChatView() {
  welcome.hidden = true;
  const c = activeChat();
  titleEl.textContent = c ? c.title : "Error Solver";
}

function openChat(id) {
  if (isSending) return;
  activeId = id;
  const c = activeChat();
  messages.replaceChildren();
  showChatView();
  for (const m of c.messages) {
    if (m.role === "user") addUserMessage(m.text);
    else renderAssistant(assistantShell(), m, false);
  }
  renderHistory();
  scrollToBottom(true);
  closeSidebar();
}

function newChat() {
  if (isSending) return;
  activeId = null;
  messages.replaceChildren();
  welcome.hidden = false;
  titleEl.textContent = "Error Solver";
  input.value = "";
  input.style.height = "auto";
  input.focus();
  renderHistory();
  closeSidebar();
}

function renderHistory() {
  const q = $("chat-search").value.trim().toLowerCase();
  historyEl.replaceChildren();
  const list = chats.filter((c) => c.title.toLowerCase().includes(q));
  if (!list.length) {
    historyEl.append(el("p", "px-3 py-4 text-xs text-slate-400", q ? "No matching conversations." : "Your conversations will appear here."));
    return;
  }
  for (const c of list) {
    const row = el("div", `hist-item group flex items-center rounded-lg transition ${c.id === activeId ? "bg-brand-50 text-brand-700 dark:bg-brand-600/20 dark:text-brand-400" : "hover:bg-slate-200/60 dark:hover:bg-white/5"}`);
    const open = el("button", "min-w-0 flex-1 truncate px-3 py-2 text-left text-sm", c.title);
    open.type = "button";
    open.onclick = () => openChat(c.id);
    const del = el("button", "hist-del mr-1 rounded-md p-1.5 text-slate-400 hover:text-red-500", "✕");
    del.type = "button";
    del.setAttribute("aria-label", `Delete ${c.title}`);
    del.onclick = (ev) => {
      ev.stopPropagation();
      chats = chats.filter((x) => x.id !== c.id);
      save();
      if (c.id === activeId) newChat(); else renderHistory();
    };
    row.append(open, del);
    historyEl.append(row);
  }
}

/* ---------- sidebar ---------- */
const isDesktop = () => matchMedia("(min-width: 1024px)").matches;
function openSidebar() { sidebar.classList.remove("-translate-x-full"); overlay.classList.remove("hidden"); }
function closeSidebar() { if (!isDesktop()) { sidebar.classList.add("-translate-x-full"); overlay.classList.add("hidden"); } }
function setCollapsed(v) {
  sidebar.classList.toggle("collapsed", v);
  $("expand-btn").classList.toggle("hidden", !v);
  try { localStorage.setItem("asi.collapsed", v ? "1" : "0"); } catch {}
}

$("menu-toggle").onclick = openSidebar;
overlay.onclick = closeSidebar;
$("collapse-btn").onclick = () => setCollapsed(true);
$("expand-btn").onclick = () => setCollapsed(false);
$("new-chat").onclick = newChat;
$("chat-search").oninput = renderHistory;
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); newChat(); }
});

/* ---------- theme ---------- */
function applyTheme(dark) { document.documentElement.classList.toggle("dark", dark); }
let savedTheme = null;
try { savedTheme = localStorage.getItem("asi.theme"); } catch {}
applyTheme(savedTheme ? savedTheme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
$("theme-toggle").onclick = () => {
  const dark = !document.documentElement.classList.contains("dark");
  applyTheme(dark);
  try { localStorage.setItem("asi.theme", dark ? "dark" : "light"); } catch {}
};

/* ---------- composer ---------- */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isSending) { skipTyping = true; return; } // button doubles as "stop"
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  input.style.height = "auto";
  sendMessage(text);
});
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 176)}px`;
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
    e.preventDefault();
    if (!isSending) form.requestSubmit();
  }
});
document.querySelectorAll(".suggestion").forEach((b) =>
  b.addEventListener("click", () => sendMessage(b.dataset.prompt || ""))
);

/* ---------- scroll-to-latest button ---------- */
chat.addEventListener("scroll", () => scrollBtn.classList.toggle("hidden", nearBottom()));
scrollBtn.onclick = () => chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });

/* ---------- init ---------- */
try { if (localStorage.getItem("asi.collapsed") === "1" && isDesktop()) setCollapsed(true); } catch {}
renderHistory();
input.focus();