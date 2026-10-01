"use strict";

// ===== 课程与状态 =====
const COURSES = window.COURSES || [];
// 关卡节点在地图上的位置（百分比，对应 SVG 曲线）
const NODE_POS = [
  { x: 9.5,  y: 74 },
  { x: 23,   y: 28 },
  { x: 36.5, y: 74 },
  { x: 50,   y: 28 },
  { x: 63.5, y: 74 },
  { x: 77,   y: 28 },
  { x: 90,   y: 74 },
  { x: 94,   y: 43.5 },
  { x: 60,   y: 62 },
  { x: 70,   y: 55 }
];
const SAVE_KEY = "code-continent-v1";
const $ = (id) => document.getElementById(id);

let state = load() || { xp: 0, streak: 0, done: {}, stars: {} };
let pyodide = null;
let pyLoading = false;
let currentIdx = 0;
let hintLevel = 0;      // 0 未用提示，1 思路，2 细节，3 答案
let attempts = 0;
let target = null;      // 当前判题目标：{ label, expected, isMain, hints }
let runSeq = 0;         // 运行序号：防止并发的两次运行互相覆盖结果
let pvRunSeq = 0;

// ===== 持久化 =====
function load() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) { return null; } }
function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }

// ===== 等级计算（升到 N+1 级需 50×N XP）=====
function xpToLevel(xp) {
  let lvl = 1, rem = xp, cost = 50;
  while (rem >= cost) { rem -= cost; lvl++; cost = 50 * lvl; }
  return lvl;
}

// ===== 工具 =====
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { t.hidden = true; }, 2400);
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function normPunct(s) {
  return String(s || "").replace(/[\uFF01-\uFF5E]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/\u3000/g, " ");
}
// 判题用的输出归一化：统一换行、去掉每行行尾空白。
// 行尾空格是看不见的，却会造成「两边长得一模一样却判不过」，对初学关卡没有教学意义。
function normOut(s) {
  return String(s == null ? "" : s)
    .replace(/\r\n?/g, "\n")
    .split("\n").map(function (l) { return l.replace(/[ \t\u3000]+$/, ""); }).join("\n")
    .replace(/\n+$/, "")
    .trim();
}
// 把行首/行尾看不见的空白显示成 ·，让「看起来一样」的差异无处藏身
function visWs(s) {
  const txt = String(s == null ? "" : s);
  if (!txt) return "(空)";
  return txt.split("\n").map(function (line) {
    const m = line.match(/^([ \t\u3000]*)([\s\S]*?)([ \t\u3000]*)$/);
    if (!m) return escapeHtml(line);
    const lead = m[1] ? '<span class="ws-mark">' + "·".repeat(m[1].length) + "</span>" : "";
    const tail = m[3] ? '<span class="ws-mark">' + "·".repeat(m[3].length) + "</span>" : "";
    return lead + escapeHtml(m[2]) + tail;
  }).join("\n");
}
// 两边文字完全一样、只差空白（空行/行首空格等）时给一句针对性提示
function wsOnlyDiff(got, want) {
  const strip = s => String(s == null ? "" : s).replace(/\s+/g, "");
  return got !== want && strip(got) === strip(want);
}
// 输出行数：一眼看出「我这边只输出了 1 行」这种结构差异
function lineCount(s) {
  const t = String(s == null ? "" : s);
  return t === "" ? 0 : t.split("\n").length;
}
function formatCode(s) {
  s = String(s || "").trim();
  s = s.replace(/\s*;\s*/g, "\n");
  s = s.replace(/\s+else\s*:/g, "\nelse:");
  s = s.replace(/\s+elif\s+/g, "\nelif ");
  s = s.replace(/\b(if|elif|for|while|def)\b([^\n:]+):[ \t]+/g, function(m, kw, rest) { return kw + rest + ":\n    "; });
  s = s.replace(/\belse\b([^\n:]*):[ \t]+/g, function(m, rest) { return "else" + rest + ":\n    "; });
  return s;
}
function prepInput(code, inputs) {
  if (!inputs || !inputs.length) return code;
  return 'import builtins\n__dsh_inputs = ' + JSON.stringify(inputs) + '\n__dsh_i = 0\ndef __dsh_input(prompt=""):\n    global __dsh_i\n    if __dsh_i < len(__dsh_inputs):\n        v = __dsh_inputs[__dsh_i]; __dsh_i += 1\n        return v\n    raise EOFError()\nbuiltins.input = __dsh_input\n' + code;
}
const ERR_ZH = {
  "SyntaxError": ["语法错误", "Python 没看懂的符号或拼写。检查括号、引号、冒号是否成对，缩进是否正确。"],
  "IndentationError": ["缩进错误", "同一块代码缩进不一致或没缩进。if/for 等后面的代码要统一缩进、同一层级对齐。"],
  "NameError": ["名字找不到", "用了没定义过的变量或函数名。检查是否拼错、是否先赋值再用。"],
  "TypeError": ["类型不对", "运算的类型有问题。如数字不能直接和文字相加，数字要先用 str() 转成文字。"],
  "ValueError": ["值不合适", "数值不符合要求。如 int(\"abc\") 无法把字母转成整数。"],
  "ZeroDivisionError": ["除以 0", "不能把一个数除以 0。"],
  "FileNotFoundError": ["文件不存在", "找不到要读取的文件，检查文件名和路径。"],
  "ModuleNotFoundError": ["模块不存在", "少了 import，或模块名拼写错误。"],
  "IndexError": ["位置越界", "列表取的位置超过了它的长度。"],
  "KeyError": ["键不存在", "字典里没有这个键。"],
  "AttributeError": ["没有这个属性/方法", "对象上没有这个属性或方法。"]
};
const FULLWIDTH_MAP = {
  "U+FF08": ["（", "( )"], "U+FF09": ["）", "( )"],
  "U+FF0C": ["，", ", "], "U+FF0E": ["。", ". "],
  "U+FF1A": ["：", ": "], "U+FF1B": ["；", "; "],
  "U+201C": ["“", "\" "], "U+201D": ["”", "\" "],
  "U+2018": ["‘", "' "], "U+2019": ["’", "' "], "U+3000": ["全角空格", "普通空格"]
};
function friendlyError(msg, code) {
  const up = (msg || "").toUpperCase();
  const fwKey = Object.keys(FULLWIDTH_MAP).find(k => up.includes(k));
  const badChars = "（）“”‘’，。：；　";
  const inCode = [...(code || "")].some(ch => badChars.includes(ch));
  if (fwKey || inCode) {
    let hint;
    if (fwKey) { const m = FULLWIDTH_MAP[fwKey]; hint = "你用了中文全角【" + m[0] + "】，请换成英文半角 " + m[1] + "。"; }
    else hint = "代码里混入了中文全角符号，Python 只认英文半角符号。";
    return "⚠️ 符号问题\n" + hint + "\n\n请把输入法切到英文半角再输入。\n\n常见对照：（）→（），“”→\"\"，,,，。→..，：→::，；→;;，全角空格→空格";
  }
  const last = (msg || "").split("\n").filter(l => l.trim()).pop() || "";
  const tm = last.match(/(\w+(?:Error|Exception)):?\s*(.*)/);
  const t = tm ? tm[1] : "";
  const m = tm ? tm[2] : last;
  if (ERR_ZH[t]) {
    return "⚠️ " + ERR_ZH[t][0] + "\n" + ERR_ZH[t][1] + (m ? "\n\nPython 提示：" + m : "") + "\n\n（可点「查看提示」找思路）";
  }
  const lineM = (msg || "").match(/line\s+(\d+)/);
  const w = lineM ? "第 " + lineM[1] + " 行" : "";
  return "⚠️ 运行出错（" + w + "）\n" + (m || last || "发生了未知错误") + "\n\n可能是中文符号、括号没配对、缩进不对，或变量名拼错。";
}

// ===== Pyodide =====
// ⚠️ 接收程序输出必须用 raw + TextDecoder：
//  · setStdout({batched}) 是「按行」回调且不含换行符 → 多行输出会被粘成一行；
//    而且末行若没有换行符会被留在缓冲区里丢失、还会漏进下一次运行。
//  · setStdout({raw}) 给的是 **UTF-8 字节**，必须用 TextDecoder 解码，否则中文变乱码。
// 两者都很隐蔽，实测（Pyodide 0.26.4）确认过，别改回去。
function collectOutput(py, bytes) {
  const onByte = (b) => { bytes.push(b); };
  py.setStdout({ raw: onByte });
  py.setStderr({ raw: onByte });
}
function decodeOutput(bytes) {
  return new TextDecoder("utf-8").decode(Uint8Array.from(bytes));
}
async function getPyodide() {
  if (pyodide) return pyodide;
  if (!window.loadPyodide) {
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
      s.onload = res; s.onerror = () => rej(new Error("Pyodide 加载失败"));
      document.head.appendChild(s);
    });
  }
  pyodide = await window.loadPyodide();
  return pyodide;
}

