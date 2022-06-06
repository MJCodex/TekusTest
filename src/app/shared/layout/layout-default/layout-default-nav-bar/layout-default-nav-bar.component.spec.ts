import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDefaultNavBarComponent } from './layout-default-nav-bar.component';

describe('LayoutDefaultNavBarComponent', () => {
  let component: LayoutDefaultNavBarComponent;
  let fixture: ComponentFixture<LayoutDefaultNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutDefaultNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDefaultNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
