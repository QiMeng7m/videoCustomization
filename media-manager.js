/**
 * 自定义视频 / 音乐上传与合成播放、录屏音轨
 */
export class MediaManager {
  constructor() {
    this.videoEl = document.createElement("video");
    this.videoEl.muted = true;
    this.videoEl.playsInline = true;
    this.videoEl.loop = true;
    this.videoEl.setAttribute("playsinline", "");
    this.videoEl.preload = "auto";

    this.audioEl = document.createElement("audio");
    this.audioEl.loop = true;
    this.audioEl.preload = "auto";

    this.videoUrl = null;
    this.audioUrl = null;
    this.videoName = "";
    this.audioName = "";

    this.audioCtx = null;
    this.audioDest = null;
    this.audioGain = null;
    this.audioHooked = false;

    this.useVideoAudio = false;
    this.musicVolume = 0.85;
    this.videoVolume = 0.8;
    this.playbackRate = 1;
    this.trimStart = 0;
    this.trimEnd = null;
    this._trimLoopBound = this._onVideoTimeUpdate.bind(this);
  }

  get duration() {
    return this.videoEl.duration || 0;
  }

  get trimDuration() {
    if (!this.hasVideo()) return 0;
    const end = this.trimEnd ?? this.duration;
    return Math.max(0.1, (end - this.trimStart) / this.playbackRate);
  }

  hasVideo() {
    return Boolean(this.videoUrl);
  }

  hasAudio() {
    return Boolean(this.audioUrl);
  }

  getVideoElement() {
    return this.hasVideo() ? this.videoEl : null;
  }

  async loadVideo(file) {
    this.clearVideo();
    if (!file || !file.type.startsWith("video/")) {
      throw new Error("请选择视频文件");
    }
    this.videoUrl = URL.createObjectURL(file);
    this.videoName = file.name;
    this.videoEl.src = this.videoUrl;
    await new Promise((res, rej) => {
      this.videoEl.onloadeddata = () => res();
      this.videoEl.onerror = () => rej(new Error("视频加载失败"));
    });

    this.trimStart = 0;
    this.trimEnd = this.videoEl.duration;
    this.playbackRate = 1;
    this.videoEl.playbackRate = 1;
    this.videoEl.volume = this.videoVolume;
    this.videoEl.addEventListener("timeupdate", this._trimLoopBound);

    return { name: this.videoName, duration: this.videoEl.duration };
  }

  async loadAudio(file) {
    this.clearAudio();
    if (!file || !file.type.startsWith("audio/")) {
      throw new Error("请选择音频文件");
    }
    this.audioUrl = URL.createObjectURL(file);
    this.audioName = file.name;
    this.audioEl.src = this.audioUrl;
    await new Promise((res, rej) => {
      this.audioEl.onloadeddata = () => res();
      this.audioEl.onerror = () => rej(new Error("音频加载失败"));
    });
    this._ensureAudioGraph();
    return { name: this.audioName, duration: this.audioEl.duration };
  }

  clearVideo() {
    this.pause();
    this.videoEl.removeEventListener("timeupdate", this._trimLoopBound);
    if (this.videoUrl) URL.revokeObjectURL(this.videoUrl);
    this.videoUrl = null;
    this.videoName = "";
    this.trimStart = 0;
    this.trimEnd = null;
    this.playbackRate = 1;
    this.videoEl.removeAttribute("src");
    this.videoEl.load();
  }

  _onVideoTimeUpdate() {
    if (!this.hasVideo()) return;
    const end = this.trimEnd ?? this.duration;
    if (this.videoEl.currentTime >= end - 0.04) {
      this.videoEl.currentTime = this.trimStart;
    } else if (this.videoEl.currentTime < this.trimStart - 0.05) {
      this.videoEl.currentTime = this.trimStart;
    }
  }

  setTrim(start, end) {
    const dur = this.duration || 0;
    if (!dur) return;
    const minLen = 0.5;
    let s = Math.max(0, Math.min(start, dur - minLen));
    let e = Math.min(dur, Math.max(end, s + minLen));
    this.trimStart = s;
    this.trimEnd = e;
    if (this.videoEl.currentTime < s || this.videoEl.currentTime > e) {
      this.videoEl.currentTime = s;
    }
  }

