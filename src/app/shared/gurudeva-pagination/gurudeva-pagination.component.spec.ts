import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GurudevaPaginationComponent } from './gurudeva-pagination.component';

describe('GurudevaPaginationComponent', () => {
  let component: GurudevaPaginationComponent;
  let fixture: ComponentFixture<GurudevaPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GurudevaPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GurudevaPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
