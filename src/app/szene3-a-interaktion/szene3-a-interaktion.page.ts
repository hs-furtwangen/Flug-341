import { Component, OnInit } from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { SoundController } from '../classes/SoundController';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-szene3-a-interaktion',
  templateUrl: './szene3-a-interaktion.page.html',
  styleUrls: ['./szene3-a-interaktion.page.scss'],
})
export class Szene3AInteraktionPage implements OnInit {
  soundController;

  subscription;
  heading;

  constructor(protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController ) { }

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
        this.soundController = new SoundController(this.deviceOrientation, 5);
        this.soundController.initController();
        this.soundController.initSound(0, 0, "scene"); 
        this.sceneLoading(2000);
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

  startgame(){
    this.soundController.playSound(0);
  }
}
