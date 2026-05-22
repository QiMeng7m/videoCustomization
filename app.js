import { EffectsEngine, FX_PRESETS } from "./effects-engine.js";
import { MediaManager } from "./media-manager.js";

const SCENES = {
  newyear: { label: "新春", title: "新春大吉", icon: "🧧" },
  birthday: { label: "生日", title: "生日快乐", icon: "🎂" },
  wedding: { label: "婚礼", title: "百年好合", icon: "💒" },
  graduate: { label: "毕业", title: "前程似锦", icon: "🎓" },
  house: { label: "乔迁", title: "乔迁之喜", icon: "🏠" },
  business: { label: "开业", title: "生意兴隆", icon: "📈" },
  festival: { label: "端午", title: "端午安康", icon: "🐲" },
  general: { label: "通用", title: "万事如意", icon: "✨" },
};

const TEMPLATES = {
  newyear: [
    "爆竹声中一岁除，春风送暖入屠苏。\n愿您新年万事顺遂，阖家欢乐！",
    "金龙献瑞，福满人间。\n祝您财源广进，身体健康，心想事成！",
    "辞旧迎新，万象更新。\n愿新的一年，所求皆如愿，所行皆坦途。",
  ],
  birthday: [
    "愿岁月温柔以待，生日快乐！\n年年有今日，岁岁有今朝。",
    "一岁一礼，一寸欢喜。\n愿您平安喜乐，万事胜意！",
    "愿您的生活如蛋糕般甜蜜，\n如烛光般温暖，生日快乐！",
  ],
  wedding: [
    "执子之手，与子偕老。\n祝你们新婚快乐，永结同心！",
    "佳偶天成，琴瑟和鸣。\n愿你们相濡以沫，白头偕老。",
    "愿你们的爱情如美酒，愈陈愈香；\n如玫瑰，愈开愈艳。新婚快乐！",
  ],
  graduate: [
    "海阔凭鱼跃，天高任鸟飞。\n祝毕业快乐，前程似锦！",
    "愿您带着梦想与勇气，\n奔赴下一场山海，未来可期！",
    "学有所成，业有所就。\n愿您乘风破浪，直挂云帆！",
  ],
  house: [
    "新居落成，福地洞天。\n祝乔迁之喜，阖家安康！",
    "迁入新居，开启新篇。\n愿您在此安居乐业，幸福美满。",
    "华屋生辉，德门增庆。\n恭贺乔迁，万事亨通！",
  ],
  business: [
    "开业大吉，财源广进！\n愿生意兴隆，客似云来。",
    "鸿图大展，事业腾飞。\n祝您开业顺遂，蒸蒸日上！",
    "门迎晓日财源广，户纳春风福气多。\n恭祝开业大吉！",
  ],
  festival: [
    "端午安康，粽叶飘香。\n愿您平安顺遂，幸福绵长。",
    "龙舟竞渡，艾草飘香。\n祝您端午快乐，阖家安康！",
    "五月五日午，赠您一枝艾。\n愿端午安康，百病不侵。",
  ],
  general: [
    "愿您所遇皆美好，所盼皆如愿。\n平安喜乐，万事胜意！",
    "山河无恙，人间皆安。\n祝您幸福安康，笑口常开！",
    "愿时光温柔，岁月静好。\n祝您一切顺心，好运常伴！",
  ],
};

const TEXT_EFFECTS = [
  { id: "fade", label: "逐字渐显", icon: "🌅" },
  { id: "typewriter", label: "打字机", icon: "⌨️" },
  { id: "wave", label: "波浪起伏", icon: "🌊" },
  { id: "zoom", label: "缩放弹入", icon: "💫" },
];

const FX_LIST = Object.values(FX_PRESETS);

const state = {
  scene: "newyear",
  fx: "fireworks",
  textEffect: "fade",
  templateIndex: 0,
};

const $ = (sel) => document.querySelector(sel);

