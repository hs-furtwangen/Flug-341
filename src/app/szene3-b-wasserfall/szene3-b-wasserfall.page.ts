import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';

@Component({
  selector: 'app-szene3-b-wasserfall',
  templateUrl: './szene3-b-wasserfall.page.html',
  styleUrls: ['./szene3-b-wasserfall.page.scss'],
})
export class Szene3BWasserfallPage implements OnInit {
  linkNextPage='/szene4-der-baum';

  soundController;
  heading = 0;
  skipButtonActive= false;

  currentTimer;

  currentSoundIndex= 1;
  maxSoundIndex: number;
  currentDuration;

  timersubscription;
  subscription;

  gegenstand;
  weg1= false;

  constructor (private storage: Storage, protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController, public platform: Platform, private router: NavController) {
    platform.ready().then(() => {
      //pause when tapping out of app
      this.platform.pause.subscribe(() => {
        this.pauseGame();
      });

      //continue when tapping into app
       this.platform.resume.subscribe(() => {
         this.unpauseGame();
       });
    });
   }

  ngOnInit() {
    this.storage.get('gegenstand').then((val)=> {
      this.gegenstand= val;
    });
    this.soundController= new SoundControllerScene(this.deviceOrientation, 6);
    this.soundController.initController();
    this.soundController.initSound(0, 0, "scene");
    this.soundController.initSound(1, 0, "scene");
    this.soundController.initSound(2, 0, "scene");
    this.soundController.initSound(3, 0, "scene");
    this.soundController.initSound(4, 0, "scene");
    this.sceneLoading(this.currentSoundIndex, 3000);

    //Device Orientation
    this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => {
          this.heading = data.magneticHeading;
      },
      (error: any) => console.log(error)
    );
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

  pauseGame = () =>{
    this.timersubscription.unsubscribe();
    this.soundController.stopSound(0);
    this.soundController.stopSound(this.currentSoundIndex);
  }

  unpauseGame = () => {
    this.skipButtonActive= false;
    this.soundController.initSound(0, 0, "scene" );
    this.soundController.initSound(this.currentSoundIndex, 0, "scene");
    this.sceneLoading(this.currentSoundIndex, 2000);
    this.startTimerforNextSound(this.currentDuration);
  }

  startSounds(index){
    this.soundController.getinitHeading();
    this.weg1= (this.gegenstand == 'Seil')? true: false;
    console.log(this.gegenstand);
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

  closeSite(){
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController= null;
    this.timersubscription.unsubscribe();
    this.router.navigateRoot(this.linkNextPage);
  }

  skip() {
    if (this.skipButtonActive) {
      if(this.weg1 && this.currentSoundIndex== 2){
        this.currentSoundIndex= 3;
        this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
        this.skipButtonActive= false;
        this.soundController.playSound(this.currentSoundIndex);
        this.startTimerforNextSound(this.currentDuration);
      } else if(!this.weg1 && this.currentSoundIndex== 2){
        this.currentSoundIndex= 4;
        this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
        this.skipButtonActive= false;
        this.soundController.playSound(this.currentSoundIndex);
        this.startTimerforNextSound(this.currentDuration);
      } else if(this.currentSoundIndex== 3|| this.currentSoundIndex== 4) {
        this.linkNextPage= '/szene4-der-baum';
        this.closeSite();
      } else {
        this.currentSoundIndex++;
        this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
        this.skipButtonActive= false;
        this.soundController.playSound(this.currentSoundIndex);
        this.startTimerforNextSound(this.currentDuration);
      }
    }
  }

}
