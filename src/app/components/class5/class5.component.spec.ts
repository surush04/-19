import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class5Component } from './class5.component';

describe('Class5Component', () => {
  let component: Class5Component;
  let fixture: ComponentFixture<Class5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Class5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Class5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
