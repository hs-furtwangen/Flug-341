import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-szene5-ende',
  templateUrl: './szene5-ende.page.html',
  styleUrls: ['./szene5-ende.page.scss'],
})
export class Szene5EndePage implements OnInit {
  linkNextPage='/menu';

  soundController;
  heading = 0;
  skipButtonActive= false;

  currentTimer;
  timersubscription;
  subscription;
  showInteraktion= false;
  initheading= 0;

  currentAthmoIndex=0;
  currentSoundIndex= 2;
  maxSoundIndex: number;
  currentDuration;

  gegenstand;
  weg1= false; //weg1 == mit Taschenlampe

  constructor ( protected deviceOrientation: DeviceOrientation , public loadingController: LoadingController , public platform: Platform , public router: NavController, public vibration: Vibration, private storage: Storage)  {
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

  ngOnInit() {
    this.storage.get('gegenstand').then((val)=> {
      this.gegenstand= val;
    });
    this.soundController= new SoundControllerScene(this.deviceOrientation, 6);
    this.soundController.initController();

    //get Initheading
    this.storage.get('initheading').then((val) => {
      this.soundController.setinitHeading(val);
      this.initheading= val;
    });
    this.maxSoundIndex = this.soundController.soundArray.length - 1;
    this.sceneLoading(this.currentSoundIndex, 5000);

    
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
  }

  pauseGame = () =>{
    this.timersubscription.unsubscribe();
    this.soundController.stopSound(this.currentAthmoIndex);
    this.soundController.stopSound(this.currentSoundIndex);
  }

  unpauseGame = () => {
    window.location.reload();
  }

  startNextSound(){
    this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(this.currentSoundIndex);
    this.startTimerforNextSound(this.currentDuration);
  }

  startTimerforNextSound(timerlength: number, interaktion= false){
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
        this.timersubscription.unsubscribe();
    });
    }
  }

  startScene(index){
    this.weg1= (this.gegenstand == 'Taschenlampe')? true: false;
    this.initheading= this.soundController.initheading;
    this.soundController.playSound(this.currentAthmoIndex);
    this.currentDuration= this.soundController.getDuration(index);
    this.soundController.playSound(index);
    this.startTimerforNextSound(this.currentDuration, true);
  }

  skip() {
    if (this.skipButtonActive) {
      if(this.currentSoundIndex==4){
        this.currentSoundIndex++;
        this.startNextSound();
        this.fadeout(5);
      } else if(this.currentSoundIndex==5) {
        this.currentSoundIndex++;
        this.currentAthmoIndex= 1;
        this.soundController.playSound(this.currentAthmoIndex);
        this.startNextSound();
        this.fadein(5);
      } else if(this.currentSoundIndex==6){
        if(!this.weg1){
          this.currentSoundIndex=7;
        } else {
          this.currentSoundIndex=8;
        }
        this.closeSite();
      } else {
        this.currentSoundIndex++;
        this.startNextSound();
      }
      this.skipButtonActive= false;
    }
  }

  onClickHandler(){
    this.currentSoundIndex++;
    this.startNextSound();
    this.showInteraktion= false;
  }

  fadeout(duration){
      this.soundController.fadeout(0, duration);
  }

  fadein(duration){
    this.soundController.fadein(1, duration);
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
}
