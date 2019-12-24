import { Component, OnInit } from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { SoundControllerGame } from '../classes/SoundControllerGame';
import { LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';

@Component({
  selector: 'app-szene3-a-interaktion',
  templateUrl: './szene3-a-interaktion.page.html',
  styleUrls: ['./szene3-a-interaktion.page.scss'],
})
export class Szene3AInteraktionPage implements OnInit {
  soundController;

  subscription;
  heading;

  currentTimer;
  timersubscription;

  currentSoundIndex= 1;
  currentDuration;

  constructor(protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController ) { }

  ngOnInit() {
        //Device Orientation
        this.deviceOrientation.getCurrentHeading().then(
          (data: DeviceOrientationCompassHeading) => {
              this.heading = data.magneticHeading;
          },
          (error: any) => console.log(error)
        );
    
        // Watch Device Orientation
        this.subscription = this.deviceOrientation.watchHeading().subscribe(
            (data: DeviceOrientationCompassHeading) => {
                this.heading = data.magneticHeading;
            },
        );
        this.soundController = new SoundControllerGame(this.deviceOrientation, 5);
        this.soundController.initController();
        this.soundController.initSound(0, 0, "scene");
        this.soundController.initSound(1, 0, "scene"); 
        this.soundController.initSound(2, 0, "scene");
        this.soundController.initSound(3, 270, "hrtf");    
        this.sceneLoading(2000);
  }

  async sceneLoading(dur) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: dur,
      message: 'Loading Scene',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();      //called when Loader is shown
    await loading.onDidDismiss(); //called when Loader is Dismissed

    this.startgame();
  }

  startTimerforNextSound(timerlength: number, callback){
    console.log(timerlength);
    this.currentTimer = timer(timerlength*1000);
    this.timersubscription = this.currentTimer.subscribe(() => {
      callback();
      this.timersubscription.unsubscribe();
    });
  }

  startsound = () => {
    this.currentSoundIndex++;
    if(this.currentSoundIndex==3){
      this.startfight();
    } else {
      this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
      this.soundController.playSound(this.currentSoundIndex);
      this.startTimerforNextSound(this.currentDuration, this.startsound);
    }
  }

  startgame(){
    this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
    //this.soundController.playSound(0);
    //this.soundController.playSound(this.currentSoundIndex);
    //this.startTimerforNextSound(this.currentDuration, this.startsound);
    this.startfight();
  }

  startfight(){
    this.soundController.playSound(3);
  }
}
