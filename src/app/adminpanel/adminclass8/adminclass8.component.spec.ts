import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminclass8Component } from './adminclass8.component';

describe('Adminclass8Component', () => {
  let component: Adminclass8Component;
  let fixture: ComponentFixture<Adminclass8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminclass8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminclass8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
