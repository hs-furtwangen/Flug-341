import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StaticAudio } from '../classes/StaticAudio'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  overlayHidden = false;
  soundController;

  constructor() { }

  ngOnInit() {
   const athmo= new StaticAudio('assets/sounds/06_ATMO_Dschungel_final.wav', 1, true)
   athmo.play();
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