// ===== 语法高亮（单遍分词，避免嵌套）=====
function highlight(code) {
  const esc = escapeHtml(code);
  const re = /(#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(def|class|return|if|elif|else|for|while|in|import|from|as|print|True|False|None|and|or|not|break|continue|pass|try|except|with|global|lambda|range|len|int|str|float|type|input)\b|\b(\d+(?:\.\d+)?)\b/g;
  return esc.replace(re, (m, com, str, kw, num) => {
    if (com) return '<span class="tk-com">' + com + '</span>';
    if (str) return '<span class="tk-str">' + str + '</span>';
    if (kw)  return '<span class="tk-kw">' + kw + '</span>';
    if (num) return '<span class="tk-num">' + num + '</span>';
    return m;
  });
}

// ===== 编辑器同步 =====
function syncEditor() {
  const ta = $("code-input");
  const hl = $("code-hl");
  const gutter = $("code-gutter");
  const lines = ta.value.split("\n").length;
  gutter.textContent = Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  hl.innerHTML = highlight(ta.value);
  // 同步滚动
  gutter.scrollTop = ta.scrollTop;
  hl.scrollTop = ta.scrollTop;
  hl.scrollLeft = ta.scrollLeft;
}

// ===== 视图切换 =====
function showHome() {
  $("view-home").hidden = false;
  $("view-lesson").hidden = true;
  renderHome();
  playViewIn($("view-home"));
}
function showLesson(i) {
  currentIdx = i;
  hintLevel = 0;
  attempts = 0;
  $("view-home").hidden = true;
  $("view-lesson").hidden = false;
  $("pass-modal").hidden = true;
  $("hint-block").hidden = true;
  $("result-panel").hidden = true;
  renderLesson();
  playViewIn($("view-lesson"));
  staggerLesson();
  window.scrollTo(0, 0);
}

// ===== 首页渲染 =====
const CHAPTER_TITLES = ["第一章 · 咒语初现", "第二章 · 控制流", "第三章 · 数据结构", "第四章 · 进阶", "第五章 · 数据分析"];
function chIndex(c) { return parseInt(c.id[1], 10) || 0; }
const INTRO_PY = "欢迎来到代码大陆！Python 是一种简单、好读、全球最流行的编程语言，就像一本会替你干活的「魔法书」——你写指令，它执行。它能做网站、数据分析、人工智能、生物信息，甚至你玩过的游戏和 App 背后都有它。学 Python，就是学会「用代码指挥电脑帮你做事」。学完后，你会像拿到一把万能钥匙：任何想自动化、想统计、想分析的事，都能交给代码。";
const INTRO_SYMBOLS = [
  ["+ - * /", "加减乘除", "算数：3 + 2 = 5、7 * 8 = 56"],
  ["//", "整除（去小数）", "7 // 2 = 3（去掉小数）"],
  ["%", "取余", "7 % 2 = 1。判断奇偶看 n % 2"],
  ["**", "乘方", "2 ** 3 = 8"],
  ["+= / -=", "累加/累减", "x += 1 等于 x = x + 1 的简写"],
  ["== / !=", "等于 / 不等于", "判断相等/不等，结果 True/False"],
  ["> < >= <=", "比较大小", "5 > 3 为 True"],
  ["and / or / not", "且 / 或 / 非", "组合多个条件"],
  ["in / not in", "是否包含", "\"a\" in \"abc\" 为 True"],
  ["True / False / None", "真 / 假 / 空", "判断的两种结果 + 空值占位"],
  ["\" \" / ' '", "引号（文字）", "字符串要用引号包起来，如 \"你好\""],
  ["( )", "圆括号", "函数调用 / 运算"],
  ["[ ]", "方括号（列表）", "一串有序数据"],
  ["{ }", "花括号（字典）", "名字 : 值 的对应表"],
  ["[a:b]", "切片", "取列表/字符串的一段，如 li[1:3]"],
  ["f\"\"", "f-string", "f\"我是{name}\"，{} 里填变量"],
  ["#", "注释", "# 后面是说明，电脑会忽略"],
  [":", "冒号（开缩进块）", "if / for / def 后面加冒号"],
  ["=", "赋值（存值）", "x = 5 把 5 放进变量 x"],
  [",", "逗号", "分隔多个值，如 print(1, 2)"],
  ["缩进", "4 个空格", "表示同一个块，同一层要对齐"]
];
const INTRO_TERMS = [
  ["变量", "贴了名字的盒子，存值，如 x = 5"],
  ["字符串 str", "引号里的一串文字，如 \"你好\""],
  ["整数 int / 小数 float", "数字类型"],
  ["布尔值 bool", "只有 True / False"],
  ["函数 def", "菜谱：给原料（参数）出成品（返回值）"],
  ["列表 list", "有顺序的购物清单"],
  ["元组 tuple", "打不动的列表（不可变）"],
  ["字典 dict", "通讯录：名字 → 值"],
  ["集合 set", "自动去重的集合"],
  ["循环 for / while", "机器人重复做一件事"],
  ["条件 if", "红绿灯：条件成立走这边"],
  ["模块 import", "工具箱：拿来就能用"],
  ["类 class / 对象", "模具 / 用模具造出来的东西"],
  ["增强赋值", "x += 1 是 x = x + 1 的简写"],
  ["切片", "取列表/字符串的一段"],
  ["异常", "出错时的错误，用 try/except 接住"]
];
const INTRO_RULES = [
  ["符号用英文半角", "别用中文全角（（）“”等），Python 只认半角 ( ) \" \""],
  ["括号要成对", "( )、[ ]、{ } 要配对"],
  ["缩进同一层一致", "同一个块的代码缩进对齐（4 空格）"],
  ["变量先赋值再用", "用之前先 name = 值"],
  ["= 是赋值，== 才比较", "x = 5 存值；x == 5 才判断"],
  ["文字要加引号", "字符串用 \" 或 ' 包起来"]
];
function introHTML() {
  return '<div class="intro-hero"><span class="section-label">第 0 章 · Python 初识</span><h2>欢迎来到代码大陆！</h2><p class="lead">' + escapeHtml(INTRO_PY) + '</p></div>' +
    '<div class="intro-sec"><span class="section-label">必背符号（点卡片展开）</span><div class="intro-grid">' +
    INTRO_SYMBOLS.map(s => '<div class="intro-card" tabindex="0"><b class="intro-sym">' + escapeHtml(s[0]) + '</b><div class="intro-reveal"><div class="intro-name">' + escapeHtml(s[1]) + '</div><div>' + escapeHtml(s[2]) + '</div></div></div>').join("") +
    '</div></div>' +
    '<div class="intro-sec"><span class="section-label">必懂术语</span><div class="intro-grid">' +
    INTRO_TERMS.map(t => '<div class="intro-card" tabindex="0"><b class="intro-sym">' + escapeHtml(t[0]) + '</b><div class="intro-reveal"><div class="intro-name">' + escapeHtml(t[0]) + '</div><div>' + escapeHtml(t[1]) + '</div></div></div>').join("") +
    '</div></div>' +
    '<div class="intro-sec"><span class="section-label">必背规则（点卡片展开）</span><div class="intro-grid">' +
    INTRO_RULES.map(r => '<div class="intro-card" tabindex="0"><b class="intro-sym">' + escapeHtml(r[0]) + '</b><div class="intro-reveal"><div class="intro-name">' + escapeHtml(r[0]) + '</div><div>' + escapeHtml(r[1]) + '</div></div></div>').join("") +
    '</div></div>';
}
function showIntro(ch) {
  try {
    const sc = $("map-scroll"); if (!sc) throw new Error("未找到地图容器");
    sc.scrollLeft = 0; sc.scrollTop = 0;
    const canvas = $("map-canvas"); canvas.style.display = "none";
    sc.querySelectorAll(".intro-wrap").forEach(n => n.remove());
    const w = document.createElement("div");
    w.className = "intro-wrap";
    w.innerHTML = introHTML();
    sc.appendChild(w);
    w.querySelectorAll(".intro-card").forEach(el => el.addEventListener("click", () => el.classList.toggle("open")));
    $("map-progress-text").textContent = "阅读预习";
    $("map-progress-bar").style.width = "0%";
  } catch (e) {
    const sc = $("map-scroll");
    if (sc) sc.innerHTML = '<div style="padding:24px;color:#F43F5E;font-family:monospace;font-size:13px;">第 0 章加载出错：' + (e.message || e) + '</div>';
  }
}
function getChapters() {
  const m = new Map();
  COURSES.forEach(c => { const i = chIndex(c); if (!m.has(i)) m.set(i, { idx: i, title: CHAPTER_TITLES[i] || "第" + (i + 1) + "章", courses: [] }); m.get(i).courses.push(c); });
  const arr = [...m.values()].sort((a, b) => a.idx - b.idx);
  return [{ idx: -1, title: "第 0 章 · Python 初识", intro: true, courses: [] }, ...arr];
}
function renderOverallStats() {
  const done = Object.keys(state.done).length;
  let stars = 0; for (const k in state.stars) stars += state.stars[k];
  $("xp-text").textContent = state.xp + " XP";
  $("streak-text").textContent = "连击 ×" + state.streak;
  $("hero-done").textContent = "已通关 " + done + " 关";
  $("hero-stars").textContent = "收集 " + stars + " 星";
  $("hero-streak").textContent = "连击 ×" + state.streak;
  renderStats();
}
function renderHome() {
  const chapters = getChapters();
  let curChap = 0;
  for (let i = 0; i < chapters.length; i++) { const ch = chapters[i]; if (ch.intro) continue; if (ch.courses.some(c => !state.done[c.id])) { curChap = i; break; } curChap = i; }
  if (window.selChap == null || window.selChap > curChap) window.selChap = curChap;
  renderOverallStats();
  renderChapterPills(chapters, curChap);
  renderChapterMap(chapters[Math.min(window.selChap, chapters.length - 1)]);
}
function renderChapterPills(chapters, curChap) {
  const row = $("chapter-row"); if (!row) return;
  row.innerHTML = chapters.map((ch, i) => {
    const isActive = i === window.selChap;
    const isLocked = !ch.intro && i > curChap;
    const made = ch.intro ? 0 : ch.courses.filter(c => state.done[c.id]).length;
    const total = ch.intro ? 0 : ch.courses.length;
    const lbl = ch.intro ? ch.title : (ch.title + " · " + made + "/" + total + (isLocked ? " 🔒" : ""));
    return '<button class="chapter-pill ' + (isActive ? "is-active" : isLocked ? "is-soon" : "") + '" data-ch="' + i + '"' + (isLocked ? " disabled" : "") + '>' + lbl + '</button>';
  }).join("");
  row.querySelectorAll(".chapter-pill").forEach(el => {
    el.style.animationDelay = (parseInt(el.dataset.ch, 10) * 0.06) + "s";
    if (!el.disabled) el.addEventListener("click", () => { window.selChap = parseInt(el.dataset.ch, 10); renderHome(); });
  });
}
function renderChapterMap(ch) {
  const sc = $("map-scroll");
  const canvas = $("map-canvas");
  canvas.style.display = "";
  if (sc) sc.querySelectorAll(".intro-wrap").forEach(n => n.remove());
  canvas.querySelectorAll(".map-item").forEach(n => n.remove());
  canvas.querySelectorAll(".intro-wrap").forEach(n => n.remove());
  if (ch.intro) { showIntro(ch); return; }
  const path = $("map-path"); if (path) path.style.display = "";
  const courses = ch.courses;
  const stepX = 240, padX = 130, H = 480, n = courses.length;
  const W = padX * 2 + (n - 1) * stepX;
  const mobile = window.matchMedia("(max-width: 920px)").matches;
  const pts = courses.map((c, i) => ({ x: padX + i * stepX, y: H * (0.5 + 0.26 * Math.sin(i * 1.1)) }));
  if (!mobile) {
  canvas.style.width = W + "px"; canvas.style.height = H + "px";
  path.setAttribute("viewBox", "0 0 " + W + " " + H); path.setAttribute("width", W); path.setAttribute("height", H);
  let d = "M" + pts[0].x + " " + pts[0].y;
  for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1], my = (a.y + b.y) / 2; d += " C " + a.x + " " + my + ", " + b.x + " " + my + ", " + b.x + " " + b.y; }
  const pd = $("map-path-d");
  pd.setAttribute("d", d);
  // 连线入场时描画一遍：先设等长虚线偏移，再过渡回 0
  try {
    const L = pd.getTotalLength();
    pd.style.transition = "none";
    pd.style.strokeDasharray = L + "px";
    pd.style.strokeDashoffset = L + "px";
    void pd.getBoundingClientRect();
    pd.style.transition = "stroke-dashoffset 1.5s cubic-bezier(.35,.05,.2,1)";
    pd.style.strokeDashoffset = "0";
  } catch (e) { pd.style.strokeDasharray = "none"; pd.style.strokeDashoffset = "0"; }
  }
  const firstUn = courses.findIndex(c => !state.done[c.id]);
  window.mapNodes = [];
  courses.forEach((c, i) => {
    const st = state.done[c.id] ? "passed" : (i === firstUn ? "current" : "locked");
    const item = document.createElement("div");
    item.className = "map-item";
    if (!mobile) { item.style.left = pts[i].x + "px"; item.style.top = pts[i].y + "px"; }
    let badge;
    if (st === "passed") badge = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>';
    else if (st === "current") badge = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l12 8-12 8z"/></svg>';
    else badge = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
    const starsHtml = st === "passed" ? '<span class="lvl-stars">' + Array.from({ length: state.stars[c.id] || 0 }, () => '<svg viewBox="0 0 24 24" fill="var(--gold)"><path d="M12 2l2.6 6.2 6.7.5-5.1 4.4 1.6 6.5L12 16l-5.8 3.6 1.6-6.5-5.1-4.4 6.7-.5z"/></svg>').join("") + "</span>" : "";
    item.innerHTML = '<div class="map-node ' + st + '"><span class="num">' + (COURSES.indexOf(c) + 1) + '</span><span class="state-badge">' + badge + '</span></div>' +
      '<div class="map-node-label"><div class="lvl-title">' + c.title + '</div><div class="lvl-status">' + (st === "passed" ? "已通关" : st === "current" ? "当前关卡" : "未解锁") + '</div>' + starsHtml + '</div>';
    if (st !== "locked") { item.style.cursor = "pointer"; item.addEventListener("click", () => showLesson(COURSES.indexOf(c))); }
    // 关卡逐个弹出：节点与整行都带延迟
    const _dl = (i * 0.055) + "s";
    item.style.animationDelay = _dl;
    const _nd = item.querySelector(".map-node"); if (_nd) _nd.style.animationDelay = _dl;
    canvas.appendChild(item);
    window.mapNodes.push(item);
  });
  const doneIn = courses.filter(c => state.done[c.id]).length;
  $("map-progress-text").textContent = doneIn + " / " + courses.length + " 关";
  $("map-progress-bar").style.width = (courses.length ? Math.round(doneIn / courses.length * 100) : 0) + "%";
  // 只横向滚动地图容器，把当前关卡居中；不要用 scrollIntoView（那会把整个页面也带下去）
  if (!mobile) requestAnimationFrame(() => {
    const idx = Math.max(0, firstUn);
    const el = window.mapNodes[idx];
    const sc = $("map-scroll");
    if (el && sc) {
      const target = el.offsetLeft - sc.clientWidth / 2;
      sc.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    }
  });
}

const LEVEL_RANKS = [
  { min: 0, max: 500, title: "代码学徒", color: "#94A3B8" },
  { min: 500, max: 2000, title: "咒语师", color: "#4338CA" },
  { min: 2000, max: 4500, title: "逻辑大师", color: "#0F9B8E" },
  { min: 4500, max: 8000, title: "数据结构掌控者", color: "#2563EB" },
  { min: 8000, max: 13000, title: "数据分析师", color: "#7C3AED" },
  { min: 13000, max: 1e9, title: "代码大陆王者", color: "#D97706" }
];
function rankOf(xp) { return LEVEL_RANKS.find(r => xp >= r.min && xp < r.max) || LEVEL_RANKS[0]; }
const BADGE_DEFS = {
  "练习达人": { name: "练习达人", c1: "#F59E0B", c2: "#F43F5E", ic: "star" },
  "三档全对": { name: "三档全对", c1: "#10B981", c2: "#2563EB", ic: "check" },
  "连击3": { name: "三连击", c1: "#8B5CF6", c2: "#EC4899", ic: "flame" },
  "连击5": { name: "五连击", c1: "#F97316", c2: "#EF4444", ic: "flame" },
  "连击10": { name: "十连击", c1: "#F59E0B", c2: "#D97706", ic: "crown" }
};
function badgeSVG(id) {
  const d = BADGE_DEFS[id] || BADGE_DEFS["练习达人"];
  const uid = "bx" + (id || "x").replace(/[^a-zA-Z0-9]/g, "");
  let icon;
  if (d.ic === "check") icon = '<path d="M23 27 l5 5 12 -13" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
  else if (d.ic === "crown") icon = '<path d="M20 27 L26 20 L32 26 L38 20 L44 27 L41 37 L23 37z" fill="#fff"/>';
  else if (d.ic === "flame") icon = '<path d="M32 15 c7 9 -3 11 2 17 c-11 -2 -8 -11 -8 -11 c-4 6 2 13 8 13 c8 0 11 -9 5 -14 z" fill="#fff"/>';
  else icon = '<path d="M32 15 l3.4 6.6 7.4 1.1 -5.4 5.2 1.3 7.4 -6.7 -3.5 -6.7 3.5 1.3 -7.4 -5.4 -5.2 7.4 -1.1z" fill="#fff"/>';
  return '<svg viewBox="0 0 64 64" class="badge-svg" style="width:46px;height:46px;">' +
    '<defs><linearGradient id="' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + d.c1 + '"/><stop offset="1" stop-color="' + d.c2 + '"/></linearGradient></defs>' +
    '<circle cx="32" cy="26" r="20" fill="url(#' + uid + ')"/>' +
    '<path d="M20 43 L14 60 L32 51 L50 60 L44 43" fill="#B45309"/>' +
    '<circle cx="32" cy="26" r="14" fill="none" stroke="#fff" stroke-width="2" opacity=".4"/>' + icon + '</svg>';
}
const AVATAR_FRAMES = {
  "火焰": { name: "火焰", c1: "#F97316", c2: "#EF4444" },
  "星辰": { name: "星辰", c1: "#8B5CF6", c2: "#6366F1" },
  "皇冠": { name: "皇冠", c1: "#F59E0B", c2: "#D97706" }
};
function frameSVG(id, size) {
  const d = AVATAR_FRAMES[id]; if (!d) return "";
  const uid = "fx" + id;
  return '<svg viewBox="0 0 48 48" class="avatar-frame" style="width:' + size + 'px;height:' + size + 'px;">' +
    '<defs><linearGradient id="' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + d.c1 + '"/><stop offset="1" stop-color="' + d.c2 + '"/></linearGradient></defs>' +
    '<circle cx="24" cy="24" r="20" fill="none" stroke="url(#' + uid + ')" stroke-width="5"/>' +
    '<circle cx="24" cy="24" r="20" fill="none" stroke="#fff" stroke-width="1.4" opacity=".6"/>' +
    '</svg>';
}
function applyAvatarFrame() {
  const av = document.querySelector(".avatar"); if (!av) return;
  let el = document.getElementById("avatar-frame");
  if (!el) { el = document.createElement("span"); el.id = "avatar-frame"; el.className = "avatar-frame-wrap"; av.appendChild(el); }
  el.innerHTML = frameSVG(state.frame, 36);
}
const CHEST_POOL = [
  { kind: "xp", v: 30, label: "+30 XP" },
  { kind: "xp", v: 50, label: "+50 XP" },
  { kind: "xp", v: 80, label: "+80 XP" },
  { kind: "xp", v: 120, label: "+120 XP" },
  { kind: "badge", id: "练习达人", label: "徽章 · 练习达人" },
  { kind: "badge", id: "三档全对", label: "徽章 · 三档全对" },
  { kind: "frame", id: "火焰", label: "头像框 · 火焰" },
  { kind: "frame", id: "星辰", label: "头像框 · 星辰" },
  { kind: "frame", id: "皇冠", label: "头像框 · 皇冠" }
];
function openChest() {
  const r = CHEST_POOL[Math.floor(Math.random() * CHEST_POOL.length)];
  if (r.kind === "xp") { state.xp += r.v; }
  else if (r.kind === "badge") { if (!state.badges) state.badges = []; if (state.badges.indexOf(r.id) < 0) state.badges.push(r.id); }
  else if (r.kind === "frame") { if (!state.frames) state.frames = []; if (state.frames.indexOf(r.id) < 0) state.frames.push(r.id); if (!state.frame) state.frame = r.id; }
  save();
  $("chest-reward").textContent = r.kind === "xp" ? "🎉 抽中 +" + r.v + " XP！" : r.kind === "badge" ? "🎉 抽中徽章·" + r.id + "！" : "🎉 抽中头像框·" + r.id + "！";
  applyAvatarFrame();
  $("chest-modal").hidden = false;
  $("chest").textContent = "🎁";
  const box = $("chest"); box.classList.remove("open"); box.classList.add("shake");
  const burst = $("chest-burst"); burst.style.display = "none"; burst.innerHTML = "";
  setTimeout(() => { box.classList.remove("shake"); box.classList.add("open"); spawnSparks(burst); }, 700);
  $("xp-text").textContent = state.xp + " XP";
}
function spawnSparks(box) {
  box.style.display = "block";
  const colors = ["#F59E0B", "#10B981", "#6366F1", "#F43F5E", "#FACC15", "#E0E7FF"];
  for (let i = 0; i < 16; i++) {
    const s = document.createElement("i");
    const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 80;
    s.style.setProperty("--dx", Math.cos(a) * d + "px");
    s.style.setProperty("--dy", Math.sin(a) * d + "px");
    s.style.background = colors[i % colors.length];
    s.style.left = "50%"; s.style.top = "50%";
    box.appendChild(s);
  }
}
function renderStats() {
  const done = Object.keys(state.done).length;
  let stars = 0; for (const k in state.stars) stars += state.stars[k];
  const runs = state.runs || 0, errors = state.errors || 0;
  const errRate = runs ? Math.round(errors / runs * 100) : 0;
  const rank = rankOf(state.xp); const lvl = xpToLevel(state.xp);
  $("stat-level").textContent = "Lv " + lvl + " · " + rank.title;
  $("stat-level").style.color = rank.color; $("stat-level").style.borderColor = rank.color;
  $("st-xp").textContent = state.xp;
  $("st-stars").textContent = stars;
  $("st-done").textContent = done + "/" + COURSES.length;
  $("st-runs").textContent = runs;
  $("st-err").textContent = errRate + "%";
  $("st-streak").textContent = state.maxStreak || 0;
  const badges = (state.badges || []).length;
  const elB = $("st-badges"); if (elB) elB.textContent = badges;
  const terms = [];
  COURSES.forEach((c) => { if (state.done[c.id]) c.concepts.forEach(x => terms.push(x.term)); });
  const uniq = [...new Set(terms)];
  $("points-tags").innerHTML = uniq.length
    ? uniq.map(t => '<span class="tag">' + escapeHtml(t) + '</span>').join("")
    : '<span class="lvl-status">通关关卡后，这里会汇总你掌握的知识要点</span>';
  const myB = $("my-badges");
  if (myB) {
    const bl = state.badges || [];
    myB.innerHTML = bl.length ? bl.map(b => '<div class="badge-item" title="' + escapeHtml(b) + '">' + badgeSVG(b) + '</div>').join("") : '<span class="lvl-status">完成课后练习三档全对 / 开宝箱可获得徽章</span>';
  }
  const myF = $("my-frames");
  if (myF) {
    const fl = state.frames || [];
    const opts = [["", "默认"]].concat(fl.map(id => [id, (AVATAR_FRAMES[id] && AVATAR_FRAMES[id].name) || id]));
    myF.innerHTML = opts.map(o => '<button class="frame-opt' + (state.frame === o[0] ? " is-on" : "") + '" data-f="' + o[0] + '">' + (o[0] ? frameSVG(o[0], 34) : '<span class="frame-none">无</span>') + '<span class="frame-name">' + escapeHtml(o[1]) + '</span></button>').join("");
    myF.querySelectorAll(".frame-opt").forEach(el => { el.addEventListener("click", () => { state.frame = el.dataset.f; save(); applyAvatarFrame(); renderStats(); }); });
  }
  applyAvatarFrame();
}

