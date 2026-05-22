import {
  EffectsEngine,
  FX_PRESETS,
  FX_PACKS,
  getSceneTemplate,
  DIGIT_ENTRANCES,
  DIGIT_LOOP_EFFECTS,
} from "./effects-engine.js";
import { MediaManager } from "./media-manager.js";

const CANVAS_W = 720;
const CANVAS_H = 1280;
const PREVIEW_MAX_W = 280;
const DRAFT_KEY = "jinyan-draft-v1";

/** 祝福场景：只负责文案模板 */
const SCENES = [
  { id: "newyear", label: "过年" },
  { id: "birthday", label: "生日" },
  { id: "wedding", label: "婚礼" },
  { id: "graduate", label: "毕业" },
  { id: "festival", label: "端午" },
  { id: "business", label: "开业" },
  { id: "house", label: "乔迁" },
];

/** 主题风格：配色、背景、字体气质 */
const THEME_IDS = [
  "newyear", "birthday", "wedding", "graduate", "festival", "business", "house",
  "cyber", "guofeng", "romantic", "dream",
];

/** 装饰特效：粒子 / 烟花 / 彩带 / 闪光等 */
const FX_CARDS = [
  { id: "fx-firework-burst", label: "烟花绽放", sub: "粒子", cyber: false },
  { id: "fx-confetti-classic", label: "彩带满屏", sub: "粒子", cyber: false },
  { id: "fx-particle-starfield", label: "星空粒子", sub: "背景", cyber: false },
  { id: "fx-aurora-bg", label: "极光氛围", sub: "背景", cyber: false },
  { id: "fx-neon-grid", label: "霓虹网格", sub: "背景", cyber: true },
  { id: "fx-shockwave-flash", label: "冲击波闪光", sub: "屏幕", cyber: false },
];

let state = {
  sceneId: "birthday",
  themeId: "birthday",
  fxPackIds: ["fx-firework-burst", "fx-confetti-classic", "fx-particle-starfield"],
  fxIntensity: 1,
  fxOpacity: 1,
  textOpacity: 1,
  textLines: [],
  playing: true,
  previewTime: 0,
  duration: 15,
  digitPop: "",
  digitEntrance: "pop",
  digitLoopEffect: "float",
};

const effects = new EffectsEngine();
const media = new MediaManager();
let rafId = null;
let lastTs = 0;
let exporting = false;

const $ = (sel) => document.querySelector(sel);
const canvas = $("#preview-canvas");
const ctx = canvas.getContext("2d");

function uid() {
  return "l" + Math.random().toString(36).slice(2, 9);
}

function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2800);
}

function defaultLine(tpl, i) {
  const theme = FX_PRESETS[state.themeId];
  return {
    id: uid(),
    content: tpl.content,
    role: tpl.role,
    visible: true,
    style: {
      fontFamily: '"PingFang SC","Microsoft YaHei",sans-serif',
      fontSize: tpl.role === "title" ? 48 : tpl.role === "subtitle" ? 22 : 28,
      fontWeight: tpl.role === "title" ? 700 : 400,
      color: "#fff5f7",
      gradient: tpl.role === "title" ? theme?.colors : undefined,
      opacity: 1,
      letterSpacing: tpl.role === "subtitle" ? 4 : 0,
      shadow: tpl.role === "title",
    },
    animation: {
      preset: tpl.role === "title" ? "shimmer" : tpl.role === "subtitle" ? "fadeUp" : "none",
      delayMs: 4500 + i * 1500,
      durationMs: 2000,
    },
    layout: { x: 0.5, y: undefined, maxWidth: 0.9 },
  };
}

function applySceneTemplate(sceneId, merge = false) {
  const tpl = getSceneTemplate(sceneId);
  const textTpl = tpl.filter((t) => t.role !== "digit");
  if (!merge || !state.textLines.length) {
    state.textLines = textTpl.map((t, i) => defaultLine(t, i));
  } else {
    state.textLines = state.textLines.map((line, i) => {
      if (line._userEdited) return line;
      const t = textTpl[i];
      if (!t) return line;
      return { ...defaultLine(t, i), id: line.id, _userEdited: false };
    });
  }
  state.sceneId = sceneId;
  const tplDigit = tpl.find((t) => t.role === "digit");
  if (tplDigit && !merge) {
    state.digitPop = tplDigit.content.replace(/\D/g, "").slice(0, 8);
  } else if (!merge && !state._digitUserEdited) {
    state.digitPop = "";
  }
  syncDigitInput();
  syncSceneChips();
  refreshTextThemeStyles();
  updateBadge();
  effects.replay(extractDigits());
}

