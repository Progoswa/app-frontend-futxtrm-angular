import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredencialesInvalidasComponent } from './credenciales-invalidas.component';

describe('CredencialesInvalidasComponent', () => {
  let component: CredencialesInvalidasComponent;
  let fixture: ComponentFixture<CredencialesInvalidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredencialesInvalidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredencialesInvalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
