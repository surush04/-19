import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class6Component } from './class6.component';

describe('Class6Component', () => {
  let component: Class6Component;
  let fixture: ComponentFixture<Class6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Class6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Class6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
