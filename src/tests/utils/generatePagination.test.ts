import { describe, expect, test } from 'vitest';

import { generatePagination } from '@/utils';

describe('generatePagination', () => {
  test('should return an array for totalPages less than or equal to 9', () => {
    for (let totalPages = 1; totalPages <= 9; totalPages++) {
      expect(generatePagination(1, totalPages)).toEqual(Array.from({ length: totalPages }, (_, i) => i + 1));
    }
  });

  test('should return correct pagination for currentPage less than 5 and totalPages greater than 9', () => {
    const totalPages = 15;
    for (let currentPage = 1; currentPage < 5; currentPage++) {
      expect(generatePagination(currentPage, totalPages)).toEqual([1, 2, 3, 4, 5, '...', currentPage + 14]);
    }
  });

  test('should return correct pagination for currentPage greater than or equal to totalPages - 3', () => {
    const totalPages = 15;
    for (let currentPage = totalPages - 3; currentPage <= totalPages; currentPage++) {
      expect(generatePagination(currentPage, totalPages)).toEqual([
        1,
        2,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]);
    }
  });

  test('should return correct pagination for other cases', () => {
    const currentPage = Math.floor(Math.random() * 10) + 10;
    const totalPages = currentPage + 10;
    expect(generatePagination(currentPage, totalPages)).toEqual([
      1,
      '...',
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      '...',
      currentPage + 15,
    ]);
  });
});
