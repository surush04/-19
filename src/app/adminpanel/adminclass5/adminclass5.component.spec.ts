import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminclass5Component } from './adminclass5.component';

describe('Adminclass5Component', () => {
  let component: Adminclass5Component;
  let fixture: ComponentFixture<Adminclass5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminclass5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminclass5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
