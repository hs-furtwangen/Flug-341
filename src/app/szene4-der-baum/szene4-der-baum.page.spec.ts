import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Szene4DerBaumPage } from './szene4-der-baum.page';

describe('Szene4DerBaumPage', () => {
  let component: Szene4DerBaumPage;
  let fixture: ComponentFixture<Szene4DerBaumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Szene4DerBaumPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Szene4DerBaumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
