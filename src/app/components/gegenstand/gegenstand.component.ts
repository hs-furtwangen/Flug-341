import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-gegenstand',
  templateUrl: './gegenstand.component.html',
  styleUrls: ['./gegenstand.component.scss'],
})
export class GegenstandComponent implements OnInit {
  @Output() clickHandler : EventEmitter<any> = new EventEmitter();
  @ViewChild('slider', {static: false}) slider: IonSlides;

  swipeSpeed= 400

  slideOpts = {
    initialSlide: 0,
    speed: this.swipeSpeed
  };

  constructor(private storage: Storage) { }

  ngOnInit() {}

  async onclick() {
    const index= await this.slider.getActiveIndex().then((value)=> {
      return value;
    });

    switch(index) { 
      case 0: { 
        console.log('Messer');
        this.storage.set('gegenstand', 'Messer');
        break; 
      } 
      case 1: { 
        console.log('Seil');
        this.storage.set('gegenstand', 'Seil');
        break; 
      } 
      case 2: { 
        console.log('Taschenlampe');
        this.storage.set('gegenstand', 'Taschenlampe');
        break; 
     } 
      default: { 
         break; 
      } 
   } 
    this.clickHandler.emit();
  }

  swipeToNext(){
    this.slider.slideNext(this.swipeSpeed);
  }

  swipeToPrev(){
    this.slider.slidePrev(this.swipeSpeed);
  }
}
