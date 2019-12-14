import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Szene1DerAbsturzPage } from './szene1-der-absturz.page';

describe('Szene1DerAbsturzPage', () => {
  let component: Szene1DerAbsturzPage;
  let fixture: ComponentFixture<Szene1DerAbsturzPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Szene1DerAbsturzPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Szene1DerAbsturzPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
