import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Platform } from '@ionic/angular';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { timer } from 'rxjs';

@Component({
  selector: 'app-szene1-der-absturz',
  templateUrl: './szene1-der-absturz.page.html',
  styleUrls: ['./szene1-der-absturz.page.scss'],
})
export class Szene1DerAbsturzPage implements OnInit {
  nextSite= "/szene2-erwachen";

  soundController;
  heading = 0;
  currentTimer; 

  //Subsciptions must be unsubscribed before leaving Site
  timersubscription;  //Subsciption for timer, to Skip to the next Sound
  titleTimersub;  //Subscription for titlescreen timer
  hideTitleScreen= true;  //bool for hiding titlescreen

  constructor(protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController, public platform: Platform, private router: NavController, private storage: Storage) 
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
  }

  ngOnInit() {         

      this.soundController= new SoundControllerScene(this.deviceOrientation, 1);
      this.soundController.initController();
      this.soundController.initSound(0, 0,"scene", 1);
        this.loadLoading();

                      //Device Orientation
                      this.deviceOrientation.getCurrentHeading().then(
                        (data: DeviceOrientationCompassHeading) => {
                            this.heading = data.magneticHeading;
                        },
                        (error: any) => console.log(error)
                      );

  }
    


  async loadLoading() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Lade Abenteuer',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
    await loading.onDidDismiss();

    this.startSounds();  
  }

  startTimerforNextSound(timerlength: number){
    console.log(timerlength);
    this.currentTimer = timer(timerlength*1000);
    this.timersubscription = this.currentTimer.subscribe(() => {
        this.closeSite(this.nextSite);
        this.timersubscription.unsubscribe();
    });

    const titletimer= timer(28000);
    this.titleTimersub= titletimer.subscribe(()=>{
      this.hideTitleScreen= false;
    });

  }

  startSounds(){
    this.soundController.getinitHeading();
    let currentDuration= this.soundController.getDuration(0);
    this.soundController.playSound(0);
    this.startTimerforNextSound(currentDuration)    
    this.storage.set('initheading', this.soundController.initheading);;
  }

  closeSite(url){
    //this.soundController.stopSound(0);
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController= null;
    this.timersubscription.unsubscribe();
    this.router.navigateRoot(url);
  }

  
  pauseGame(){
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController= null;
    this.timersubscription.unsubscribe();
  }

  unpauseGame(){
    window.location.reload();
  }
}
