/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CursoRwDevComponent } from './curso-rw-dev.component';

describe('CursoRwDevComponent', () => {
  let component: CursoRwDevComponent;
  let fixture: ComponentFixture<CursoRwDevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoRwDevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoRwDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
