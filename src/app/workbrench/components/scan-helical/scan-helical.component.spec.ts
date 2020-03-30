/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ScanHelicalComponent } from './scan-helical.component';

describe('ScanHelicalComponent', () => {
  let component: ScanHelicalComponent;
  let fixture: ComponentFixture<ScanHelicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanHelicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanHelicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
