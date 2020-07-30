import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitarComponent } from './visitar.component';

describe('VisitarComponent', () => {
  let component: VisitarComponent;
  let fixture: ComponentFixture<VisitarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
