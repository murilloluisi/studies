import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JSStudiesComponent } from './js-studies.component';

describe('JSStudiesComponent', () => {
  let component: JSStudiesComponent;
  let fixture: ComponentFixture<JSStudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JSStudiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JSStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
