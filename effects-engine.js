/**
 * Canvas 祝词特效引擎 — 主题风格（过年/生日/赛博等）
 */
export const FX_CATEGORIES = [
  {
    id: "fest",
    label: "节庆贺岁",
    themes: ["newyear", "birthday", "festival", "business"],
  },
  {
    id: "life",
    label: "人生喜事",
    themes: ["wedding", "graduate", "house"],
  },
  {
    id: "visual",
    label: "视觉风格",
    themes: ["cyber", "guofeng", "romantic", "dream"],
  },
];

/** 主题风格预设：effect 字段驱动粒子与背景逻辑 */
export const FX_PRESETS = {
  newyear: {
    id: "newyear",
    label: "新春过年",
    subtitle: "灯笼烟花·金红贺岁",
    icon: "🧧",
    category: "fest",
    effect: "newyear",
    matchScenes: ["newyear"],
    bg: ["#6b0f0f", "#9b1c1c", "#3d0808"],
    accent: "#ffd700",
    accent2: "#ff4444",
    textColor: "#fff8dc",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
    seal: "福",
  },
  birthday: {
    id: "birthday",
    label: "生日派对",
    subtitle: "气球彩带·蛋糕烛光",
    icon: "🎂",
    category: "fest",
    effect: "birthday",
    matchScenes: ["birthday"],
    bg: ["#2d1b4e", "#5c3d8a", "#ff6b9d"],
    accent: "#ffb7d5",
    accent2: "#7bed9f",
    textColor: "#fff5fb",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
    seal: "乐",
  },
  festival: {
    id: "festival",
    label: "端午风情",
    subtitle: "艾草龙舟·清香绿意",
    icon: "🐲",
    category: "fest",
    effect: "festival",
    matchScenes: ["festival"],
    bg: ["#0d3320", "#1a4d32", "#2d6a4f"],
    accent: "#95d5b2",
    accent2: "#f4d03f",
    textColor: "#e8fff0",
    titleFont: "Noto Serif SC",
    bodyFont: "Noto Serif SC",
    seal: "安",
  },
  business: {
    id: "business",
    label: "开业旺运",
    subtitle: "金字红光·财源广进",
    icon: "📈",
    category: "fest",
    effect: "business",
    matchScenes: ["business"],
    bg: ["#1a0500", "#4a1500", "#8b2500"],
    accent: "#ffd700",
    accent2: "#ff6b35",
    textColor: "#fff5d6",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
    seal: "财",
  },
  wedding: {
    id: "wedding",
    label: "浪漫婚礼",
    subtitle: "玫瑰金粉·花瓣飘落",
    icon: "💒",
    category: "life",
    effect: "wedding",
    matchScenes: ["wedding"],
    bg: ["#3d1f2e", "#6b3a52", "#9b5a72"],
    accent: "#f8c8dc",
    accent2: "#e8b4b8",
    textColor: "#fff5f7",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
    seal: "囍",
  },
  graduate: {
    id: "graduate",
    label: "青春毕业",
    subtitle: "学士帽·星辰大海",
    icon: "🎓",
    category: "life",
    effect: "graduate",
    matchScenes: ["graduate"],
    bg: ["#0a1628", "#1a2d4a", "#2a4a6e"],
    accent: "#74c0fc",
    accent2: "#ffd43b",
    textColor: "#e7f5ff",
    titleFont: "Noto Serif SC",
    bodyFont: "Noto Serif SC",
    seal: "成",
  },
  house: {
    id: "house",
    label: "乔迁之喜",
    subtitle: "暖居祥云·阖家欢乐",
    icon: "🏠",
    category: "life",
    effect: "guofeng",
    matchScenes: ["house"],
    bg: ["#4a3728", "#6b5344", "#8b7355"],
    accent: "#f4d03f",
    accent2: "#e8c49a",
    textColor: "#fff8e7",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
    seal: "吉",
  },
  cyber: {
    id: "cyber",
    label: "赛博朋克",
    subtitle: "霓虹网格·数字幻雨",
    icon: "🌃",
    category: "visual",
    effect: "cyber",
    matchScenes: ["general"],
    bg: ["#030014", "#0a0520", "#1a0a3a"],
    accent: "#00f5ff",
    accent2: "#ff00ff",
    textColor: "#e0ffff",
    titleFont: "ZCOOL XiaoWei",
    bodyFont: "Noto Serif SC",
    seal: "码",
  },
  guofeng: {
    id: "guofeng",
    label: "国风雅韵",
    subtitle: "水墨朱砂·祥云金光",
    icon: "🏮",
    category: "visual",
    effect: "guofeng",
    matchScenes: ["general", "newyear"],
    bg: ["#1a0a0a", "#4a1818", "#2d1212"],
    accent: "#c9a227",
    accent2: "#8b4513",
    textColor: "#f5e6c8",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
    seal: "雅",
  },
  romantic: {
    id: "romantic",
    label: "甜蜜告白",
    subtitle: "爱心泡泡·粉紫浪漫",
    icon: "💕",
    category: "visual",
    effect: "hearts",
    matchScenes: ["wedding", "birthday"],
    bg: ["#2d0a1e", "#5c1a3a", "#8b2f5a"],
    accent: "#ff6b9d",
    accent2: "#ffc9de",
    textColor: "#ffe4ec",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
    seal: "爱",
  },
  dream: {
    id: "dream",
    label: "梦幻极光",
    subtitle: "极光星空·流光溢彩",
    icon: "🌌",
    category: "visual",
    effect: "aurora",
    matchScenes: ["general"],
    bg: ["#020810", "#041525", "#062035"],
    accent: "#7bffb3",
    accent2: "#a78bfa",
    textColor: "#e8fff0",
    titleFont: "ZCOOL XiaoWei",
    bodyFont: "Noto Serif SC",
    seal: "梦",
  },
};

