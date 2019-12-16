import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GegenstandComponent } from './gegenstand.component';

describe('GegenstandComponent', () => {
  let component: GegenstandComponent;
  let fixture: ComponentFixture<GegenstandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GegenstandComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GegenstandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
