import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeMultilayersComponent } from './tree-multilayers.component';

describe('TreeMultilayersComponent', () => {
  let component: TreeMultilayersComponent;
  let fixture: ComponentFixture<TreeMultilayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeMultilayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeMultilayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
