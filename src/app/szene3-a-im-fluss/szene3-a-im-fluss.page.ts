import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-szene3-a-im-fluss',
  templateUrl: './szene3-a-im-fluss.page.html',
  styleUrls: ['./szene3-a-im-fluss.page.scss'],
})
export class Szene3AImFlussPage implements OnInit {

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

  gegenstand;
  weg1= true;


  constructor ( protected deviceOrientation: DeviceOrientation , public loadingController: LoadingController , public platform: Platform , public router: NavController, public vibration: Vibration, private storage: Storage, public activeroute: ActivatedRoute) 
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

    this.fromInstruction = this.activeroute.snapshot.paramMap.get('frominteraktion');
    if (this.fromInstruction != null) {
      this.currentSoundIndex= 2;
    }
  }

  ngOnInit() {
    this.storage.get('gegenstand').then((val)=> {
      this.gegenstand= val;
    });
    this.soundController= new SoundControllerScene(this.deviceOrientation, 4);
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
    window.location.reload();
  }

  closeOverlay(){
    this.currentSoundIndex++;
    this.overlayClosed=true;
    this.skipButtonActive= false;
    this.startNextSound();
  }

  skip() {
    if (this.skipButtonActive) {
      if ( !this.weg1 && this.currentSoundIndex== 1){
        this.currentSoundIndex= 3;
        this.skipButtonActive= false;
        this.startNextSound();
      } else if ((this.weg1 && this.currentSoundIndex== 2) || (!this.weg1 && this.currentSoundIndex == 3)) {
        this.closeSite('/szene4-der-baum');
      } else if (this.weg1 && this.currentSoundIndex== 1) {
        this.closeSite('/szene3-a-interaktion');
      } else {
        this.currentSoundIndex++;
        this.startNextSound();
        this.skipButtonActive= false;
      }
    }
  }

  startSounds(index){
    this.weg1= (this.gegenstand == 'Messer')? true: false;
    console.log(this.gegenstand);
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

  closeSite = (url) =>{
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController= null;
    this.timersubscription.unsubscribe();
    this.router.navigateRoot(url);
  }

  startNextSound(){
    this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(this.currentSoundIndex);
    this.startTimerforNextSound(this.currentDuration);
  }

}
