import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDialougeComponent } from './message-dialouge.component';

describe('MessageDialougeComponent', () => {
  let component: MessageDialougeComponent;
  let fixture: ComponentFixture<MessageDialougeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageDialougeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDialougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
