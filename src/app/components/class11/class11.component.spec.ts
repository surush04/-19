import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class11Component } from './class11.component';

describe('Class11Component', () => {
  let component: Class11Component;
  let fixture: ComponentFixture<Class11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Class11Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Class11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
