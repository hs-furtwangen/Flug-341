import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Sound } from './Sound';

//declare ambisonics
declare const ambisonics;

export class SceneSound extends Sound{
    converter;

     constructor(context, protected deviceOrientation: DeviceOrientation, path: String, order: number, startpoint: number, rotator, converter){
        super(context, deviceOrientation, path, order, startpoint, rotator);
        this.converter= converter;
    }

    play() {
        //this.source.connect(this.encoder.in);
        //this.encoder.out.connect(this.summator);
        this.source.connect(this.converter.in);
        this.source.start(0);
        this.isPlaying = true;
    }

       playloop(s = 0) {
        this.source.connect(this.converter.in);
        this.source.loop = true;
        this.source.loopStart = 3;
        this.source.start(0);
        this.isPlaying = true;
    }

    init() {

        // Summing and routing of Audio Sources
        this.summator.connect(this.converter.in);

        console.log(this.converter.in);
        //this.hoaEncoder(this.order, this.startpoint);

    }

    setGain(value){
        this.summator.gain.value= value;
        this.summator.connect(this.converter.in);
        this.source.connect(this.summator);
    }

}