import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmentityListComponent } from './amentity-list.component';

describe('AmentityListComponent', () => {
  let component: AmentityListComponent;
  let fixture: ComponentFixture<AmentityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmentityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmentityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
