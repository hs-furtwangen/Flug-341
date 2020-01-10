import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Sound } from './Sound';

//declare ambisonics
declare const ambisonics;

export class MultichannelSound extends Sound{
    loader_sound;

     constructor(context, protected deviceOrientation: DeviceOrientation, path: String, order: number, startpoint: number, rotator){
        super(context, deviceOrientation, path, order, startpoint, rotator);
    }

    async loadSound() {
        console.log(this.decoder);
        const url: string = 'assets/sounds/' + this.path;
        this.loader_sound = new ambisonics.HOAloader(this.context, this.order, url, (buffer)=>{
            console.log(buffer);
            this.source.buffer= buffer;
            this.duration= buffer.duration;

        });
        this.loader_sound.load();

        return true;
    }

}