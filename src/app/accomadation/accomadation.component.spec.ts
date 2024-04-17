import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomadationComponent } from './accomadation.component';

describe('AccomadationComponent', () => {
  let component: AccomadationComponent;
  let fixture: ComponentFixture<AccomadationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccomadationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomadationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
