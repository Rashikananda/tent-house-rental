import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacionComponent } from './transacion.component';

describe('TransacionComponent', () => {
  let component: TransacionComponent;
  let fixture: ComponentFixture<TransacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
