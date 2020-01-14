import { Component, OnInit } from '@angular/core';
import { SoundController } from '../classes/SoundController';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-szene5-ende',
  templateUrl: './szene5-ende.page.html',
  styleUrls: ['./szene5-ende.page.scss'],
})
export class Szene5EndePage implements OnInit {
  linkNextPage = '/menu';

  soundController;
  heading = 0;
  skipButtonActive = false;

  currentTimer;
  timersubscription;
  subscription;
  showInteraktion = false;
  initheading = 0;

  currentAthmoIndex = 0;
  currentSoundIndex = 2;
  maxSoundIndex: number;
  currentDuration;

  gegenstand;
  weg1 = false; //weg1 == mit Taschenlampe

  constructor(protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController, public platform: Platform, public router: NavController, public vibration: Vibration, private storage: Storage, private insomnia: Insomnia) {

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
    this.platform.ready().then(() => {

      // Watch Device Orientation
      this.subscription = this.deviceOrientation.watchHeading().subscribe(
        (data: DeviceOrientationCompassHeading) => {
          this.heading = data.magneticHeading;
        },
      );

      this.storage.get('gegenstand').then((val) => {
        this.gegenstand = val;
      });
      this.soundController = new SoundController(this.deviceOrientation, 6);
      this.soundController.initController();

      //get Initheading
      this.storage.get('initheading').then((val) => {
        this.soundController.setinitHeading(val);
        this.initheading = val;
      });
      this.maxSoundIndex = this.soundController.soundArray.length - 1;

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
    this.sceneLoading(this.currentSoundIndex, 5000);

  }

  pauseGame = () => {
    this.timersubscription.unsubscribe();
    this.soundController.stopAllSounds();
    this.soundController.onDestroy() 
  }

  unpauseGame = () => {
    window.location.reload();
  }

  startNextSound() {
    this.currentDuration = this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(this.currentSoundIndex);
    this.startTimerforNextSound(this.currentDuration);
  }

  startTimerforNextSound(timerlength: number) {
    console.log(timerlength);
    this.currentTimer = timer(timerlength * 1000);
    this.timersubscription = this.currentTimer.subscribe(() => {
      this.skipButtonActive = true;
      this.timersubscription.unsubscribe();
    });
  }

  startScene(index) {
    console.log(this.gegenstand);
    this.weg1 = (this.gegenstand == 'Taschenlampe') ? true : false;
    this.initheading = this.soundController.initheading;
    this.soundController.playSound(this.currentAthmoIndex);
    this.currentDuration = this.soundController.getDuration(index);
    this.soundController.playSound(index);
    this.startTimerforNextSound(this.currentDuration);
  }

  skip() {
    if (this.skipButtonActive) {
      if (this.currentSoundIndex == 2) {
        this.currentSoundIndex++;
        this.startNextSound();
        this.soundController.crossfade(0, 7, 5);
      } else if (this.currentSoundIndex == 3) {
        this.currentSoundIndex++;
        this.currentAthmoIndex = 1;
        this.soundController.crossfade(7, 1, 5);
        this.closeSite(this.weg1);
      } else {
        this.currentSoundIndex++;
        this.startNextSound();
      }
      this.skipButtonActive = false;
    }
  }

  onClickHandler() {
    this.currentSoundIndex++;
    this.startNextSound();
    this.showInteraktion = false;
  }

  fadeout(duration) {
    this.soundController.fadeout(0, duration);
  }

  fadein(index, duration) {
    this.soundController.fadein(index, duration);
  }

  async closeSite(weg1 = false) {
    this.currentDuration = this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(this.currentSoundIndex);
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), this.currentDuration * 1000)
    });
    this.currentSoundIndex = (weg1) ? 6 : 5;
    await promise;
    this.currentDuration = this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(this.currentSoundIndex);
    const closetimer = timer(this.currentDuration * 1000);
    const closesub = closetimer.subscribe(() => {
      this.soundController.stopAllSounds();
      this.soundController.onDestroy();
      this.soundController = null;
      this.timersubscription.unsubscribe();
      this.subscription.unsubscribe();
      closesub.unsubscribe();
      //allow Sleepmode
      this.insomnia.allowSleepAgain()
        .then(
          () => console.log('success'),
          () => console.log('error')
        );
      this.router.navigateRoot(this.linkNextPage);
    });
  }
}
