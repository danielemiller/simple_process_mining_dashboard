import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLogGeneratorComponent } from './event-log-generator.component';

describe('EventLogGeneratorComponent', () => {
  let component: EventLogGeneratorComponent;
  let fixture: ComponentFixture<EventLogGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventLogGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventLogGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
