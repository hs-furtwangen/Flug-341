import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-qte-button',
  templateUrl: './qte-button.component.html',
  styleUrls: ['./qte-button.component.scss'],
})
export class QteButtonComponent implements OnInit {
  @Input() animationTime= '5s';

  constructor() { }

  ngOnInit() {}

  onClickHandler() {
    console.log('Jeff');
  }
}
