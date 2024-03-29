import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PrivacyComponent } from './privacy.component';

describe('PrivacyComponent', () => {
  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [PrivacyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
