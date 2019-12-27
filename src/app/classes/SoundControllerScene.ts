//Custom Classes
import { SceneSound } from './SceneSound';
import { Sound } from './Sound';
import { HRTFSound } from './HRTFSound'; //class for multichannel Sounds
import { MultichannelSound } from './MultichannelSound'; //class for multichannel Sounds


import {SoundController} from './SoundController';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

declare const ambisonics;

export class SoundControllerScene extends SoundController {

initheading;

    //init just the Controller
initController() {
    this.initheading = 0;
    this.order= 1; 

    //Initialise Device Orientation Listener
    this.subscription = this.deviceOrientation.watchHeading().subscribe(
        (data: DeviceOrientationCompassHeading) => {
            this.heading = data.magneticHeading;

            //Update Rotation
                //Update Rotation
                this.rotator.yaw = ((this.heading) + this.initheading) % 360;
                this.rotator.updateRotMtx();
        },
    );
    
    // intitalise Bineural Decoder
    //this.encoder = new ambisonics.monoEncoder(this.context, this.order);

    //initalise Scene Rotator
    this.mirror = new ambisonics.sceneMirror2D(this.context, this.order);
    const firstmirror= new ambisonics.sceneMirror2D(this.context, this.order);
    this.rotator = new ambisonics.sceneRotator2D(this.context, this.order);
    
    //connect to Context
    this.mirror.out.connect(firstmirror.in);
    firstmirror.out.connect(this.rotator.in)
    this.rotator.out.connect(this.decoder.in);
    this.decoder.out.connect(this.context.destination);
    this.decoder.resetFilters();
    firstmirror.mirror(1);
    this.mirror.mirror(2);
            
    //load HRTF-Curves
    // this.loader_filters = new ambisonics.HRIRloader_ircam(this.context, this.order, (buffer)=> {
    //     console.log('successfully loaded HOA buffer:', buffer);
    //     console.log(this.decoder);
    //     this.decoder.updateFilters(buffer);
    // });
    // this.loader_filters.load("assets/IRs/IRC_1037_C_HRIR_44100.sofa.json");
    // console.log(this.loader_filters);

    //set Initial Heading and update the Scene Rotator
    //this.rotator.updateRotMtx();
}

getinitHeading(){
    //set Initial Heading and update the Scene Rotator
    this.initheading= this.heading;
    console.log(this.initheading);
    this.rotator.yaw = this.heading;
    this.rotator.updateRotMtx();
}

initSound(index, startpoint= 0, typ= "", gain= 1) /* Typ: "multi" or else HRTF, Index: Index from JSON-Array */{
    //check Sound-Type
    if(typ=== "multi"){
        this.soundMap.set(index, new MultichannelSound(this.context, this.orientation, this.soundArray[index].name, this.soundArray[index].order,  this.setHeading(startpoint), this.rotator));
    } else if(typ==="scene"){
        this.soundMap.set(index, new SceneSound(this.context, this.orientation, this.soundArray[index].name, this.soundArray[index].order,  this.setHeading(startpoint), this.rotator, this.mirror));
    }
    else {
        this.soundMap.set(index, new HRTFSound(this.context, this.orientation, this.soundArray[index].name, this.soundArray[index].order, this.setHeading(startpoint), this.rotator, this.mirror));

    }
    const sound = this.soundMap.get(index);
    sound.init();
    sound.loadSound();
    sound.setGain(gain);
}
}