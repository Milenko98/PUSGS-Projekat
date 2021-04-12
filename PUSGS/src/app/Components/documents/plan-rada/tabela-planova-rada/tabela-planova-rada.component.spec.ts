import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPlanovaRadaComponent } from './tabela-planova-rada.component';

describe('TabelaPlanovaRadaComponent', () => {
  let component: TabelaPlanovaRadaComponent;
  let fixture: ComponentFixture<TabelaPlanovaRadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaPlanovaRadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaPlanovaRadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
