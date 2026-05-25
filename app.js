// ── 상태 ──────────────────────────────────────────────
const STORAGE_KEY = "todo-app:items";

/** @type {{ id: string, text: string, done: boolean }[]} */
let todos = load();
let filter = "all"; // all | active | done

// ── DOM 참조 ─────────────────────────────────────────
const form = document.getElementById("add-form");
const input = document.getElementById("add-input");
const list = document.getElementById("list");
const empty = document.getElementById("empty");
const count = document.getElementById("count");
const filters = document.getElementById("filters");
const clearBtn = document.getElementById("clear-done");

// ── 저장 / 불러오기 ──────────────────────────────────
function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ── 렌더링 ───────────────────────────────────────────
function render() {
  const visible = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  list.innerHTML = "";
  for (const todo of visible) {
    list.appendChild(createItem(todo));
  }

  empty.hidden = visible.length > 0;
  const remaining = todos.filter((t) => !t.done).length;
  count.textContent = `${remaining}개 남음`;
}

function createItem(todo) {
  const li = document.createElement("li");
  li.className = "item" + (todo.done ? " is-done" : "");
  li.dataset.id = todo.id;

  const check = document.createElement("input");
  check.type = "checkbox";
  check.className = "item__check";
  check.checked = todo.done;
  check.addEventListener("change", () => toggle(todo.id));

  const text = document.createElement("span");
  text.className = "item__text";
  text.textContent = todo.text;
  text.addEventListener("dblclick", () => startEdit(li, todo));

  const del = document.createElement("button");
  del.className = "item__del";
  del.textContent = "×";
  del.title = "삭제";
  del.addEventListener("click", () => remove(todo.id));

  li.append(check, text, del);
  return li;
}

function startEdit(li, todo) {
  const editor = document.createElement("input");
  editor.type = "text";
  editor.className = "item__edit";
  editor.value = todo.text;
  editor.maxLength = 200;

  const textEl = li.querySelector(".item__text");
  li.replaceChild(editor, textEl);
  editor.focus();
  editor.setSelectionRange(editor.value.length, editor.value.length);

  const commit = () => {
    const value = editor.value.trim();
    if (value) {
      todo.text = value;
      save();
    }
    render();
  };

  editor.addEventListener("blur", commit);
  editor.addEventListener("keydown", (e) => {
    if (e.key === "Enter") editor.blur();
    if (e.key === "Escape") render();
  });
}

// ── 동작 ─────────────────────────────────────────────
function add(text) {
  todos.unshift({ id: crypto.randomUUID(), text, done: false });
  save();
  render();
}

function toggle(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.done = !todo.done;
    save();
    render();
  }
}

function remove(id) {
  todos = todos.filter((t) => t.id !== id);
  save();
  render();
}

function clearDone() {
  todos = todos.filter((t) => !t.done);
  save();
  render();
}

// ── 이벤트 ───────────────────────────────────────────
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  add(text);
  input.value = "";
  input.focus();
});

filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filters__btn");
  if (!btn) return;
  filter = btn.dataset.filter;
  filters
    .querySelectorAll(".filters__btn")
    .forEach((b) => b.classList.toggle("is-active", b === btn));
  render();
});

clearBtn.addEventListener("click", clearDone);

// ── 초기화 ───────────────────────────────────────────
document.getElementById("today").textContent = new Date().toLocaleDateString(
  "ko-KR",
  { year: "numeric", month: "long", day: "numeric", weekday: "long" }
);

render();