function applyTheme(themeId) {
  if (!FX_PRESETS[themeId]) return;
  state.themeId = themeId;
  effects.setTheme(themeId);
  refreshTextThemeStyles();
  syncThemeCards();
  updateBadge();
}

function refreshTextThemeStyles() {
  const theme = FX_PRESETS[state.themeId];
  if (!theme) return;
  state.textLines.forEach((line) => {
    if (!line.style) return;
    if (line.role === "title") {
      line.style.gradient = theme.colors;
      line.style.shadow = true;
    }
    if (line.role === "subtitle") line.style.color = theme.colors[0];
  });
  renderTextLines();
}

function renderThemeGrid() {
  const wrap = $("#theme-grid");
  if (!wrap) return;
  wrap.innerHTML = THEME_IDS.map((id) => {
    const t = FX_PRESETS[id];
    const colors = (t.colors || []).map((c) => `<i style="background:${c}"></i>`).join("");
    return `<div class="theme-card${id === state.themeId ? " on" : ""}" data-theme="${id}">
      <span class="theme-icon">${t.icon}</span>
      <strong>${t.name}</strong>
      <small>${t.subtitle || ""}</small>
      <div class="theme-colors">${colors}</div>
    </div>`;
  }).join("");
}

function syncThemeCards() {
  $("#theme-grid")?.querySelectorAll(".theme-card[data-theme]").forEach((card) => {
    card.classList.toggle("on", card.dataset.theme === state.themeId);
  });
}

function bindThemeGrid() {
  $("#theme-grid")?.addEventListener("click", (e) => {
    const card = e.target.closest(".theme-card[data-theme]");
    if (!card) return;
    applyTheme(card.dataset.theme);
    effects.replay(extractDigits());
  });
}

function extractDigits() {
  const raw = $("#digit-input")?.value ?? state.digitPop ?? "";
  const digits = String(raw).replace(/\D/g, "").slice(0, 8);
  state.digitPop = digits;
  return digits;
}

function syncDigitInput() {
  const input = $("#digit-input");
  if (!input) return;
  input.value = state.digitPop;
  const count = $("#digit-count");
  if (count) count.textContent = `${state.digitPop.length} 位`;
}

function normalizeFxPackIds(ids) {
  if (!ids?.length) return ["fx-particle-starfield"];
  const mapped = ids
    .map((id) => {
      if (id === "fx-digit-pop" || id === "fx-digit-pop-romantic" || id === "fx-digit-pop-cyber") return null;
      return id;
    })
    .filter(Boolean);
  return mapped.length ? [...new Set(mapped)] : ["fx-particle-starfield"];
}

function syncDigitAnimToEngine() {
  effects.setDigitAnim(state.digitEntrance, state.digitLoopEffect);
}

function renderDigitAnimSelects() {
  const ent = $("#digit-entrance");
  const loop = $("#digit-loop-effect");
  if (ent) {
    ent.innerHTML = Object.values(DIGIT_ENTRANCES)
      .map((o) => `<option value="${o.id}"${o.id === state.digitEntrance ? " selected" : ""}>${o.name}</option>`)
      .join("");
  }
  if (loop) {
    loop.innerHTML = Object.values(DIGIT_LOOP_EFFECTS)
      .map((o) => `<option value="${o.id}"${o.id === state.digitLoopEffect ? " selected" : ""}>${o.name}</option>`)
      .join("");
  }
  syncDigitAnimToEngine();
}

function bindDigitInput() {
  $("#digit-input")?.addEventListener("input", (e) => {
    state.digitPop = e.target.value.replace(/\D/g, "").slice(0, 8);
    e.target.value = state.digitPop;
    state._digitUserEdited = true;
    syncDigitInput();
    effects.replay(extractDigits());
  });
  $("#digit-entrance")?.addEventListener("change", (e) => {
    state.digitEntrance = e.target.value;
    syncDigitAnimToEngine();
    effects.replay(extractDigits());
  });
  $("#digit-loop-effect")?.addEventListener("change", (e) => {
    state.digitLoopEffect = e.target.value;
    syncDigitAnimToEngine();
    effects.replay(extractDigits());
  });
}

function syncSceneChips() {
  $("#scene-tabs")?.querySelectorAll(".chip[data-scene]").forEach((chip) => {
    chip.classList.toggle("on", chip.dataset.scene === state.sceneId);
  });
}

