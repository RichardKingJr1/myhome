import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarFotosComponent } from './atualizar-fotos.component';

describe('AtualizarFotosComponent', () => {
  let component: AtualizarFotosComponent;
  let fixture: ComponentFixture<AtualizarFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarFotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
