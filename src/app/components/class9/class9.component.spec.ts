import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class9Component } from './class9.component';

describe('Class9Component', () => {
  let component: Class9Component;
  let fixture: ComponentFixture<Class9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Class9Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Class9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