function bindSceneTabs() {
  const wrap = $("#scene-tabs");
  if (!wrap) return;
  wrap.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip[data-scene]");
    if (!chip) return;
    applySceneTemplate(chip.dataset.scene, true);
  });
}

function roleLabel(role) {
  const map = { title: "标题", subtitle: "副标题", body: "正文", signature: "署名", digit: "数字" };
  return map[role] || "正文";
}

function renderTextLines() {
  const wrap = $("#text-lines");
  wrap.innerHTML = state.textLines
    .map(
      (line, idx) => `
    <details class="line-item" data-id="${line.id}">
      <summary><strong>行${idx + 1} · ${roleLabel(line.role)}</strong> ${line.content.slice(0, 12)}${line.content.length > 12 ? "…" : ""} ▾</summary>
      <div class="line-detail">
        <input type="text" data-field="content" value="${escapeHtml(line.content)}" />
        <select data-field="role">
          ${["title", "subtitle", "body", "signature", "digit"]
            .map((r) => `<option value="${r}"${line.role === r ? " selected" : ""}>${roleLabel(r)}</option>`)
            .join("")}
        </select>
        <div class="ctrl-row"><span>透明度</span><span>${Math.round((line.style?.opacity ?? 1) * 100)}%</span></div>
        <input type="range" data-field="opacity" min="0" max="100" value="${Math.round((line.style?.opacity ?? 1) * 100)}" />
        <button type="button" class="btn" data-action="remove" style="font-size:0.68rem">删除此行</button>
      </div>
    </details>`
    )
    .join("");

  wrap.querySelectorAll(".line-item").forEach((el) => {
    const id = el.dataset.id;
    const line = state.textLines.find((l) => l.id === id);
    el.querySelector('[data-field="content"]')?.addEventListener("input", (e) => {
      line.content = e.target.value;
      line._userEdited = true;
    });
    el.querySelector('[data-field="role"]')?.addEventListener("change", (e) => {
      line.role = e.target.value;
      renderTextLines();
    });
    el.querySelector('[data-field="opacity"]')?.addEventListener("input", (e) => {
      line.style.opacity = Number(e.target.value) / 100;
      el.querySelector(".ctrl-row span:last-child").textContent = e.target.value + "%";
    });
    el.querySelector('[data-action="remove"]')?.addEventListener("click", () => {
      if (state.textLines.length <= 1) return toast("至少保留一行文案");
      state.textLines = state.textLines.filter((l) => l.id !== id);
      renderTextLines();
    });
  });
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function toggleFxPack(id) {
  const pack = FX_PACKS[id];
  if (!pack) return;
  if (state.fxPackIds.includes(id)) {
    if (state.fxPackIds.length > 1) state.fxPackIds = state.fxPackIds.filter((x) => x !== id);
  } else {
    const sameCat = FX_CARDS.filter((c) => FX_PACKS[c.id]?.category === pack.category).map((c) => c.id);
    if (pack.category === "bg") {
      state.fxPackIds = state.fxPackIds.filter((x) => !sameCat.includes(x));
    }
    state.fxPackIds.push(id);
  }
  effects.setFxPacks(state.fxPackIds);
  syncFxCards();
  updateBadge();
  effects.replay(extractDigits());
}

function syncFxCards() {
  $("#fx-grid")?.querySelectorAll(".fx-card[data-fx]").forEach((card) => {
    card.classList.toggle("on", state.fxPackIds.includes(card.dataset.fx));
  });
}

function bindFxGrid() {
  $("#fx-grid")?.addEventListener("click", (e) => {
    const card = e.target.closest(".fx-card[data-fx]");
    if (!card) return;
    toggleFxPack(card.dataset.fx);
  });
}

function updateBadge() {
  const theme = FX_PRESETS[state.themeId];
  const fxNames = state.fxPackIds
    .map((id) => FX_PACKS[id]?.name)
    .filter(Boolean)
    .slice(0, 2);
  const fxLabel = fxNames.length ? fxNames.join("、") : "无装饰";
  $("#badge-fx").textContent = `${theme?.name || "主题"} · ${fxLabel}`;
}

function updateDuration() {
  state.duration = media.videoEl ? media.getExportDuration() : 15;
  $("#timeline-label").textContent = `${fmtTime(state.previewTime)} / ${fmtTime(state.duration)}`;
  updateTrimVisual();
}

function updateTrimVisual() {
  const dur = media.videoMeta.duration || state.duration;
  if (!dur) return;
  const left = (media.trimStart / dur) * 100;
  const width = ((media.trimEnd - media.trimStart) / dur) * 100;
  const el = $("#tl-trim-visual");
  el.style.left = left + "%";
  el.style.width = width + "%";
  $("#tl-video-bar").style.left = left + "%";
  $("#tl-video-bar").style.width = width + "%";
  $("#val-trim-start").textContent = fmtTime(media.trimStart);
  $("#val-trim-end").textContent = fmtTime(media.trimEnd);
}

function pushPreview(ts) {
  if (!lastTs) lastTs = ts;
  const dt = Math.min(0.05, (ts - lastTs) / 1000);
  lastTs = ts;

  if (state.playing && !exporting) {
    state.previewTime += dt;
    if (state.previewTime >= state.duration) {
      state.previewTime = 0;
      effects.replay(extractDigits());
    }
    media.syncVideoToTime(state.previewTime);
  }

  effects.setIntensity(state.fxIntensity);
  effects.setFxPacks(state.fxPackIds);
  effects.update(dt, CANVAS_W, CANVAS_H);

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  effects.drawBackground(ctx, CANVAS_W, CANVAS_H);
  if (media.videoEl) media.drawVideo(ctx, CANVAS_W, CANVAS_H, media.videoOpacity);
  effects.drawEffectsLayer(ctx, CANVAS_W, CANVAS_H, { fxOpacity: state.fxOpacity });
  effects.drawTextLayer(ctx, CANVAS_W, CANVAS_H, state.textLines, { textOpacity: state.textOpacity });

  $("#timeline-label").textContent = `${fmtTime(state.previewTime)} / ${fmtTime(state.duration)}`;

  rafId = requestAnimationFrame(pushPreview);
}

function startPreview() {
  if (rafId) cancelAnimationFrame(rafId);
  lastTs = 0;
  effects.replay(extractDigits());
  rafId = requestAnimationFrame(pushPreview);
}

async function handleVideoUpload(file) {
  try {
    const meta = await media.loadVideo(file);
    media.connectVideoAudio();
    const box = $("#upload-video");
    box.classList.add("ok");
    box.innerHTML = `<div class="icon">✓</div>${meta.name}<br><small>${meta.width}×${meta.height} · ${fmtTime(meta.duration)}</small>`;
    const trimEnd = $("#trim-end");
    const trimStart = $("#trim-start");
    trimEnd.max = 100;
    trimStart.max = 100;
    trimEnd.value = 100;
    trimStart.value = 0;
    media.setTrim(0, meta.duration);
    updateDuration();
    await media.playAll();
    toast("视频上传成功");
  } catch (e) {
    toast(e.message || "视频格式不支持，建议 mp4(h264)");
  }
}

async function handleAudioUpload(file) {
  try {
    const meta = await media.loadAudio(file);
    media.connectBgmAudio();
    const box = $("#upload-audio");
    box.classList.add("ok");
    box.innerHTML = `<div class="icon">✓</div>${meta.name}<br><small>${fmtTime(meta.duration)}</small>`;
    await media.playAll();
    toast("音乐上传成功");
  } catch (e) {
    toast("音频加载失败");
  }
}

function saveDraft() {
  const data = {
    version: 1,
    sceneId: state.sceneId,
    themeId: state.themeId,
    fxPackIds: state.fxPackIds,
    fxIntensity: state.fxIntensity,
    digitPop: state.digitPop,
    digitEntrance: state.digitEntrance,
    digitLoopEffect: state.digitLoopEffect,
    textLines: state.textLines,
    media: {
      video: {
        trimStart: media.trimStart,
        trimEnd: media.trimEnd,
        volume: media.videoVolume,
        opacity: media.videoOpacity,
      },
      audio: { volume: media.audioVolume },
    },
  };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  toast("草稿已保存到本地");
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.textLines?.length) state.textLines = data.textLines;
    if (data.fxPackIds) state.fxPackIds = normalizeFxPackIds(data.fxPackIds);
    if (data.fxIntensity) state.fxIntensity = data.fxIntensity;
    if (data.digitPop != null) {
      state.digitPop = String(data.digitPop).replace(/\D/g, "").slice(0, 8);
      state._digitUserEdited = true;
      syncDigitInput();
    }
    if (data.digitEntrance && DIGIT_ENTRANCES[data.digitEntrance]) state.digitEntrance = data.digitEntrance;
    if (data.digitLoopEffect && DIGIT_LOOP_EFFECTS[data.digitLoopEffect]) state.digitLoopEffect = data.digitLoopEffect;
    renderDigitAnimSelects();
    if (data.sceneId) applySceneTemplate(data.sceneId, false);
    if (data.themeId) applyTheme(data.themeId);
    $("#fx-intensity").value = Math.round(state.fxIntensity * 100);
    if (data.media?.video) {
      media.trimStart = data.media.video.trimStart;
      media.trimEnd = data.media.video.trimEnd;
      media.videoVolume = data.media.video.volume ?? 0.8;
      media.videoOpacity = data.media.video.opacity ?? 0.85;
    }
    renderTextLines();
    syncFxCards();
    updateBadge();
  } catch (_) {}
}

