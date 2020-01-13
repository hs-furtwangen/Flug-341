import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { timer } from 'rxjs';

@Component({
  selector: 'app-szene3-b-wasserfall',
  templateUrl: './szene3-b-wasserfall.page.html',
  styleUrls: ['./szene3-b-wasserfall.page.scss'],
})
export class Szene3BWasserfallPage implements OnInit {
  linkNextPage = '/szene4-der-baum';

  soundController;
  heading = 0;
  skipButtonActive = false;

  currentTimer;

  currentAthmoIndex = 0;
  currentSoundIndex = 1;
  maxSoundIndex: number;
  currentDuration;

  timersubscription;
  subscription;

  gegenstand;
  weg1 = false;

  constructor(private storage: Storage, protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController, public platform: Platform, private router: NavController, private insomnia: Insomnia) {

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

    this.startSounds(index);
  }
  ngOnInit() {
    this.platform.ready().then(() => {

      this.subscription = this.deviceOrientation.watchHeading().subscribe(
        (data: DeviceOrientationCompassHeading) => {
          this.heading = data.magneticHeading;
        },
      );

      this.storage.get('gegenstand').then((val) => {
        this.gegenstand = val;
      });
      this.soundController = new SoundControllerScene(this.deviceOrientation, 4);
      this.soundController.initController();

      //get Initheading
      this.storage.get('initheading').then((val) => {
        this.soundController.setinitHeading(val);
      });

      //pause when tapping out of app
      this.platform.pause.subscribe(() => {
        this.pauseGame();
      });

      //continue when tapping into app
      this.platform.resume.subscribe(() => {
        this.unpauseGame();
      });

      //keep Phone awake
      this.insomnia.keepAwake()
        .then(
          () => console.log('success'),
          () => console.log('error')
        );
    });
  }

  ionViewDidEnter() {
    this.sceneLoading(this.currentSoundIndex, 3000);

  }


  pauseGame = () => {
    this.timersubscription.unsubscribe();
    this.soundController.stopSound(0);
    this.soundController.stopSound(this.currentSoundIndex);
  }

  unpauseGame = () => {
    window.location.reload();
  }

  startSounds(index) {
    this.weg1 = (this.gegenstand == 'Seil') ? true : false;
    console.log(this.gegenstand);
    this.soundController.playSound(this.currentAthmoIndex);
    this.startNextSound(index);
  }

  startTimerforNextSound(timerlength: number) {
    console.log(timerlength);
    this.currentTimer = timer(timerlength * 1000);
    this.timersubscription = this.currentTimer.subscribe(() => {
      this.skipButtonActive = true;
      this.timersubscription.unsubscribe();
    });
  }

  closeSite() {
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController = null;
    this.timersubscription.unsubscribe();

    //allow Sleepmode
    this.insomnia.allowSleepAgain()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
    this.router.navigateRoot(this.linkNextPage);
  }

  skip() {
    if (this.skipButtonActive) {
      if (this.currentSoundIndex == 1) {
        this.currentAthmoIndex = 5
        this.currentSoundIndex++;
        this.skipButtonActive = false;
        this.soundController.crossfade(0, 5, 20);
        this.startNextSound(this.currentSoundIndex);
      } else if (this.weg1 && this.currentSoundIndex == 2) {
        this.currentSoundIndex = 3;
        this.skipButtonActive = false;
        this.startNextSound(this.currentSoundIndex);
      } else if (!this.weg1 && this.currentSoundIndex == 2) {
        this.currentSoundIndex = 4;
        this.skipButtonActive = false;
        this.startNextSound(this.currentSoundIndex);
      } else if (this.currentSoundIndex == 3 || this.currentSoundIndex == 4) {
        this.linkNextPage = '/szene4-der-baum';
        this.closeSite();
      } else {
        this.currentSoundIndex++;
        this.skipButtonActive = false;
        this.startNextSound(this.currentSoundIndex);
      }
    }
  }

  startNextSound(index) {
    this.currentDuration = this.soundController.getDuration(index);
    this.soundController.playSound(index);
    this.startTimerforNextSound(this.currentDuration);
  }

}
