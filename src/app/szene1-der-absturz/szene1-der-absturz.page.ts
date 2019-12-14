import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-szene1-der-absturz',
  templateUrl: './szene1-der-absturz.page.html',
  styleUrls: ['./szene1-der-absturz.page.scss'],
})
export class Szene1DerAbsturzPage implements OnInit {
  soundController;
  heading = 0;

  constructor(protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController, public platform: Platform) 
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
        const subscription = this.deviceOrientation.watchHeading().subscribe(
            (data: DeviceOrientationCompassHeading) => {
                this.heading = data.magneticHeading;
            },
        );
  }

  async loadLoading() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Loading Scene',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
      
  }

  ionViewDidEnter(){
        //this.loadLoading();
        this.soundController= new SoundControllerScene(this.deviceOrientation, 1);
        this.soundController.initController();
        this.soundController.initSound(0, 0, "multi", .5);
        this.soundController.initSound(1, 0, "multi", 1);
        this.soundController.playSound(0);
        this.soundController.playSound(1);
  }

  pauseGame = () =>{
    //suspends Audiocontext
    this.soundController.context.suspend().then(() => {
    });
  }

  unpauseGame = () => {
    this.soundController.context.resume().then(() => {
    });
  }
}
