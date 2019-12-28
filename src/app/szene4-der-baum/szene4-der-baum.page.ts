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
  skipButtonActive= false;
  
  soundController;
  timersubscription;
  currentDuration;
  currentTimer;

  currentSoundIndex= 1;
  maxSoundIndex: number;
  heading= 0;

  constructor(protected deviceOrientation: DeviceOrientation, public platform: Platform, public loadingController: LoadingController ) { 
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
    this.soundController.initSound(3, 0, "scene");
    this.maxSoundIndex = this.soundController.soundArray.length - 1;
    this.sceneLoading(this.currentSoundIndex, 2000);

            //Device Orientation
            this.deviceOrientation.getCurrentHeading().then(
              (data: DeviceOrientationCompassHeading) => {
                  this.heading = data.magneticHeading;
              },
              (error: any) => console.log(error)
            );
  }

  skip(){

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
 
  stopTimer(){
    this.timersubscription.unsubscribe();
    console.log("timer stoped")
  }

  startTimerforNextSound(timerlength: number){
    console.log(timerlength);
    this.currentTimer = timer(timerlength*1000);
    this.timersubscription = this.currentTimer.subscribe(() => {
        this.skipButtonActive = true;
        this.timersubscription.unsubscribe();
    });
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

  startSounds(index){
    this.soundController.getinitHeading();
    this.currentDuration= this.soundController.getDuration(index);
    this.soundController.playSound(0);
    this.soundController.playSound(index);
    this.startTimerforNextSound(this.currentDuration);
  }
}
