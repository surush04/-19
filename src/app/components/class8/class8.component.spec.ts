import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class8Component } from './class8.component';

describe('Class8Component', () => {
  let component: Class8Component;
  let fixture: ComponentFixture<Class8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Class8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Class8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
