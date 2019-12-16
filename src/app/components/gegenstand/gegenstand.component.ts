import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-gegenstand',
  templateUrl: './gegenstand.component.html',
  styleUrls: ['./gegenstand.component.scss'],
})
export class GegenstandComponent implements OnInit {
  @Output() clickHandler : EventEmitter<any> = new EventEmitter();

  constructor(private storage: Storage) { }

  ngOnInit() {}

  onclick(index: number) {
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
}
