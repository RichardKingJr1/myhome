import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlugarComponent } from './alugar.component';

describe('AlugarComponent', () => {
  let component: AlugarComponent;
  let fixture: ComponentFixture<AlugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlugarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
