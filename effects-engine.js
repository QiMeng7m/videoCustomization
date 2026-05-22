/**
 * 锦言 · 特效引擎
 */
export const FX_PRESETS = {
  newyear: { id: "newyear", name: "新春过年", icon: "🧧", subtitle: "金红 · 灯笼烟花", colors: ["#ffd700", "#c41e3a", "#8b0000"], bg: ["#1a0500", "#4a1010", "#8b2020"] },
  birthday: { id: "birthday", name: "生日派对", icon: "🎂", subtitle: "粉紫 · 气球蛋糕", colors: ["#ffb6c1", "#ff69b4", "#9b5a72"], bg: ["#2d1b4e", "#5c3d8a", "#ff6b9d"] },
  wedding: { id: "wedding", name: "浪漫婚礼", icon: "💒", subtitle: "玫瑰金 · 花瓣", colors: ["#f8e0e8", "#d4a574", "#9b6b7a"], bg: ["#2a1520", "#5c3040", "#8b5060"] },
  graduate: { id: "graduate", name: "青春毕业", icon: "🎓", subtitle: "深蓝 · 星辰", colors: ["#a8d4ff", "#4a90d9", "#1a3a6e"], bg: ["#0a1428", "#1a3050", "#2a5080"] },
  festival: { id: "festival", name: "端午风情", icon: "🐲", subtitle: "艾草绿 · 龙舟", colors: ["#7cb87c", "#2d6b2d", "#1a4020"], bg: ["#0a1810", "#1a3828", "#2a5840"] },
  business: { id: "business", name: "开业旺铺", icon: "🏮", subtitle: "金红 · 财源", colors: ["#ffd700", "#ff6b35", "#c41e3a"], bg: ["#1a0800", "#4a2010", "#8b3010"] },
  house: { id: "house", name: "乔迁之喜", icon: "🏠", subtitle: "暖黄 · 家居", colors: ["#ffe4a0", "#d4a050", "#8b6020"], bg: ["#1a1408", "#3a2810", "#6a4820"] },
  cyber: { id: "cyber", name: "赛博霓虹", icon: "⚡", subtitle: "霓虹 · 透视网格", colors: ["#00ccff", "#ff00ff", "#00ff88"], bg: ["#050508", "#0a1020", "#1a1030"] },
  guofeng: { id: "guofeng", name: "国风雅致", icon: "🏯", subtitle: "宣纸色 · 水墨", colors: ["#c9a86c", "#8b4513", "#2a1810"], bg: ["#1a1810", "#3a2a18", "#6a5040"] },
  romantic: { id: "romantic", name: "浪漫梦幻", icon: "💕", subtitle: "柔粉 · 光斑", colors: ["#ffc0e8", "#e8a0bf", "#9b5a72"], bg: ["#1a1020", "#3d2548", "#6a4070"] },
  dream: { id: "dream", name: "童话梦境", icon: "🫧", subtitle: "pastel · 泡泡", colors: ["#b8e0ff", "#ffb8e8", "#c8b8ff"], bg: ["#1a1830", "#3a3560", "#6a6090"] },
};

export const FX_PACKS = {
  "fx-firework-burst": { id: "fx-firework-burst", name: "烟花绽放", category: "particle" },
  "fx-confetti-classic": { id: "fx-confetti-classic", name: "彩带满屏", category: "particle" },
  "fx-aurora-bg": { id: "fx-aurora-bg", name: "极光氛围", category: "bg" },
  "fx-particle-starfield": { id: "fx-particle-starfield", name: "星空粒子", category: "bg" },
  "fx-neon-grid": { id: "fx-neon-grid", name: "霓虹网格", category: "bg" },
  "fx-shockwave-flash": { id: "fx-shockwave-flash", name: "冲击波闪光", category: "screen" },
};

