import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Szene3AInteraktionPage } from './szene3-a-interaktion.page';

describe('Szene3AInteraktionPage', () => {
  let component: Szene3AInteraktionPage;
  let fixture: ComponentFixture<Szene3AInteraktionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Szene3AInteraktionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Szene3AInteraktionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
