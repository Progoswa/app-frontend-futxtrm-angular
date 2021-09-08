/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerEntrenamientoSeccionComponent } from './ver-entrenamiento-seccion.component';

describe('VerEntrenamientoSeccionComponent', () => {
  let component: VerEntrenamientoSeccionComponent;
  let fixture: ComponentFixture<VerEntrenamientoSeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEntrenamientoSeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEntrenamientoSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
