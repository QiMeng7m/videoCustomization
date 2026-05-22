/**
 * Canvas 祝词特效引擎 — 实时渲染 + captureStream 录视频
 */
export const FX_PRESETS = {
  fireworks: {
    id: "fireworks",
    label: "烟花绽放",
    icon: "🎆",
    bg: ["#0a0612", "#1a0a2e", "#2d1b4e"],
    accent: "#ffd700",
    textColor: "#fff8e7",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
  },
  gold: {
    id: "gold",
    label: "金沙漫天",
    icon: "✨",
    bg: ["#1a1208", "#3d2b0f", "#5c4a1a"],
    accent: "#f4d03f",
    textColor: "#fff5d6",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
  },
  cyber: {
    id: "cyber",
    label: "赛博霓虹",
    icon: "🌃",
    bg: ["#030014", "#0a0520", "#12082a"],
    accent: "#00f5ff",
    textColor: "#e0ffff",
    titleFont: "ZCOOL XiaoWei",
    bodyFont: "Noto Serif SC",
  },
  snow: {
    id: "snow",
    label: "浪漫飘雪",
    icon: "❄️",
    bg: ["#0d1b2a", "#1b263b", "#415a77"],
    accent: "#ffffff",
    textColor: "#f0f8ff",
    titleFont: "Noto Serif SC",
    bodyFont: "Noto Serif SC",
  },
  hearts: {
    id: "hearts",
    label: "爱心泡泡",
    icon: "💕",
    bg: ["#2d0a1e", "#5c1a3a", "#8b2f5a"],
    accent: "#ff6b9d",
    textColor: "#ffe4ec",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
  },
  aurora: {
    id: "aurora",
    label: "极光流转",
    icon: "🌌",
    bg: ["#020810", "#041525", "#062035"],
    accent: "#7bffb3",
    textColor: "#e8fff0",
    titleFont: "ZCOOL XiaoWei",
    bodyFont: "Noto Serif SC",
  },
  confetti: {
    id: "confetti",
    label: "庆典纸屑",
    icon: "🎊",
    bg: ["#1a1030", "#2a1850", "#3d2060"],
    accent: "#ff6b6b",
    textColor: "#ffffff",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
  },
  matrix: {
    id: "matrix",
    label: "矩阵幻雨",
    icon: "💻",
    bg: ["#000800", "#001a00", "#002800"],
    accent: "#00ff41",
    textColor: "#b8ffd0",
    titleFont: "ZCOOL XiaoWei",
    bodyFont: "Noto Serif SC",
  },
  flame: {
    id: "flame",
    label: "烈焰祝福",
    icon: "🔥",
    bg: ["#1a0500", "#3d1200", "#5c1a00"],
    accent: "#ff6b35",
    textColor: "#fff0e0",
    titleFont: "Ma Shan Zheng",
    bodyFont: "Noto Serif SC",
  },
  galaxy: {
    id: "galaxy",
    label: "星空穿梭",
    icon: "🚀",
    bg: ["#000010", "#0a0020", "#150030"],
    accent: "#a78bfa",
    textColor: "#ede9fe",
    titleFont: "ZCOOL XiaoWei",
    bodyFont: "Noto Serif SC",
  },
};

const TEXT_EFFECTS = ["fade", "typewriter", "wave", "zoom"];

