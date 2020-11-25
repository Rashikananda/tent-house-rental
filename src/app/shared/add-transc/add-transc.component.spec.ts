import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTranscComponent } from './add-transc.component';

describe('AddTranscComponent', () => {
  let component: AddTranscComponent;
  let fixture: ComponentFixture<AddTranscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTranscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTranscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