async function exportVideo() {
  if (exporting) return;
  const btn = $("#btn-export");
  exporting = true;
  btn.disabled = true;
  const status = $("#export-status");
  state.playing = false;

  const stream = canvas.captureStream(30);
  if (media.audioCtx) {
    try {
      const dest = media.audioCtx.createMediaStreamDestination();
      media.videoGain?.connect(dest);
      media.audioGain?.connect(dest);
      dest.stream.getAudioTracks().forEach((t) => stream.addTrack(t));
    } catch (_) {}
  }

  const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
    ? "video/webm;codecs=vp9"
    : "video/webm";
  const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 4_000_000 });
  const chunks = [];
  recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: mime });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `锦言祝词-${Date.now()}.webm`;
    a.click();
    exporting = false;
    btn.disabled = false;
    btn.textContent = "导出 MP4 视频";
    status.textContent = "";
    state.playing = true;
    state.previewTime = 0;
    effects.replay(extractDigits());
    stream.getTracks().forEach((t) => t.stop());
    toast("导出完成（WebM 格式，可用本地播放器打开）");
  };

  const exportDur = state.duration;
  let elapsed = 0;
  state.previewTime = 0;
  effects.replay(extractDigits());
  recorder.start(100);

  const exportLoop = (ts) => {
    if (!exporting) return;
    if (!lastTs) lastTs = ts;
    const dt = Math.min(0.05, (ts - lastTs) / 1000);
    lastTs = ts;
    elapsed += dt;
    state.previewTime = elapsed;
    media.syncVideoToTime(elapsed);
    effects.update(dt, CANVAS_W, CANVAS_H);
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    effects.drawBackground(ctx, CANVAS_W, CANVAS_H);
    if (media.videoEl) media.drawVideo(ctx, CANVAS_W, CANVAS_H, media.videoOpacity);
    effects.drawEffectsLayer(ctx, CANVAS_W, CANVAS_H, { fxOpacity: state.fxOpacity });
    effects.drawTextLayer(ctx, CANVAS_W, CANVAS_H, state.textLines, { textOpacity: state.textOpacity });
    const pct = Math.min(100, Math.round((elapsed / exportDur) * 100));
    status.textContent = `导出中 ${pct}% · ${elapsed.toFixed(1)}/${exportDur.toFixed(1)}秒`;
    btn.textContent = `导出中 ${pct}%`;
    if (elapsed >= exportDur) {
      recorder.stop();
      cancelAnimationFrame(rafId);
      startPreview();
      return;
    }
    requestAnimationFrame(exportLoop);
  };
  cancelAnimationFrame(rafId);
  lastTs = 0;
  requestAnimationFrame(exportLoop);
}

