import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUgroupsComponent } from './add-ugroups.component';

describe('AddUgroupsComponent', () => {
  let component: AddUgroupsComponent;
  let fixture: ComponentFixture<AddUgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUgroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
