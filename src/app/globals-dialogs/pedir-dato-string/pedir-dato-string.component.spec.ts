/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PedirDatoStringComponent } from './pedir-dato-string.component';

describe('PedirDatoStringComponent', () => {
  let component: PedirDatoStringComponent;
  let fixture: ComponentFixture<PedirDatoStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirDatoStringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirDatoStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
