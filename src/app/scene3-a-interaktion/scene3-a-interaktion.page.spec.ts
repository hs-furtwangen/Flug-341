import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Scene3AInteraktionPage } from './scene3-a-interaktion.page';

describe('Scene3AInteraktionPage', () => {
  let component: Scene3AInteraktionPage;
  let fixture: ComponentFixture<Scene3AInteraktionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Scene3AInteraktionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Scene3AInteraktionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
