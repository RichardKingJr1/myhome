import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovarPropostaComponent } from './aprovar-proposta.component';

describe('AprovarPropostaComponent', () => {
  let component: AprovarPropostaComponent;
  let fixture: ComponentFixture<AprovarPropostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprovarPropostaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprovarPropostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
