import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';

@Component({
  selector: 'app-static-interaction',
  templateUrl: './static-interaction.component.html',
  styleUrls: ['./static-interaction.component.scss'],
})
export class StaticInteractionComponent implements OnInit, OnChanges {
  @Input() heading;
  @Input() initheading;
  @Input() interaktiondirection: number;
  @Input() text: String;
  @Input() iconFile= "";
  direction;

  @Output() clickHandler : EventEmitter<any> = new EventEmitter();

  isActive= false;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.direction= (((this.heading - this.initheading)%360)+360) % 360;
    if((this.direction+5)>this.interaktiondirection && (this.direction-5)<this.interaktiondirection ){
      this.isActive= true;
    } else {
      this.isActive= false;
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
