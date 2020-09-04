import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinarProprietarioAlugarComponent } from './assinar-proprietario-alugar.component';

describe('AssinarProprietarioAlugarComponent', () => {
  let component: AssinarProprietarioAlugarComponent;
  let fixture: ComponentFixture<AssinarProprietarioAlugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssinarProprietarioAlugarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssinarProprietarioAlugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
