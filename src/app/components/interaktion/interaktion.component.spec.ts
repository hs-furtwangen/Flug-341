import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InteraktionComponent } from './interaktion.component';

describe('InteraktionComponent', () => {
  let component: InteraktionComponent;
  let fixture: ComponentFixture<InteraktionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteraktionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InteraktionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
