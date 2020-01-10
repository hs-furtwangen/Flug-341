import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import {path} from "@angular-devkit/core";

//declare ambisonics
declare const ambisonics;

export class Sound {

    /* Class Attributes*/
    context;
    source;
    encoder;
    decoder;
    summator;
    rotator
    subscription;
    duration= 0;


    //compass value
    heading;

    path: String;
    order: number;

    //Startpoint in degree
    startpoint: number;
    isPlaying = false;

    /*Constructor*/
    constructor(context, protected deviceOrientation: DeviceOrientation, path: String, order: number, startpoint: number, rotator) {
        //this.encoder= encoder;
        this.context = context;                             //Audio Context
        this.source = this.context.createBufferSource();    
        this.summator = this.context.createGain();          //Gain
        this.path = path;
        this.order = order;                                 //Max Order
        this.startpoint = startpoint;                       //Position relativ to Starting-Pos
        this.rotator = rotator;

    }

    /*Methods*/
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

    stop() {
        this.source.stop();
        this.isPlaying = false;
    }

    async loadSound() {
        const url: string = 'assets/sounds/' + this.path;    
        await fetch(url, {method: 'GET'}).then(response => response.arrayBuffer().
        then(
            buffer => {
                this.context.decodeAudioData(buffer, (audioBuffer) => 
                    { 
                        this.source.buffer= audioBuffer; 
                        //console.log(audioBuffer);
                    });
            }
        ));
        return true;

    }

    
    init() {

        // Summing and routing of Audio Sources
        this.summator.connect(this.rotator.in);
        console.log("Huhn")
        //console.log(this.source.buffer);
        //this.hoaEncoder(this.order, this.startpoint);

    }

    //Set the Sounds position
    hoaEncoder(azim: number) {
        this.encoder.azim = azim; // Horizontal Position
        // this.encoder.elev = this.elev; // Vertical Position
        this.encoder.updateGains();
        console.log(this.encoder);
    }

    //set Gain
    setGain(value){
        this.summator.gain.value= value;
        this.summator.connect(this.rotator.in);
        this.source.connect(this.summator);
    }
}