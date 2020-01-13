import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-baum-interaktion',
  templateUrl: './baum-interaktion.component.html',
  styleUrls: ['./baum-interaktion.component.scss'],
})
export class BaumInteraktionComponent implements OnInit, OnChanges {
  @Input() heading;
  @Input() initheading;

  @Output() clickHandler : EventEmitter<any> = new EventEmitter();

  isActive=false;
  hideLeftArrow= true;
  hideRightArrow= true;

  constructor() { }

  ngOnInit() {

  }

  onclickHandler(){
    if(this.isActive){
      this.clickHandler.emit();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    
    let direction= (((this.heading - this.initheading)%360)+360) % 360;
    if((direction+10)>90 && (direction-10)<90 ){
      this.isActive= true;
      this.hideLeftArrow= true;
      this.hideRightArrow= true;
    } else {
      this.isActive= false;
      if(((360-direction)+90)>= ((direction)+90)){
        this.hideRightArrow= false;
        this.hideLeftArrow= true;
      } else {
        this.hideLeftArrow= false;
        this.hideRightArrow= true;
      }
    }
  }
}
