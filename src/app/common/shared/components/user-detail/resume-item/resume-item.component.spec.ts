import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeItemComponent } from './resume-item.component';

describe('ResumeItemComponent', () => {
  let component: ResumeItemComponent;
  let fixture: ComponentFixture<ResumeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
