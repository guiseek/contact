export abstract class AnimatinStreamBase {
  protected stream?: MediaStream;
  protected animationFrame?: number;

  abstract active: boolean;
  abstract constraints: MediaTrackConstraints;

  abstract renderAnimation(stream: MediaStream): void;

  async getStream() {
    const audio = this.constraints ? this.constraints : this.active;
    return navigator.mediaDevices.getUserMedia({ audio });
  }

  private stopStream() {
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach((track) => track.stop());
      this.stream = undefined;
    }
  }

  private cancelAnimation() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  protected destroy() {
    this.stopStream();
    this.cancelAnimation();
  }
}
