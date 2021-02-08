import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainScreenComponent } from './main-screen.component';

describe('MainScreenComponent', () => {
  let component: MainScreenComponent;
  let fixture: ComponentFixture<MainScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
