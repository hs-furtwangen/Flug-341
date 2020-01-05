import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Szene5EndePage } from './szene5-ende.page';

describe('Szene5EndePage', () => {
  let component: Szene5EndePage;
  let fixture: ComponentFixture<Szene5EndePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Szene5EndePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Szene5EndePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
