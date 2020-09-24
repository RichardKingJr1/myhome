import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlugandoComponent } from './alugando.component';

describe('AlugandoComponent', () => {
  let component: AlugandoComponent;
  let fixture: ComponentFixture<AlugandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlugandoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlugandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
