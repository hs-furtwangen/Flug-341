import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Platform } from '@ionic/angular';
import { LoadingController, NavController } from '@ionic/angular';
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
  timersubscription;
  titleTimersub;
  hideTitleScreen= true;

  constructor(protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController, public platform: Platform, private router: NavController) 
  {

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
    this.startTimerforNextSound(currentDuration);
  }

  closeSite(url){
    //this.soundController.stopSound(0);
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController= null;
    this.timersubscription.unsubscribe();
    this.router.navigateRoot(url);
  }

}
