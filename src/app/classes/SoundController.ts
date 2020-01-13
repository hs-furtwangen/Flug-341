
//Custom Classes
import { SceneSound } from './SceneSound';
import { Sound } from './Sound';
import { HRTFSound } from './HRTFSound'; //class for multichannel Sounds
import { MultichannelSound } from './MultichannelSound'; //class for multichannel Sounds

import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

/* needed that for building apk directly on Smartphone */

import json from '../../assets/json/sound.json';

import { timer } from 'rxjs';

// TODO: Need a lot of work. Don't know what to say.
//declare ambisonics
declare const ambisonics;

export abstract class SoundController {

    soundMap: Map<number, any>;         //Map with all the currently playing sound
    context;                            //Audio Context
    orientation: DeviceOrientation;     //Device Orientation
    soundArray: any;                    //This Variable takes on the Json Array of the Current Chapter
    heading= 0;                    //Current Rotation from Device Orientation
    order= 4;                           //Max Order
    loader_filters;                     //for Loading Filters like HRTF-Curves(sofa.json-files)
    initheading= 0;
    subscription;                //Initial Rotation

    rotator;                            //Scene Rotator
    decoder;
    mirror                            //Ambisonics Bineural Decoder

    constructor(protected deviceOrientation: DeviceOrientation, chapter: number) {
        this.soundMap = new Map();
        this.context = new AudioContext();
        //this.context = /*(window.AudioContext) ? */new window.AudioContext /*: new window.webkitAudioContext*/;
        this.orientation = this.deviceOrientation;
        this.heading = 0;
        this.soundArray = json[chapter - 1];
        this.decoder = new ambisonics.binDecoder(this.context, this.order);
    }



//init just the Controller
initController() {

    //Initialise Device Orientation Listener
    this.subscription = this.deviceOrientation.watchHeading().subscribe(
        (data: DeviceOrientationCompassHeading) => {
            this.heading = data.magneticHeading;

            //Update Rotation
                //Update Rotation
                this.rotator.yaw = (((this.heading - this.initheading)%360)+360) % 360;
                this.rotator.updateRotMtx();
        },
    );

//initalise Scene Rotator
this.mirror = new ambisonics.sceneMirror(this.context, this.order);
const firstmirror= new ambisonics.sceneMirror(this.context, this.order);
const secondmirror= new ambisonics.sceneMirror(this.context, this.order);
this.rotator = new ambisonics.sceneRotator(this.context, this.order);

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
    this.loader_filters = new ambisonics.HRIRloader_ircam(this.context, this.order, (buffer)=> {
        console.log('successfully loaded HOA buffer:', buffer);
        console.log(this.decoder);
        this.decoder.updateFilters(buffer);
    });
    this.loader_filters.load("assets/IRs/IRC_1076_C_HRIR_44100.sofa.json");
    console.log(this.loader_filters);

}

//init all Sound for this Chapter
async initSounds(){
    
    //Init all Sounds inside Array
    for (let [index ,value] of this.soundArray.entries()) {
        if(value.isHrtf=== true){
            this.soundMap.set(index, new HRTFSound(this.context, this.deviceOrientation, value.name, value.order, value.startpoint , this.rotator, this.mirror));
        } else {
            this.soundMap.set(index, new SceneSound(this.context, this.deviceOrientation, value.name, value.order, value.startpoint, this.rotator, this.mirror));
        }
        const sound = this.soundMap.get(index);
        sound.init();
        await sound.loadSound();
        if(value.gain != null){
            sound.setGain(value.gain);
        } else {
            sound.setGain(1);
        }
    }
}

playSound(index: number, isHrtf= false) {
    if (this.soundMap.has(index) && this.soundMap.get(index).isPlaying) {
        // Sound is already playing
        console.log('sound is already playing');
    } else if (this.soundMap.has(index)) {

        // Start playing the Sound
        const sound = this.soundMap.get(index);

        // Check whether to loop the Sound
        if (this.soundArray[index].loop) {
            sound.playloop(3000);
        }
        else {
            sound.play();
        }
        console.log(this.soundArray[index].name + ' started playing');
    } else {

        console.log("Sound not loaded");
    }
}

getinitHeading(){
            this.initheading= this.heading;
}

setinitHeading(initheading){
    this.initheading= initheading;
}

//Stop Sound with index from json-File
stopSound(index: number, hrtf= false) {

    // Check if sound is inside the Map
    if (this.soundMap.has(index)) {

        // Stop playing Sound
        const sound = this.soundMap.get(index);
        if(hrtf){
            sound.onDestroy();
        }

        sound.stop();

        this.soundMap.delete(index);

        console.log('Sound deactivated');
    } else {

        // Sound is not inside Map
        console.log('Sound already deactivated');
    }
}

//init one specific sound
initSound(index, startpoint= 0, typ= "", gain= 1) /* Typ: "multi" or else HRTF, Index: Index from JSON-Array */{
    //check Sound-Type
    if(typ=== "multi"){
        this.soundMap.set(index, new MultichannelSound(this.context, this.deviceOrientation, this.soundArray[index].name, this.soundArray[index].order,  this.setHeading(startpoint), this.rotator));
    } else if(typ==="scene") {
        this.soundMap.set(index, new SceneSound(this.context, this.deviceOrientation, this.soundArray[index].name, this.soundArray[index].order,  this.setHeading(startpoint), this.rotator, this.mirror));
    } else {
        this.soundMap.set(index, new HRTFSound(this.context, this.deviceOrientation, this.soundArray[index].name, this.soundArray[index].order,  this.setHeading(startpoint), this.rotator, this.mirror));
    }
    const sound = this.soundMap.get(index);
    sound.init();
    sound.loadSound();
    sound.setGain(gain);
}

//adjust the heading accordingly for the proper sound position
setHeading(startpoint){
    //for some reason everything is turned +180 degrees, dont know why 
    return (startpoint)% 360;

    // return (startpoint+180)% 360;
}

//Stop sll Sound currently playing
stopAllSounds(){
    for (let i=0; i< this.soundArray.length; i++) {
        if(this.soundMap.has(i)){
            const isPlaying = this.soundMap.get(i).isPlaying;
            if(isPlaying) {
            this.stopSound(i);
            }
        }
    }
}

// hoaEncoder(azim: number) {
//     this.encoder.azim = azim; // Horizontal Position
//     // this.encoder.elev = this.elev; // Vertical Position
//     this.encoder.updateGains();
//     console.log(this.encoder);
// }

getDuration(index: number){
    return this.soundArray[index].duration;

}


async crossfade(indexSound1: number, indexSound2: number, duration: number, gainSound2=1.0){
    // 1. Sound: fades to 0
    let sound1 = await this.soundMap.get(indexSound1);
    // 2. Sound fades to 1
    let sound2 = await this.soundMap.get(indexSound2);
    console.log("start Crossfade");


    sound2.playloop();
    //ramp gain up to 1
    sound2.summator.gain.linearRampToValueAtTime(gainSound2, this.context.currentTime + duration);   //linear
    //sound2.summator.gain.exponentialRampToValueAtTime(1.0, this.context.currentTime + duration);    //exponetial
    //ramp gain down to 0
    sound1.summator.gain.linearRampToValueAtTime(0.0, this.context.currentTime + duration);   //linear
    //sound1.summator.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);    //exponetial

    const fadetimer= timer(duration*1000);
    const subscription= fadetimer.subscribe(()=>{
        this.stopSound(indexSound1);
        subscription.unsubscribe();
    });
}

fadeout(indexSound1: number, duration: number){
    // 1. Sound: fades to 0
    let sound1 = this.soundMap.get(indexSound1);
    // 2. Sound fades to 1
    console.log("start Crossfade");

    //ramp gain down to 0
    sound1.summator.gain.linearRampToValueAtTime(0.0, this.context.currentTime + duration);   //linear
    //sound1.summator.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);    //exponetial

    const fadetimer= timer(duration*1000);
    const subscription= fadetimer.subscribe(()=>{
        this.stopSound(indexSound1);
        subscription.unsubscribe();
    });
}

fadein(indexSound1: number, duration: number){
        // 1. Sound: fades to 0
        let sound1 = this.soundMap.get(indexSound1);
    
        sound1.playloop();
        //ramp gain up to 1
        sound1.summator.gain.linearRampToValueAtTime(1.0, this.context.currentTime + duration);   //linear
        //sound2.summator.gain.exponentialRampToValueAtTime(1.0, this.context.currentTime + duration);    //exponetial
    
}

onDestroy(){
    this.subscription.unsubscribe();
}
}
