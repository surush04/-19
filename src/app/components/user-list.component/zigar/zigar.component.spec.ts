/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZigarComponent } from './zigar.component';

describe('ZigarComponent', () => {
  let component: ZigarComponent;
  let fixture: ComponentFixture<ZigarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZigarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZigarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
