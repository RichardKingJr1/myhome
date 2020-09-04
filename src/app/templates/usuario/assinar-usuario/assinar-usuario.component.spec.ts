import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinarUsuarioComponent } from './assinar-usuario.component';

describe('AssinarUsuarioComponent', () => {
  let component: AssinarUsuarioComponent;
  let fixture: ComponentFixture<AssinarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssinarUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssinarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
