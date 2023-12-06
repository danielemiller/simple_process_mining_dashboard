import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleTimeComponent } from './cycle-time.component';

describe('CycleTimeComponent', () => {
  let component: CycleTimeComponent;
  let fixture: ComponentFixture<CycleTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CycleTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
