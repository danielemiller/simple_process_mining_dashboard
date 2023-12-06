import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessAnalysisComponent } from './process-analysis.component';

describe('ProcessAnalysisComponent', () => {
  let component: ProcessAnalysisComponent;
  let fixture: ComponentFixture<ProcessAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