const SCENE_TEMPLATES = {
  newyear: [
    { role: "title", content: "新春快乐" },
    { role: "subtitle", content: "万事如意 · 阖家幸福" },
    { role: "body", content: "龙年大吉 🐉" },
    { role: "signature", content: "敬贺" },
  ],
  birthday: [
    { role: "title", content: "火火老师生日快乐" },
    { role: "subtitle", content: "愿每一天都如花般绚烂" },
    { role: "body", content: "永远开心美丽 ✨" },
    { role: "signature", content: "敬上" },
  ],
  wedding: [
    { role: "title", content: "百年好合" },
    { role: "subtitle", content: "执子之手 与子偕老" },
    { role: "body", content: "永结同心 💍" },
    { role: "signature", content: "亲友敬贺" },
  ],
  graduate: [
    { role: "title", content: "毕业快乐" },
    { role: "subtitle", content: "前程似锦 星辰大海" },
    { role: "body", content: "不负韶华 🎓" },
    { role: "signature", content: "同窗敬上" },
  ],
  festival: [
    { role: "title", content: "端午安康" },
    { role: "subtitle", content: "粽叶飘香 龙舟竞渡" },
    { role: "body", content: "岁岁平安" },
    { role: "signature", content: "敬上" },
  ],
  business: [
    { role: "title", content: "开业大吉" },
    { role: "subtitle", content: "财源广进 客似云来" },
    { role: "body", content: "生意兴隆 🏮" },
    { role: "signature", content: "恭贺" },
  ],
  house: [
    { role: "title", content: "乔迁之喜" },
    { role: "subtitle", content: "新居落成 福地生辉" },
    { role: "body", content: "阖家欢乐" },
    { role: "signature", content: "敬贺" },
  ],
  cyber: [
    { role: "digit", content: "1008" },
    { role: "title", content: "SYSTEM ONLINE" },
    { role: "subtitle", content: "NEON WISH PROTOCOL" },
    { role: "signature", content: "// END" },
  ],
  guofeng: [
    { role: "title", content: "福寿康宁" },
    { role: "subtitle", content: "琴瑟和鸣 岁月静好" },
    { role: "body", content: "翰墨留香" },
    { role: "signature", content: "敬上" },
  ],
  romantic: [
    { role: "title", content: "愿你被世界温柔以待" },
    { role: "subtitle", content: "星河滚烫 你是人间理想" },
    { role: "body", content: "💕" },
    { role: "signature", content: "致意" },
  ],
  dream: [
    { role: "title", content: "童话成真" },
    { role: "subtitle", content: "梦想照进现实" },
    { role: "body", content: "✨🫧" },
    { role: "signature", content: "晚安" },
  ],
};