function enableMapDrag() {
  const sc = $("map-scroll");
  if (!sc) return;
  let isDown = false, startX = 0, startLeft = 0, moved = false;
  sc.addEventListener("mousedown", (e) => { isDown = true; moved = false; startX = e.clientX; startLeft = sc.scrollLeft; sc.style.cursor = "grabbing"; e.preventDefault(); });
  window.addEventListener("mousemove", (e) => { if (isDown) { const dx = e.clientX - startX; if (Math.abs(dx) > 4) moved = true; sc.scrollLeft = startLeft - dx; } });
  window.addEventListener("mouseup", () => { isDown = false; sc.style.cursor = ""; });
  sc.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
}

// ===== 课程渲染 =====
const COURSE_LECTURES = {
  "l1-7": '<p><b>for 循环 = 让机器人重复做 N 次</b></p><ol><li><code>range(n)</code> 生成 0 到 n-1 的一串数字（<code>range(3)</code> = 0,1,2）。</li><li><code>for i in range(n):</code> 让变量 i 依次等于 0,1,2,...n-1，每次执行缩进的代码。</li><li>想从 1 开始？用 <code>range(1, n+1)</code>（含头不含尾）。</li></ol><p><b>关键理解"遍历"</b>：像翻购物清单，一次拿起一张看。循环变量 i 每轮变一次，代码跟着执行一次。</p><p><b>执行过程示例</b>：<code>for i in range(3): print(i)</code> → 第一轮 i=0 打印 0；第二轮 i=1 打印 1；第三轮 i=2 打印 2。</p><p><b>常见坑</b>：① range 从 0 开始；② 循环体必须缩进；③ 算 1 到 n 的和要 <code>s=s+i</code> 累加，别忘初始化 <code>s=0</code>。</p><p><b>练习建议</b>：先只打印 i 看清变化，再加要重复做的事。</p>',
  "l1-8": '<p><b>while 循环 = 只要条件成立，就一直做</b></p><ol><li><code>while 条件:</code> 每轮都先判断条件，成立才执行缩进代码。</li><li><b>必须在循环体里改变条件</b>（如 <code>n=n+1</code>），否则条件永远成立 → 死循环（页面卡死）。</li></ol><p><b>执行过程示例</b>：<code>n=1; while n<=3: print(n); n=n+1</code> → 打印 1、2、3，n 变 4 时条件不成立，停止。</p><p><b>for vs while</b>：for 适合"已知重复几次"；while 适合"条件满足就继续"（比如累加到超过某个数）。</p><p><b>常见坑</b>：忘了更新条件变量 → 死循环；条件写反 → 一次都不执行。</p><p><b>练习建议</b>：先用能正确退出的简单 while，再逐步加累加逻辑。</p>',
  "l1-9": '<p><b>break 刹车 / continue 跳过</b></p><ol><li><code>break</code>：立即退出整个循环。</li><li><code>continue</code>：跳过本次，进下一次。</li></ol><p><b>示例</b>：<code>for i in range(1,6): if i==3: break; print(i)</code> → 1 2。</p>',
  "l1-10": '<p><b>嵌套循环 = 表里的格子</b></p><ol><li>外层循环管"行"，内层循环管"列"。</li><li>内层循环整体缩进在外层循环体里。</li><li>常用于生成网格/组合/累加。</li></ol><p><b>示例</b>：<code>for i in range(2): for j in range(3): print(i*j)</code>。</p>',
  "l1-4": '<p><b>if/else = 路口的红绿灯</b></p><ol><li><code>if 条件:</code> 条件成立，执行缩进的那段代码。</li><li>不满足，走 <code>else:</code> 那段（可选）。</li><li>多个情况用 <code>elif</code>（否则如果）。</li></ol><p><b>关键</b>：判断条件用比较/逻辑运算（得到 True/False）；if 后的代码要缩进，且同一层对齐。</p><p><b>执行示例</b>：<code>age=18; if age>=18: print("可以进") else: print("不能进")</code> → 打印"可以进"。</p><p><b>常见坑</b>：if 后忘冒号；缩进不一致；<b>elif 顺序</b>（先判断范围小的，避免大范围抢先）。</p>',
  "l1-5": '<p><b>逻辑运算 = 盖两个章才能进</b></p><ol><li><code>and</code>：两边都真才为真（<code>True and False</code> → False）。</li><li><code>or</code>：一边真就真（<code>True or False</code> → True）。</li><li><code>not</code>：取反（<code>not True</code> → False）。</li></ol><p><b>关键</b>：逻辑运算常和比较组合，如 <code>3>2 and 5>4</code>（两个都成立 → True）。</p><p><b>记忆口诀</b>：and 都要真、or 一个就够、not 翻个面。</p>',
  "l1-6": '<p><b>if/elif/else = 多岔路口</b></p><ol><li><code>if</code> 判断第一个条件。</li><li><code>elif</code> 是"否则如果"，在小面再分岔。</li><li><code>else</code> 兜底：前面都不满足就走这。</li></ol><p><b>关键</b>：从上往下依次判断，命中一个就停下；<b>顺序</b>要先判"范围最严格"的，否则可能被前面抢走。</p><p><b>执行示例</b>：成绩分 4 档，<code>score=85</code> → 不满足 ≥90，满足 ≥75 → 打印"良好"。</p>',
  "l1-1": '<p><b>input() = 电脑问、你答</b></p><ol><li><code>input("提示")</code> 会等待输入，返回的是<b>字符串</b>。</li><li>要算数，得先 <code>int(input(...))</code> 转成整数。</li></ol><p><b>执行示例</b>：输入 5，<code>num = int(input(...)); print(num+3)</code> → 8。</p><p><b>常见坑</b>：忘 int() 就直接算（文字+数字会报错）；提示语放在括号里。</p>',
  "l1-2": '<p><b>两个数求和</b></p><ol><li>用 <code>a = int(input(...))</code> 读第一个数。</li><li>用 <code>b = int(input(...))</code> 读第二个数。</li><li><code>print(a + b)</code> 求和。</li></ol><p><b>关键</b>：两次 input 都要 int() 转成整数，才能相加。</p>',
  "l1-3": '<p><b>比较运算 = 判断题</b></p><ol><li>用 <code>&gt; &lt; &gt;= &lt;= == !=</code> 比较两个值，结果只有 <code>True</code> 或 <code>False</code>（布尔值）。</li><li>判断"相等"用 <code>==</code>（两个等号），不是 <code>=</code>（那是赋值）。</li></ol><p><b>执行示例</b>：<code>print(5&gt;3)</code> → True；<code>print(5==3)</code> → False。</p><p><b>用途</b>：常配合 if 判断奇偶：<code>n%2==0</code> 为真就是偶数。</p><p><b>常见坑</b>：把比较和赋值混用；不理解布尔值也是值（True/False）。</p>',
  "l0-1": '<p><b>print = 把话说出来</b></p><ol><li><code>print(内容)</code> 把内容显示到屏幕。</li><li>文字要加英文双引号 <code>print("你好")</code>；数字直接写 <code>print(3)</code>。</li></ol><p><b>程序</b> = 按顺序执行的指令清单，print 是第一条最简单的指令。</p><p><b>常见坑</b>：忘了引号；用中文引号"<code>”</code>"（Python 只认英文）。</p>',
  "l0-2": '<p><b>四则运算 = 计算器</b></p><ol><li><code>+ - * /</code> 做加减乘除。</li><li>把算式写进 print，就输出结果。</li></ol><p><b>示例</b>：<code>print(30+18)</code>→48；<code>print(9/2)</code>→4.5。</p>',
  "l0-2b": '<p><b>整除 // 和取余 % = 分苹果</b></p><ol><li><code>17 // 5</code> → 3（每人 3 个，去小数）。</li><li><code>17 % 5</code> → 2（剩 2 个）。</li><li><b>区别</b>：//　去小数求商，% 留余数。</li></ol><p><b>经典用法</b>：<code>n % 2 == 0</code> 判断奇偶。</p>',
  "l0-2c": '<p><b>乘方 ** 与优先级</b></p><ol><li><code>2 ** 10</code> 表示 2 连乘 10 次 → 1024。</li><li><b>优先级</b>：括号 &gt; 乘方 &gt; 乘除 &gt; 加减。</li><li><code>(2+3) ** 2</code> 先算括号再乘方。</li></ol>',
  "l0-3": '<p><b>字符串 = 引号里的文字</b></p><ol><li><code>+</code> 把两段文字拼起来（<code>print("早"+"上好")</code> → 早上好）。</li><li><code>*</code> 重复多份（<code>print("哈"*3)</code> → 哈哈哈）。</li></ol><p><b>注意</b>：文字和数字不能直接相加（<code>"我"+3</code> 会报错），数字要先 <code>str()</code>。</p>',
  "l0-4": '<p><b>变量 = 贴名字的盒子</b></p><ol><li><code>名字 = 值</code> 把值存进变量（<code>name="小明"</code>）。</li><li>叫名字就能拿出来用。</li><li>重新赋值 = 换掉盒子里的东西。</li></ol><p><b>注意</b>：<code>=</code> 是"赋值"（存），不是数学"等于"；判断相等用 <code>==</code>。</p>',
  "l0-5": '<p><b>数据类型 = 东西的种类</b></p><ol><li><code>int</code> 整数、<code>float</code> 小数、<code>str</code> 文字、<code>bool</code> 真假。</li><li><code>type(x)</code> 查看类型。</li></ol><p><b>为什么重要</b>：数字能算账，文字能拼接，类型不同用法不同。<code>"1"+1</code> 会报错（文字+数字）。</p>',
  "l0-6": '<p><b>类型转换 = 换包装</b></p><ol><li><code>int("25")</code> → 25（文字转整数）；<code>str(18)</code> → "18"（数字转文字）；<code>float("4.5")</code> → 4.5。</li><li>input 拿到的是文字，要 <code>int(input())</code> 才能算数。</li></ol><p><b>注意</b>：<code>int("abc")</code> 会报错（字母转不了整数）。</p>',
  "l0-7": '<p><b>注释 = 便签</b></p><ol><li><code>#</code> 后面是注释，电脑跳过。</li><li>注释帮自己和别人看懂代码。</li></ol>',
  "l0-7b": '<p><b>缩进 = 阶梯</b></p><ol><li>同一层级的代码前加 4 个空格、对齐，表示\"这一块\"。</li><li>if/for/def 后面的代码要缩进，缩进属于这个块。</li><li>块外的代码不缩进（顶格写）。</li></ol>',
  "l0-8": '<p><b>综合 = 把学过的拼起来</b></p><ol><li>用变量存 <code>name</code>、<code>age</code>。</li><li>用 <code>+</code> 拼接文字，数字拼前用 <code>str()</code>。</li><li>一句话 <code>print("我是"+name+"，今年"+str(age)+"岁")</code>。</li></ol><p><b>关键</b>：数字拼进句子前一定要 <code>str()</code> 转文字。</p>',
  "l2-1": '<p><b>字符串方法 = 给文字做美容</b></p><ol><li>方法用<code>.</code>调用，如 <code>s.upper()</code>。</li><li><code>upper/lower</code> 转大小写；<code>strip</code> 去首尾空格；<code>replace(旧,新)</code> 替换；<code>len(s)</code> 数长度。</li></ol><p><b>示例</b>：<code>"hello".upper()</code>→HELLO；<code>len("python")</code>→6。</p>',
  "l2-2": '<p><b>列表 = 有顺序的清单</b></p><ol><li>用 <code>[ ]</code> 建列表，逗号隔开。</li><li>下标从 0 开始：<code>li[0]</code> 第1个、<code>li[1]</code> 第2个、<code>li[-1]</code> 最后一个。</li><li><code>len(li)</code> 数长度。</li></ol><p><b>坑</b>：下标越界会报错。</p>',
  "l2-3": '<p><b>列表可以改</b></p><ol><li><code>li.append(x)</code> 加到末尾。</li><li><code>li[i]=x</code> 改第 i 个。</li></ol><p><b>示例</b>：<code>n=[1,2,3]; n.append(4)</code>→<code>[1,2,3,4]</code>。</p>',
  "l2-4": '<p><b>字典 = 键值对应表</b></p><ol><li>用 <code>{键:值}</code> 建。</li><li><code>d[键]</code> 取值。</li><li>键唯一，像名字。</li></ol><p><b>示例</b>：<code>d={"小明":18}; print(d["小明"])</code>→18。</p>',
  "l2-5": '<p><b>函数 = 自己的菜谱</b></p><ol><li><code>def 名字(参数):</code> 定义，函数体缩进。</li><li><code>return 值</code> 返回。</li><li><code>名字(实参)</code> 调用。</li></ol><p><b>示例</b>：<code>def add(a,b): return a+b; print(add(3,4))</code>→7。</p>',
  "l2-6": '<p><b>for 遍历列表</b></p><ol><li><code>for x in 列表:</code> x 依次等于每个元素。</li><li>循环体缩进，每个元素执行一次。</li></ol><p><b>示例</b>：<code>for x in [1,2,3]: print(x)</code>→1 2 3。</p>',
  "l2-7": '<p><b>元组 = 打不动的清单</b></p><ol><li>用 <code>( )</code> 建元组，里面不能再改。</li><li>和列表一样能取下标、len()、遍历。</li><li>区别：列表可改，元组不能改。</li></ol><p><b>示例</b>：<code>t=(1,2,3); print(t[1])</code>→2。</p>',
  "l2-8": '<p><b>字符串查询</b></p><ol><li><code>子串 in 字符串</code> 判断是否包含（True/False）。</li><li><code>s.count(子)</code> 统计次数；<code>s.split(符号)</code> 拆成列表。</li></ol><p><b>示例</b>：<code>"python" in "python编程"</code>→True。</p>',
  "l2-9": '<p><b>列表推导式 = 流水线（详细）</b></p><ol><li><b>语法</b>：<code>[表达式 for 变量 in 列表]</code>。</li><li><b>执行过程</b>：从左到右，依次把列表里每个元素赋给变量，用表达式算出结果，放进新列表。</li><li><b>例子走一遍</b>：<code>[x*2 for x in [1,2,3]]</code> → x=1 得 2、x=2 得 4、x=3 得 6 → <code>[2,4,6]</code>。</li><li><b>加过滤</b>：<code>[表达式 for x in 列表 if 条件]</code> 只对满足条件的元素套表达式（如 <code>if x%2==0</code> 只留偶数）。</li><li><b>常见坑</b>：① 结果是<b>新列表</b>，不改原列表；② <code>if</code> 写在 for 后面，位置别错；③ 表达式里用 <code>x</code>（写 return 会错）。</li><li><b>等价写法</b>：<code>res=[]; for x in 列表: res.append(表达式)</code>，推导式一行搞定更简洁。</li></ol>',
  "l2-10": '<p><b>综合 = 函数+循环+列表</b></p><ol><li>用 <code>def</code> 封装逻辑，参数传列表。</li><li>用 <code>for</code> 遍历列表累加/统计。</li><li>用 <code>return</code> 返回结果，调用输出。</li></ol><p><b>示例</b>：<code>def sum_list(li): s=0; for x in li: s+=x; return s</code>。</p>',
  "l2-11": '<p><b>f-string = 往句子里塞值</b></p><ol><li>字符串前加 <code>f</code>，如 <code>f"...{变量}..."</code>。</li><li><code>{变量}</code> 会被替换成变量的值。</li><li>还能直接算：<code>f"{a}+{b}={a+b}"</code>。</li></ol><p><b>示例</b>：<code>name="小明"; print(f"我是{name}")</code>→我是小明。</p>',
  "l2-12": '<p><b>集合 = 自动去重</b></p><ol><li>用 <code>{ }</code> 建集合，重复元素只留一个。</li><li><code>len(s)</code> 数元素个数；<code>值 in s</code> 判断是否包含。</li></ol><p><b>示例</b>：<code>s={1,2,2,3}; print(len(s))</code>→3。</p>',
  "l2-13": '<p><b>join = 把列表串成字符串</b></p><ol><li><code>分隔符.join(列表)</code> 用分隔符把元素连起来。</li><li>元素必须是字符串；数字要先 <code>str()</code>。</li></ol><p><b>示例</b>：<code>" ".join(["a","b"])</code>→"a b"。</p>',
  "l2-14": '<p><b>列表帮手</b></p><ol><li><code>sorted(列表)</code> 排序；<code>max</code>/<code>min</code> 最大最小。</li><li><code>列表.sort()</code> 原地排序（不改则用 sorted）。</li></ol><p><b>示例</b>：<code>sorted([3,1,2])</code>→[1,2,3]。</p>',
  "l2-15": '<p><b>字典统计 = 记账</b></p><ol><li><code>d[x] = d.get(x, 0) + 1</code> 给 x 记一次数。</li><li>遍历时逐个统计；<code>d.get(x,0)</code> 没有则视为 0。</li></ol><p><b>示例</b>：统计 <code>["a","b","a"]</code>，a 出现 2 次。</p>',
  "l2-16": '<p><b>字符串切片</b></p><ol><li><code>s[a:b]</code> 取下标 a 到 b-1（含头不含尾）。</li><li><code>s.find(子)</code> 返回子串位置，找不到 -1。</li></ol><p><b>示例</b>：<code>"hello"[1:4]</code>→"ell"。</p>',
  "l2-17": '<p><b>列表更多方法</b></p><ol><li><code>count(x)</code> 次数、<code>index(x)</code> 位置。</li><li><code>remove(x)</code> 删一个、<code>insert(i,x)</code> 位置插入、<code>pop()</code> 弹出。</li></ol>',
  "l2-18": '<p><b>嵌套列表 = 表格</b></p><ol><li>外层是行、内层是列。</li><li><code>grid[i][j]</code> 取第 i 行第 j 列。</li><li>用 <code>for row in grid</code> 遍历行，再嵌套遍历列。</li></ol>',
  "l3-1": '<p><b>try/except = 安全网</b></p><ol><li><code>try:</code> 放可能出错的代码。</li><li>出错就跳到 <code>except:</code> 处理，程序不崩。</li></ol><p><b>示例</b>：<code>try: print(10//0) except: print("不能除0")</code>。</p>',
  "l3-2": '<p><b>import = 借工具箱</b></p><ol><li><code>import math</code> 引入数学模块。</li><li>用 <code>math.sqrt()</code> 开方、<code>math.ceil/floor</code> 取整。</li></ol><p><b>示例</b>：<code>import math; print(math.sqrt(16))</code>→4.0。</p>',
  "l3-3": '<p><b>统计次数</b></p><ol><li><code>列表.count(元素)</code> 返回该元素出现次数。</li><li>字符串也能 <code>s.count(字符)</code>。</li></ol><p><b>示例</b>：<code>[\'a\',\'b\',\'a\'].count(\'a\')</code>→2。</p>',
  "l3-4": '<p><b>返回多值 = 打包</b></p><ol><li><code>return a, b</code> 一次返回多个值（元组）。</li><li>调用时得到一个元组，如 <code>(1, 3)</code>。</li></ol><p><b>示例</b>：<code>def m(li): return min(li), max(li)</code>。</p>',
  "l3-5": '<p><b>类 = 模具（详细）</b></p><ol><li><b>四步写出一个类</b>：① <code>class Person:</code> 定义；② <code>__init__(self, name)</code> 存属性；③ 方法（如 <code>greet(self)</code>）用 <code>self</code> 访问属性；④ <code>p = Person("小明")</code> 实例化并调用。</li><li><b>为什么用 self</b>：self 代表"这个对象自己"，方法里 <code>self.name</code> 就能拿到这个对象的名字。</li><li><b>执行过程</b>：<code>Person("小明")</code> 时 Python 自动调用 <code>__init__</code>，把 "小明" 存进 <code>self.name</code>；再用 <code>p.greet()</code> 调方法返回文字。</li><li><b>常见坑</b>：① 方法第一个参数必须写 <code>self</code>（虽然调用时不传它）；② <code>__init__</code> 前后是<u>两个下划线</u>；③ 方法里的属性要用 <code>self.属性</code>，不能只写 <code>属性</code>。</li></ol>',
  "l3-6": '<p><b>切片 = 切蛋糕</b></p><ol><li><code>li[a:b]</code> 取下标 a 到 b-1（含头不含尾）。</li><li><code>li[:3]</code> 前3个；<code>li[2:]</code> 从下标2到最后。</li></ol><p><b>示例</b>：<code>[1,2,3,4,5][1:4]</code>→[2,3,4]。</p>',
  "l3-7": '<p><b>遍历字典</b></p><ol><li><code>for k in d</code> 取键；<code>for v in d.values()</code> 取值。</li><li><code>for k, v in d.items()</code> 一起取。</li><li>统计可用 <code>d.get(k, 0)+1</code> 累加。</li></ol><p><b>示例</b>：<code>for k, v in d.items(): print(k, v)</code>。</p>',
  "l3-8": '<p><b>文本统计 = 综合</b></p><ol><li><code>s.split()</code> 把句子拆成单词列表。</li><li>用 <code>count</code> 或字典 <code>d</code> 统计次数。</li><li>用 <code>for</code> 遍历列表逐个统计。</li></ol><p><b>示例</b>：<code>s="apple banana apple"; print(s.split().count("apple"))</code>→2。</p>',
  "l3-9": '<p><b>__str__ = 对象的自我介绍</b></p><ol><li><code>__str__</code> 定义把对象转成文字。</li><li><code>print(对象)</code> 会调用 __str__。</li><li>与普通方法一样用 self 访问属性。</li></ol><p><b>示例</b>：<code>class P: def __str__(self): return "P"</code>。</p>',
  "l3-10": '<p><b>文件读写 = 记事本</b></p><ol><li><code>open(名,"w")</code> 打开写，<code>open(名,"r")</code> 读。</li><li><code>.write(内容)</code> 写入，<code>.read()</code> 读取。</li><li>读写都在内存文件系统（Pyodide）。</li></ol><p><b>示例</b>：<code>open("a","w").write("hi"); print(open("a").read())</code>。</p>',
  "l3-11": '<p><b>random = 掷骰子</b></p><ol><li><code>import random</code> 引入随机模块。</li><li><code>random.randint(a,b)</code> 随机整数；<code>random.choice(列表)</code> 随机取一个。</li><li>相同范围/相同元素时结果唯一。</li></ol><p><b>示例</b>：<code>random.randint(1,1)</code>→1。</p>',
  "l3-12": '<p><b>综合 = 做个小计算器</b></p><ol><li><code>def calc(a, op, b)</code> 两个数 + 运算符。</li><li>用 <code>if/elif</code> 按 op 分流，<code>return</code> 结果。</li><li>可把函数组合（如 <code>sq(calc(...))</code>）。</li></ol>',
  "l3-13": '<p><b>温度换算 = 汇率换算</b></p><ol><li><code>c_to_f(c) = c*9/5+32</code> 摄氏转华氏。</li><li>封装成函数，改参数就能复用。</li><li>反向换算：<code>f_to_c(f) = (f-32)*5/9</code>。</li></ol>',
  "l3-14": '<p><b>数据统计 = 数据小管家</b></p><ol><li>用 <code>max/min/sum/len</code> 对列表统计。</li><li>用一个函数封装，<code>return 多个值</code>（元组）。</li><li>返回元组可整体打印。</li></ol>',
  "l3-15": '<p><b>文本分析 = 文章小助手</b></p><ol><li><code>len(s)</code> 字符数、<code>s.split()</code> 拆单词。</li><li>用 <code>count</code> 或字典 <code>d</code> 统计出现次数。</li><li>综合字符串/列表/字典。</li></ol>',
  "l3-16": '<p><b>继承 = 子承父业（详细）</b></p><ol><li><b>语法</b>：<code>class 子类(父类):</code>，子类自动拥有父类的方法与属性。</li><li><b>执行过程</b>：<code>class Animal: def speak(self): return "叫"</code>；<code>class Dog(Animal): pass</code> → Dog 继承了 speak，<code>Dog().speak()</code> 输出"叫"。</li><li><b>覆盖（重写）</b>：在子类里再写同名方法，就会覆盖父类的。<code>class Dog(Animal): def speak(self): return "汪"</code>。</li><li><b>为什么用继承</b>：复用父类已有逻辑（不用重复写），子类只在需要处扩展/改动。</li><li><b>常见坑</b>：① 子类括号里写父类名，别漏；② 覆盖时方法名和 self 要写对。</li></ol>',
  "l3-17": '<p><b>石头剪刀布 = 判断胜负</b></p><ol><li>规则：石头&gt;剪刀、剪刀&gt;布、布&gt;石头。</li><li>用 <code>if/elif</code> 判断，相同为平。</li><li>封装成函数 <code>rps(me, you)</code>。</li></ol>',
  "l4-1": '<p><b>zip = 给袜子配对</b></p><ol><li><code>zip(a, b)</code> 把两个列表按位置配对。</li><li><code>for x, y in zip(...)</code> 同时取两个值。</li><li>常用于把「名字和值」对上。</li></ol>',
  "l4-2": '<p><b>自定义排序 = 按身高排队（详细）</b></p><ol><li><b>语法</b>：<code>sorted(列表, key=函数)</code> —— 默认从小到大，<code>key</code> 指定"按什么口径排"。</li><li><b>原理</b>：排序前先对每个元素调用 <code>key</code>，得到一个"排名字"，再按排名字排。如 <code>key=len</code> 按字符串长度排。</li><li><b>常见 key</b>：<code>len</code>（长度）、<code>abs</code>（绝对值）、<code>lambda x: x[1]</code>（取元组第二个元素）。</li><li><b>执行过程</b>：<code>sorted(["banana","apple","pear"], key=len)</code> → 长度 6、5、4 → 按长度排 → <code>["pear","apple","banana"]</code>。</li><li><b>常见坑</b>：① 默认升序，想降序加 <code>reverse=True</code>；② key 传函数名，<b>不加括号</b>（写了 <code>len()</code> 会错）。</li></ol>',
  "l4-3": '<p><b>all / any = 全员/有人</b></p><ol><li><code>all(生成器)</code> 全部真才 True。</li><li><code>any(生成器)</code> 任一真就 True。</li><li>常配合比较判断："是否全部达标""是否有人超时"。</li></ol>',
  "l4-4": '<p><b>异常细化 = 分类接住</b></p><ol><li><code>except 错误类型:</code> 只接那一类错误。</li><li>如 <code>except ValueError</code>、<code>except ZeroDivisionError</code>、<code>except TypeError</code>。</li><li>比笼统 <code>except:</code> 更精准。</li></ol>',
  "l4-5": '<p><b>map = 流水线加工（详细）</b></p><ol><li><b>语法</b>：<code>list(map(函数, 列表))</code>——对列表每个元素调用函数，返回新列表。</li><li><b>lambda 是什么</b>：<code>lambda x: x*x</code> 是"匿名小函数"，等价于 <code>def f(x): return x*x</code>，但一行写成。冒号前是参数、冒号后是返回值。</li><li><b>执行过程</b>：<code>map(lambda x: x*x, [1,2,3])</code> → 1→1、2→4、3→9 → 用 <code>list()</code> 变成 <code>[1,4,9]</code>。</li><li><b>为什么用 map</b>：代替手写 <code>for</code> 逐个处理，代码更简洁、语义更清晰。</li><li><b>常见坑</b>：① map 返回的是"迭代器"，要 <code>list()</code> 才看到列表；② lambda 只适合简单表达式，复杂逻辑用 def。</li></ol>',
  "l4-6": '<p><b>enumerate = 编号清单</b></p><ol><li><code>for i, x in enumerate(列表)</code> 同时拿下标和值。</li><li>默认从 0 起，可 <code>enumerate(列表, 1)</code>。</li></ol>',
  "l4-7": '<p><b>filter = 筛子（详细）</b></p><ol><li><b>语法</b>：<code>list(filter(函数, 列表))</code> —— 函数返回 True 的元素被留下，False 的被筛掉。</li><li><b>执行过程</b>：<code>filter(lambda x: x%2==0, [1,2,3,4])</code> → x=1 条件假跳过、x=2 真留下、x=3 跳过、x=4 留下 → <code>[2,4]</code>。</li><li><b>filter(None, ...)</b>：元素本身为"假"（空串/0/空列表）也会被筛掉，常用来去空。</li><li><b>为什么用 filter</b>：代替手写 <code>for ... if ... 条件: 留下</code>，语义更清晰。</li><li><b>常见坑</b>：① 结果要 <code>list()</code>；② 条件函数要返回 True/False；③ 想要"加工"该用 map，不是 filter。</li></ol>',
  "l4-8": '<p><b>词频排行 = 统计上榜（详细）</b></p><ol><li><b>步骤</b>：① 空字典 <code>d={}</code>；② <code>for w in s.split()</code> 拆成单词逐个读；③ <code>d[w] = d.get(w, 0) + 1</code> 统计；④ 找最多的词。</li><li><b>为什么用 d.get(w, 0)</b>：若词还没出现过，返回 0，再 +1 就是第一次计数；出现过就取旧值 +1。</li><li><b>找最多的词</b>：<code>max(d, key=d.get)</code> —— 遍历 d，按"值（次数）"取最大，返回对应的键（词）。</li><li><b>进阶排序</b>：<code>sorted(d.items(), key=lambda x: x[1], reverse=True)</code> 按次数降序列出所有词。</li><li><b>常见坑</b>：@d.get 传的是方法本身（不加括号）；② 想同时拿到键和值用 <code>d.items()</code>。</li></ol>'
};
const COURSE_TERMS = {
  "l0-1": [["程序", "让电脑干活的指令清单"], ["输出", "把结果显示出来"], ["表达式", "能算出值的式子"], ["字符串", "引号里的文字"]],
  "l0-2": [["运算符", "+ - * / 加减乘除"], ["算式", "print 里直接写算式"]],
  "l0-2b": [["整除 //", "去小数求商"], ["取余 %", "留余数，n%2 判断奇偶"]],
  "l0-2c": [["乘方 **", "a 的 b 次方"], ["优先级", "括号>乘方>乘除>加减"]],
  "l0-3": [["字符串", "引号里的一串文字"], ["拼接", "用 + 把两段文字连起来"], ["重复", "用 * 复制多份"]],
  "l0-4": [["变量", "存值的盒子"], ["赋值", "= 把右边存进左边变量"], ["标识符", "变量/函数的名字"]],
  "l0-5": [["数据类型", "数字/文字/真假等种类"], ["整数 int", "没小数点的数"], ["浮点数 float", "带小数点的数"], ["字符串", "引号里的文字"], ["布尔值", "True/False"]],
  "l0-6": [["类型转换", "数字和文字互相转换"], ["显式转换", "用 int()/str()/float() 主动转"]],
  "l0-7": [["注释 #", "# 后面是给看的说明"]],
  "l0-7b": [["缩进", "同一层代码加 4 空格对齐"], ["代码块", "缩进在一起的一组代码"]],
  "l0-8": [["表达式", "能算出值的式子"], ["拼接", "用 + 连文字"], ["类型转换", "数字转文字用 str()"]],
  "l1-1": [["input()", "读取用户输入（返回字符串）"], ["类型转换", "文字转整数用 int()"]],
  "l1-2": [["input()", "读取用户输入"], ["int()", "转成整数"], ["变量", "存住读到的值"]],
  "l1-3": [["比较运算", "> < == != 等符号"], ["布尔值", "True/False 判断结果"], ["关系运算符", "比较大小的符号"]],
  "l1-4": [["条件语句", "if/else 让程序做选择"], ["分支", "不同情况做不同处理"], ["缩进块", "缩进在一起的代码"]],
  "l1-5": [["逻辑运算", "用 and/or/not 组合多个条件"], ["and", "两边都为真才为真"], ["or", "一边为真就为真"], ["not", "取反：真变假"]],
  "l1-6": [["条件语句", "if/elif/else"], ["elif", "否则如果（else if）"], ["多重分支", "多个情况依次判断"]],
  "l1-7": [["循环", "重复执行一件事"], ["range", "生成一串数字"], ["迭代", "一个一个处理"]],
  "l1-8": [["循环", "重复执行一件事"], ["条件循环", "while 条件成立就重复"], ["死循环", "忘了改条件停不下来"]],
  "l1-9": [["break", "立即结束整个循环"], ["continue", "跳过本次继续"]],
  "l1-10": [["嵌套循环", "循环里套循环"], ["外层/内层", "行/列"]],
  "l2-1": [["字符串方法", "upper/strip/replace/len 处理文字"], [".upper()", "转大写"], ["len()", "数长度"]],
  "l2-2": [["列表", "[ ] 一串有序数据"], ["索引", "从 0 开始取第 i 个"], ["len()", "列表长度"]],
  "l2-3": [["append()", "往列表末尾加元素"], ["索引赋值", "li[i]=x 改某个"]],
  "l2-4": [["字典", "{键:值} 对应表"], ["按键取值", "d[键]"]],
  "l2-5": [["函数 def", "自定义菜谱"], ["return", "返回结果"], ["调用", "函数名(实参)"]],
  "l2-6": [["for 遍历", "逐个取出列表元素"], ["循环体", "缩进，每个执行一次"]],
  "l2-7": [["元组 tuple", "( ) 不可变数据"], ["索引", "下标从 0 开始"]],
  "l2-8": [["in", "判断是否包含"], ["count()", "统计次数"], ["split()", "按符号拆分"]],
  "l2-9": [["列表推导式", "[表达式 for x in 列表]"], ["过滤", "加 if 条件"]],
  "l2-10": [["函数", "封装逻辑"], ["循环", "逐个处理"], ["列表", "存数据"]],
  "l2-11": [["f-string", "f\"...{变量}...\""], ["插值", "{变量} 自动替换"]],
  "l2-12": [["集合 set", "{ } 自动去重"], ["len()", "元素个数"], ["in", "判断是否包含"]],
  "l2-13": [["join", "分隔符.join(列表) 连成字符串"]],
  "l2-14": [["sorted", "排序"], ["max/min", "最大/最小"]],
  "l2-15": [["d.get(x,0)", "取值或 0"], ["计数", "d[x]=d.get(x,0)+1"]],
  "l2-16": [["字符串切片", "s[a:b] 取一段"], ["find", "找子串位置"]],
  "l2-17": [["count/index", "数次数/找位置"], ["remove/insert", "删/插"]],
  "l2-18": [["嵌套列表", "列表里套列表"], ["grid[i][j]", "取行列"]],
  "l3-1": [["try/except", "接住错误，程序不崩"], ["异常", "运行时的错误"]],
  "l3-2": [["import math", "引入数学模块"], ["math.sqrt()", "开方"]],
  "l3-3": [["count()", "统计出现次数"]],
  "l3-4": [["返回多值", "return a, b"], ["元组", "返回多个值的结果"]],
  "l3-5": [["类 class", "模板，可造对象"], ["__init__", "初始化属性"], ["self", "对象自己"]],
  "l3-6": [["切片", "li[a:b] 取一段"], ["含头不含尾", "b 取不到"]],
  "l3-7": [["遍历字典", "for k in d / items()"], ["统计", "d.get(k,0)+1"]],
  "l3-8": [["split", "按空格拆单词"], ["统计次数", "count / 字典"]],
  "l3-9": [["__str__", "对象转文字的特殊方法"], ["实例方法", "self 访问属性"]],
  "l3-10": [["open", "打开文件"], ["write/read", "写/读"]],
  "l3-11": [["import random", "引入随机模块"], ["randint", "随机整数"]],
  "l3-12": [["def calc", "传入两个数和运算符"], ["if/elif", "按运算符分流"]],
  "l3-13": [["c_to_f", "摄氏转华氏"], ["公式", "c*9/5+32"]],
  "l3-14": [["data_stats", "返回(最大,最小,和)"], ["max/min/sum", "统计函数"]],
  "l3-15": [["len(s)", "字符数"], ["split/count", "拆词/统计"]],
  "l3-16": [["继承", "子类(父类)"], ["覆盖", "子类重写方法"]],
  "l3-17": [["rps", "判断胜负的函数"], ["规则", "石头>剪刀>布>石头"]],
  "l4-1": [["zip", "按位置配对两个列表"], ["for x,y in zip", "同时遍历"]],
  "l4-2": [["sorted(key=)", "按指定依据排序"], ["key 函数", "len/abs/lambda"]],
  "l4-3": [["all", "全部为真才真"], ["any", "任一为真就真"]],
  "l4-4": [["except 类型", "只接特定错误"], ["ValueError/TypeError", "错误类型"]],
  "l4-5": [["map", "批量加工"], ["lambda", "匿名函数"]],
  "l4-6": [["enumerate", "遍历带下标"], ["for i,x", "下标+值"]],
  "l4-7": [["filter", "筛选"], ["lambda 条件", "匿名条件"]],
  "l4-8": [["词频统计", "d[w]=d.get(w,0)+1"], ["max(d,key=d.get)", "找最多"]]
};
const COURSE_PATTERNS = {
  "l1-7": [
    ["累加求和", "s = 0\nfor i in range(n):\n    s = s + i\nprint(s)", "求和 1..n 的万能套路：先 s=0，每轮把 i 加进 s，最后打印。"],
    ["计数", "c = 0\nfor x in 数据:\n    if 条件:\n        c = c + 1", "统计满足条件的个数：满足一次 c 就 +1。"],
    ["步长遍历", "for i in range(start, end, step):\n    print(i)", "range 第三个参数是步长，隔几个取一个（如隔 2 取偶数）。"]
  ],
  "l1-8": [
    ["累加求和", "s = 0\nn = 1\nwhile n <= 100:\n    s = s + n\n    n = n + 1\nprint(s)", "while 累加：务必在循环里更新 n，靠条件退出，否则死循环。"],
    ["倒计数", "n = 5\nwhile n >= 1:\n    print(n)\n    n = n - 1", "从大到小：n 减到不满足条件就停。"],
    ["直到满足才停", "while 条件:\n    ...\n    更新条件变量", "条件循环：条件成立就继续，改对条件才能退出。"]
  ],
  "l1-4": [
    ["奇偶判断", "if n % 2 == 0:\n    print(\"偶数\")\nelse:\n    print(\"奇数\")", "看 n % 2：余 0 是偶数，否则奇数。"],
    ["区间判断", "if a <= x <= b:\n    ...", "判断 x 是否在 a 到 b 之间。"],
    ["多分支", "if 条件1:\n    ...\nelif 条件2:\n    ...\nelse:\n    ...", "elif 处理多个情况，注意顺序（先判断范围小的）。"]
  ],
  "l1-5": [
    ["双条件(且)", "if a and b:\n    ...", "两个条件都成立才做。"],
    ["多条件(或)", "if a or b:\n    ...", "满足其中一个就做。"],
    ["取反", "if not a:\n    ...", "条件不成立时就做。"]
  ],
  "l1-6": [
    ["多档分级", "if x >= 90:\n    ...\nelif x >= 80:\n    ...\nelse:\n    ...", "从上往下判断，先判最高档。"],
    ["区间判断", "if 60 <= x <= 90:\n    ...", "判断 x 落在某个范围。"],
    ["正负零", "if x > 0:\n    ...\nelif x < 0:\n    ...\nelse:\n    ...", "区分正、负、零。"]
  ],
  "l1-1": [["读入一个数并计算", "n = int(input(\"请输入\"))\nprint(n + 3)", "先读入文字，int() 转整数，再算。"], ["原样输出", "n = input(\"...\")\nprint(n)", "只是读取原样输出，就不用 int()。"]],
  "l1-2": [["读两个数求和", "a = int(input(\"a\"))\nb = int(input(\"b\"))\nprint(a + b)", "两个 input 分别存变量，转整数后做运算。"]],
  "l0-8": [["拼接输出", "name = \"小明\"\nage = 18\nprint(\"我是\" + name + \"，今年\" + str(age) + \"岁\")", "数字拼进句子前，必须 str() 转文字。"]],
  "l0-3": [["字符串重复", "print(\"哈\" * 5)", "用 * 复制多份。"]],
  "l0-7": [["注释说明", "# 这是一行注释\nprint(1)", "# 后面是说明，电脑跳过。"]],
  "l0-2b": [["整除取余", "print(17 // 5, 17 % 5)", "// 求商、% 求余。"], ["奇偶判断", "n % 2 == 0", "余 0 是偶数。"]],
  "l0-2c": [["乘方", "2 ** 10", "2 的 10 次方。"], ["先括号", "(2 + 3) ** 2", "先算括号再乘方。"]],
  "l0-7b": [["缩进块", "if True:\n    print(\"在块里\")\nprint(\"在块外\")", "if 内缩进 4 空格，块外顶格。"], ["对齐", "同一层代码缩进一致", "表示同一个块。"]],
  "l2-1": [["转大写", "s.upper()", "把字符串转大写。"], ["去空格", "s.strip()", "去除首尾空格。"], ["替换文字", "s.replace(旧,新)", "把旧换成新。"]],
  "l2-2": [["取第1个", "li[0]", "下标从 0 开始。"], ["数长度", "len(li)", "列表元素个数。"]],
  "l2-3": [["加元素", "li.append(x)", "末尾加一个。"], ["改元素", "li[i] = x", "改第 i 个。"]],
  "l2-4": [["按键取值", "d[\"键\"]", "用键取对应值。"]],
  "l2-5": [["定义并调用", "def f(a,b):\n    return a+b\nprint(f(3,4))", "def 定义，return 返回，名字() 调用。"]],
  "l2-6": [["遍历并处理", "for x in [1,2,3]:\n    print(x * 2)", "遍历列表，逐个处理。"]],
  "l2-7": [["建元组并取值", "t = (1,2,3)\nprint(t[1])", "元组不可改，下标从 0 开始。"]],
  "l2-8": [["判断包含", "子串 in 字符串", "返回 True/False。"], ["按符号拆", "s.split(\",\")", "把字符串按逗号拆成列表。"]],
  "l2-9": [["批量加工", "[x * 2 for x in [1,2,3]]", "一行生成新列表。"], ["条件过滤", "[x for x in 列表 if 条件]", "只留下满足条件的。"]],
  "l2-10": [["列表求和", "def sum_list(li):\n    s = 0\n    for x in li:\n        s = s + x\n    return s", "函数+循环+列表 综合。"]],
  "l2-11": [["f-string 插值", "f\"我的名字是{name}\"", "{} 里填变量，自动替换。"], ["f-string 算结果", "f\"{a}+{b}={a+b}\"", "{} 里还能直接算。"], ["去重", "set([3,1,3,2])", "集合自动去重。"]],
  "l2-12": [["集合去重", "s = {1,1,2}\nprint(len(s))", "重复只留一个，len 数个数。"]],
  "l2-13": [["join 连接", "\" \".join([\"a\",\"b\"])", "用分隔符连列表元素。"]],
  "l2-14": [["排序取第n个", "sorted(li)[1]", "排序后取下标。"], ["最大/最小", "max(li) / min(li)", "取最值。"]],
  "l2-15": [["字典计数", "d[x] = d.get(x, 0) + 1", "统计每个出现次数。"], ["找出现最多", "max(d, key=d.get)", "找次数最多的键。"]],
  "l2-16": [["切文字", "s[1:4]", "取下标 1~3。"], ["找位置", "s.find(\"子\")", "返回子串位置。"]],
  "l2-17": [["数次数/找位置", "li.count(2) / li.index(20)", "次数与位置。"], ["插入", "li.insert(1, 9)", "位置插入。"]],
  "l2-18": [["二维取值", "grid[1][0]", "第 2 行第 1 列。"], ["遍历二维", "for row in grid:\n    for x in row:\n        print(x)", "嵌套遍历。"]],
  "l3-1": [["接住错误", "try:\n    ...\nexcept:\n    ...", "出错走 except，程序不崩。"]],
  "l3-2": [["用数学函数", "import math\nprint(math.sqrt(16))", "import 后 math.函数 调用。"]],
  "l3-3": [["统计次数", "li.count(\"a\")", "统计元素出现次数。"]],
  "l3-4": [["返回多个", "def m(li):\n    return min(li), max(li)", "return 逗号隔开返回多个。"]],
  "l3-5": [["定义并使用类", "class P:\n    def __init__(self, n):\n        self.n = n\n    def g(self):\n        return self.n\nprint(P(\"hi\").g())", "class + __init__ + 方法 + 实例化。"]],
  "l3-6": [["切一段", "li[1:4]", "取下标 1~3。"], ["前3个/后2个", "li[:3] / li[-2:]", "省略一头即从头/到结尾。"]],
  "l3-7": [["遍历取值", "for k, v in d.items():\n    print(k, v)", "键值对一起遍历。"]],
  "l3-8": [["统计单词", "s.split().count(\"a\")", "拆列表后统计。"], ["字典词频", "d[w] = d.get(w, 0) + 1", "统计每个词次数。"]],
  "l3-9": [["自定义打印", "class P:\n    def __str__(self):\n        return \"P\"\nprint(P())", "print 对象调 __str__。"]],
  "l3-10": [["写后读", "open(\"a\",\"w\").write(\"hi\")\nprint(open(\"a\").read())", "open 写再读。"]],
  "l3-11": [["取固定随机", "random.randint(1,1)", "范围相同结果唯一。"], ["随机取一个", "random.choice([7,7,7])", "相同元素恒为 7。"]],
  "l3-12": [["四则计算器", "def calc(a, op, b):\n    if op == \"+\":\n        return a + b\n    # ...\nprint(calc(5,\"*\",4))", "函数+if/elif 做计算器。"]],
  "l3-13": [["温度转换", "def c_to_f(c):\n    return c * 9 / 5 + 32\nprint(c_to_f(20))", "函数封装换算公式。"]],
  "l3-14": [["统计一组数据", "def data_stats(li):\n    return max(li), min(li), sum(li)\nprint(data_stats([3,1,2]))", "函数返回多个统计值。"]],
  "l3-15": [["文本统计", "print(len(s))\nprint(len(s.split()))", "字符数与单词数。"]],
  "l3-16": [["继承复用", "class Animal:\n    def speak(self):\n        return \"叫\"\nclass Dog(Animal):\n    pass\nprint(Dog().speak())", "子类继承父类方法。"], ["覆盖", "class Dog(Animal):\n    def speak(self):\n        return \"汪\"", "子类重写方法。"]],
  "l3-17": [["判断胜负", "def rps(me, you):\n    if me == you:\n        return \"平\"\n    # ...\nprint(rps(\"石头\", \"剪刀\"))", "函数+条件判断。"]],
  "l4-1": [["配对遍历", "for n, v in zip(names, values):\n    print(n, v)", "按位置配对。"]],
  "l4-2": [["按长度排序", "sorted(words, key=len)", "指定依据排序。"]],
  "l4-3": [["全部达标", "all(x > 0 for x in li)", "全部成立。"], ["有人达标", "any(x < 0 for x in li)", "任一成立。"]],
  "l4-4": [["接值错误", "try:\n    int(\"abc\")\nexcept ValueError:\n    print(\"非法\")", "接特定错误。"]],
  "l4-5": [["批量平方", "list(map(lambda x: x*x, [1,2,3]))", "map+lambda 加工。"]],
  "l4-6": [["带编号遍历", "for i, x in enumerate(li):\n    print(i, x)", "enumerate 带下标。"]],
  "l4-7": [["筛偶数", "list(filter(lambda x: x%2==0, [1,2,3,4]))", "filter 筛选。"]],
  "l4-8": [["词频榜", "d = {}\nfor w in s.split():\n    d[w] = d.get(w, 0) + 1\nprint(max(d, key=d.get))", "字典统计+找最多。"]]
};
function levelLabel(c) {
  const i = COURSES.indexOf(c) + 1;
  const rest = String(c.eyebrow || "本关").replace(/^第\s*\d+\s*关\s*·\s*/, "");
  return "第 " + i + " 关 · " + rest;
}
function renderLesson() {
  const c = COURSES[currentIdx];
  $("lesson-eyebrow").textContent = levelLabel(c);
  $("lesson-title").textContent = c.title;
  $("lesson-subtitle").textContent = c.subtitle;
  $("analogy-title").textContent = c.analogyTitle;
  $("analogy-body").textContent = c.analogyBody;
  $("task-title").textContent = "本关任务";
  $("task-text").textContent = c.task;

  $("concept-list").innerHTML = c.concepts.map((x) =>
    '<div class="concept"><span class="term">' + escapeHtml(x.term) + '</span><span class="desc">' + escapeHtml(x.desc) + '</span></div>'
  ).join("");
  const terms = COURSE_TERMS[c.id]; const tl = $("term-list");
  if (tl) tl.innerHTML = terms ? terms.map(t => '<div class="concept"><span class="term">' + escapeHtml(t[0]) + '</span><span class="desc">' + escapeHtml(t[1]) + '</span></div>').join("") : "";
  const lb = $("lecture-box");
  if (lb) lb.innerHTML = COURSE_LECTURES[c.id] || "";
  const patterns = COURSE_PATTERNS[c.id]; const pl = $("pattern-list");
  if (pl) pl.innerHTML = patterns ? patterns.map(p => '<div class="pattern-card"><div class="pattern-title">' + escapeHtml(p[0]) + '</div><pre class="pattern-code">' + escapeHtml(p[1]) + '</pre><div class="pattern-desc">' + escapeHtml(p[2]) + '</div></div>').join("") : "";

  $("example-list").innerHTML = c.examples.map((ex) =>
    '<details><summary>' + escapeHtml(ex.title) + '</summary>' +
    '<div class="accordion-body">' +
    '<pre class="result-out">' + escapeHtml(ex.code) + '</pre>' +
    '<div class="lvl-status" style="margin-top:8px;">输出 → ' + escapeHtml(ex.output) + '</div>' +
    '</div></details>'
  ).join("");

  $("code-input").value = c.initialCode;
  $("hint-btn").textContent = "查看提示";
  target = { label: "本关任务", expected: c.expected, isMain: true, hints: c.hints, requireCode: c.requireCode, requireMsg: c.requireMsg, inputs: c.inputs };
  $("editor-status").textContent = "本关任务 · 输出会显示在下方";
  renderExercises();
  syncEditor();
}

