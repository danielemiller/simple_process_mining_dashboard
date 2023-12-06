import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessGraphRepresentationComponent } from './process-graph-representation.component';

describe('ProcessGraphRepresentationComponent', () => {
  let component: ProcessGraphRepresentationComponent;
  let fixture: ComponentFixture<ProcessGraphRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessGraphRepresentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessGraphRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
