/**
 * 锦言 · 媒体管理
 */
export class MediaManager {
  constructor() {
    this.videoEl = null;
    this.videoUrl = null;
    this.audioEl = null;
    this.audioUrl = null;
    this.videoMeta = { name: "", duration: 0, width: 0, height: 0 };
    this.trimStart = 0;
    this.trimEnd = 0;
    this.videoVolume = 0.8;
    this.audioVolume = 0.7;
    this.videoOpacity = 0.85;
    this.speed = 1;
    this.muteOriginal = false;
    this.audioCtx = null;
    this.videoGain = null;
    this.audioGain = null;
    this._videoSource = null;
    this._audioSource = null;
  }

  async loadVideo(file) {
    this._revokeVideo();
    this.videoUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.src = this.videoUrl;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    await new Promise((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error("视频加载失败"));
    });
    this.videoEl = video;
    this.videoMeta = {
      name: file.name,
      duration: video.duration,
      width: video.videoWidth,
      height: video.videoHeight,
    };
    this.trimStart = 0;
    this.trimEnd = video.duration;
    return this.videoMeta;
  }

  async loadAudio(file) {
    this._revokeAudio();
    this.audioUrl = URL.createObjectURL(file);
    const audio = document.createElement("audio");
    audio.src = this.audioUrl;
    audio.loop = true;
    await new Promise((resolve, reject) => {
      audio.onloadedmetadata = () => resolve();
      audio.onerror = () => reject(new Error("音频加载失败"));
    });
    this.audioEl = audio;
    return { name: file.name, duration: audio.duration };
  }

  _ensureAudioContext() {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
      this.videoGain = this.audioCtx.createGain();
      this.audioGain = this.audioCtx.createGain();
      this.videoGain.connect(this.audioCtx.destination);
      this.audioGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === "suspended") this.audioCtx.resume();
  }

  connectVideoAudio() {
    if (!this.videoEl) return;
    this._ensureAudioContext();
    if (this._videoSource) {
      try {
        this._videoSource.disconnect();
      } catch (_) {}
    }
    this._videoSource = this.audioCtx.createMediaElementSource(this.videoEl);
    this._videoSource.connect(this.videoGain);
    this._applyGains();
  }

  connectBgmAudio() {
    if (!this.audioEl) return;
    this._ensureAudioContext();
    if (this._audioSource) {
      try {
        this._audioSource.disconnect();
      } catch (_) {}
    }
    this._audioSource = this.audioCtx.createMediaElementSource(this.audioEl);
    this._audioSource.connect(this.audioGain);
    this._applyGains();
  }

  _applyGains() {
    if (this.videoGain) this.videoGain.gain.value = this.muteOriginal ? 0 : this.videoVolume;
    if (this.audioGain) this.audioGain.gain.value = this.audioVolume;
  }

  setVideoVolume(v) {
    this.videoVolume = v;
    this._applyGains();
  }

  setAudioVolume(v) {
    this.audioVolume = v;
    this._applyGains();
  }

  setMuteOriginal(on) {
    this.muteOriginal = on;
    this._applyGains();
  }

  setTrim(start, end) {
    this.trimStart = Math.max(0, start);
    this.trimEnd = Math.min(this.videoMeta.duration || end, end);
    if (this.trimEnd <= this.trimStart) this.trimEnd = this.trimStart + 0.1;
  }

  getExportDuration() {
    const trimLen = (this.trimEnd - this.trimStart) / this.speed;
    return trimLen > 0 ? trimLen : 15;
  }

  syncVideoToTime(t) {
    if (!this.videoEl) return;
    const d = this.trimEnd - this.trimStart;
    if (d <= 0) return;
    const rel = (t * this.speed + this.trimStart) % d + this.trimStart;
    if (Math.abs(this.videoEl.currentTime - rel) > 0.15) {
      this.videoEl.currentTime = rel;
    }
  }

  drawVideo(ctx, w, h, opacity) {
    if (!this.videoEl || this.videoEl.readyState < 2) return;
    ctx.save();
    ctx.globalAlpha = opacity;
    const vw = this.videoEl.videoWidth;
    const vh = this.videoEl.videoHeight;
    const scale = Math.max(w / vw, h / vh);
    const dw = vw * scale;
    const dh = vh * scale;
    ctx.drawImage(this.videoEl, (w - dw) / 2, (h - dh) / 2, dw, dh);
    ctx.restore();
  }

  async playAll() {
    if (this.videoEl) {
      try {
        await this.videoEl.play();
      } catch (_) {}
    }
    if (this.audioEl) {
      try {
        await this.audioEl.play();
      } catch (_) {}
    }
  }

  pauseAll() {
    this.videoEl?.pause();
    this.audioEl?.pause();
  }

  _revokeVideo() {
    if (this.videoUrl) URL.revokeObjectURL(this.videoUrl);
    this.videoEl = null;
    this.videoUrl = null;
  }

  _revokeAudio() {
    if (this.audioUrl) URL.revokeObjectURL(this.audioUrl);
    this.audioEl = null;
    this.audioUrl = null;
  }

  destroy() {
    this.pauseAll();
    this._revokeVideo();
    this._revokeAudio();
    if (this.audioCtx) this.audioCtx.close();
  }
}