// ===== 课后巩固渲染 =====
function renderExercises() {
  const c = COURSES[currentIdx];
  const list = $("practice-list");
  if (!list) return;
  const colors = {
    "热身": { bg: "var(--accent-soft)", color: "var(--accent-ink)" },
    "巩固": { bg: "var(--gold-soft)", color: "var(--gold-deep)" },
    "挑战": { bg: "var(--danger-soft)", color: "var(--danger-deep)" }
  };
  list.innerHTML = c.exercises.map((ex, i) => {
    const col = colors[ex.tier] || colors["热身"];
    return '<div class="practice-item" data-idx="' + i + '">' +
      '<span class="p-tier" style="background:' + col.bg + ';color:' + col.color + ';">' + ex.tier + '</span>' +
      '<span class="p-text">' + escapeHtml(ex.task) + '</span>' +
      '<span class="p-go">练习 →</span>' +
    '</div>';
  }).join("");
  list.querySelectorAll(".practice-item").forEach((el) => {
    el.addEventListener("click", () => {
      openPractice();
    });
  });
}

// ===== 课后巩固 · 全屏练习模式 =====
const PV_XP = { "jrex": 30, "gonggu": 50, "tiaozhan": 80 };
const PV_LBL = { "jrex": "热身", "gonggu": "巩固", "tiaozhan": "挑战" };
let pvKey = "jrex";
let pvCombo = 0;
let pvSolved = {};
let pvTarget = null;
let pvHintLevel = 0;

