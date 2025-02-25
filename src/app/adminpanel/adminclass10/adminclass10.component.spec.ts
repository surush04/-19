import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminclass10Component } from './adminclass10.component';

describe('Adminclass10Component', () => {
  let component: Adminclass10Component;
  let fixture: ComponentFixture<Adminclass10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminclass10Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminclass10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
