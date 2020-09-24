import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinarProprietarioComponent } from './assinar-proprietario.component';

describe('AssinarProprietarioComponent', () => {
  let component: AssinarProprietarioComponent;
  let fixture: ComponentFixture<AssinarProprietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssinarProprietarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssinarProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
