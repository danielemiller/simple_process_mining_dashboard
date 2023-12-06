import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessBpmnRepresentationComponent } from './process-bpmn-representation.component';

describe('ProcessBpmnRepresentationComponent', () => {
  let component: ProcessBpmnRepresentationComponent;
  let fixture: ComponentFixture<ProcessBpmnRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessBpmnRepresentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessBpmnRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