function openPractice() {
  const c = COURSES[currentIdx];
  $("view-practice").hidden = false;
  $("view-lesson").hidden = true;
  $("pv-chapter").textContent = levelLabel(c);
  pvCombo = 0; pvSolved = {}; window.chestOpened = false;
  setPracticeLevel("jrex");
  window.scrollTo(0, 0);
}
function closePractice() {
  $("view-practice").hidden = true;
  $("view-lesson").hidden = false;
  if (window.pendingReward) showReward(window.pendingReward);
}
const EXERCISE_EXPLAIN = {
  "l0-1:jrex": "用 print() 把文字显示出来。文字必须包在英文引号里：先写 print，再写括号，括号里放文字。",
  "l0-1:gonggu": "print 括号里可以直接放算式，Python 会先算出结果再显示。把 1+2 放进 print。",
  "l0-1:tiaozhan": "用 + 把两段文字拼成一句。注意每段文字都要加英文引号，中间用 + 连接。",
  "l0-2:jrex": "% 是取余（求除完剩下的数）。98 % 3 就是看 98 除以 3 余几，把它放进 print。",
  "l0-2:gonggu": "用 / 做除法、// 做整除去小数、% 取余。先看清楚题目要哪种结果，再选对应符号。",
  "l0-2:tiaozhan": "混合运算先算括号里的再算外面。确认运算顺序后放进 print。",
  "l0-3:jrex": "字符串拼接用 +。把两段文字都加引号，中间用 + 连起来。",
  "l0-3:gonggu": "字符串重复用 *。print('哈' * 5) 会打印 5 个「哈」。",
  "l0-3:tiaozhan": "先看题目是先重复再拼接还是先拼接再重复，按顺序来。",
  "l0-4:jrex": "变量 = 值。先写变量名，再写 =，再写要存的值；存完用 print 输出。",
  "l0-4:gonggu": "变量可以重新赋值，第二次赋值会替换第一次的值，print 输出的是最后赋的值。",
  "l0-4:tiaozhan": "用多个变量分别存值，再拼接输出。数字与文字拼接时要 str() 转一下。",
  "l0-5:jrex": "type() 能看类型。把想看的变量或值放进 type()，再用 print 输出。",
  "l0-5:gonggu": "数字直接写（int/float），文字要加引号（str）。看有没有引号区分类型。",
  "l0-5:tiaozhan": "布尔值是 True/False，比较运算的结果就是布尔值，可用 print 输出。",
  "l0-6:jrex": "int() 把文字转整数。int(字符串) 得到一个整数，放进 print 输出。",
  "l0-6:gonggu": "str() 把数字转文字。str(数字) 得到字符串，才能和文字拼接。",
  "l0-6:tiaozhan": "float() 把文字转小数。注意转出来是带小数点的浮点数。",
  "l0-7:jrex": "# 后面是注释。在 print 后面加 # 和说明，print 仍然会执行。",
  "l0-7:gonggu": "注释不会被运行。把要跳过的一行开头加 #，它就不会执行。",
  "l0-7:tiaozhan": "给代码加有意义的注释，帮助自己和别人看懂。用 # 开头写说明。",
  "l0-8:jrex": "建变量存 name 和 age，再用 + 拼接。年龄是数字，拼之前要 str() 转文字。",
  "l0-8:gonggu": "拼接多段文字时，每段都加引号、数字转文字，用 + 连接成完整句子。",
  "l0-8:tiaozhan": "综合用「变量 + 字符串拼接 + 类型转换」，一步步拼出完整句子。",
  "l1-3:jrex": "比较 3>2 结果是 True。用 print 输出比较表达式即可。",
  "l1-3:gonggu": "判断「等于」用 ==（两个等号）。5==5 是 True，放进 print。",
  "l1-3:tiaozhan": "判断奇偶看 n % 2：余 0 是偶数。print(n%2==0) 会输出布尔值。",
  "l1-4:jrex": "if 后面跟条件，成立就执行缩进的代码。n>0 成立就打印「正」。",
  "l1-4:gonggu": "if/else 双分支：条件成立走 if，否则走 else。注意冒号和缩进。",
  "l1-4:tiaozhan": "score>=60 打印「及格」，否则「不及格」。用 if/else，别忘冒号与缩进。",
  "l1-7:jrex": "for i in range(4) 让 i 依次取 0,1,2,3，每轮打印一次 i。",
  "l1-7:gonggu": "range(2,11,2) 会生成 2,4,6,8,10；循环变量依次取值打印。",
  "l1-7:tiaozhan": "累加用 s=s+i：先 s=0，循环里累加，循环结束后打印 s。",
  "l1-8:jrex": "while n<=5 成立就一直打印 n 并让 n 加 1；n 从 1 开始。",
  "l1-8:gonggu": "倒着数：n=5，while n>=1 就打印 n 然后 n=n-1。",
  "l1-8:tiaozhan": "while 累加：n 从 1 到 100，循环里 s=s+n 且 n=n+1，最后打印 s。"
};
function pvExplainHTML(c, key) {
  const ex = c.exercises.find(e => e.tier === PV_LBL[key]) || c.exercises[0];
  const note = EXERCISE_EXPLAIN[c.id + ":" + key] || ex.hint || "本题先看清要输出什么，运行得到期望输出即可。";
  const refCode = formatCode(ex.answer || ex.hint || "（暂无参考代码）");
  return '<b>【思路】</b>' + escapeHtml(note) +
    '<br><b>【答案参考】</b><br><code>' + escapeHtml(refCode) + '</code>' +
    '<br><b>【期望输出】</b><br><code>' + escapeHtml(ex.expected) + '</code>';
}
function setPracticeLevel(key) {
  pvKey = key;
  document.querySelectorAll(".pv-lvl").forEach(b => b.classList.toggle("is-active", b.dataset.lvl === key));
  const c = COURSES[currentIdx];
  const ex = c.exercises.find(e => e.tier === PV_LBL[key]) || c.exercises[0];
  $("pv-lvl-tag").textContent = PV_LBL[key];
  $("pv-task-text").textContent = ex.task;
  $("pv-code-input").value = ex.initialCode;
  pvTarget = { label: "课后·" + PV_LBL[key], expected: ex.expected, isMain: false, hints: [ex.hint], requireCode: ex.requireCode, requireMsg: ex.requireMsg, inputs: ex.inputs };
  pvHintLevel = 0;
  $("pv-hint-block").hidden = true; $("pv-hint-btn").textContent = "查看提示";
  const eb = $("pv-explain-block"); if (eb) { eb.hidden = true; eb.innerHTML = ""; }
  const ebtn = $("pv-explain-btn"); if (ebtn) ebtn.textContent = "查看答案精讲";
  $("pv-result").hidden = true; $("pv-modal").hidden = true; $("pv-status").textContent = "输出会显示在下方";
  pvSyncEditor();
  updatePvCombo();
}
function pvSyncEditor() {
  const ta = $("pv-code-input"), hl = $("pv-code-hl"), gutter = $("pv-code-gutter");
  const lines = ta.value.split("\n").length;
  gutter.textContent = Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  hl.innerHTML = highlight(ta.value);
  gutter.scrollTop = hl.scrollTop = ta.scrollTop;
  hl.scrollLeft = ta.scrollLeft;
}
function updatePvCombo() {
  $("pv-combo").textContent = "×" + pvCombo;
  $("pv-combo-fill").style.width = Math.min(100, pvCombo * 25) + "%";
  const done = Object.keys(pvSolved).length;
  $("pv-note").textContent = done >= 3 ? "🎉 三档全对！隐藏奖励已解锁" : ("三档全部答对，解锁隐藏奖励（已答对 " + done + " / 3）");
}
async function pvRun() {
  const code = $("pv-code-input").value;
  if (!code.trim()) { toast("先写点代码再运行吧"); return; }
  const mySeq = ++pvRunSeq;
  $("pv-status").textContent = pyodide ? "运行中…" : "首次运行要下载 Python 环境（十几秒），请稍等…";
  let out = "";
  const outBytes = [];
  try {
    const py = await getPyodide();
    if (mySeq !== pvRunSeq) return;
    collectOutput(py, outBytes);
    await py.runPythonAsync(prepInput(code, pvTarget.inputs || []));
    if (mySeq !== pvRunSeq) return;
    out = decodeOutput(outBytes);
    const got = normOut(out);
    const want = normOut(pvTarget.expected || "");
    const outOk = normPunct(got) === normPunct(want);
    let codeOk = true;
    if (pvTarget.requireCode) codeOk = new RegExp(pvTarget.requireCode, "m").test(code);
    if (outOk && !codeOk) { pvShowError(pvTarget.requireMsg || "输出对了，但题目要求用特定的写法，请按题目要求改写。"); markStaleIfChanged(code, "pv-result", "pv-result-chip", "pv-code-input"); }
    else if (outOk && codeOk) pvPass();
    else { pvFail(got, want); markStaleIfChanged(code, "pv-result", "pv-result-chip", "pv-code-input"); }
  } catch (e) {
    if (mySeq !== pvRunSeq) return;
    pvFail("", ""); pvShowError(friendlyError(e.message, code));
    markStaleIfChanged(code, "pv-result", "pv-result-chip", "pv-code-input");
  } finally {
    if (mySeq === pvRunSeq) $("pv-status").textContent = "输出会显示在下方";
  }
}
function pvPass() {
  pvCombo++;
  const base = Math.round((PV_XP[pvKey] || 30) * 1.1);  // 练习额外 +10%
  const bonus = pvCombo >= 2 ? Math.min(40, (pvCombo - 1) * 15) : 0;
  state.xp += base + bonus;
  state.streak += 1;
  state.maxStreak = Math.max(state.maxStreak || 0, state.streak);
  save();
  pvSolved[pvKey] = true;
  updatePvCombo();
  $("xp-text").textContent = state.xp + " XP";
  $("streak-text").textContent = "连击 ×" + state.streak;
  $("pv-modal-mascot").textContent = "🎉";
  $("pv-modal-sub").textContent = PV_LBL[pvKey] + " · 完成！";
  $("pv-reward").textContent = "+" + (base + bonus) + " XP";
  const pa = $("pv-answer");
  if (pa) {
    const exA = (COURSES[currentIdx].exercises || []).find(e => e.tier === PV_LBL[pvKey]) || COURSES[currentIdx].exercises[0];
    pa.innerHTML = '<b>参考答案</b><pre>' + escapeHtml(formatCode(exA ? (exA.answer || exA.hint || "") : "")) + '</pre><div class="pv-ans-out">期望输出：<code>' + escapeHtml(exA && exA.expected ? exA.expected : "") + '</code></div>';
    pa.hidden = false;
  }
  if (bonus > 0) { $("pv-bonus").hidden = false; $("pv-bonus").querySelector("span").textContent = "🎁 连击补偿 +" + bonus + " XP"; }
  else { $("pv-bonus").hidden = true; }
  const done = Object.keys(pvSolved).length;
  $("pv-next").textContent = done >= 3 ? "完成收官 ✅" : "下一难度 →";
  $("pv-modal").hidden = false;
  if (done >= 3 && !window.chestOpened) { window.chestOpened = true; }
}
function pvFail(got, want) {
  pvCombo = 0; updatePvCombo();
  $("pv-result").hidden = false;
  $("pv-result").classList.remove("is-stale");
  $("pv-result-title").textContent = "运行结果";
  $("pv-result-chip").innerHTML = '<span class="chip chip-fail">✗ 还差一点</span>';
  $("pv-result-body").innerHTML = '<div class="diff"><div class="diff-box got"><b>你的输出 · ' + lineCount(got) + ' 行</b><code>' + visWs(got) + '</code></div><div class="diff-box want"><b>期望输出 · ' + lineCount(want) + ' 行</b><code>' + visWs(want) + '</code></div></div>' + (wsOnlyDiff(got, want) ? '<p class="diff-note">两边文字一样，差别只在看不见的空白上（用 <b>·</b> 标出）。</p>' : '');
}
function pvShowError(msg) {
  $("pv-result").hidden = false;
  $("pv-result").classList.remove("is-stale");
  $("pv-result-title").textContent = "出错了";
  $("pv-result-chip").innerHTML = '<span class="chip chip-fail">✗ 运行失败</span>';
  $("pv-result-body").innerHTML = '<p class="err-msg">' + escapeHtml(msg) + '</p>';
}
function pvNext() {
  const order = ["jrex", "gonggu", "tiaozhan"];
  const idx = order.indexOf(pvKey);
  if (idx < order.length - 1) { setPracticeLevel(order[idx + 1]); }
  else { $("pv-modal").hidden = true; if (window.chestOpened) openChest(); else { toast("三档全对，优秀！"); closePractice(); } }
}

