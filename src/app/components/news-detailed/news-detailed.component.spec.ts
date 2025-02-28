import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailedComponent } from './news-detailed.component';

describe('NewsDetailedComponent', () => {
  let component: NewsDetailedComponent;
  let fixture: ComponentFixture<NewsDetailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsDetailedComponent]
    });
    fixture = TestBed.createComponent(NewsDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
