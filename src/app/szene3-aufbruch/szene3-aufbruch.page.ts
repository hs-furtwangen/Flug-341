import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';

@Component({
  selector: 'app-szene3-aufbruch',
  templateUrl: './szene3-aufbruch.page.html',
  styleUrls: ['./szene3-aufbruch.page.scss'],
})
export class Szene3AufbruchPage implements OnInit {
  soundController;
  heading = 0;
  skipButtonActive= false;
  showInteraktion= false;

  currentTimer;

  currentSoundIndex= 1;
  maxSoundIndex: number;
  overlayClosed= true;
  currentDuration;

  fromInstruction;  //gets set when user is coming straight from the instructions

  timersubscription;
  subscription;

  constructor(protected deviceOrientation: DeviceOrientation , public loadingController: LoadingController , public platform: Platform , public router: NavController, public vibration: Vibration) {
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

  ngOnInit() {
    this.soundController= new SoundControllerScene(this.deviceOrientation, 3);
    this.soundController.initController();
    this.soundController.initSound(0, 0, "scene", 0.5);
    this.soundController.initSound(1, 0, "scene");
    this.soundController.initSound(2, 0, "scene");
    this.maxSoundIndex = this.soundController.soundArray.length - 1;
    this.sceneLoading(this.currentSoundIndex, 3000);

            //Device Orientation
            this.deviceOrientation.getCurrentHeading().then(
              (data: DeviceOrientationCompassHeading) => {
                  this.heading = data.magneticHeading;
              },
              (error: any) => console.log(error)
            );
  }

  pauseGame = () =>{
    this.stopTimer();
    this.soundController.stopSound(0);
    this.soundController.stopSound(this.currentSoundIndex);
  }

  unpauseGame = () => {
    this.skipButtonActive= false;
    this.soundController.initSound(0, 0, "scene", 0.5);
    this.soundController.initSound(this.currentSoundIndex, 0, "scene");
    this.sceneLoading(this.currentSoundIndex, 2000);
    this.startTimerforNextSound(this.currentDuration);
  }

  async sceneLoading(index, dur) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: dur,
      message: 'Loading Scene',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();      //called when Loader is shown
    await loading.onDidDismiss(); //called when Loader is Dismissed

    this.startSounds(index);      
  }

  skip(){
    if (this.skipButtonActive) {
      if ( this.currentSoundIndex== 2){
      this.vibration.vibrate(500);
      this.showInteraktion= true;
      } else {
        this.currentSoundIndex++;
        this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
        this.skipButtonActive= false;
        this.soundController.playSound(this.currentSoundIndex);
        this.startTimerforNextSound(this.currentDuration);
      }
    }
  }

  startSounds(index){
    this.soundController.getinitHeading();
    this.currentDuration= this.soundController.getDuration(index);
    this.soundController.playSound(0);
    this.soundController.playSound(index);
    this.startTimerforNextSound(this.currentDuration);
  }

  startTimerforNextSound(timerlength: number){
    console.log(timerlength);
    this.currentTimer = timer(timerlength*1000);
    this.timersubscription = this.currentTimer.subscribe(() => {
        this.skipButtonActive = true;
        this.timersubscription.unsubscribe();
    });
  }

  stopTimer(){
    this.timersubscription.unsubscribe();
    console.log("timer stoped")
  }

  closeSite(url){
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController= null;
    this.timersubscription.unsubscribe();
    this.router.navigateRoot(url);
  }

  interaktionClickHandler(url){
    console.log(url);
    this.showInteraktion= false;
    this.closeSite(url);
  }
}

