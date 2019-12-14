import {SoundController} from './SoundController';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

declare const ambisonics;

export class SoundControllerScene extends SoundController {

    //init just the Controller
initController() {

    //Initialise Device Orientation Listener
    var subscription = this.deviceOrientation.watchHeading().subscribe(
        (data: DeviceOrientationCompassHeading) => {
            this.heading = data.magneticHeading;

            //Update Rotation
            this.rotator.yaw = this.heading;
            this.rotator.updateRotMtx();
        },
    );
    
    // intitalise Bineural Decoder
    //this.encoder = new ambisonics.monoEncoder(this.context, this.order);
    this.decoder = new ambisonics.binDecoder(this.context, this.order);

    //initalise Scene Rotator
    this.rotator = new ambisonics.sceneRotator(this.context, this.order);

    //connect to Context
    this.rotator.out.connect(this.decoder.in);
    this.decoder.out.connect(this.context.destination);
    this.decoder.resetFilters();
            
    //load HRTF-Curves
    // this.loader_filters = new ambisonics.HRIRloader_ircam(this.context, this.order, (buffer)=> {
    //     console.log('successfully loaded HOA buffer:', buffer);
    //     console.log(this.decoder);
    //     this.decoder.updateFilters(buffer);
    // });
    // this.loader_filters.load("assets/IRs/IRC_1076_C_HRIR_44100.sofa.json");
    // console.log(this.loader_filters);

    //set Initial Heading and update the Scene Rotator
    this.initheading= this.heading;
    this.rotator.yaw = this.heading;
    this.rotator.updateRotMtx();
}
}