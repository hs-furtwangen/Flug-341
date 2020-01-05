import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BaumInteraktionComponent } from './baum-interaktion.component';

describe('BaumInteraktionComponent', () => {
  let component: BaumInteraktionComponent;
  let fixture: ComponentFixture<BaumInteraktionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaumInteraktionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BaumInteraktionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
