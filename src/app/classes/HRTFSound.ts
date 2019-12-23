import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Sound } from './Sound';

//declare ambisonics
declare const ambisonics;

export class HRTFSound extends Sound {
    mirror

    constructor(context, protected deviceOrientation: DeviceOrientation, path: String, order: number, startpoint: number, rotator, mirror){
        super(context, deviceOrientation, path, order, startpoint, rotator);
        this.mirror= mirror;

        this.subscription = this.deviceOrientation.watchHeading().subscribe(
            (data: DeviceOrientationCompassHeading) => {
                this.heading = data.magneticHeading;

                //Update Rotation
                this.hoaEncoder((data.magneticHeading-startpoint)%360);

                //this.rotator.yaw = this.heading;
                //this.rotator.updateRotMtx();
            },
        );
    }

    init() {

        // Summing and routing of Audio Sources
        this.summator.connect(this.mirror.in);
        //console.log(this.source.buffer);
        //this.hoaEncoder(this.order, this.startpoint);

    }

    play() {
        //this.source.connect(this.encoder.in);
        //this.encoder.out.connect(this.summator);
        this.source.connect(this.encoder.in);
        this.source.start(0);
        this.isPlaying = true;
    }

       playloop(s = 0) {
        this.source.connect(this.encoder.in);
        this.encoder.out.connect(this.summator);
        this.source.loop = true;
        this.source.loopStart = 3;
        this.source.start(0);
        this.isPlaying = true;
    }

    loadSound() {
        const url: string = 'assets/sounds/' + this.path;
        fetch(url, {method: 'GET'}).then(response => response.arrayBuffer().
        then(
            buffer => {
                this.context.decodeAudioData(buffer, audioBuffer => 
                    { 
                        this.source.buffer= audioBuffer; 
                        //console.log(audioBuffer);
                    });
            }
        ));

    //     this.loader_filters = new ambisonics.HRIRloader_ircam(this.context, this.order, (buffer)=> {
    //         console.log('successfully loaded HOA buffer:', buffer);
    //         console.log(this.binDecoder);
    //         this.binDecoder.updateFilters(buffer);
    //     });
    //     this.loader_filters.load("assets/IRs/IRC_1076_C_HRIR_44100.sofa.json");
    //     console.log(this.loader_filters);
    }

    onDestroy(){
        this.subscription.unsubscribe();
    }

    setGain(value){
        this.summator.gain.value= value;
        this.summator.connect(this.mirror.in);
        this.source.connect(this.summator);
    }
}
