import { Component, OnInit, Input} from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.scss'],
})
export class CompassComponent implements OnInit {
  @Input() heading: number;

  constructor() { }

  ngOnInit() {}

}
