import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnleitungPage } from './anleitung.page';

describe('AnleitungPage', () => {
  let component: AnleitungPage;
  let fixture: ComponentFixture<AnleitungPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnleitungPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnleitungPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
