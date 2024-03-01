import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { YnabService } from './ynab.service';
import { AuthService } from '../auth/auth.service';

// TODO: Add tests
describe('YnabService', () => {
  let service: YnabService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(YnabService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
