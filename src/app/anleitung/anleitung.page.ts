import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-anleitung',
  templateUrl: './anleitung.page.html',
  styleUrls: ['./anleitung.page.scss'],
})
export class AnleitungPage implements OnInit {
    ingame;
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    slideOpts = {
      initialSlide: 0,
      speed: 400
    };

  constructor(private route: ActivatedRoute) { 
    this.ingame = this.route.snapshot.paramMap.get('ingame');
  }

  ngOnInit() {
  
  }

}
