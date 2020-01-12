import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-szene4-der-baum',
  templateUrl: './szene4-der-baum.page.html',
  styleUrls: ['./szene4-der-baum.page.scss'],
})
export class Szene4DerBaumPage implements OnInit {
  linkNextPage= "/szene5-ende";

  skipButtonActive= false;
  
  soundController;
  timersubscription;
  interaktionSub;
  subscrib
  currentDuration;
  currentTimer;
  subscription;

  currentSoundIndex= 1;
  maxSoundIndex: number;
  initheading;
  heading= 0;

  showInteraktion=false;

  constructor(protected deviceOrientation: DeviceOrientation, public platform: Platform, public loadingController: LoadingController, public vibration: Vibration, private router: NavController, private storage: Storage ) { 
    platform.ready().then(() => {
      //pause when tapping out of app
      this.platform.pause.subscribe(() => {
        this.pauseGame();
        console.log("pause");
      });

      //continue when tapping into app
       this.platform.resume.subscribe(() => {
         this.unpauseGame();
       });
    });
  }

  async sceneLoading(index, dur) {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      message: 'Lade Scene',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();      //called when Loader is shown
    await this.soundController.initSounds(); //load all Soundbuffer
    await loading.dismiss(); //called when Loader is Dismissed

    this.startScene(index);      
  }

  ngOnInit(){

  }

  ionViewDidEnter() {

        // Watch Device Orientation
        this.subscription = this.deviceOrientation.watchHeading().subscribe(
          (data: DeviceOrientationCompassHeading) => {
              this.heading = data.magneticHeading;
          },
      );

    this.soundController= new SoundControllerScene(this.deviceOrientation, 5);
    this.soundController.initController();
                //get Initheading
                this.storage.get('initheading').then((val) => {
                  this.soundController.setinitHeading(val);
                  this.initheading= val;
                });
    this.maxSoundIndex = this.soundController.soundArray.length - 1;
    this.sceneLoading(this.currentSoundIndex, 2000);
   
  }

  skip(){
    if (this.skipButtonActive) {
      if(this.currentSoundIndex== 2){
        this.currentSoundIndex++;
        this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
        this.skipButtonActive= false;
        this.soundController.playSound(this.currentSoundIndex);
        this.startTimerforNextSound(this.currentDuration, true);
      } else {
        this.currentSoundIndex++;
        this.skipButtonActive= false;
        this.startNextSound(this.currentSoundIndex);
      }
    }
  }

  pauseGame = () =>{
    this.stopTimer();
    this.soundController.stopSound(0);
    this.soundController.stopSound(this.currentSoundIndex);
  }

  unpauseGame = () => {
    window.location.reload();
  }
 
  stopTimer(){
    this.timersubscription.unsubscribe();
    console.log("timer stoped")
  }

  startTimerforNextSound(timerlength: number, interaktion=false){
    console.log(timerlength);
    this.currentTimer = timer(timerlength*1000);
    if(!interaktion){
      this.timersubscription = this.currentTimer.subscribe(() => {
        this.skipButtonActive = true;
        this.timersubscription.unsubscribe();
    });
    } else {
      this.timersubscription = this.currentTimer.subscribe(() => {
        this.showInteraktion= true;
        this.vibration.vibrate(500);
        this.startInteractionTimer();
        this.timersubscription.unsubscribe();
    });
    }
  }

  startScene(index){
    this.initheading= this.soundController.initheading;
    this.soundController.playSound(0);
    this.startNextSound(index);
  }

  startInteractionTimer(){
    const interaktionTimer= timer(10000);
    this.interaktionSub= interaktionTimer.subscribe(()=>{
      this.showInteraktion= false;
      this.currentSoundIndex=5;
      this.closeSite()
      this.interaktionSub.unsubscribe();
    });
  }

  closeSite(){
    this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(this.currentSoundIndex);
    const closetimer= timer(this.currentDuration*1000);
    const closesub= closetimer.subscribe(()=>{
      this.soundController.stopAllSounds();
      this.soundController.onDestroy();
      this.soundController= null;
      this.timersubscription.unsubscribe();
      this.subscription.unsubscribe();
      closesub.unsubscribe();
      this.router.navigateRoot(this.linkNextPage);
    });
  }

  onClickHandler(){
    this.interaktionSub.unsubscribe();
    this.showInteraktion= false;
    this.currentSoundIndex=4;
    this.closeSite()
  }

  startNextSound(index){
    this.currentDuration= this.soundController.getDuration(index);
    this.soundController.playSound(index);
    this.startTimerforNextSound(this.currentDuration);
  }
}
