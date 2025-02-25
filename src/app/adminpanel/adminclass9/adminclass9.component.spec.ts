import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminclass9Component } from './adminclass9.component';

describe('Adminclass9Component', () => {
  let component: Adminclass9Component;
  let fixture: ComponentFixture<Adminclass9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminclass9Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminclass9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