const els = {
  sceneTabs: $("#sceneTabs"),
  templateGrid: $("#templateGrid"),
  customText: $("#customText"),
  showSignature: $("#showSignature"),
  signature: $("#signature"),
  uploadVideo: $("#uploadVideo"),
  uploadAudio: $("#uploadAudio"),
  videoFileName: $("#videoFileName"),
  audioFileName: $("#audioFileName"),
  clearVideo: $("#clearVideo"),
  clearAudio: $("#clearAudio"),
  videoControls: $("#videoControls"),
  videoSpeed: $("#videoSpeed"),
  speedVal: $("#speedVal"),
  videoVolume: $("#videoVolume"),
  videoVolVal: $("#videoVolVal"),
  trimStart: $("#trimStart"),
  trimEnd: $("#trimEnd"),
  trimStartVal: $("#trimStartVal"),
  trimEndVal: $("#trimEndVal"),
  trimRangeText: $("#trimRangeText"),
  trimDurationHint: $("#trimDurationHint"),
  trimActive: $("#trimActive"),
  bgOverlay: $("#bgOverlay"),
  fxOnVideo: $("#fxOnVideo"),
  musicVolume: $("#musicVolume"),
  useVideoAudio: $("#useVideoAudio"),
  previewMusic: $("#previewMusic"),
  btnCompose: $("#btnCompose"),
  fxPicker: $("#fxPicker"),
  textEffectPicker: $("#textEffectPicker"),
  fxIntensity: $("#fxIntensity"),
  animSpeed: $("#animSpeed"),
  fontSize: $("#fontSize"),
  letterSpacing: $("#letterSpacing"),
  videoDuration: $("#videoDuration"),
  videoFps: $("#videoFps"),
  previewCanvas: $("#previewCanvas"),
  previewViewport: $("#previewViewport"),
  previewBadge: $("#previewBadge"),
  recordingOverlay: $("#recordingOverlay"),
  recProgress: $("#recProgress"),
  recTime: $("#recTime"),
  toast: $("#toast"),
  btnReplay: $("#btnReplay"),
  btnExportVideo: $("#btnExportVideo"),
  btnCopy: $("#btnCopy"),
  btnRandom: $("#btnRandom"),
  btnFullscreen: $("#btnFullscreen"),
};

let engine;
let media;
let isRecording = false;
let previewMusicPlaying = false;

function showToast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => els.toast.classList.remove("show"), 2800);
}

function getLines() {
  const raw = els.customText.value.trim();
  if (!raw) return [];
  return raw.split(/\n+/).filter(Boolean);
}

function applyMediaToEngine() {
  const video = media.getVideoElement();
  engine.setBackgroundVideo(video, {
    overlay: Number(els.bgOverlay.value),
    fxOpacity: Number(els.fxOnVideo.value),
  });
}

function syncEngineContent() {
  const scene = SCENES[state.scene];
  engine.setContent({
    title: scene.title,
    lines: getLines(),
    signature: els.signature.value || "敬上",
    showSignature: els.showSignature.checked,
  });
}

function syncEngineOptions() {
  engine.setOptions({
    fontSize: Number(els.fontSize.value),
    letterSpacing: Number(els.letterSpacing.value),
    speed: Number(els.animSpeed.value),
    textEffect: state.textEffect,
    intensity: Number(els.fxIntensity.value),
  });
}

function updateBadge() {
  const scene = SCENES[state.scene];
  const fx = FX_PRESETS[state.fx];
  const parts = [`${scene.icon} ${scene.label}`, fx?.label];
  if (media.hasVideo()) parts.push("自定义视频");
  if (media.hasAudio()) parts.push("自定义音乐");
  els.previewBadge.textContent = parts.join(" · ");
}

function pushPreview() {
  applyMediaToEngine();
  syncEngineContent();
  syncEngineOptions();
  updateBadge();
}

function replayEntrance() {
  engine.resetReveal();
}

