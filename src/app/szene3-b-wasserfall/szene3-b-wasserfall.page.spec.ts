import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Szene3BWasserfallPage } from './szene3-b-wasserfall.page';

describe('Szene3BWasserfallPage', () => {
  let component: Szene3BWasserfallPage;
  let fixture: ComponentFixture<Szene3BWasserfallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Szene3BWasserfallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Szene3BWasserfallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
