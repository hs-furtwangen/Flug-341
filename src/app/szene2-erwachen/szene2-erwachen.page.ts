import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-szene2-erwachen',
  templateUrl: './szene2-erwachen.page.html',
  styleUrls: ['./szene2-erwachen.page.scss'],
})
export class Szene2ErwachenPage implements OnInit {
  linkNextPage='/szene3-aufbruch';

  soundController;
  heading = 0;
  skipButtonActive= false;

  currentTimer;

  currentSoundIndex= 1;
  maxSoundIndex: number;
  overlayClosed= true;
  gegenstandsAuswahlOpen= false;
  currentDuration;

  fromInstruction;  //gets set when user is coming straight from the instructions

  timersubscription;
  subscription;


  constructor ( protected deviceOrientation: DeviceOrientation , public loadingController: LoadingController , public platform: Platform , public router: NavController, public activeroute: ActivatedRoute, public vibration: Vibration, private storage: Storage) 
  {
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

    this.fromInstruction = this.activeroute.snapshot.paramMap.get('fromInstruction');
    if (this.fromInstruction != null) {
      this.currentSoundIndex= 2;
    }

  }

  ngOnInit() {
    this.soundController= new SoundControllerScene(this.deviceOrientation, 2);
    this.soundController.initController();
    this.soundController.initSound(0, 0, "scene");
    this.soundController.initSound(1, 0, "scene");
    this.soundController.initSound(2, 0, "scene");
    this.soundController.initSound(3, 0, "scene");

    //get Initheading
    this.storage.get('initheading').then((val) => {
      this.soundController.setinitHeading(val);
    });
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
    this.stopTimer();
    this.soundController.stopSound(0);
    this.soundController.stopSound(this.currentSoundIndex);
  }

  unpauseGame = () => {
    this.skipButtonActive= false;
    this.soundController.initSound(0, 0, "scene" );
    this.soundController.initSound(this.currentSoundIndex, 0, "scene");
    this.sceneLoading(this.currentSoundIndex, 2000);
  }

  closeOverlay(){
    this.currentSoundIndex++;
    this.overlayClosed=true;
    this.skipButtonActive= false;
    this.startNextSound();
  }

  skip() {
    if (this.skipButtonActive) {
      if ( this.currentSoundIndex== 1){
        this.vibration.vibrate(500);
        this.overlayClosed= false;
      } else if (this.currentSoundIndex== 2) 
      {
        this.gegenstandsAuswahlOpen= true;
        this.vibration.vibrate(500);
      }
      else if (this.currentSoundIndex >= this.maxSoundIndex) {
        this.closeSite();
      } else {
        this.currentSoundIndex++;
        this.startNextSound();
        this.skipButtonActive= false;
      }
    }
  }

  startSounds(index){
    this.soundController.playSound(0);
    this.startNextSound();
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

  closeSite(){
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController= null;
    this.timersubscription.unsubscribe();
    this.router.navigateRoot(this.linkNextPage);
  }

  clickGegenstandHandler(){
    this.gegenstandsAuswahlOpen= false;
    this.currentSoundIndex++;
    this.startNextSound();
    this.skipButtonActive= false;
  }

  startNextSound(){
    this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(this.currentSoundIndex);
    this.startTimerforNextSound(this.currentDuration);
  }
}