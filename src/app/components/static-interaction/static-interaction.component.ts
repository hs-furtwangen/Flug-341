import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';

@Component({
  selector: 'app-static-interaction',
  templateUrl: './static-interaction.component.html',
  styleUrls: ['./static-interaction.component.scss'],
})
export class StaticInteractionComponent implements OnInit, OnChanges {
  @Input() heading= 0;
  @Input() initheading= 0;
  @Input() interaktiondirection: number;
  @Input() text: String;
  @Input() iconFile= "";
  direction;

  @Output() clickHandler : EventEmitter<any> = new EventEmitter();

  isActive= false;
  hideLeftArrow= true;
  hideRightArrow= true;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.direction= (((this.heading - this.initheading)%360)+360) % 360;
    if((this.direction+10)>this.interaktiondirection && (this.direction-10)<this.interaktiondirection ){
      this.isActive= true;
      this.hideLeftArrow= true;
      this.hideRightArrow= true;
    } else {
      this.isActive= false;
      if(((360-this.direction)+this.interaktiondirection)>= ((this.direction)+this.interaktiondirection)){
        this.hideRightArrow= false;
        this.hideLeftArrow= true;
      } else {
        this.hideLeftArrow= false;
        this.hideRightArrow= true;
      }
    }
  }

  onClick(){
    if(this.isActive){
      this.clickHandler.emit();
    }
  }

  getIcon(){
    if(this.iconFile!= ""){
      return 'url("../../../assets/imgs/'+ this.iconFile+ '") no-repeat center center';
    } else {
      return '';
    }
  }
}
