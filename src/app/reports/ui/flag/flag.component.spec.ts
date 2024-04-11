import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagIconComponent } from './flag.component';

describe('FlagIconComponent', () => {
  let component: FlagIconComponent;
  let fixture: ComponentFixture<FlagIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagIconComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set flag color and label', () => {
    component.flag = { color: 'orange', name: 'Impulse' };
    fixture.detectChanges();

    const path: HTMLElement = fixture.nativeElement.querySelector('#flag-pill-icon-fill > path');
    const span: HTMLElement = fixture.nativeElement.querySelector('span.label');

    expect(path.getAttribute('fill')).toBe(component.flag.color);
    expect(span.textContent).toBe(component.flag.name);
  });
});