async function composePlay() {
  replayEntrance();
  engine.resetParticles();
  pushPreview();

  await media.syncPlay(true);

  if (media.hasVideo() && !media.hasAudio() && !els.previewMusic.checked) {
    showToast("合成播放：视频底图 + 祝词特效");
  } else if (media.hasVideo() || media.hasAudio()) {
    showToast("合成播放：底素材 + 祝词特效同步启动");
  } else {
    showToast("请先上传视频或音乐，或直接使用纯特效背景");
  }
}

async function startPreviewMusicIfNeeded() {
  if (!els.previewMusic.checked || !media.hasAudio() || isRecording) return;
  if (previewMusicPlaying) return;
  previewMusicPlaying = true;
  await media.resumeAudioContext();
  media.audioEl.play().catch(() => {});
}

function stopPreviewMusic() {
  if (!media.hasAudio()) return;
  previewMusicPlaying = false;
  if (!isRecording) media.audioEl.pause();
}

function replayEntranceWithToast() {
  replayEntrance();
  showToast("文字登场动画已重播");
}

function renderSceneTabs() {
  els.sceneTabs.innerHTML = Object.entries(SCENES)
    .map(
      ([id, s]) =>
        `<button type="button" class="scene-tab${id === state.scene ? " active" : ""}" data-scene="${id}">${s.icon} ${s.label}</button>`
    )
    .join("");

  els.sceneTabs.querySelectorAll(".scene-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.scene = btn.dataset.scene;
      state.templateIndex = 0;
      renderSceneTabs();
      renderTemplates();
      syncTextareaFromTemplate();
      pushPreview();
    });
  });
}

function renderTemplates() {
  const list = TEMPLATES[state.scene] || TEMPLATES.general;
  els.templateGrid.innerHTML = list
    .map(
      (text, i) =>
        `<button type="button" class="template-item${i === state.templateIndex ? " active" : ""}" data-index="${i}">${text.replace(/\n/g, " ")}</button>`
    )
    .join("");

  els.templateGrid.querySelectorAll(".template-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.templateIndex = Number(btn.dataset.index);
      renderTemplates();
      syncTextareaFromTemplate();
      replayEntrance();
      pushPreview();
    });
  });
}

function syncTextareaFromTemplate() {
  const list = TEMPLATES[state.scene] || TEMPLATES.general;
  els.customText.value = list[state.templateIndex] || "";
}

function renderFxPicker() {
  els.fxPicker.innerHTML = FX_LIST.map(
    (fx) => `
    <button type="button" class="fx-card${fx.id === state.fx ? " active" : ""}" data-fx="${fx.id}" title="${fx.label}">
      <span class="fx-icon">${fx.icon}</span>
      <span class="fx-label">${fx.label}</span>
      <span class="fx-glow" style="background: radial-gradient(circle, ${fx.accent}44 0%, transparent 70%)"></span>
    </button>`
  ).join("");

  els.fxPicker.querySelectorAll("[data-fx]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.fx = btn.dataset.fx;
      engine.setPreset(state.fx);
      engine.resetParticles();
      replayEntrance();
      renderFxPicker();
      pushPreview();
      showToast(`已切换：${FX_PRESETS[state.fx].label}`);
    });
  });
}

function renderTextEffectPicker() {
  els.textEffectPicker.innerHTML = TEXT_EFFECTS.map(
    (e) =>
      `<button type="button" class="picker-card sm${e.id === state.textEffect ? " active" : ""}" data-te="${e.id}">
        <span class="te-icon">${e.icon}</span>
        <span class="picker-label">${e.label}</span>
      </button>`
  ).join("");

  els.textEffectPicker.querySelectorAll("[data-te]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.textEffect = btn.dataset.te;
      renderTextEffectPicker();
      replayEntrance();
      pushPreview();
    });
  });
}

function getMimeType() {
  const types = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm", "video/mp4"];
  return types.find((t) => MediaRecorder.isTypeSupported(t)) || "";
}

