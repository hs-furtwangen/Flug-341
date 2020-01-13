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
      let betrag1;
      let betrag2;
      if (90 > direction) {
        betrag1 = 90;
        betrag2 = direction;
      } else {
        betrag1 = direction;
        betrag2 = 90;
      }
      let value1 = betrag1 - betrag2;
      let value2 = ((360 - betrag1) + betrag2);

      if ((betrag1 == 90 && value1 < value2) || (betrag1 == direction && value1 > value2)) {
        this.hideLeftArrow = true;
        this.hideRightArrow = false;
      } else {
        this.hideLeftArrow = false;
        this.hideRightArrow = true;
      }
    }
  }
}
