import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockDashboardComponent } from './mock-dashboard.component';

describe('MockDashboardComponent', () => {
  let component: MockDashboardComponent;
  let fixture: ComponentFixture<MockDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockDashboardComponent]
    });
    fixture = TestBed.createComponent(MockDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
