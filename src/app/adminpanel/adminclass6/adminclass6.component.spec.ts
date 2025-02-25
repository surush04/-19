import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminclass6Component } from './adminclass6.component';

describe('Adminclass6Component', () => {
  let component: Adminclass6Component;
  let fixture: ComponentFixture<Adminclass6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminclass6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminclass6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