// ===== 运行与判题 =====
async function run() {
  const c = COURSES[currentIdx];
  const code = $("code-input").value;
  if (!code.trim()) { toast("先写点代码再运行吧"); return; }
  const mySeq = ++runSeq;            // 本次运行编号；若有更新的运行，本次结果作废
  state.runs = (state.runs || 0) + 1; save();
  $("editor-status").textContent = pyodide ? "运行中…" : "首次运行要下载 Python 环境（十几秒），请稍等…";
  $("run-btn").disabled = true;

  let out = "";
  const outBytes = [];
  try {
    const py = await getPyodide();
    if (mySeq !== runSeq) return;    // 加载 Pyodide 期间用户又跑了一次
    collectOutput(py, outBytes);
    await py.runPythonAsync(prepInput(code, target.inputs || []));
    if (mySeq !== runSeq) return;    // 输出已经被更新的一次运行取代，别用旧结果覆盖
    out = decodeOutput(outBytes);
    const got = normOut(out);
    const want = normOut(target.expected || "");
    const outOk = normPunct(got) === normPunct(want);
    let codeOk = true;
    if (target.requireCode) codeOk = new RegExp(target.requireCode, "m").test(code);
    if (outOk && !codeOk) {
      showError(target.requireMsg || "输出对了，但题目要求用特定的写法。请按题目要求改写代码。");
      markStaleIfChanged(code, "result-panel", "result-chip", "code-input");
      attempts++; resetStreak(); state.errors = (state.errors || 0) + 1; save();
    } else {
      const ok = outOk && codeOk;
      showPass(got, want, ok);
      markStaleIfChanged(code, "result-panel", "result-chip", "code-input");
      if (ok) {
        if (target.isMain) onPass();
        else toast("练习通过！继续下一题吧");
      } else {
        attempts++;
        resetStreak();
        state.errors = (state.errors || 0) + 1; save();
      }
    }
  } catch (e) {
    if (mySeq !== runSeq) return;    // 旧运行的报错不要覆盖新结果
    showError(friendlyError(e.message, code));
    markStaleIfChanged(code, "result-panel", "result-chip", "code-input");
    attempts++;
    resetStreak();
    state.errors = (state.errors || 0) + 1; save();
  } finally {
    if (mySeq === runSeq) {
      $("run-btn").disabled = false;
      $("editor-status").textContent = "输出会显示在下方";
    }
  }
}

