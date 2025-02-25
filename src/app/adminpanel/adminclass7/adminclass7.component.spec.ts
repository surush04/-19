import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminclass7Component } from './adminclass7.component';

describe('Adminclass7Component', () => {
  let component: Adminclass7Component;
  let fixture: ComponentFixture<Adminclass7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminclass7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminclass7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
