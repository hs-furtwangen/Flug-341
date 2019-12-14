import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Szene2ErwachenPage } from './szene2-erwachen.page';

describe('Szene2ErwachenPage', () => {
  let component: Szene2ErwachenPage;
  let fixture: ComponentFixture<Szene2ErwachenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Szene2ErwachenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Szene2ErwachenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