// 代码一改，上一次的运行结果就不再对应当前代码了。
// 不标记的话，学生看到的会是「旧输出」却以为是这次的，白白怀疑判题。
function markStale(panelId, chipId) {
  const panel = $(panelId);
  if (!panel || panel.hidden) return;
  panel.classList.add("is-stale");
  const chip = $(chipId);
  if (chip) chip.innerHTML = '<span class="chip chip-stale">代码已改 · 请重新运行</span>';
}
function markResultStale() { markStale("result-panel", "result-chip"); }
function markPvStale() { markStale("pv-result", "pv-result-chip"); }

// 关键补漏：运行期间用户改了代码（比如首次加载 Python 环境要等十几秒，学生等不及就先改代码），
// 结果出来时面板是「刚显示」的、之前那几次 markStale 全因为面板还隐藏而跳过了。
// 所以结果一显示出来，就比对「运行时的代码」和「现在的代码」，不一致立刻标为过期。
function markStaleIfChanged(snapshot, panelId, chipId, inputId) {
  const el = $(inputId);
  if (el && el.value !== snapshot) markStale(panelId, chipId);
}

function showPass(got, want, ok) {
  const panel = $("result-panel");
  panel.hidden = false;
  panel.classList.remove("is-stale");
  $("result-title").textContent = "运行结果";
  $("result-chip").innerHTML = ok
    ? '<span class="chip chip-pass">✓ 过关</span>'
    : '<span class="chip chip-fail">✗ 还差一点</span>';
  $("result-body").innerHTML = ok
    ? '<pre class="result-out">' + escapeHtml(got) + '</pre>'
    : '<div class="diff">' +
        '<div class="diff-box got"><b>你的输出 · ' + lineCount(got) + ' 行</b><code>' + visWs(got) + '</code></div>' +
        '<div class="diff-box want"><b>期望输出 · ' + lineCount(want) + ' 行</b><code>' + visWs(want) + '</code></div>' +
      '</div>' +
      (wsOnlyDiff(got, want) ? '<p class="diff-note">两边的文字其实一样，差别只在看不见的空白上（下面用 <b>·</b> 标出来了）：检查一下空行数量，或引号里是不是多敲/少敲了空格。</p>' : '');
}

function showError(msg) {
  const panel = $("result-panel");
  panel.hidden = false;
  panel.classList.remove("is-stale");
  $("result-title").textContent = "出错了";
  $("result-chip").innerHTML = '<span class="chip chip-fail">✗ 运行失败</span>';
  $("result-body").innerHTML = '<p class="err-msg">' + escapeHtml(msg) + '</p>';
}

function resetStreak() {
  if (state.streak >= 5) { state.streak = Math.max(1, state.streak - 1); }  // 连击护盾：≥5 时答错只缓减、不清零
  else { state.streak = 0; }
  save();
  $("streak-text").textContent = "连击 ×" + state.streak;
}

// ===== 通关 =====
function onPass() {
  const c = COURSES[currentIdx];
  const stars = computeStars();
  const mult = stars === 3 ? 2.0 : stars === 2 ? 1.2 : 0.6;
  const xp = Math.round(50 * mult);
  const isFirst = !state.done[c.id];
  state.done[c.id] = true;
  state.stars[c.id] = Math.max(state.stars[c.id] || 0, stars);
  state.xp += xp;
  state.streak += 1;
  state.maxStreak = Math.max(state.maxStreak || 0, state.streak);
  save();
  $("streak-text").textContent = "连击 ×" + state.streak;
  window.pendingReward = { stars, xp, isFirst };
  showPassChoice();
}
function showPassChoice() {
  if (!window.pendingReward) return;
  $("pv-choice-xp").textContent = "+" + window.pendingReward.xp + " XP";
  const el = $("pv-choice");
  el.hidden = false;
  el.style.display = "grid";
  el.style.zIndex = "75";
}
function showReward(rew) {
  $("badge-num").textContent = currentIdx + 1;
  $("modal-sub").textContent = rew.isFirst ? "皮皮为你骄傲，下一关已解锁。" : "再次通关，刷新了本关成绩！";
  $("reward-xp").textContent = "+" + rew.xp;
  $("reward-streak").textContent = "×" + state.streak;
  $("reward-stars").textContent = rew.stars + " 星";
  $("modal-stars").innerHTML = Array.from({ length: 3 }, (_, i) => '<svg viewBox="0 0 24 24" fill="' + (i < rew.stars ? "var(--gold)" : "var(--border-strong)") + '"><path d="M12 2l2.6 6.2 6.7.5-5.1 4.4 1.6 6.5L12 16l-5.8 3.6 1.6-6.5-5.1-4.4 6.7-.5z"/></svg>').join("");
  window.pendingReward = null;
  $("pass-modal").hidden = false;
}

function computeStars() {
  if (hintLevel >= 3) return 1;               // 看了答案
  if (hintLevel > 0 || attempts > 2) return 2; // 用了提示或尝试 3 次以上
  return 3;
}

// ===== 提示 =====
function showHint() {
  const hints = (target && target.hints) || [];
  const block = $("hint-block");
  block.hidden = false;
  if (hintLevel < hints.length) {
    hintLevel++;
    block.textContent = "提示 " + hintLevel + "/" + hints.length + "：" + hints[hintLevel - 1];
    $("hint-btn").textContent = hintLevel >= hints.length ? "已显示全部提示" : "再看提示";
  }
}

// ===== 事件绑定 =====
function bind() {
  $("hero-cta").addEventListener("click", () => {
    const done = Object.keys(state.done).length;
    showLesson(Math.min(done, COURSES.length - 1));
  });
  document.querySelectorAll("[data-goto='home']").forEach((el) =>
    el.addEventListener("click", (e) => { e.preventDefault(); showHome(); })
  );
  $("back-btn").addEventListener("click", showHome);
  $("modal-home").addEventListener("click", () => { $("pass-modal").hidden = true; showHome(); });
  $("modal-close").addEventListener("click", () => { $("pass-modal").hidden = true; });
  $("modal-next").addEventListener("click", () => {
    $("pass-modal").hidden = true;
    if (currentIdx + 1 < COURSES.length) showLesson(currentIdx + 1);
    else showHome();
  });
  $("run-btn").addEventListener("click", run);
  $("reset-btn").addEventListener("click", () => {
    $("code-input").value = COURSES[currentIdx].initialCode;
    syncEditor();
    markResultStale();
  });
  $("hint-btn").addEventListener("click", showHint);
  $("code-input").addEventListener("input", () => { syncEditor(); markResultStale(); });
  $("code-input").addEventListener("scroll", syncEditor);
  $("code-input").addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.target, s = ta.selectionStart, en = ta.selectionEnd;
      ta.value = ta.value.slice(0, s) + "    " + ta.value.slice(en);
      ta.selectionStart = ta.selectionEnd = s + 4;
      syncEditor();
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
  });

  // 课后巩固·练习模式事件
  $("pv-close").addEventListener("click", closePractice);
  $("pv-go-practice").addEventListener("click", () => { $("pv-choice").hidden = true; openPractice(); });
  $("pv-skip").addEventListener("click", () => { $("pv-choice").hidden = true; showReward(window.pendingReward); });
  $("chest-claim").addEventListener("click", () => { $("chest-modal").hidden = true; closePractice(); });
  document.querySelectorAll(".pv-lvl").forEach(b => b.addEventListener("click", () => setPracticeLevel(b.dataset.lvl)));
  $("pv-run-btn").addEventListener("click", pvRun);
  $("pv-reset-btn").addEventListener("click", () => { const ex = COURSES[currentIdx].exercises.find(e => e.tier === PV_LBL[pvKey]); $("pv-code-input").value = ex ? ex.initialCode : ""; pvSyncEditor(); markPvStale(); });
  const pvExplainBtn = $("pv-explain-btn");
  if (pvExplainBtn) pvExplainBtn.addEventListener("click", () => {
    const eb = $("pv-explain-block"); if (!eb) return;
    if (eb.hidden) {
      try { eb.innerHTML = pvExplainHTML(COURSES[currentIdx], pvKey); }
      catch (err) { eb.textContent = "（讲解加载失败：" + err.message + "）"; }
      eb.hidden = false; pvExplainBtn.textContent = "收起讲解";
    } else { eb.hidden = true; pvExplainBtn.textContent = "查看答案精讲"; }
  });
  $("pv-hint-btn").addEventListener("click", () => {
    const hints = (pvTarget && pvTarget.hints) || [];
    const block = $("pv-hint-block"); block.hidden = false;
    if (pvHintLevel < hints.length) { pvHintLevel++; block.textContent = "提示 " + pvHintLevel + "：" + hints[pvHintLevel - 1]; $("pv-hint-btn").textContent = pvHintLevel >= hints.length ? "已显示全部" : "再看提示"; }
  });
  $("pv-next").addEventListener("click", pvNext);
  $("pv-stay").addEventListener("click", () => { $("pv-modal").hidden = true; const ex = COURSES[currentIdx].exercises.find(e => e.tier === PV_LBL[pvKey]); $("pv-code-input").value = ex ? ex.initialCode : ""; pvSyncEditor(); markPvStale(); });
  $("pv-code-input").addEventListener("input", () => { pvSyncEditor(); markPvStale(); });
  $("pv-code-input").addEventListener("scroll", pvSyncEditor);
  $("pv-code-input").addEventListener("keydown", (e) => {
    if (e.key === "Tab") { e.preventDefault(); const t = e.target, s = t.selectionStart, en = t.selectionEnd; t.value = t.value.slice(0, s) + "    " + t.value.slice(en); t.selectionStart = t.selectionEnd = s + 4; pvSyncEditor(); }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); pvRun(); }
  });

  enableMapDrag();
}