export class EffectsEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.W = canvas.width;
    this.H = canvas.height;
    this.preset = FX_PRESETS.fireworks;
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

  setPreset(id) {
    this.preset = FX_PRESETS[id] || FX_PRESETS.fireworks;
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
    const id = this.preset.id;
    const base = {
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      life: Math.random(),
      hue: Math.random() * 360,
    };

    if (id === "snow") {
      base.y = Math.random() * -this.H * 0.2;
      base.vy = 0.5 + Math.random();
      base.size = Math.random() * 3 + 1;
    } else if (id === "hearts") {
      base.y = this.H + Math.random() * 50;
      base.vy = -0.5 - Math.random();
    } else if (id === "flame") {
      base.y = this.H;
      base.life = 0.5 + Math.random() * 0.5;
    } else if (id === "confetti") {
      base.y = -10;
      base.vx = (Math.random() - 0.5) * 4;
      base.hue = Math.random() * 360;
    } else if (id === "gold") {
      base.y = -5;
      base.vy = 0.3 + Math.random();
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
    const id = this.preset.id;
    const cap = Math.floor(200 * this.intensity);

    while (this.particles.length < cap) this._spawnParticle();

    if (id === "fireworks" && Math.random() < 0.03 * this.intensity) this._spawnFirework();

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
      switch (id) {
        case "gold":
          p.vy += 0.02;
          p.y += p.vy;
          p.x += Math.sin(this.time * 2 + p.life * 10) * 0.5;
          if (p.y > this.H) {
            p.y = -5;
            p.x = Math.random() * this.W;
          }
          p.life += 0.01;
          break;
        case "snow":
          p.vy = 0.5 + p.size * 0.3;
          p.y += p.vy;
          p.x += Math.sin(this.time + p.life * 5) * 0.4;
          if (p.y > this.H) {
            p.y = -5;
            p.x = Math.random() * this.W;
          }
          break;
        case "hearts":
          p.vy = -0.3 - Math.random() * 0.2;
          p.y += p.vy;
          p.x += Math.sin(this.time * 1.5 + p.life * 8) * 0.6;
          if (p.y < -20) {
            p.y = this.H + 10;
            p.x = Math.random() * this.W;
          }
          break;
        case "flame":
          p.vy = -1 - Math.random() * 0.5;
          p.y += p.vy;
          p.x += (Math.random() - 0.5) * 1.2;
          p.life -= 0.008;
          if (p.life <= 0 || p.y < 0) {
            p.y = this.H;
            p.x = Math.random() * this.W;
            p.life = 1;
          }
          break;
        case "confetti":
          p.vy += 0.05;
          p.y += p.vy;
          p.x += p.vx;
          p.vx *= 0.99;
          if (p.y > this.H) {
            p.y = -5;
            p.x = Math.random() * this.W;
            p.vx = (Math.random() - 0.5) * 3;
            p.vy = 0;
          }
          break;
        case "galaxy":
          p.z += 0.02;
          if (p.z > 1) p.z = 0;
          break;
        default:
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > this.W) p.vx *= -1;
          if (p.y < 0 || p.y > this.H) p.vy *= -1;
      }
    });

    if (id === "matrix") {
      this.matrixCols.forEach((col) => {
        col.y += col.speed * dt * 60;
        if (col.y > this.H + 100) {
          col.y = -100;
          col.chars = this._randChars(8);
        }
        if (Math.random() < 0.02) col.chars[Math.floor(Math.random() * col.chars.length)] = this._randChars(1)[0];
      });
    }

    this.stars.forEach((s) => {
      if (id === "galaxy") {
        s.z -= 0.008 * this.speed;
        if (s.z <= 0) {
          s.z = 1;
          s.x = this.W / 2 + (Math.random() - 0.5) * 20;
          s.y = this.H / 2 + (Math.random() - 0.5) * 20;
        }
      }
    });
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

    if (this.preset.id === "aurora") {
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

    if (this.preset.id === "cyber") {
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
  }

  _drawParticles() {
    const { ctx } = this;
    const id = this.preset.id;
    const accent = this.preset.accent;
    const fxAlpha = this.bgVideo ? this.fxLayerOpacity : 1;
    ctx.save();
    ctx.globalAlpha = fxAlpha;

    if (id === "matrix") {
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

    if (id === "galaxy") {
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

    if (id === "snow") {
      this.particles.forEach((p) => {
        ctx.strokeStyle = "rgba(255,255,255,0.75)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const r = p.size * 2;
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + Math.cos(a) * r, p.y + Math.sin(a) * r);
        }
        ctx.stroke();
      });
      ctx.restore();
      return;
    }

    this.particles.forEach((p) => {
      const alpha = id === "flame" ? p.life * 0.8 : 0.4 + Math.sin(p.life * 5) * 0.3;

      if (id === "hearts") {
        this._drawHeart(p.x, p.y, p.size * 2, `rgba(255, 107, 157, ${alpha})`);
        return;
      }

      if (id === "confetti") {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.life * 10);
        ctx.fillStyle = `hsla(${(p.life * 360) % 360}, 85%, 60%, ${alpha})`;
        ctx.fillRect(-p.size, -p.size * 0.4, p.size * 2, p.size * 0.8);
        ctx.restore();
        return;
      }

      if (id === "gold") {
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grd.addColorStop(0, "#fff9c4");
        grd.addColorStop(1, "rgba(244, 208, 63, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      ctx.fillStyle = id === "cyber" ? accent : this._colorWithAlpha(accent, alpha);
      ctx.shadowBlur = id === "cyber" || id === "neon" ? 12 : 0;
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

        if (p.id === "cyber" || p.id === "matrix") {
          ctx.shadowColor = p.accent;
          ctx.shadowBlur = 15;
          ctx.fillStyle = p.textColor;
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

    ctx.font = `28px "Ma Shan Zheng", cursive`;
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.textAlign = "right";
    ctx.fillText("福", W - 36, 48);
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

export { TEXT_EFFECTS };
