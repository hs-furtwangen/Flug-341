import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  overlayHidden = false;

  constructor() { }

  ngOnInit() {
  }

  public hideOverlay() {
    this.overlayHidden = true;
  }
}