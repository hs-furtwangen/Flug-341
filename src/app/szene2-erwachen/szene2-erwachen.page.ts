import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-szene2-erwachen',
  templateUrl: './szene2-erwachen.page.html',
  styleUrls: ['./szene2-erwachen.page.scss'],
})
export class Szene2ErwachenPage implements OnInit {
  linkNextPage='/menu';

  soundController;
  heading = 0;
  skipButtonActive= false;

  currentTimer;

  currentSoundIndex= 1;
  maxSoundIndex: number;
  overlayClosed= true;
  currentDuration;

  fromInstruction;  //gets set when user is coming straight from the instructions

  timersubscription;


  constructor ( protected deviceOrientation: DeviceOrientation , public loadingController: LoadingController , public platform: Platform , public router: Router, public activeroute: ActivatedRoute ) 
  {
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

    this.fromInstruction = this.activeroute.snapshot.paramMap.get('fromInstruction');
    if (this.fromInstruction != null) {
      this.currentSoundIndex= 2;
    }

  }

  ngOnInit() {
    this.soundController= new SoundControllerScene(this.deviceOrientation, 2);
    this.soundController.initController();
    this.soundController.initSound(0, 0, "multi");
    this.soundController.initSound(1, 0, "multi");
    this.soundController.initSound(2, 0, "multi");
    this.soundController.initSound(3, 0, "multi");
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
        const subscription = this.deviceOrientation.watchHeading().subscribe(
            (data: DeviceOrientationCompassHeading) => {
                this.heading = data.magneticHeading;
            },
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
    this.soundController.initSound(0, 0, "multi" );
    this.soundController.initSound(this.currentSoundIndex, 0, "multi");
    this.sceneLoading(this.currentSoundIndex, 2000);
    this.startTimerforNextSound(this.currentDuration);
  }

  closeOverlay(){
    this.currentSoundIndex++;
    this.currentDuration= this.soundController.getDuration(this.currentSoundIndex);
    this.overlayClosed=true;
    this.skipButtonActive= false;
    this.soundController.playSound(this.currentSoundIndex);
    this.startTimerforNextSound(this.currentDuration);
  }

  skip() {
    if (this.skipButtonActive) {
      if ( this.currentSoundIndex== 1){
        this.overlayClosed= false;
      } else if
      (this.currentSoundIndex >= this.maxSoundIndex) {
        this.router.navigate([this.linkNextPage]);
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
    });
  }

  stopTimer(){
    this.timersubscription.unsubscribe();
    console.log("timer stoped")
  }

}