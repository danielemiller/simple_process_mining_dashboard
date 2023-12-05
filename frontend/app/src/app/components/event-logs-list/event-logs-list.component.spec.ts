import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLogsListComponent } from './event-logs-list.component';

describe('EventLogsListComponent', () => {
  let component: EventLogsListComponent;
  let fixture: ComponentFixture<EventLogsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventLogsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventLogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