export const SCENE_TO_FX = {
  newyear: "newyear",
  birthday: "birthday",
  wedding: "wedding",
  graduate: "graduate",
  house: "house",
  business: "business",
  festival: "festival",
  general: "guofeng",
};

export class EffectsEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.W = canvas.width;
    this.H = canvas.height;
    this.preset = FX_PRESETS.newyear;
    this.particles = [];
    this.stars = [];
    this.matrixCols = [];
    this.fireworks = [];
    this.content = { title: "", lines: [], signature: "", showSignature: true };
    this.fontSize = 28;
    this.letterSpacing = 2;
    this.speed = 1;
    this.textEffect = "fade";
    this.intensity = 1;
    this.time = 0;
    this.revealProgress = 0;
    this.running = false;
    this._raf = null;
    this.bgVideo = null;
    this.bgOverlay = 0.4;
    this.fxLayerOpacity = 0.85;
    this._initStars();
  }

  setBackgroundVideo(videoEl, options = {}) {
    this.bgVideo = videoEl || null;
    if (options.overlay != null) this.bgOverlay = options.overlay;
    if (options.fxOpacity != null) this.fxLayerOpacity = options.fxOpacity;
  }

  _fx() {
    return this.preset.effect || this.preset.id;
  }

  setPreset(id) {
    this.preset = FX_PRESETS[id] || FX_PRESETS.newyear;
    this.resetParticles();
  }

  setContent(content) {
    this.content = { ...this.content, ...content };
    this.resetReveal();
  }

  setOptions({ fontSize, letterSpacing, speed, textEffect, intensity }) {
    if (fontSize != null) this.fontSize = fontSize;
    if (letterSpacing != null) this.letterSpacing = letterSpacing;
    if (speed != null) this.speed = speed;
    if (textEffect != null) this.textEffect = textEffect;
    if (intensity != null) this.intensity = intensity;
  }

  resetReveal() {
    this.revealProgress = 0;
    this.time = 0;
  }

  resetParticles() {
    this.particles = [];
    this.fireworks = [];
    this._initStars();
    this._initMatrix();
    const n = Math.floor(80 * this.intensity);
    for (let i = 0; i < n; i++) this._spawnParticle();
  }

  _initStars() {
    this.stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      z: Math.random(),
      size: Math.random() * 2 + 0.5,
    }));
  }

  _initMatrix() {
    const cols = Math.floor(this.W / 18);
    this.matrixCols = Array.from({ length: cols }, (_, i) => ({
      x: i * 18,
      y: Math.random() * this.H,
      speed: 2 + Math.random() * 4,
      chars: this._randChars(8),
    }));
  }

  _randChars(n) {
    const pool = "福喜乐安祥瑞龙凤财寿喜恭贺祝福";
    return Array.from({ length: n }, () => pool[Math.floor(Math.random() * pool.length)]);
  }

  _spawnParticle() {
    const fx = this._fx();
    const p = this.preset;
    const base = {
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      life: Math.random(),
      hue: Math.random() * 360,
      kind: "dot",
    };

    if (fx === "newyear" || fx === "guofeng" || fx === "business") {
      base.y = -5;
      base.vy = 0.3 + Math.random() * 0.5;
      base.hue = fx === "business" ? 45 : 48;
      base.kind = "gold";
    } else if (fx === "birthday") {
      base.y = -10;
      base.vx = (Math.random() - 0.5) * 4;
      base.hue = Math.random() * 360;
      base.kind = Math.random() > 0.4 ? "confetti" : "balloon";
      if (base.kind === "balloon") base.size = 8 + Math.random() * 12;
    } else if (fx === "hearts" || fx === "wedding") {
      base.y = this.H + Math.random() * 50;
      base.vy = -0.4 - Math.random() * 0.4;
      base.kind = fx === "wedding" && Math.random() > 0.5 ? "petal" : "heart";
      base.hue = 330 + Math.random() * 30;
    } else if (fx === "festival") {
      base.kind = Math.random() > 0.5 ? "leaf" : "dot";
      base.vy = 0.2 + Math.random() * 0.3;
      base.hue = 120 + Math.random() * 40;
    } else if (fx === "graduate") {
      base.kind = "star";
      base.z = Math.random();
    } else if (fx === "cyber") {
      base.kind = "neon";
      base.hue = Math.random() > 0.5 ? 180 : 300;
    } else if (fx === "aurora") {
      base.kind = "dot";
    }

    this.particles.push(base);
  }

  _spawnFirework() {
    const x = this.W * (0.2 + Math.random() * 0.6);
    this.fireworks.push({
      x,
      y: this.H,
      ty: this.H * (0.15 + Math.random() * 0.35),
      vy: -8 - Math.random() * 4,
      exploded: false,
      sparks: [],
      hue: Math.random() * 60 + 10,
    });
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = (t) => {
      if (!this.running) return;
      this._tick(t);
      this._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  getStream(fps = 30) {
    return this.canvas.captureStream(fps);
  }

  _tick(t) {
    const dt = 0.016 * this.speed;
    this.time += dt;
    this.revealProgress = Math.min(1, this.revealProgress + dt * 0.35 * this.speed);

    this._update(dt);
    this._draw();
  }

  _update(dt) {
    const fx = this._fx();
    const cap = Math.floor(200 * this.intensity);

    while (this.particles.length < cap) this._spawnParticle();

    if (fx === "newyear" && Math.random() < 0.045 * this.intensity) this._spawnFirework();
    if (fx === "birthday" && Math.random() < 0.02 * this.intensity) {
      this._spawnFirework();
      this.fireworks[this.fireworks.length - 1].hue = Math.random() * 360;
    }

    this.fireworks.forEach((fw) => {
      if (!fw.exploded) {
        fw.y += fw.vy * dt * 60;
        if (fw.y <= fw.ty) {
          fw.exploded = true;
          for (let i = 0; i < 50; i++) {
            const a = (Math.PI * 2 * i) / 50 + Math.random() * 0.2;
            const sp = 2 + Math.random() * 5;
            fw.sparks.push({
              x: fw.x,
              y: fw.y,
              vx: Math.cos(a) * sp,
              vy: Math.sin(a) * sp,
              life: 1,
              hue: fw.hue + Math.random() * 40,
            });
          }
        }
      } else {
        fw.sparks.forEach((s) => {
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.08;
          s.life -= 0.018;
        });
        fw.sparks = fw.sparks.filter((s) => s.life > 0);
      }
    });
    this.fireworks = this.fireworks.filter((fw) => !fw.exploded || fw.sparks.length > 0);

    this.particles.forEach((p) => {
      const k = p.kind || "dot";
      if (k === "gold") {
          p.vy += 0.02;
          p.y += p.vy;
          p.x += Math.sin(this.time * 2 + p.life * 10) * 0.5;
          if (p.y > this.H) {
            p.y = -5;
            p.x = Math.random() * this.W;
          }
          p.life += 0.01;
      } else if (k === "confetti" || k === "balloon") {
          p.vy += k === "balloon" ? 0.01 : 0.05;
          p.y += p.vy;
          p.x += p.vx + Math.sin(this.time + p.life * 3) * (k === "balloon" ? 0.8 : 0.2);
          if (p.y > this.H) {
            p.y = -10;
            p.x = Math.random() * this.W;
            p.vx = (Math.random() - 0.5) * 3;
            p.vy = k === "balloon" ? -0.2 : 0;
          }
      } else if (k === "heart" || k === "petal") {
          p.y += p.vy;
          p.x += Math.sin(this.time * 1.5 + p.life * 8) * 0.6;
          if (p.y < -20) {
            p.y = this.H + 10;
            p.x = Math.random() * this.W;
          }
      } else if (k === "leaf") {
          p.y += p.vy;
          p.x += Math.sin(this.time * 2 + p.life * 6) * 0.8;
          if (p.y > this.H) {
            p.y = -5;
            p.x = Math.random() * this.W;
          }
      } else if (k === "star") {
          p.z = (p.z || 0) + 0.015;
          if (p.z > 1) p.z = 0;
      } else if (k === "neon") {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > this.W) p.vx *= -1;
          if (p.y < 0 || p.y > this.H) p.vy *= -1;
          p.life += 0.05;
      } else {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > this.W) p.vx *= -1;
          if (p.y < 0 || p.y > this.H) p.vy *= -1;
      }
    });

    if (fx === "cyber") {
      this.matrixCols.forEach((col) => {
        col.y += col.speed * dt * 60;
        if (col.y > this.H + 100) {
          col.y = -100;
          col.chars = this._randChars(8);
        }
        if (Math.random() < 0.02) col.chars[Math.floor(Math.random() * col.chars.length)] = this._randChars(1)[0];
      });
    }

    if (fx === "graduate") {
      this.stars.forEach((s) => {
        s.z -= 0.008 * this.speed;
        if (s.z <= 0) {
          s.z = 1;
          s.x = this.W / 2 + (Math.random() - 0.5) * 20;
          s.y = this.H / 2 + (Math.random() - 0.5) * 20;
        }
      });
    }
  }

  _drawVideoBg() {
    const { ctx, W, H } = this;
    const v = this.bgVideo;
    if (!v || v.readyState < 2) {
      this._drawBg();
      return;
    }

    const vw = v.videoWidth || W;
    const vh = v.videoHeight || H;
    const scale = Math.max(W / vw, H / vh);
    const dw = vw * scale;
    const dh = vh * scale;
    const dx = (W - dw) / 2;
    const dy = (H - dh) / 2;

    ctx.drawImage(v, dx, dy, dw, dh);

    if (this.bgOverlay > 0) {
      ctx.fillStyle = `rgba(0,0,0,${this.bgOverlay})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  _drawBg() {
    const { ctx, W, H } = this;
    const [c0, c1, c2] = this.preset.bg;
    const g = ctx.createLinearGradient(0, 0, W * 0.3, H);
    g.addColorStop(0, c0);
    g.addColorStop(0.5, c1);
    g.addColorStop(1, c2);

    if (this._fx() === "aurora") {
      ctx.fillStyle = c0;
      ctx.fillRect(0, 0, W, H);
      const t = this.time;
      for (let i = 0; i < 3; i++) {
        const ag = ctx.createLinearGradient(0, H * 0.2, W, H * 0.8);
        ag.addColorStop(0, "transparent");
        ag.addColorStop(0.5, `hsla(${140 + i * 40 + Math.sin(t + i) * 30}, 80%, 55%, 0.15)`);
        ag.addColorStop(1, "transparent");
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = ag;
        ctx.beginPath();
        ctx.moveTo(0, H * 0.3 + Math.sin(t * 0.8 + i) * 40);
        ctx.bezierCurveTo(W * 0.3, H * 0.2, W * 0.7, H * 0.6, W, H * 0.4 + Math.cos(t + i) * 30);
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      return;
    }

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    if (this._fx() === "cyber") {
      ctx.strokeStyle = "rgba(0, 245, 255, 0.06)";
      ctx.lineWidth = 1;
      const off = (this.time * 40) % 40;
      for (let y = off; y < H; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      const scanY = (this.time * 120) % H;
      const sg = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      sg.addColorStop(0, "transparent");
      sg.addColorStop(0.5, "rgba(0, 245, 255, 0.12)");
      sg.addColorStop(1, "transparent");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 30, W, 60);
    }

    this._drawThemeDecor();
  }

  _drawThemeDecor() {
    const { ctx, W, H } = this;
    const fx = this._fx();
    const p = this.preset;
    const t = this.time;

    if (fx === "newyear") {
      for (let i = 0; i < 3; i++) {
        const lx = W * (0.15 + i * 0.35);
        const ly = H * 0.08 + Math.sin(t + i) * 6;
        ctx.fillStyle = `rgba(255, 68, 68, ${0.35 + Math.sin(t * 2 + i) * 0.15})`;
        ctx.beginPath();
        ctx.ellipse(lx, ly, 18, 24, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255, 215, 0, 0.5)";
        ctx.fillRect(lx - 14, ly - 28, 28, 8);
      }
      ctx.font = `120px "Ma Shan Zheng", cursive`;
      ctx.fillStyle = "rgba(255, 215, 0, 0.06)";
      ctx.textAlign = "center";
      ctx.fillText("福", W / 2, H * 0.55);
    } else if (fx === "birthday") {
      for (let i = 0; i < 8; i++) {
        const bx = (W / 8) * i + 30;
        const by = H * 0.12 + Math.sin(t * 1.5 + i) * 8;
        ctx.fillStyle = `hsla(${(i * 45) % 360}, 70%, 65%, 0.2)`;
        ctx.beginPath();
        ctx.arc(bx, by, 6 + (i % 3) * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (fx === "cyber") {
      ctx.strokeStyle = "rgba(255, 0, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 30, H);
        ctx.stroke();
      }
    } else if (fx === "wedding") {
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = `rgba(248, 200, 220, ${0.08 + i * 0.02})`;
        ctx.beginPath();
        ctx.arc(W * Math.random(), H * Math.random(), 40 + i * 20, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (fx === "festival") {
      ctx.strokeStyle = "rgba(149, 213, 178, 0.15)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, H * 0.85);
      for (let x = 0; x <= W; x += 40) {
        ctx.quadraticCurveTo(x + 20, H * 0.8 + Math.sin(t + x * 0.01) * 15, x + 40, H * 0.85);
      }
      ctx.stroke();
    } else if (fx === "business") {
      ctx.font = `64px "Ma Shan Zheng", cursive`;
      ctx.fillStyle = "rgba(255, 215, 0, 0.07)";
      ctx.textAlign = "center";
      ctx.fillText("财", W / 2, H * 0.35);
    }
  }

  _drawParticles() {
    const { ctx } = this;
    const fx = this._fx();
    const accent = this.preset.accent;
    const accent2 = this.preset.accent2 || accent;
    const fxAlpha = this.bgVideo ? this.fxLayerOpacity : 1;
    ctx.save();
    ctx.globalAlpha = fxAlpha;

    if (fx === "cyber") {
      ctx.font = "14px monospace";
      this.matrixCols.forEach((col) => {
        col.chars.forEach((ch, i) => {
          const y = col.y - i * 18;
          if (y < 0 || y > this.H) return;
          ctx.fillStyle = i === 0 ? "#fff" : `rgba(0, 255, 65, ${0.15 + (col.chars.length - i) * 0.08})`;
          ctx.fillText(ch, col.x, y);
        });
      });
      ctx.restore();
      return;
    }

    if (fx === "graduate") {
      const cx = this.W / 2;
      const cy = this.H / 2;
      this.stars.forEach((s) => {
        const scale = 1 / (s.z || 0.01);
        const x = cx + (s.x - cx) * scale * 0.02;
        const y = cy + (s.y - cy) * scale * 0.02;
        const size = s.size * scale * 0.5;
        ctx.fillStyle = `rgba(200, 180, 255, ${1 - s.z})`;
        ctx.beginPath();
        ctx.arc(x, y, Math.min(size, 8), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
      return;
    }

    this.fireworks.forEach((fw) => {
      if (!fw.exploded) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      fw.sparks.forEach((s) => {
        ctx.fillStyle = `hsla(${s.hue}, 90%, 65%, ${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.5 * s.life, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    this.particles.forEach((p) => {
      const alpha = 0.4 + Math.sin(p.life * 5) * 0.3;
      const k = p.kind || "dot";

      if (k === "heart") {
        this._drawHeart(p.x, p.y, p.size * 2, `rgba(255, 107, 157, ${alpha})`);
        return;
      }

      if (k === "petal") {
        ctx.fillStyle = `rgba(248, 180, 200, ${alpha})`;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, p.life * 2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      if (k === "balloon") {
        ctx.fillStyle = `hsla(${p.hue}, 75%, 62%, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size * 0.5, p.size * 0.65, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y + p.size * 0.6);
        ctx.lineTo(p.x, p.y + p.size * 1.2);
        ctx.stroke();
        return;
      }

      if (k === "confetti") {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.life * 10);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, ${alpha})`;
        ctx.fillRect(-p.size, -p.size * 0.4, p.size * 2, p.size * 0.8);
        ctx.restore();
        return;
      }

      if (k === "gold") {
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grd.addColorStop(0, "#fff9c4");
        grd.addColorStop(1, "rgba(244, 208, 63, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      if (k === "leaf") {
        ctx.fillStyle = `hsla(${p.hue}, 50%, 45%, ${alpha})`;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size * 1.5, p.size, p.life, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      if (k === "star") {
        const cx = this.W / 2;
        const cy = this.H / 2;
        const scale = 1 / ((p.z || 0.1) + 0.05);
        const x = cx + (p.x - cx) * scale * 0.02;
        const y = cy + (p.y - cy) * scale * 0.02;
        ctx.fillStyle = `rgba(116, 192, 252, ${1 - (p.z || 0)})`;
        ctx.beginPath();
        ctx.arc(x, y, Math.min(p.size * scale * 0.3, 6), 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      ctx.fillStyle = fx === "cyber" ? (p.hue > 200 ? accent : accent2) : this._colorWithAlpha(accent, alpha);
      ctx.shadowBlur = fx === "cyber" ? 14 : 0;
      ctx.shadowColor = accent;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.restore();
  }

  _drawHeart(x, y, size, color) {
    const { ctx } = this;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.7, x, y + size);
    ctx.bezierCurveTo(x, y + size * 0.7, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
    ctx.fill();
  }

  _colorWithAlpha(hex, a) {
    if (hex.startsWith("hsl")) return hex;
    const r = parseInt(hex.slice(1, 3), 16) || 255;
    const g = parseInt(hex.slice(3, 5), 16) || 255;
    const b = parseInt(hex.slice(5, 7), 16) || 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  _getFullText() {
    const { title, lines, signature, showSignature } = this.content;
    const parts = [title, ...lines];
    if (showSignature && signature) parts.push(signature);
    return parts.join("\n");
  }

  _charRevealIndex() {
    const full = this._getFullText().replace(/\n/g, "");
    return Math.floor(full.length * this.revealProgress);
  }

  _drawText() {
    const { ctx, W, H } = this;
    const { title, lines, signature, showSignature } = this.content;
    const p = this.preset;
    const fx = this._fx();
    const revealIdx = this._charRevealIndex();
    let charCount = 0;

    const drawLine = (text, y, font, size, isTitle = false) => {
      if (!text) return y;
      ctx.font = `${isTitle ? "bold " : ""}${size}px "${font}", serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const chars = [...text];
      const totalW = chars.reduce((w, ch) => w + ctx.measureText(ch).width + this.letterSpacing, 0) - this.letterSpacing;
      let x = W / 2 - totalW / 2;

      chars.forEach((ch, i) => {
        const globalIdx = charCount++;
        const visible = globalIdx < revealIdx || this.revealProgress >= 1;

        if (!visible) {
          x += ctx.measureText(ch).width + this.letterSpacing;
          return;
        }

        let alpha = 1;
        let offsetY = 0;
        let scale = 1;

        if (this.textEffect === "fade") {
          alpha = Math.min(1, (revealIdx - globalIdx) * 0.5 + 0.3);
        } else if (this.textEffect === "typewriter") {
          if (globalIdx > revealIdx) {
            x += ctx.measureText(ch).width + this.letterSpacing;
            return;
          }
          alpha = 1;
        } else if (this.textEffect === "wave") {
          offsetY = Math.sin(this.time * 4 + i * 0.4) * 6 * (visible ? 1 : 0);
        } else if (this.textEffect === "zoom") {
          scale = 0.85 + 0.15 * Math.min(1, (revealIdx - globalIdx) * 0.3 + 0.7);
        }

        ctx.save();
        ctx.translate(x + ctx.measureText(ch).width / 2, y + offsetY);
        ctx.scale(scale, scale);
        ctx.globalAlpha = alpha;

        if (fx === "cyber") {
          ctx.shadowColor = p.accent;
          ctx.shadowBlur = 18;
          ctx.fillStyle = p.textColor;
          if (i % 9 === Math.floor(this.time * 4) % 9) ctx.fillStyle = p.accent2;
        } else if (fx === "newyear" || fx === "business") {
          ctx.shadowColor = p.accent;
          ctx.shadowBlur = isTitle ? 24 : 10;
          const tg = ctx.createLinearGradient(-30, 0, 30, 0);
          tg.addColorStop(0, p.accent);
          tg.addColorStop(0.5, "#fffef0");
          tg.addColorStop(1, p.accent2 || p.accent);
          ctx.fillStyle = tg;
        } else if (fx === "birthday") {
          ctx.shadowColor = p.accent2;
          ctx.shadowBlur = 12;
          ctx.fillStyle = isTitle ? "#fff" : p.textColor;
        } else {
          const tg = ctx.createLinearGradient(-20, 0, 20, 0);
          tg.addColorStop(0, p.textColor);
          tg.addColorStop(0.5, "#ffffff");
          tg.addColorStop(1, p.accent);
          ctx.fillStyle = tg;
          ctx.shadowColor = p.accent;
          ctx.shadowBlur = isTitle ? 20 : 8;
        }

        ctx.fillText(ch, 0, 0);
        ctx.restore();

        x += ctx.measureText(ch).width + this.letterSpacing;
      });

      return y + size * 1.6;
    };

    let y = H * 0.14;
    y = drawLine(title, y, p.titleFont, 42, true);
    y += 20;

    const bodySize = this.fontSize;
    lines.forEach((line) => {
      y = drawLine(line, y, p.bodyFont, bodySize);
      y += 8;
    });

    if (showSignature && signature) {
      y = H * 0.88;
      drawLine(signature, y, p.bodyFont, 22, false);
    }

    if (!title && lines.length === 0) {
      ctx.font = `18px "${p.bodyFont}", serif`;
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.textAlign = "center";
      ctx.fillText("← 选择祝词或输入文案", W / 2, H / 2);
    }

    this._drawCorners();
  }

  _drawCorners() {
    const { ctx, W, H } = this;
    const len = 28;
    ctx.strokeStyle = `rgba(255,255,255,0.25)`;
    ctx.lineWidth = 2;
    const corners = [
      [24, 24, 24 + len, 24, 24, 24 + len],
      [W - 24, 24, W - 24 - len, 24, W - 24, 24 + len],
      [24, H - 24, 24 + len, H - 24, 24, H - 24 - len],
      [W - 24, H - 24, W - 24 - len, H - 24, W - 24, H - 24 - len],
    ];
    corners.forEach(([x1, y1, x2, y2, x3, y3]) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x3, y3);
      ctx.stroke();
    });

    const seal = this.preset.seal || "福";
    ctx.font = `28px "Ma Shan Zheng", cursive`;
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.textAlign = "right";
    ctx.fillText(seal, W - 36, 48);

    if (this._fx() === "cyber") {
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(0, 245, 255, 0.35)";
      ctx.textAlign = "left";
      ctx.fillText("// BLESSING", 28, H - 28);
    }
  }

  _drawVignette() {
    const { ctx, W, H } = this;
    const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.75);
    vg.addColorStop(0, "transparent");
    vg.addColorStop(1, "rgba(0,0,0,0.45)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }

  _draw() {
    if (this.bgVideo && this.bgVideo.readyState >= 2) {
      this._drawVideoBg();
    } else {
      this._drawBg();
    }
    this._drawParticles();
    this._drawText();
    this._drawVignette();
  }

  resizeDisplay(width) {
    const ratio = this.H / this.W;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${width * ratio}px`;
  }
}
