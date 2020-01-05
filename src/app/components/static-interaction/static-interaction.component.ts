import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';

@Component({
  selector: 'app-static-interaction',
  templateUrl: './static-interaction.component.html',
  styleUrls: ['./static-interaction.component.scss'],
})
export class StaticInteractionComponent implements OnInit, OnChanges {
  @Input() heading;
  @Input() initheading;

  @Output() clickHandler : EventEmitter<any> = new EventEmitter();

  isActive= false;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    let direction= (this.heading-this.initheading)% 360;
    if((direction+5)>270 && (direction-5)<270 ){
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
}
