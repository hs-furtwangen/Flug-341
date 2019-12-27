import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-qte-button',
  templateUrl: './qte-button.component.html',
  styleUrls: ['./qte-button.component.scss'],
})
export class QteButtonComponent implements OnInit {
  @Input() animationTime= '5s';
  @Input() iconFile= '';

  @Output() clickHandler : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onClickHandler() {
    this.clickHandler.emit();
  }

  getIcon(){
    return 'url("../../../assets/imgs/'+ this.iconFile+ '") no-repeat center center';
  }
}
