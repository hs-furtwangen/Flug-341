import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-qte-button',
  templateUrl: './qte-button.component.html',
  styleUrls: ['./qte-button.component.scss'],
})
export class QteButtonComponent implements OnInit {
  @Input() animationTime= '5s';
  @Input() iconFile= '';
  @Input() isActive= true;

  @Output() clickHandler : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onClickHandler() {
    this.clickHandler.emit();
  }

  getIcon(){
    if(this.iconFile!= ""){
      return 'url("../../../assets/imgs/'+ this.iconFile+ '") no-repeat center center';
    } else {
      return '';
    }
  }
}
