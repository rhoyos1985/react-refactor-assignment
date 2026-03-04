import { describe, it, expect } from 'vitest';
import { normalizeName, isSlotStale, shouldReportErrors } from '../src/utils/nameNormalizer';

describe('normalizeName', () => {
  it('should capitalize first letter of each word', () => {
    expect(normalizeName('john doe')).toBe('John Doe');
    expect(normalizeName('JANE DOE')).toBe('Jane Doe');
  });

  it('should handle Irish surnames with O\'', () => {
    expect(normalizeName("patrick o'brien")).toBe("Patrick O'Brien");
    expect(normalizeName("SEAN O'CONNOR")).toBe("Sean O'Connor");
  });

  it('should handle single names', () => {
    expect(normalizeName('doctor')).toBe('Doctor');
  });

  it('should handle names with extra spaces', () => {
    expect(normalizeName('  john  ')).toBe('John');
  });

  it('should handle empty strings', () => {
    expect(normalizeName('')).toBe('');
  });

  it('should handle names from the sample data', () => {
    expect(normalizeName('Adoring Shtern')).toBe('Adoring Shtern');
    expect(normalizeName('Brave Ramanujan')).toBe('Brave Ramanujan');
    expect(normalizeName('hopeful hopper')).toBe('Hopeful Hopper');
  });
});

describe('isSlotStale', () => {
  it('should return false for recent slots', () => {
    const now = new Date().toISOString();
    expect(isSlotStale(now)).toBe(false);
  });

  it('should return true for slots older than 5 minutes', () => {
    const sixMinutesAgo = new Date(Date.now() - 6 * 60 * 1000).toISOString();
    expect(isSlotStale(sixMinutesAgo)).toBe(true);
  });

  it('should return false for slots exactly 4 minutes old', () => {
    const fourMinutesAgo = new Date(Date.now() - 4 * 60 * 1000).toISOString();
    expect(isSlotStale(fourMinutesAgo)).toBe(false);
  });
});

describe('shouldReportErrors', () => {
  it('should return boolean based on day of week', () => {
    // This test will pass regardless of what day it runs
    const result = shouldReportErrors();
    expect(typeof result).toBe('boolean');
    
    // On Sunday it should be false, other days true
    const today = new Date();
    expect(result).toBe(today.getDay() !== 0);
  });
});
