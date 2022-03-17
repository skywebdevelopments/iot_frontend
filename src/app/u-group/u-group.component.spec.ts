import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UGroupComponent } from './u-group.component';

describe('UGroupComponent', () => {
  let component: UGroupComponent;
  let fixture: ComponentFixture<UGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
