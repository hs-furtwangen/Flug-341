import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

@Component({
  selector: 'app-interaktion',
  templateUrl: './interaktion.component.html',
  styleUrls: ['./interaktion.component.scss'],
})
export class InteraktionComponent implements OnInit {
  subscription;
  heading= 0;
  element= 1;
  links=['/menu', '/szene3-a-im-fluss'];

  @Output() clickHandler : EventEmitter<any> = new EventEmitter();

  constructor( protected deviceOrientation: DeviceOrientation) { }

  ngOnInit() {
    this.subscription = this.deviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => {
          this.heading = data.magneticHeading;
          if(this.heading>=0 && this.heading< 180){
            this.element=1;
          } else {
            this.element=0;
          }
      },
    );
  }

  selectWay(id){
    if(id == this.element){
      this.subscription.unsubscribe();
      this.clickHandler.emit(this.links[id]);
    }
  }
}
