/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NuevoAdministradorComponent } from './nuevo-administrador.component';

describe('NuevoAdministradorComponent', () => {
  let component: NuevoAdministradorComponent;
  let fixture: ComponentFixture<NuevoAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
