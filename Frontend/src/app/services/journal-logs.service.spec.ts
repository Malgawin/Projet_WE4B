import { TestBed } from '@angular/core/testing';

import { JournalLogsService } from './journal-logs.service';

describe('JournalLogsService', () => {
  let service: JournalLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
