import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-interaktion',
  templateUrl: './interaktion.component.html',
  styleUrls: ['./interaktion.component.scss'],
})
export class InteraktionComponent implements OnInit {
  @Output() clickHandler : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onclick(url) {
    this.clickHandler.emit(url);
  }
}
