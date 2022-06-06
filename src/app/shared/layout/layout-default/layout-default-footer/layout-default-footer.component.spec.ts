import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDefaultFooterComponent } from './layout-default-footer.component';

describe('LayoutDefaultFooterComponent', () => {
  let component: LayoutDefaultFooterComponent;
  let fixture: ComponentFixture<LayoutDefaultFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutDefaultFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDefaultFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
