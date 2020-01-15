import { Component, OnInit } from '@angular/core';
import { SoundController } from '../classes/SoundController';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-szene3-a-im-fluss',
  templateUrl: './szene3-a-im-fluss.page.html',
  styleUrls: ['./szene3-a-im-fluss.page.scss'],
})
export class Szene3AImFlussPage implements OnInit {

  linkNextPage = '/szene3-aufbruch';

  soundController;
  heading = 0;
  initheading = 0;
  skipButtonActive = false;

  currentTimer;

  currentSoundIndex = 2;
  maxSoundIndex: number;
  gegenstandsAuswahlOpen = false;
  showQTE = false;
  currentDuration;

  fromInstruction;  //gets set when user is coming straight from the instructions

  timersubscription;
  subscription;
  fighttimesub;
  crocodileSub;

  gegenstand;
  weg1 = true;


  constructor(protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController, public platform: Platform, public router: NavController, public vibration: Vibration, private storage: Storage, public activeroute: ActivatedRoute, private insomnia: Insomnia) {

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
      //this.storage.set('gegenstand', 'Messer');

      // Watch Device Orientation
      this.subscription = this.deviceOrientation.watchHeading().subscribe(
        (data: DeviceOrientationCompassHeading) => {
          this.heading = data.magneticHeading;
        },
      );
      //get Storage Value 'gegenstand'
      this.storage.get('gegenstand').then((val) => {
        this.gegenstand = val;
      });
      //Initialise SoundController
      this.soundController = new SoundController(this.deviceOrientation, 3);
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
    this.sceneLoading(this.currentSoundIndex, 4000);

  }

  pauseGame = () => {
    this.stopTimer();
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController = null;
    this.subscription.unsubscribe();
    this.timersubscription.unsubscribe();
  }

  unpauseGame = () => {
    window.location.reload();
  }

  skip() {
    if (this.skipButtonActive) {
      if (!this.weg1 && this.currentSoundIndex == 2) {
        this.currentSoundIndex = 4;
        this.skipButtonActive = false;
        this.startNextSound();
      } else if ((this.currentSoundIndex == 4) || this.currentSoundIndex == 3) {
        this.closeSite('/szene4-der-baum');
      } else if (this.weg1 && this.currentSoundIndex == 2) {
        this.startInteraction();
      } else if (this.currentSoundIndex == 9 || this.currentSoundIndex == 8) {
        this.currentSoundIndex = 3;
        this.startNextSound();
      } else {
        this.currentSoundIndex++;
        this.startNextSound();
      }
      this.skipButtonActive = false;
    }
  }

  startsound() {
    this.currentSoundIndex++;
    this.currentDuration = this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(this.currentSoundIndex);
    this.startTimerforNextSound(this.currentDuration, true);
  }

  startInteraction() {
    this.skipButtonActive = false;
    this.currentSoundIndex = 5;
    this.currentDuration = this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(this.currentSoundIndex);
    this.startTimerforNextSound(this.currentDuration, true);
    this.fighttimer(10);
    //this.startfight();
  }

  startScene(index) {
    this.soundController.playSound(0);
    this.weg1 = (this.gegenstand == 'Messer') ? true : false;
    console.log(this.gegenstand);
    this.startNextSound();
  }


  startTimerforNextSound(timerlength: number, ingame = false) {
    console.log(timerlength);
    if (!ingame) {
      this.currentTimer = timer(timerlength * 1000);
      this.timersubscription = this.currentTimer.subscribe(() => {
        this.skipButtonActive = true;
        this.timersubscription.unsubscribe();
      });
    } else {
      this.currentTimer = timer(timerlength * 1000);
      this.timersubscription = this.currentTimer.subscribe(() => {
        this.startsound();
        this.timersubscription.unsubscribe();
      });
    }
  }

  stopTimer() {
    this.timersubscription.unsubscribe();
    console.log("timer stoped")
  }

  afterInteraction(index) {
    this.soundController.stopSound(1);
    this.soundController.stopSound(7);
    this.showQTE = false;
    this.currentSoundIndex = index;
    this.startNextSound();
  }

  closeSite(url) {
    this.soundController.stopAllSounds();
    this.soundController.onDestroy();
    this.soundController = null;
    this.subscription.unsubscribe();
    this.timersubscription.unsubscribe();

    //allow Sleepmode
    this.insomnia.allowSleepAgain()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
    this.router.navigateRoot(url);
  }

  startNextSound() {
    this.currentDuration = this.soundController.getDuration(this.currentSoundIndex);
    this.soundController.playSound(this.currentSoundIndex);
    this.startTimerforNextSound(this.currentDuration);
  }

  async fighttimer(timerlength) {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), ((timerlength * 1000)));
    });
    await promise;

    this.startfight();
  }

  startfight() {
    this.soundController.playSound(1); //Musik
    this.soundController.playSound(7);  //Krokodil
    this.showQTE = true;
    this.vibration.vibrate(500);
    const crocTimer = timer(10000);
    this.crocodileSub = crocTimer.subscribe(() => {
      this.afterInteraction(9);
    });
  }

  clickFightButton() {
    let direction = (((this.heading - this.initheading) % 360) + 360) % 360; //adjust to Initial Direction
    if (direction < (270 + 10) && direction > (270 - 10)) {
      this.crocodileSub.unsubscribe();
      this.vibration.vibrate(500);
      this.afterInteraction(8);
      this.showQTE = false;
    }
  }
}
