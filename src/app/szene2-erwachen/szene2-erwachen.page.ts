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
  initheading= 0;
  skipButtonActive= false;

  currentTimer;

  currentSoundIndex= 1;
  maxSoundIndex: number;
  overlayClosed= true;
  gegenstandsAuswahlOpen= false;
  showInteraktion= false;
  currentDuration;
  showWayInteraktion= false;

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

  }

  async sceneLoading(index, dur) {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      message: 'Lade Scene',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();      //called when Loader is shown
    await this.soundController.initSounds();
    await loading.dismiss(); //called when Loader is Dismissed

    this.startScene(index);      
  }

  ngOnInit() {
    this.soundController= new SoundControllerScene(this.deviceOrientation, 2);
    this.soundController.initController();
    this.soundController.initSounds();

    //get Initheading
    this.storage.get('initheading').then((val) => {
      this.soundController.setinitHeading(val);
      this.initheading= val;
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

        // Watch Device Orientation
          this.subscription = this.deviceOrientation.watchHeading().subscribe(
            (data: DeviceOrientationCompassHeading) => {
              this.heading = data.magneticHeading;
            },
          );
  }

  pauseGame = () =>{
    this.stopTimer();
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController= null;
    this.timersubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  unpauseGame = () => {
    window.location.reload();
  }

  closeOverlay(){
    this.overlayClosed=true;
    this.skipButtonActive= false;
    this.showInteraktion= true;
  }

  skip() {
    if (this.skipButtonActive) {
      if ( this.currentSoundIndex== 1){
        this.vibration.vibrate(500);
        this.overlayClosed= false;
      } else if (this.currentSoundIndex== 2) {
        this.gegenstandsAuswahlOpen= true;
        this.vibration.vibrate(500);
      } else if(this.currentSoundIndex== 5){
        this.vibration.vibrate(500);
        this.showWayInteraktion=true;
      } else if(this.currentSoundIndex== 3){
        this.soundController.playSound(6)
        this.currentSoundIndex++;
        this.startNextSound();
        this.soundController.crossfade(0, 6, 14);
      } else {
        this.currentSoundIndex++;
        this.startNextSound();
      }
      this.skipButtonActive= false;
    }
  }

  startScene(index){
    this.soundController.playSound(0);
    if (this.fromInstruction == null) {
      this.startNextSound();
    } else {
      this.skipButtonActive= false;
      this.showInteraktion= true;
    }
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
    this.subscription.unsubscribe();
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

  onClickHandler(){
    this.currentSoundIndex++;
    this.startNextSound();
    this.showInteraktion= false;
  }

  interaktionClickHandler(url){
    console.log(url);
    this.showInteraktion= false;
    this.closeSite(url);
  }
}