function getExportDurationMs() {
  const val = els.videoDuration.value;
  if (val === "auto") {
    return media.getSuggestedDurationSec(8) * 1000;
  }
  return Number(val) * 1000;
}

async function exportVideo() {
  if (isRecording) return;

  const duration = getExportDurationMs();
  const fps = Number(els.videoFps.value);
  const mime = getMimeType();

  if (!mime) {
    showToast("当前浏览器不支持视频录制，请使用 Chrome / Edge");
    return;
  }

  isRecording = true;
  stopPreviewMusic();
  els.btnExportVideo.disabled = true;
  els.recordingOverlay.hidden = false;
  els.recProgress.style.width = "0%";

  engine.resetReveal();
  engine.resetParticles();
  pushPreview();

  await media.syncPlay(true, true);

  const stream = media.getCompositeStream(els.previewCanvas, fps);
  const chunks = [];
  const recorder = new MediaRecorder(stream, {
    mimeType: mime,
    videoBitsPerSecond: 8_000_000,
    audioBitsPerSecond: 256_000,
  });

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const recordPromise = new Promise((resolve) => {
    recorder.onstop = resolve;
  });

  recorder.start(100);

  const start = performance.now();
  const tickProgress = () => {
    const elapsed = performance.now() - start;
    const pct = Math.min(100, (elapsed / duration) * 100);
    els.recProgress.style.width = `${pct}%`;
    els.recTime.textContent = `${(elapsed / 1000).toFixed(1)} / ${duration / 1000} 秒`;
    if (elapsed < duration) requestAnimationFrame(tickProgress);
  };
  requestAnimationFrame(tickProgress);

  await new Promise((r) => setTimeout(r, duration));
  recorder.stop();
  await recordPromise;

  media.pause();
  previewMusicPlaying = false;

  const ext = mime.includes("mp4") ? "mp4" : "webm";
  const blob = new Blob(chunks, { type: mime.split(";")[0] });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const scene = SCENES[state.scene];
  const fx = FX_PRESETS[state.fx];
  a.href = url;
  a.download = `锦言祝词-${scene.label}-${fx.label}-${Date.now()}.${ext}`;
  a.click();
  URL.revokeObjectURL(url);

  isRecording = false;
  els.btnExportVideo.disabled = false;
  els.recordingOverlay.hidden = true;

  const hasSound = media.hasAudio() || (media.useVideoAudio && media.hasVideo());
  showToast(
    `视频已导出（${ext.toUpperCase()}，${duration / 1000}秒${hasSound ? "，含音频" : ""}）`
  );

  if (els.previewMusic.checked && media.hasAudio()) {
    startPreviewMusicIfNeeded();
  }
}

function randomInspire() {
  const sceneIds = Object.keys(SCENES);
  state.scene = sceneIds[Math.floor(Math.random() * sceneIds.length)];
  const list = TEMPLATES[state.scene];
  state.templateIndex = Math.floor(Math.random() * list.length);
  state.fx = FX_LIST[Math.floor(Math.random() * FX_LIST.length)].id;
  state.textEffect = TEXT_EFFECTS[Math.floor(Math.random() * TEXT_EFFECTS.length)].id;

  renderSceneTabs();
  renderTemplates();
  renderFxPicker();
  renderTextEffectPicker();
  syncTextareaFromTemplate();
  engine.setPreset(state.fx);
  engine.resetParticles();
  replayEntrance();
  pushPreview();
  showToast("已随机搭配特效方案 ✨");
}

async function copyText() {
  const scene = SCENES[state.scene];
  const text = [scene.title, "", ...getLines(), "", els.showSignature.checked ? els.signature.value : ""]
    .filter((x) => x !== undefined && x !== "")
    .join("\n");
  try {
    await navigator.clipboard.writeText(text);
    showToast("祝词已复制到剪贴板");
  } catch {
    showToast("复制失败，请手动选择文本");
  }
}