export function getSceneTemplate(sceneId) {
  return SCENE_TEMPLATES[sceneId] || SCENE_TEMPLATES.birthday;
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function easeOutBack(t) {
  const c = 1.70158;
  return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function easeOutBounce(t) {
  if (t < 1 / 2.75) return 7.5625 * t * t;
  if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
  return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
}

/** 数字出现方式 */
export const DIGIT_ENTRANCES = {
  pop: { id: "pop", name: "弹射", duration: 0.35 },
  scale: { id: "scale", name: "缩放", duration: 0.4 },
  eject: { id: "eject", name: "飞入", duration: 0.48 },
  fade: { id: "fade", name: "淡入", duration: 0.45 },
  drop: { id: "drop", name: "下落", duration: 0.42 },
  rotate: { id: "rotate", name: "旋转", duration: 0.45 },
};

/** 数字最低不透明度，避免入场/闪烁时几乎看不见 */
const DIGIT_ALPHA_MIN = 0.9;

/** 数字持续效果（入场结束后） */
export const DIGIT_LOOP_EFFECTS = {
  none: { id: "none", name: "无" },
  float: { id: "float", name: "漂浮" },
  blink: { id: "blink", name: "闪烁" },
  heartbeat: { id: "heartbeat", name: "心跳" },
  shimmer: { id: "shimmer", name: "流光" },
  glow: { id: "glow", name: "光晕" },
};

function computeDigitMotion(d, i, globalTime, entrance, loopEffect) {
  const cfg = DIGIT_ENTRANCES[entrance] || DIGIT_ENTRANCES.pop;
  const p = Math.min(1, d.t / cfg.duration);
  let scale = 1;
  let alpha = 1;
  let offsetX = 0;
  let offsetY = 0;
  let rotation = 0;
  let glow = 20;

  switch (entrance) {
    case "scale":
      scale = easeOutCubic(p) * 1.05;
      break;
    case "eject":
      scale = 0.35 + easeOutBack(p) * 0.7;
      offsetY = (1 - p) * 0.14;
      offsetX = (1 - p) * 0.06 * (i % 2 === 0 ? 1 : -1);
      break;
    case "fade":
      alpha = 0.88 + 0.12 * easeOutCubic(p);
      scale = 0.92 + p * 0.13;
      break;
    case "drop":
      scale = 0.45 + easeOutBounce(p) * 0.6;
      offsetY = -(1 - p) * 0.12;
      break;
    case "rotate":
      rotation = (1 - p) * Math.PI * 2;
      scale = easeOutCubic(p) * 1.05;
      break;
    case "pop":
    default:
      scale = 0.82 + easeOutBack(p) * 0.28;
      break;
  }

  if (p < 1) {
    alpha = Math.max(DIGIT_ALPHA_MIN, alpha);
    scale = Math.max(0.78, scale);
  }

  if (p >= 1) {
    const t = globalTime;
    switch (loopEffect) {
      case "blink":
        alpha *= 0.9 + 0.1 * (0.5 + 0.5 * Math.sin(t * 5 + i * 1.2));
        break;
      case "heartbeat": {
        const beat = Math.sin(t * 5 + i * 0.4);
        scale *= 1 + 0.1 * Math.max(0, beat) ** 2;
        break;
      }
      case "shimmer":
        glow = 18 + Math.sin(t * 4 + i) * 12;
        scale *= 1 + Math.sin(t * 3 + i) * 0.02;
        break;
      case "glow":
        glow = 14 + Math.sin(t * 3.5 + i * 0.8) * 16;
        break;
      case "float":
        offsetY += Math.sin(t * 3 + i) * 0.012;
        scale *= 1 + Math.sin(t * 2.5 + i) * 0.025;
        break;
      case "none":
      default:
        break;
    }
  }

  alpha = Math.max(DIGIT_ALPHA_MIN, Math.min(1, alpha));
  glow = Math.max(22, glow);

  return { scale, alpha, offsetX, offsetY, rotation, glow };
}

export class EffectsEngine {
  constructor() {
    this.themeId = "birthday";
    this.fxPackIds = ["fx-firework-burst", "fx-particle-starfield"];
    this.intensity = 1;
    this.particles = [];
    this.fireworks = [];
    this.confetti = [];
    this.stars = [];
    this.shockwaves = [];
    this.digitState = { chars: [], index: 0, timer: 0, done: false, playing: false };
    this.screenFlash = 0;
    this.screenShake = 0;
    this.time = 0;
    this.digitString = "";
    this.digitEntrance = "pop";
    this.digitLoopEffect = "float";
    this._initStars();
  }

  setDigitAnim(entrance, loopEffect) {
    if (DIGIT_ENTRANCES[entrance]) this.digitEntrance = entrance;
    if (DIGIT_LOOP_EFFECTS[loopEffect]) this.digitLoopEffect = loopEffect;
  }

  _initStars() {
    for (let i = 0; i < 60; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random(),
        r: rand(0.5, 2),
        vy: rand(0.0002, 0.0008),
        a: rand(0.3, 1),
      });
    }
  }

  setTheme(themeId) {
    this.themeId = FX_PRESETS[themeId] ? themeId : "birthday";
  }

  setFxPacks(ids) {
    this.fxPackIds = ids.length ? ids : ["fx-particle-starfield"];
  }

  setIntensity(v) {
    this.intensity = Math.max(0.4, Math.min(1.5, v));
  }

  hasPack(id) {
    return this.fxPackIds.includes(id);
  }

  reset() {
    this.particles = [];
    this.fireworks = [];
    this.confetti = [];
    this.shockwaves = [];
    this.digitState = { chars: [], index: 0, timer: 0, done: false, playing: false };
    this.screenFlash = 0;
    this.screenShake = 0;
    this.time = 0;
  }

  replay(digitStr = "") {
    this.reset();
    this.digitString = String(digitStr || "").replace(/\D/g, "").slice(0, 8);
    this.digitState.playing = this.digitString.length > 0;
    if (this.hasPack("fx-confetti-classic")) this._spawnConfetti(14, true);
  }

  update(dt, w, h) {
    this.time += dt;
    const cap = Math.floor(120 * this.intensity);

    if (this.hasPack("fx-particle-starfield") || this.hasPack("fx-aurora-bg")) {
      for (const s of this.stars) {
        s.y -= s.vy * dt * 60;
        if (s.y < 0) s.y = 1;
      }
    }

    if (this.hasPack("fx-firework-burst") && Math.random() < 0.02 * this.intensity) {
      this._spawnFirework(w * rand(0.2, 0.8), h * rand(0.15, 0.45));
    }

    const confettiCap = Math.floor(50 * this.intensity);
    if (this.hasPack("fx-confetti-classic") && this.confetti.length < confettiCap && Math.random() < 0.014 * this.intensity) {
      this._spawnConfetti(1);
    }

    if (this.digitState.playing) {
      this.digitState.timer += dt;
      const delay = 0.45 / this.intensity;
      if (this.digitState.timer >= delay && this.digitState.index < this.digitString.length) {
        const ch = this.digitString[this.digitState.index];
        this.digitState.chars.push({
          char: ch,
          t: 0,
          x: 0.5 + (this.digitState.index - (this.digitString.length - 1) / 2) * 0.13,
          y: 0.28,
        });
        if (this.hasPack("fx-shockwave-flash")) {
          this.shockwaves.push({ x: 0.5, y: 0.28, r: 0, life: 1 });
          this.screenFlash = 0.35;
        }
        this._spawnBurst(0.5, 0.28, 18);
        this.digitState.index++;
        this.digitState.timer = 0;
      }
      if (this.digitState.index >= this.digitString.length) this.digitState.done = true;
    }

    for (const c of this.digitState.chars) c.t += dt;

    for (const fw of this.fireworks) {
      fw.life -= dt * 1.2;
      for (const p of fw.parts) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 280 * dt;
        p.life -= dt;
      }
    }
    this.fireworks = this.fireworks.filter((f) => f.life > 0);

    for (const p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 120 * dt;
      p.life -= dt;
    }
    this.particles = this.particles.filter((p) => p.life > 0);

    for (const c of this.confetti) {
      c.age = (c.age || 0) + dt;
      c.vy = Math.min(c.vy + c.ay * dt, c.vyMax);
      const sway = Math.sin(c.age * c.sway) * c.swayAmp;
      c.x += (c.vx + sway) * dt;
      c.y += c.vy * dt;
      c.rot += c.vr * dt;
      if (c.y > 0.82) c.life -= dt * 0.55;
      if (c.y > 1.15 || c.life <= 0) c.life = 0;
    }
    this.confetti = this.confetti.filter((c) => c.life > 0);

    for (const sw of this.shockwaves) {
      sw.r += dt * 0.8;
      sw.life -= dt * 1.5;
    }
    this.shockwaves = this.shockwaves.filter((s) => s.life > 0);

    if (this.screenFlash > 0) this.screenFlash -= dt * 2;
    if (this.screenShake > 0) this.screenShake -= dt * 3;
  }

  _spawnFirework(x, y) {
    const parts = [];
    const n = Math.floor(20 * this.intensity);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const sp = rand(80, 200);
      parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: rand(0.5, 1), color: `hsl(${rand(0, 360)},90%,65%)` });
    }
    this.fireworks.push({ parts, life: 1 });
  }

  _spawnBurst(nx, ny, count) {
    for (let i = 0; i < count; i++) {
      const a = rand(0, Math.PI * 2);
      const sp = rand(60, 180);
      this.particles.push({
        x: nx,
        y: ny,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        life: rand(0.3, 0.8),
        size: rand(2, 5),
        color: FX_PRESETS[this.themeId]?.colors[i % 3] || "#ffb6c1",
      });
    }
  }

  _spawnConfetti(n, burst = false) {
    const colors = FX_PRESETS[this.themeId]?.colors || ["#ffb6c1", "#ff69b4", "#ffd700"];
    const extras = burst ? ["#fff5f7", "#ffffff88"] : [];
    const palette = [...colors, ...extras];
    for (let i = 0; i < n; i++) {
      const ribbon = Math.random() < 0.5;
      this.confetti.push({
        x: rand(0.02, 0.98),
        y: rand(-0.14, -0.03),
        vx: rand(-0.028, 0.028),
        vy: rand(0.035, 0.09),
        vyMax: rand(0.11, 0.2),
        ay: rand(0.008, 0.018),
        w: ribbon ? rand(3, 5) : rand(5, 9),
        h: ribbon ? rand(14, 24) : rand(5, 9),
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.6, 0.6),
        sway: rand(0.6, 1.8),
        swayAmp: rand(0.006, 0.016),
        alpha: rand(0.55, 0.95),
        age: rand(0, burst ? 0.6 : 0),
        life: 1,
        ribbon,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }
  }

  draw(ctx, w, h, textLines, opts = {}) {
    this.drawBackground(ctx, w, h);
    this.drawEffectsLayer(ctx, w, h, opts);
    this.drawTextLayer(ctx, w, h, textLines, opts);
  }

  _shakeOffset() {
    if (this.screenShake <= 0) return { x: 0, y: 0 };
    return {
      x: (Math.random() - 0.5) * 8 * this.screenShake,
      y: (Math.random() - 0.5) * 8 * this.screenShake,
    };
  }

  drawBackground(ctx, w, h) {
    const theme = FX_PRESETS[this.themeId] || FX_PRESETS.birthday;
    const { x: shakeX, y: shakeY } = this._shakeOffset();
    ctx.save();
    ctx.translate(shakeX, shakeY);

    const g = ctx.createLinearGradient(0, 0, w, h);
    theme.bg.forEach((c, i) => g.addColorStop(i / (theme.bg.length - 1), c));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    if (this.hasPack("fx-aurora-bg")) {
      const t = this.time * 0.3;
      const ag = ctx.createRadialGradient(w * 0.5 + Math.sin(t) * 40, h * 0.2, 0, w * 0.5, h * 0.3, w * 0.8);
      ag.addColorStop(0, theme.colors[0] + "44");
      ag.addColorStop(1, "transparent");
      ctx.fillStyle = ag;
      ctx.fillRect(0, 0, w, h);
    }

    if (this.hasPack("fx-neon-grid")) {
      ctx.strokeStyle = "#00ccff22";
      ctx.lineWidth = 1;
      const gridSize = 28;
      const offset = (this.time * 40) % gridSize;
      for (let x = -offset; x < w + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(x + h * 0.3, 0);
        ctx.stroke();
      }
    }

    if (this.hasPack("fx-particle-starfield")) {
      for (const s of this.stars) {
        ctx.globalAlpha = s.a;
        ctx.fillStyle = theme.colors[0];
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  drawEffectsLayer(ctx, w, h, opts = {}) {
    const theme = FX_PRESETS[this.themeId] || FX_PRESETS.birthday;
    const fxOpacity = opts.fxOpacity ?? 1;
    const { x: shakeX, y: shakeY } = this._shakeOffset();
    ctx.save();
    ctx.translate(shakeX, shakeY);
    ctx.globalAlpha = fxOpacity;

    for (const c of this.confetti) {
      const fadeIn = Math.min(1, (c.age || 0) * 1.8);
      const fadeOut = c.y > 0.7 ? Math.max(0, 1 - (c.y - 0.7) / 0.38) : 1;
      ctx.save();
      ctx.globalAlpha = fxOpacity * (c.alpha ?? 1) * fadeIn * fadeOut * Math.max(0, c.life);
      ctx.translate(c.x * w, c.y * h);
      ctx.rotate(c.rot);
      ctx.fillStyle = c.color;
      if (c.ribbon) {
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.globalAlpha *= 0.45;
        ctx.fillRect(-c.w / 2 + 1, -c.h / 2, Math.max(1, c.w - 2), c.h);
      } else {
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
      }
      ctx.restore();
    }

    for (const fw of this.fireworks) {
      for (const p of fw.parts) {
        if (p.life <= 0) continue;
        ctx.globalAlpha = p.life * fxOpacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (const p of this.particles) {
      ctx.globalAlpha = p.life * fxOpacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const sw of this.shockwaves) {
      ctx.strokeStyle = theme.colors[0] + "88";
      ctx.lineWidth = 3;
      ctx.globalAlpha = sw.life * fxOpacity;
      ctx.beginPath();
      ctx.arc(sw.x * w, sw.y * h, sw.r * w * 0.5, 0, Math.PI * 2);
      ctx.stroke();
    }

    const cyber = this.themeId === "cyber";

    if (this.digitState.chars.length) {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const baseFs = h * 0.14;
      for (let i = 0; i < this.digitState.chars.length; i++) {
        const d = this.digitState.chars[i];
        const motion = computeDigitMotion(d, i, this.time, this.digitEntrance, this.digitLoopEffect);
        const fs = baseFs * motion.scale;
        ctx.save();
        ctx.translate(d.x * w + motion.offsetX * w, d.y * h + motion.offsetY * h);
        ctx.rotate(motion.rotation);
        ctx.globalAlpha = fxOpacity * motion.alpha;
        ctx.font = `900 ${fs}px "Segoe UI", sans-serif`;
        const shimmerShift = this.digitLoopEffect === "shimmer" ? Math.sin(this.time * 4 + i) * 0.25 : 0;
        if (cyber) {
          const lg = ctx.createLinearGradient(-fs, 0, fs, 0);
          lg.addColorStop(0, "#00ccff");
          lg.addColorStop(0.45 + shimmerShift, "#ff00ff");
          lg.addColorStop(1, "#00ff88");
          ctx.fillStyle = lg;
          ctx.shadowColor = "#00ccff";
        } else {
          const lg = ctx.createLinearGradient(-fs, 0, fs, 0);
          lg.addColorStop(0, "#fff");
          lg.addColorStop(0.45 + shimmerShift, theme.colors[0]);
          lg.addColorStop(1, theme.colors[1]);
          ctx.fillStyle = lg;
          ctx.shadowColor = theme.colors[1];
        }
        ctx.shadowBlur = motion.glow;
        ctx.lineWidth = Math.max(2, fs * 0.06);
        ctx.strokeStyle = cyber ? "rgba(0, 10, 30, 0.55)" : "rgba(40, 10, 30, 0.45)";
        ctx.lineJoin = "round";
        ctx.strokeText(d.char, 0, 0);
        ctx.fillText(d.char, 0, 0);
        ctx.restore();
      }
    }

    if (this.screenFlash > 0) {
      ctx.globalAlpha = this.screenFlash * 0.5;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, w, h);
    }

    ctx.restore();
  }

  drawTextLayer(ctx, w, h, textLines, opts = {}) {
    const theme = FX_PRESETS[this.themeId] || FX_PRESETS.birthday;
    const textOpacity = opts.textOpacity ?? 1;
    const { x: shakeX, y: shakeY } = this._shakeOffset();
    ctx.save();
    ctx.translate(shakeX, shakeY);

    const hasDigits = this.digitString.length > 0;
    const roleStyle = hasDigits
      ? {
          title: { size: 0.065, weight: "700", y: 0.68 },
          subtitle: { size: 0.028, weight: "400", y: 0.76, spacing: 0.15 },
          body: { size: 0.032, weight: "500", y: 0.84 },
          signature: { size: 0.024, weight: "400", y: 0.92 },
        }
      : {
          title: { size: 0.065, weight: "700", y: 0.58 },
          subtitle: { size: 0.028, weight: "400", y: 0.66, spacing: 0.15 },
          body: { size: 0.032, weight: "500", y: 0.74 },
          signature: { size: 0.024, weight: "400", y: 0.86 },
        };

    ctx.globalAlpha = textOpacity;
    ctx.textAlign = "center";
    for (const line of textLines) {
      if (!line.visible || !line.content?.trim()) continue;
      if (line.role === "digit") continue;
      const rs = roleStyle[line.role] || roleStyle.body;
      const ly = hasDigits ? rs.y : (line.layout?.y ?? rs.y);
      const fs = (line.style?.fontSize || rs.size * h);
      ctx.font = `${line.style?.fontWeight || rs.weight} ${fs}px ${line.style?.fontFamily || '"PingFang SC","Microsoft YaHei",sans-serif'}`;
      const alpha = (line.style?.opacity ?? 1) * textOpacity;
      ctx.globalAlpha = alpha;

      if (line.animation?.preset === "shimmer" && line.role === "title") {
        const t = this.time * 0.5;
        const lg = ctx.createLinearGradient(-w, 0, w, 0);
        lg.addColorStop(0, theme.colors[0]);
        lg.addColorStop(0.5 + Math.sin(t) * 0.2, "#fff");
        lg.addColorStop(1, theme.colors[1]);
        ctx.fillStyle = lg;
      } else if (line.style?.gradient?.length) {
        const lg = ctx.createLinearGradient(0, ly * h - fs, 0, ly * h);
        line.style.gradient.forEach((c, i) => lg.addColorStop(i / (line.style.gradient.length - 1), c));
        ctx.fillStyle = lg;
      } else {
        ctx.fillStyle = line.style?.color || "#fff5f7";
      }

      if (line.style?.shadow) {
        ctx.shadowColor = theme.colors[1] + "88";
        ctx.shadowBlur = 12;
      }

      const fade = line.animation?.preset === "fadeUp" ? Math.min(1, (this.time - (line.animation.delayMs || 0) / 1000) / 0.8) : 1;
      ctx.globalAlpha = alpha * fade;
      const letterSpacing = (line.style?.letterSpacing || (rs.spacing ? rs.spacing * fs : 0));
      const text = line.content;
      if (letterSpacing) {
        let totalW = 0;
        for (const ch of text) totalW += ctx.measureText(ch).width + letterSpacing;
        let x = w / 2 - totalW / 2;
        for (const ch of text) {
          ctx.fillText(ch, x + ctx.measureText(ch).width / 2, ly * h);
          x += ctx.measureText(ch).width + letterSpacing;
        }
      } else {
        ctx.fillText(text, w / 2, ly * h);
      }
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }
}
