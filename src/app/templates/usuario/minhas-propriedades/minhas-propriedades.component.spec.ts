import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasPropriedadesComponent } from './minhas-propriedades.component';

describe('MinhasPropriedadesComponent', () => {
  let component: MinhasPropriedadesComponent;
  let fixture: ComponentFixture<MinhasPropriedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasPropriedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasPropriedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