// ===== 通用动效 =====
function playViewIn(el) {
  if (!el) return;
  el.classList.remove("view-in");
  void el.offsetWidth;                 // 强制重排，让动画可以重放
  el.classList.add("view-in");
}
function stagger(sel, step) {
  const els = document.querySelectorAll(sel);
  for (let i = 0; i < els.length; i++) els[i].style.animationDelay = (i * (step || 0.05)) + "s";
}
function staggerLesson() {
  stagger("#view-lesson .concept, #view-lesson .example, #view-lesson .lecture, #view-lesson .pattern-card, #view-lesson .card", 0.045);
}
function initRipple() {
  document.addEventListener("pointerdown", function (e) {
    const t = e.target && e.target.closest ? e.target.closest(".btn, .pv-lvl, .chapter-pill") : null;
    if (!t || t.disabled) return;
    const r = t.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 1.1;
    const s = document.createElement("span");
    s.className = "ripple";
    s.style.width = s.style.height = size + "px";
    s.style.left = (e.clientX - r.left - size / 2) + "px";
    s.style.top = (e.clientY - r.top - size / 2) + "px";
    t.appendChild(s);
    setTimeout(() => { if (s.parentNode) s.parentNode.removeChild(s); }, 660);
  }, { passive: true });
}
// 数值变化时自动加一个「滚动强调」动画（不用改各处赋值代码）
function watchRoll(ids) {
  ids.forEach(function (id) {
    const el = $(id); if (!el) return;
    let last = el.textContent;
    new MutationObserver(function () {
      if (el.textContent === last) return;
      last = el.textContent;
      el.classList.remove("num-roll");
      void el.offsetWidth;
      el.classList.add("num-roll");
    }).observe(el, { childList: true, characterData: true, subtree: true });
  });
}
function initChrome() {
  watchRoll(["xp-text", "streak-text", "hero-done", "hero-stars"]);
  // 顶栏「吸顶」状态
  const tb = document.querySelector(".topbar");
  if (tb) {
    const onScroll = () => tb.classList.toggle("is-scrolled", window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  // 窗口控件
  const wc = $("win-ctrl");
  if (wc) wc.addEventListener("click", function (e) {
    const b = e.target.closest ? e.target.closest(".wc") : null;
    if (!b) return;
    const act = b.dataset.win;
    if (act === "max") {
      document.body.classList.toggle("zen");
      toast(document.body.classList.contains("zen") ? "已最大化铺满屏幕" : "已还原为窗口");
    } else if (act === "min") {
      document.body.classList.add("win-min");
      setTimeout(() => document.body.classList.remove("win-min"), 640);
    } else {
      toast("代码大陆没有退出键，只有变强 ✨");
    }
  });
}

// ===== 进度同步（进度码）=========================================
// 进度只存在本机浏览器里（localStorage）。这里把整个进度压成一串短码，
// 方便在设备之间搬运：二进制打包 → Base32(Crockford) → 带版本号的短码。
// 码里带「关卡数量 + 关卡列表指纹」：万一以后增删关卡，导入会明确报错，
// 而不是把通关记录错位映射到别的关卡上。
const PROG_VER = 1;
const B32 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";   // 去掉 I L O U，避免看错
function progIdHash() {
  // 指纹覆盖「关卡列表 + 徽章定义 + 头像框定义」：任何一项变了，
  // 旧进度码都会被明确拒绝，而不是悄悄错位。
  const s = COURSES.map(c => c.id).join("|")
    + "#" + Object.keys(BADGE_DEFS).join(",")
    + "#" + Object.keys(AVATAR_FRAMES).join(",");
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) & 0xffff;
  return h;
}
function b32enc(bytes) {
  let bits = 0, val = 0, out = "";
  for (let i = 0; i < bytes.length; i++) {
    val = (val << 8) | bytes[i]; bits += 8;
    while (bits >= 5) { out += B32[(val >>> (bits - 5)) & 31]; bits -= 5; }
  }
  if (bits > 0) out += B32[(val << (5 - bits)) & 31];
  return out;
}
function b32dec(str) {
  const out = []; let bits = 0, val = 0;
  for (let i = 0; i < str.length; i++) {
    const v = B32.indexOf(str[i]);
    if (v < 0) continue;
    val = (val << 5) | v; bits += 5;
    if (bits >= 8) { out.push((val >>> (bits - 8)) & 255); bits -= 8; }
  }
  return out;
}
function encodeProgress() {
  const n = COURSES.length, st = state;
  const bytes = [];
  bytes.push(PROG_VER, n & 255, progIdHash() & 255);
  const xp = Math.max(0, Math.min(st.xp | 0, 0xffffff));
  bytes.push(xp & 255, (xp >> 8) & 255, (xp >> 16) & 255);
  bytes.push(Math.min(255, Math.max(0, st.maxStreak | 0)), Math.min(255, Math.max(0, st.streak | 0)));
  const bk = Object.keys(BADGE_DEFS), fk = Object.keys(AVATAR_FRAMES);
  let bm = 0, fm = 0;
  (st.badges || []).forEach(function (b) { const i = bk.indexOf(b); if (i >= 0 && i < 8) bm |= (1 << i); });
  (st.frames || []).forEach(function (f) { const i = fk.indexOf(f); if (i >= 0 && i < 8) fm |= (1 << i); });
  bytes.push(bm, fm, (st.frame && fk.indexOf(st.frame) >= 0) ? fk.indexOf(st.frame) : 255);
  const dlen = Math.ceil(n / 8);
  const db = new Array(dlen).fill(0);
  COURSES.forEach(function (c, i) { if (st.done && st.done[c.id]) db[i >> 3] |= (1 << (i & 7)); });
  for (let i = 0; i < dlen; i++) bytes.push(db[i]);
  const slen = Math.ceil(n / 4);
  const sb = new Array(slen).fill(0);
  COURSES.forEach(function (c, i) {
    const v = Math.min(3, Math.max(0, (st.stars && st.stars[c.id]) || 0));
    sb[i >> 2] |= (v << ((i & 3) * 2));
  });
  for (let i = 0; i < slen; i++) bytes.push(sb[i]);
  const code = b32enc(bytes);
  return "CC" + PROG_VER + "-" + (code.match(/.{1,10}/g) || []).join("-");
}
function decodeProgress(text) {
  let s = String(text || "").toUpperCase().replace(/[^0-9A-Z]/g, "");
  if (s.indexOf("CC" + PROG_VER) === 0) s = s.slice(3);
  s = s.replace(/[IL]/g, "1").replace(/O/g, "0").replace(/U/g, "V");
  const bytes = b32dec(s);
  if (bytes.length < 11) throw new Error("进度码太短或格式不对，请确认整串都复制过来了");
  let p = 0;
  const ver = bytes[p++], n = bytes[p++], h = bytes[p++];
  if (ver !== PROG_VER) throw new Error("这个进度码是版本 " + ver + "，当前应用不支持");
  if (n !== COURSES.length) throw new Error("进度码来自「" + n + " 关」的版本，当前是「" + COURSES.length + " 关」——关卡有变化，不能直接导入（否则通关记录会错位）");
  if (h !== (progIdHash() & 255)) throw new Error("进度码里的关卡列表和当前版本对不上，不能直接导入");
  const xp = bytes[p] | (bytes[p + 1] << 8) | (bytes[p + 2] << 16); p += 3;
  const maxStreak = bytes[p++], streak = bytes[p++];
  const bm = bytes[p++], fm = bytes[p++], fsel = bytes[p++];
  const dlen = Math.ceil(n / 8), slen = Math.ceil(n / 4);
  if (bytes.length < p + dlen + slen) throw new Error("进度码不完整，可能少了字符");
  const done = {}, stars = {};
  COURSES.forEach(function (c, i) { if (bytes[p + (i >> 3)] & (1 << (i & 7))) done[c.id] = true; });
  p += dlen;
  COURSES.forEach(function (c, i) {
    const v = (bytes[p + (i >> 2)] >> ((i & 3) * 2)) & 3;
    if (v > 0) stars[c.id] = v;
  });
  const bk = Object.keys(BADGE_DEFS), fk = Object.keys(AVATAR_FRAMES);
  return {
    xp: xp, streak: streak, maxStreak: maxStreak, done: done, stars: stars,
    badges: bk.filter(function (_, i) { return bm & (1 << i); }),
    frames: fk.filter(function (_, i) { return fm & (1 << i); }),
    frame: fsel < fk.length ? fk[fsel] : undefined
  };
}
function applyProgress(p) {
  state.xp = p.xp;
  state.streak = p.streak || 0;
  state.maxStreak = p.maxStreak || 0;
  state.done = p.done || {};
  state.stars = p.stars || {};
  state.badges = p.badges || [];
  state.frames = p.frames || [];
  if (p.frame) state.frame = p.frame; else delete state.frame;
  save();
  applyAvatarFrame();
  renderOverallStats();
  if (!$("view-home").hidden) renderHome(); else showHome();
}
function fallbackCopy(text, done) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta); done();
  } catch (e) { toast("复制失败，请手动选中复制"); }
}
function copyText(text, done) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
  } else fallbackCopy(text, done);
}
function initSync() {
  const modal = $("sync-modal");
  const out = $("sync-out"), inp = $("sync-in"), msg = $("sync-msg");
  function say(text, kind) { msg.textContent = text; msg.className = "sync-hint" + (kind ? " " + kind : ""); }
  function refresh() {
    try { out.textContent = encodeProgress(); }
    catch (e) { out.textContent = "生成失败：" + e.message; }
  }
  $("sync-open").addEventListener("click", function () { modal.hidden = false; inp.value = ""; say(""); refresh(); });
  $("sync-close").addEventListener("click", function () { modal.hidden = true; });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.hidden = true; });
  $("sync-refresh").addEventListener("click", function () { refresh(); say("已按当前进度重新生成。", "ok"); });
  $("sync-copy").addEventListener("click", function () {
    copyText(out.textContent || "", function () { say("✅ 已复制。发给自己吧（微信文件传输助手 / 备忘录 / QQ 都行）。", "ok"); });
  });
  $("sync-import").addEventListener("click", function () {
    let p;
    try { p = decodeProgress(inp.value); }
    catch (e) { say("❗ " + e.message, "err"); return; }
    applyProgress(p);
    say("✅ 导入成功：XP " + p.xp + "，已通关 " + Object.keys(p.done).length + " 关。界面已刷新。", "ok");
    refresh();
  });
}

// ===== 启动 =====
bind();
showHome();
initRipple();
initChrome();
initSync();
function initCover() {
  const cover = $("cover");
  // 启动器图标复用 <link rel=icon> 的数据，避免重复内联一份 base64
  const iconLink = document.querySelector('link[rel="apple-touch-icon"]') || document.querySelector('link[rel="icon"]');
  const img = $("launcher-img");
  if (img && iconLink) img.src = iconLink.getAttribute("href");
  $("cover-hint").textContent = "共 " + COURSES.length + " 关，等你挑战";

  const bg = $("cover-bg");
  for (let i = 0; i < 20; i++) {
    const s = document.createElement("i");
    const sz = 3 + Math.random() * 6;
    s.style.width = s.style.height = sz + "px";
    s.style.left = (Math.random() * 100) + "%";
    s.style.top = (Math.random() * 100) + "%";
    s.style.animationDelay = (Math.random() * 6) + "s";
    s.style.animationDuration = (4 + Math.random() * 5) + "s";
    bg.appendChild(s);
  }
  initCoverParticles();

  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const STEPS = ["初始化运行时环境", "装载 Python 咒语编译器", "唤醒皮皮", "连接代码大陆 " + COURSES.length + " 个关卡", "校准水晶球与连击符文", "准备就绪"];
  const DUR = [340, 320, 300, 360, 300, 260];
  const log = $("boot-log"), fill = $("boot-fill"), pctEl = $("boot-pct"), status = $("boot-status"), btn = $("cover-start");
  const TOTAL = DUR.reduce((a, b) => a + b, 0);
  let idx = 0, acc = 0, ready = false, launched = false;

  function paint(k) {
    while (idx < k) {
      const d = document.createElement("div");
      const last = idx === STEPS.length - 1;
      if (last) d.className = "ok";
      d.textContent = STEPS[idx] + (last ? "" : " …");
      log.appendChild(d);
      log.scrollTop = log.scrollHeight;
      acc += DUR[idx];
      idx++;
    }
    const p = Math.round(acc / TOTAL * 100);
    fill.style.width = p + "%";
    pctEl.textContent = p + "%";
    status.textContent = idx >= STEPS.length ? "启动完成" : STEPS[Math.max(0, idx - 1)] + "…";
  }
  function markReady() {
    if (ready) return;
    ready = true;
    paint(STEPS.length);
    fill.style.width = "100%";
    pctEl.textContent = "100%";
    status.textContent = "启动完成";
    btn.classList.add("ready");
  }
  function tick() {
    if (ready) return;
    paint(idx + 1);
    if (idx >= STEPS.length) { markReady(); return; }
    setTimeout(tick, REDUCE ? 30 : DUR[idx - 1]);
  }
  function launch() {
    if (launched) return;
    launched = true;
    const bc = document.createElement("div"); bc.className = "cover-burst"; cover.appendChild(bc);
    const colors = ["#F0765A", "#F5A97F", "#F59E0B", "#7FD8CE", "#E0E7FF"];
    for (let i = 0; i < 30; i++) {
      const d = document.createElement("i");
      const a = Math.random() * Math.PI * 2, dist = 90 + Math.random() * 170;
      d.style.setProperty("--dx", Math.cos(a) * dist + "px");
      d.style.setProperty("--dy", Math.sin(a) * dist + "px");
      d.style.background = colors[i % colors.length];
      bc.appendChild(d);
    }
    cover.classList.add("playing");
    document.body.classList.add("app-ready");   // 封面淡出的同时「打开窗口」
    setTimeout(() => { cover.style.display = "none"; }, 1180);
    // 让首页重新入场：整屏淡入 + 关卡逐个弹出
    const hv = $("view-home");
    if (hv && !hv.hidden) { renderHome(); playViewIn(hv); }
  }

  btn.addEventListener("click", e => { e.stopPropagation(); if (ready) launch(); else markReady(); });
  cover.addEventListener("click", () => { if (!ready) markReady(); });      // 点任意处跳过开机动画
  window.addEventListener("keydown", e => { if (!ready && (e.key === "Enter" || e.key === " ")) markReady(); });

  if (REDUCE) markReady(); else setTimeout(tick, 240);
}

function initCoverParticles() {
  const cv = $("cover-canvas"); if (!cv) return;
  const ctx = cv.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  function resize() { cv.width = cv.offsetWidth * dpr; cv.height = cv.offsetHeight * dpr; }
  resize(); window.addEventListener("resize", resize);
  const W = () => cv.width, H = () => cv.height;
  const N = 34;
  const pts = [];
  for (let i = 0; i < N; i++) pts.push({ x: Math.random() * W(), y: Math.random() * H(), vx: (Math.random() * 1.1 - 0.55) * dpr, vy: (Math.random() * 1.1 - 0.55) * dpr, r: (Math.random() * 2 + 1.5) * dpr, c: ["#F0765A", "#F5A97F", "#F59E0B", "#7FD8CE"][i % 4] });
  let raf, frame = 0;
  function step() {
    if (!cv.offsetParent) { cancelAnimationFrame(raf); return; }  // 封面隐藏后停止渲染，省 GPU/CPU
    frame++;
    if (frame % 2) { raf = requestAnimationFrame(step); return; }  // 约 30fps，降低持续 GPU 负载
    ctx.clearRect(0, 0, W(), H());
    for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W()) p.vx *= -1; if (p.y < 0 || p.y > H()) p.vy *= -1; }
    const link = 100 * dpr;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < link) { ctx.strokeStyle = "rgba(240,118,90," + (1 - d / link) * 0.35 + ")"; ctx.lineWidth = 1 * dpr; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
    }
    for (const p of pts) { ctx.fillStyle = p.c; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(step);
  }
  step();
  window.addEventListener("resize", () => { resize(); });
}
initCover();
// 手机/桌面断点切换（旋转屏幕、拖拽窗口等）时，按新宽度重新渲染关卡地图，避免布局错乱
var _mapMobile = window.matchMedia("(max-width: 920px)").matches;
window.addEventListener("resize", function () {
  var m = window.matchMedia("(max-width: 920px)").matches;
  if (m !== _mapMobile) { _mapMobile = m; var hv = document.getElementById("view-home"); if (hv && !hv.hidden) renderHome(); }
});
window.addEventListener("error", function (e) { try { toast("⚠️ 出现错误：" + (e.message || "")); } catch (_) {} });
window.addEventListener("unhandledrejection", function (e) { try { toast("⚠️ 出错：" + (e.reason && e.reason.message ? e.reason.message : "未处理错误")); } catch (_) {} });
