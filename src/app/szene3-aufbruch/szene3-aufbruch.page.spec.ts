import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Szene3AufbruchPage } from './szene3-aufbruch.page';

describe('Szene3AufbruchPage', () => {
  let component: Szene3AufbruchPage;
  let fixture: ComponentFixture<Szene3AufbruchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Szene3AufbruchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Szene3AufbruchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
