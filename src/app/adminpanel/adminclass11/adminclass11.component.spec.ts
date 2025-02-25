import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminclass11Component } from './adminclass11.component';

describe('Adminclass11Component', () => {
  let component: Adminclass11Component;
  let fixture: ComponentFixture<Adminclass11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminclass11Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminclass11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
