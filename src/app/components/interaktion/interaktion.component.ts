import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges} from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

@Component({
  selector: 'app-interaktion',
  templateUrl: './interaktion.component.html',
  styleUrls: ['./interaktion.component.scss'],
})
export class InteraktionComponent implements OnInit, OnChanges {
  subscription;
  element= 1;
  links=['/szene3-b-wasserfall', '/szene3-a-im-fluss'];
  @Input() initheading;
  @Input() heading= 0;

  @Output() clickHandler : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    let direction= (((this.heading - this.initheading)%360)+360) % 360;
    if(direction>=0 && direction< 90 || direction<=360 && direction>= 270){
      this.element=1;
    } else {
      this.element=0;
    }
  }

  selectWay(id){
    if(id == this.element){
      this.clickHandler.emit(this.links[id]);
    }
  }
}
