export class StaticAudio {
    path: string;
    volume: number;
    loop: boolean;
    audio = new Audio();
    constructor(path: string, volume: number, loop: boolean) {
        this.path = path;
        this.volume = volume;
        this.loop = loop;
        this.audio.src = this.path;
        this.audio.load();
    }
    play() {
        this.audio.play().then(() => this.onSuccess(this.path), () => this.onError(this.path));
        this.audio.loop = this.loop;
    }
    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
    }
    private onSuccess(path: string) {
        console.log('Sound file: ' + path + ' is playing');
    }
    private onError(path: string) {
        console.log('Error trying to play Sound File: ' + path);
    }
}
