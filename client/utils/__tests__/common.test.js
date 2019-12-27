import { getPercentage, formatPercentage, formatNumber } from '../common';

describe('utils', () => {
  describe('common', () => {
    describe('getPercentage', () => {
      test('should return the percentage from the given values', () => {
        const actual = getPercentage(150, 200);
        const expected = 75;

        expect(actual).toEqual(expected);
      });
    });

    describe('formatPercentage', () => {
      test('should return formatted value given the percentage', () => {
        expect(formatPercentage(75)).toEqual('75%');
      });
    });

    describe('formatNumber', () => {
      test('should return formatted value given the number', () => {
        expect(formatNumber(75000000)).toEqual('75.000.000');
      });
    });
  });
});