function resizeCanvas() {
  const vw = els.previewViewport.clientWidth;
  const maxW = Math.min(vw - 32, 420);
  engine.resizeDisplay(maxW);
}

function formatTime(sec) {
  const s = Math.max(0, sec);
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  const f = Math.floor((s % 1) * 10);
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}.${f}`;
}

function setupTrimSliders(duration) {
  const step = duration > 120 ? 0.5 : 0.1;
  els.trimStart.min = 0;
  els.trimStart.max = duration;
  els.trimStart.step = step;
  els.trimEnd.min = 0;
  els.trimEnd.max = duration;
  els.trimEnd.step = step;
  els.trimStart.value = 0;
  els.trimEnd.value = duration;
  updateTrimFromUI(false);
}

function updateTrimFromUI(seekPreview = true) {
  if (!media.hasVideo()) return;
  const dur = media.duration;
  let start = Number(els.trimStart.value);
  let end = Number(els.trimEnd.value);
  const minLen = 0.5;

  if (end - start < minLen) {
    if (document.activeElement === els.trimStart) {
      end = Math.min(dur, start + minLen);
      els.trimEnd.value = end;
    } else {
      start = Math.max(0, end - minLen);
      els.trimStart.value = start;
    }
  }

  media.setTrim(start, end);

  els.trimStartVal.textContent = formatTime(start);
  els.trimEndVal.textContent = formatTime(end);
  els.trimRangeText.textContent = `${formatTime(start)} – ${formatTime(end)}`;

  const seg = end - start;
  const rate = media.playbackRate;
  els.trimDurationHint.textContent = `截取 ${seg.toFixed(1)} 秒 · ${rate.toFixed(2)}× 速约 ${(seg / rate).toFixed(1)} 秒`;

  const pctS = dur > 0 ? (start / dur) * 100 : 0;
  const pctW = dur > 0 ? ((end - start) / dur) * 100 : 100;
  els.trimActive.style.left = `${pctS}%`;
  els.trimActive.style.width = `${pctW}%`;

  if (seekPreview) {
    media.videoEl.currentTime = start;
  }

  updateDurationAutoOption();
}

function showVideoControls(show) {
  els.videoControls.hidden = !show;
}

function syncVideoControlLabels() {
  const rate = Number(els.videoSpeed.value);
  els.speedVal.textContent = `${rate.toFixed(2)}×`;
  const vol = Number(els.videoVolume.value);
  els.videoVolVal.textContent = `${Math.round(vol * 100)}%`;
}

async function onVideoUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const info = await media.loadVideo(file);
    els.videoFileName.textContent = info.name;
    els.videoFileName.classList.add("has-file");
    els.clearVideo.hidden = false;
    showVideoControls(true);
    setupTrimSliders(info.duration);
    els.videoSpeed.value = "1";
    els.videoVolume.value = "0.8";
    media.setPlaybackRate(1);
    media.setVideoVolume(0.8);
    syncVideoControlLabels();
    applyMediaToEngine();
    await media.syncPlay(true);
    pushPreview();
    updateDurationAutoOption();
    showToast(`视频已加载（${info.duration.toFixed(1)}秒），可调节速度与截取`);
  } catch (err) {
    showToast(err.message || "视频加载失败");
  }
  e.target.value = "";
}

async function onAudioUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const info = await media.loadAudio(file);
    els.audioFileName.textContent = info.name;
    els.audioFileName.classList.add("has-file");
    els.clearAudio.hidden = false;
    media.setMusicVolume(Number(els.musicVolume.value));
    updateDurationAutoOption();
    if (els.previewMusic.checked) {
      await composePlay();
    } else {
      pushPreview();
      showToast(`音乐已加载（${info.duration.toFixed(1)}秒）`);
    }
  } catch (err) {
    showToast(err.message || "音频加载失败");
  }
  e.target.value = "";
}

function onClearVideo() {
  media.clearVideo();
  els.videoFileName.textContent = "未选择";
  els.videoFileName.classList.remove("has-file");
  els.clearVideo.hidden = true;
  showVideoControls(false);
  applyMediaToEngine();
  pushPreview();
  updateDurationAutoOption();
  showToast("已移除自定义视频");
}

function onClearAudio() {
  media.clearAudio();
  stopPreviewMusic();
  els.audioFileName.textContent = "未选择";
  els.audioFileName.classList.remove("has-file");
  els.clearAudio.hidden = true;
  updateDurationAutoOption();
  showToast("已移除背景音乐");
}

function updateDurationAutoOption() {
  const autoOpt = els.videoDuration.querySelector('option[value="auto"]');
  if (media.hasVideo() || media.hasAudio()) {
    autoOpt.disabled = false;
  } else {
    if (els.videoDuration.value === "auto") els.videoDuration.value = "8";
    autoOpt.disabled = true;
  }
}

function initEvents() {
  els.customText.addEventListener("input", pushPreview);
  els.showSignature.addEventListener("change", pushPreview);
  els.signature.addEventListener("input", pushPreview);
  els.fontSize.addEventListener("input", pushPreview);
  els.letterSpacing.addEventListener("input", pushPreview);
  els.animSpeed.addEventListener("input", pushPreview);
  els.bgOverlay.addEventListener("input", pushPreview);
  els.fxOnVideo.addEventListener("input", pushPreview);
  els.fxIntensity.addEventListener("input", () => {
    engine.resetParticles();
    pushPreview();
  });

  els.musicVolume.addEventListener("input", () => {
    media.setMusicVolume(Number(els.musicVolume.value));
  });

  els.useVideoAudio.addEventListener("change", () => {
    media.setUseVideoAudio(els.useVideoAudio.checked);
    media.setVideoVolume(Number(els.videoVolume.value));
  });

  els.videoSpeed.addEventListener("input", () => {
    const rate = Number(els.videoSpeed.value);
    media.setPlaybackRate(rate);
    syncVideoControlLabels();
    updateTrimFromUI(false);
  });

  els.videoVolume.addEventListener("input", () => {
    const vol = Number(els.videoVolume.value);
    media.setVideoVolume(vol);
    syncVideoControlLabels();
  });

  els.trimStart.addEventListener("input", () => updateTrimFromUI(true));
  els.trimEnd.addEventListener("input", () => updateTrimFromUI(true));

  els.previewMusic.addEventListener("change", () => {
    if (els.previewMusic.checked && media.hasAudio()) {
      startPreviewMusicIfNeeded();
    } else {
      stopPreviewMusic();
    }
  });

  els.uploadVideo.addEventListener("change", onVideoUpload);
  els.uploadAudio.addEventListener("change", onAudioUpload);
  els.clearVideo.addEventListener("click", onClearVideo);
  els.clearAudio.addEventListener("click", onClearAudio);
  els.btnCompose.addEventListener("click", composePlay);

  els.btnReplay.addEventListener("click", replayEntranceWithToast);
  els.btnExportVideo.addEventListener("click", exportVideo);
  els.btnCopy.addEventListener("click", copyText);
  els.btnRandom.addEventListener("click", randomInspire);
  els.btnFullscreen.addEventListener("click", () => {
    document.body.classList.toggle("fullscreen-mode");
    setTimeout(resizeCanvas, 100);
  });
  window.addEventListener("resize", resizeCanvas);
}

async function init() {
  await document.fonts.ready;

  media = new MediaManager();
  engine = new EffectsEngine(els.previewCanvas);
  engine.setPreset(state.fx);
  engine.start();

  renderSceneTabs();
  renderTemplates();
  renderFxPicker();
  renderTextEffectPicker();
  syncTextareaFromTemplate();
  initEvents();
  pushPreview();
  resizeCanvas();
  updateDurationAutoOption();
}

init();
