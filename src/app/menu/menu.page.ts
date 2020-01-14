import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SoundController } from '../classes/SoundController';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  overlayHidden = false;
  soundController;

  constructor(protected deviceOrientation: DeviceOrientation, public platform: Platform ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.soundController = new SoundController(this.deviceOrientation, 7);
      this.soundController.initController();
      this.soundController.initSounds();
      this.soundController.playSound(0);

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
  pauseGame() {
    this.soundController.stopAllSounds();
    this.soundController.onDestroy() 
  }
  unpauseGame() {
    window.location.reload();
  }

  public hideOverlay() {
    this.overlayHidden = true;
  }
}
