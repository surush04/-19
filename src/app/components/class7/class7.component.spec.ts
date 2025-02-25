import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class7Component } from './class7.component';

describe('Class7Component', () => {
  let component: Class7Component;
  let fixture: ComponentFixture<Class7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Class7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Class7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