function exportGifCover() {
  const off = document.createElement("canvas");
  off.width = 360;
  off.height = 640;
  const oc = off.getContext("2d");
  oc.drawImage(canvas, 0, 0, off.width, off.height);
  off.toBlob((blob) => {
    if (!blob) return toast("封面导出失败");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `锦言封面-${Date.now()}.png`;
    a.click();
    toast("已导出封面图（PNG）");
  }, "image/png");
}

function randomInspire() {
  const scene = SCENES[Math.floor(Math.random() * SCENES.length)].id;
  const theme = THEME_IDS[Math.floor(Math.random() * THEME_IDS.length)];
  applySceneTemplate(scene, false);
  applyTheme(theme);
  const pool = FX_CARDS.map((c) => c.id);
  state.fxPackIds = [pool[Math.floor(Math.random() * pool.length)]];
  if (Math.random() > 0.5) state.fxPackIds.push("fx-firework-burst");
  state.fxPackIds = normalizeFxPackIds(state.fxPackIds);
  effects.setFxPacks(state.fxPackIds);
  syncFxCards();
  updateBadge();
  effects.replay(extractDigits());
  toast("已随机：场景文案 + 主题风格 + 装饰特效");
}

function bindEvents() {
  $("#btn-add-line").addEventListener("click", () => {
    if (state.textLines.length >= 8) return toast("最多 8 行文案");
    state.textLines.push(defaultLine({ role: "body", content: "祝福文案" }, state.textLines.length));
    renderTextLines();
  });

  $("#upload-video").addEventListener("click", () => $("#input-video").click());
  $("#upload-audio").addEventListener("click", () => $("#input-audio").click());
  $("#input-video").addEventListener("change", (e) => e.target.files[0] && handleVideoUpload(e.target.files[0]));
  $("#input-audio").addEventListener("change", (e) => e.target.files[0] && handleAudioUpload(e.target.files[0]));

  $("#trim-start").addEventListener("input", (e) => {
    const dur = media.videoMeta.duration || 15;
    const t = (Number(e.target.value) / 100) * dur;
    media.setTrim(t, media.trimEnd);
    updateTrimVisual();
    updateDuration();
  });
  $("#trim-end").addEventListener("input", (e) => {
    const dur = media.videoMeta.duration || 15;
    const t = (Number(e.target.value) / 100) * dur;
    media.setTrim(media.trimStart, t);
    updateTrimVisual();
    updateDuration();
  });

  $("#vol-video").addEventListener("input", (e) => {
    media.setVideoVolume(Number(e.target.value) / 100);
    $("#val-vol-video").textContent = e.target.value + "%";
  });
  $("#vol-audio").addEventListener("input", (e) => {
    media.setAudioVolume(Number(e.target.value) / 100);
    $("#val-vol-audio").textContent = e.target.value + "%";
  });
  $("#video-opacity").addEventListener("input", (e) => {
    media.videoOpacity = Number(e.target.value) / 100;
    $("#val-opacity").textContent = e.target.value + "%";
  });
  $("#mute-original").addEventListener("change", (e) => media.setMuteOriginal(e.target.checked));

  $("#fx-opacity").addEventListener("input", (e) => {
    state.fxOpacity = Number(e.target.value) / 100;
    $("#val-fx-opacity").textContent = e.target.value + "%";
  });

  $("#fx-intensity").addEventListener("input", (e) => {
    state.fxIntensity = Number(e.target.value) / 100;
    effects.setIntensity(state.fxIntensity);
  });

  const replay = () => {
    state.previewTime = 0;
    effects.replay(extractDigits());
  };
  $("#btn-replay-fx").addEventListener("click", replay);
  $("#btn-replay-tl").addEventListener("click", replay);

  $("#btn-play").addEventListener("click", async () => {
    state.playing = !state.playing;
    $("#btn-play").textContent = state.playing ? "▶ 播放" : "⏸ 暂停";
    if (state.playing) await media.playAll();
    else media.pauseAll();
  });

  $("#btn-fullscreen").addEventListener("click", () => {
    const frame = $("#phone-frame");
    if (frame.requestFullscreen) frame.requestFullscreen();
    else canvas.requestFullscreen?.();
  });

  $("#btn-random").addEventListener("click", randomInspire);
  $("#btn-draft").addEventListener("click", saveDraft);
  $("#btn-export").addEventListener("click", exportVideo);
  $("#btn-export-gif").addEventListener("click", exportGifCover);
}

function init() {
  if (!canvas || !ctx) {
    toast("预览画布初始化失败");
    return;
  }
  bindSceneTabs();
  renderThemeGrid();
  bindThemeGrid();
  bindFxGrid();
  renderDigitAnimSelects();
  bindDigitInput();
  applySceneTemplate("birthday", false);
  applyTheme("birthday");
  state.fxPackIds = normalizeFxPackIds(state.fxPackIds);
  syncFxCards();
  effects.setFxPacks(state.fxPackIds);
  effects.setIntensity(1);
  loadDraft();
  bindEvents();
  startPreview();
  document.documentElement.classList.remove("file-protocol");
  const warn = $("#boot-warn");
  if (warn) warn.style.display = "none";
}

try {
  init();
} catch (err) {
  console.error(err);
  const warn = $("#boot-warn");
  if (warn) {
    warn.style.display = "block";
    warn.textContent = "应用加载失败：" + (err.message || err) + "。请通过 http://localhost 访问本页面。";
  }
}
