import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Szene3AImFlussPage } from './szene3-a-im-fluss.page';

describe('Szene3AImFlussPage', () => {
  let component: Szene3AImFlussPage;
  let fixture: ComponentFixture<Szene3AImFlussPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Szene3AImFlussPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Szene3AImFlussPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