  setPlaybackRate(rate) {
    this.playbackRate = Math.max(0.25, Math.min(3, rate));
    this.videoEl.playbackRate = this.playbackRate;
  }

  clearAudio() {
    this.audioEl.pause();
    if (this.audioUrl) URL.revokeObjectURL(this.audioUrl);
    this.audioUrl = null;
    this.audioName = "";
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
      this.audioDest = null;
      this.audioGain = null;
      this.audioHooked = false;
    }
    this.audioEl = document.createElement("audio");
    this.audioEl.loop = true;
    this.audioEl.preload = "auto";
  }

  setMusicVolume(v) {
    this.musicVolume = v;
    if (this.audioGain) this.audioGain.gain.value = v;
  }

  setUseVideoAudio(on) {
    this.useVideoAudio = on;
    this.videoEl.muted = !on || this.hasAudio();
    if (on) this.videoEl.volume = this.videoVolume;
  }

  setVideoVolume(v) {
    this.videoVolume = v;
    this.videoEl.volume = v;
  }

  _ensureAudioGraph() {
    if (this.audioHooked) return;
    this.audioCtx = new AudioContext();
    const source = this.audioCtx.createMediaElementSource(this.audioEl);
    this.audioDest = this.audioCtx.createMediaStreamDestination();
    this.audioGain = this.audioCtx.createGain();
    this.audioGain.gain.value = this.musicVolume;
    source.connect(this.audioDest);
    source.connect(this.audioGain);
    this.audioGain.connect(this.audioCtx.destination);
    this.audioHooked = true;
  }

  async resumeAudioContext() {
    if (this.audioCtx?.state === "suspended") {
      await this.audioCtx.resume();
    }
  }

  async syncPlay(fromStart = true, forRecord = false) {
    if (fromStart) {
      if (this.hasVideo()) this.videoEl.currentTime = this.trimStart;
      if (this.hasAudio()) this.audioEl.currentTime = 0;
    }

    if (this.hasVideo()) {
      this.videoEl.playbackRate = this.playbackRate;
      if (forRecord && this.useVideoAudio) {
        this.videoEl.muted = false;
        this.videoEl.volume = this.videoVolume;
      } else {
        this.videoEl.muted = true;
      }
    }

    const jobs = [];
    if (this.hasVideo()) jobs.push(this.videoEl.play().catch(() => {}));
    if (this.hasAudio()) {
      await this.resumeAudioContext();
      jobs.push(this.audioEl.play().catch(() => {}));
    }
    await Promise.all(jobs);
  }

  pause() {
    this.videoEl.pause();
    this.audioEl.pause();
    if (this.hasVideo()) this.videoEl.muted = true;
  }

  /** 合成 Canvas 视频轨 + 背景音乐（及可选视频原声） */
  getCompositeStream(canvas, fps = 30) {
    const videoStream = canvas.captureStream(fps);
    const tracks = [...videoStream.getVideoTracks()];
    const addTrack = (t) => {
      if (t && !tracks.some((x) => x.id === t.id)) tracks.push(t);
    };

    if (this.hasAudio()) {
      this._ensureAudioGraph();
      this.audioDest.stream.getAudioTracks().forEach(addTrack);
    }

    if (this.useVideoAudio && this.hasVideo()) {
      try {
        const vStream = this.videoEl.captureStream?.() || this.videoEl.mozCaptureStream?.();
        vStream?.getAudioTracks().forEach(addTrack);
      } catch {
        /* 部分浏览器不支持视频元素 captureStream */
      }
    }

    return new MediaStream(tracks);
  }

  getSuggestedDurationSec(fallback = 8) {
    const durs = [];
    if (this.hasVideo()) durs.push(this.trimDuration);
    if (this.hasAudio() && this.audioEl.duration) durs.push(this.audioEl.duration);
    if (durs.length === 0) return fallback;
    return Math.min(60, Math.max(3, Math.ceil(Math.max(...durs))));
  }
}
