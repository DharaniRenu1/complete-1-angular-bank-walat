import { TestBed, async, inject } from '@angular/core/testing';

import { BankguardGuard } from './bankguard.guard';

describe('BankguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankguardGuard]
    });
  });

  it('should ...', inject([BankguardGuard], (guard: BankguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
