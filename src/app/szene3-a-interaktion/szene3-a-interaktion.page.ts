import { Component, OnInit } from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { SoundControllerGame } from '../classes/SoundControllerGame';
import { Platform, LoadingController, NavController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import { timer } from 'rxjs';

@Component({
  selector: 'app-szene3-a-interaktion',
  templateUrl: './szene3-a-interaktion.page.html',
  styleUrls: ['./szene3-a-interaktion.page.scss'],
})
export class Szene3AInteraktionPage implements OnInit {
  linkNextPage="szene3-a-im-fluss/frominteraktion";
  soundController;

  subscription;
  heading;
  initheading= 0;

  currentTimer;
  timersubscription;
  crocodileSub
  fighttimesub;

  currentSoundIndex= 1;
  currentDuration;

  showQTE= false;

  constructor(protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController, private router:NavController, public vibration: Vibration,  public platform: Platform) { 
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
        this.soundController.initSound(0, 0, "scene", 0.1);
        this.soundController.initSound(1, 0, "scene", 0.5); 
        this.soundController.initSound(2, 0, "scene", 0.5);
        this.soundController.initSound(3, 270, "hrtf", 1);
        this.soundController.initSound(4, 270, "scene", 0.5);
        this.soundController.initSound(5, 270, "scene", 0.5);    
        this.sceneLoading(2000);
        this.initheading= this.heading;
        console.log(this.initheading);
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

  startTimerforNextSound(timerlength: number){
    console.log(this.currentSoundIndex);
      this.currentTimer = timer(timerlength*1000);
      this.timersubscription = this.currentTimer.subscribe(() => {
        this.startsound();
        this.timersubscription.unsubscribe();
    });
  }

  startsound() {
    this.soundController.getinitHeading();
    this.currentSoundIndex++;
    this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(this.currentSoundIndex);
    this.startTimerforNextSound(this.currentDuration);
  }

  startgame(){
    this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(0);
    this.soundController.playSound(this.currentSoundIndex);
    this.startTimerforNextSound(this.currentDuration);
    this.fighttimer(12);
    //this.startfight();
  }

  startfight(){
    this.soundController.playSound(3);
    this.showQTE=true;
    this.vibration.vibrate(500);
    const crocTimer= timer(10000);
    this.crocodileSub= crocTimer.subscribe(()=> {
      this.closingTimer(5);
    });

  }

  fighttimer(timerlength){
    const fighttime= timer(timerlength*1000)
    this.fighttimesub= fighttime.subscribe(() => {
      this.startfight();
      this.fighttimesub.unsubscribe();
  });
  }

  clickFightButton(){
    let direction= ((this.heading) + this.soundController.initheading) % 360;
    if(direction<(270+5)&& direction>(270-5)){
      this.crocodileSub.unsubscribe();
      this.vibration.vibrate(500);
      this.closingTimer(4);
      this.showQTE= false;
    }
  }

  closingTimer(index){
    this.soundController.stopSound(0);
    this.soundController.stopSound(3);
    this.currentDuration= this.soundController.getDuration(index);
    this.soundController.playSound(index);
    const closetimer= timer(this.currentDuration*1000);
    let closetimersub= closetimer.subscribe(()=>{
      closetimersub.unsubscribe();
      this.closeSite();
    });
  }

  closeSite(){
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController= null;
    this.subscription.unsubscribe();
    this.timersubscription.unsubscribe();
    this.router.navigateRoot(this.linkNextPage);
  }

  pauseGame(){
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController= null;
    this.subscription.unsubscribe();
    this.timersubscription.unsubscribe();
  }

  unpauseGame(){
    window.location.reload();
  }
}
