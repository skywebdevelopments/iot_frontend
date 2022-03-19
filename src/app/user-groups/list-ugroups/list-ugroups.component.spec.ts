import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUgroupsComponent } from './list-ugroups.component';

describe('ListUgroupsComponent', () => {
  let component: ListUgroupsComponent;
  let fixture: ComponentFixture<ListUgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUgroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
