//Custom Classes
import { SceneSound } from './SceneSound';
import { Sound } from './Sound';
import { HRTFSound } from './HRTFSound'; //class for multichannel Sounds
import { MultichannelSound } from './MultichannelSound'; //class for multichannel Sounds


import {SoundController} from './SoundController';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

declare const ambisonics;

export class SoundControllerScene extends SoundController {

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
                this.rotator.yaw = ((this.heading) - this.initheading) % 360;
                this.rotator.updateRotMtx();
        },
    );
    
    // intitalise Bineural Decoder
    //this.encoder = new ambisonics.monoEncoder(this.context, this.order);

    //initalise Scene Rotator
    this.mirror = new ambisonics.sceneMirror(this.context, this.order);
    const firstmirror= new ambisonics.sceneMirror(this.context, this.order);
    const secondmirror= new ambisonics.sceneMirror(this.context, this.order);
    this.rotator = new ambisonics.sceneRotator2D(this.context, this.order);
    
    //connect to Context
    this.mirror.out.connect(secondmirror.in);
    secondmirror.out.connect(firstmirror.in);
    firstmirror.out.connect(this.rotator.in)
    this.rotator.out.connect(this.decoder.in);
    this.decoder.out.connect(this.context.destination);
    this.decoder.resetFilters();
    firstmirror.mirror(1);
    secondmirror.mirror(3);
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

}