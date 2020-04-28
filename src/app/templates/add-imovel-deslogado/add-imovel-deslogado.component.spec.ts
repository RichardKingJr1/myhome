import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImovelDeslogadoComponent } from './add-imovel-deslogado.component';

describe('AddImovelDeslogadoComponent', () => {
  let component: AddImovelDeslogadoComponent;
  let fixture: ComponentFixture<AddImovelDeslogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImovelDeslogadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImovelDeslogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
