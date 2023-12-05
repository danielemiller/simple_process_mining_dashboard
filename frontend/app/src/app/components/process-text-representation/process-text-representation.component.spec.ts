import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTextRepresentationComponent } from './process-text-representation.component';

describe('ProcessTextRepresentationComponent', () => {
  let component: ProcessTextRepresentationComponent;
  let fixture: ComponentFixture<ProcessTextRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTextRepresentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessTextRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
