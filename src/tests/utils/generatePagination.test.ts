import { generatePagination } from '@/utils'; // replace with your actual file path
import { describe, it, expect } from 'vitest';

describe('generatePagination', () => {
  it('should return an array for totalPages less than or equal to 7', () => {
    for (let totalPages = 1; totalPages <= 7; totalPages++) {
      expect(generatePagination(1, totalPages)).toEqual(Array.from({ length: totalPages }, (_, i) => i + 1));
    }
  });

  it('should return correct pagination for currentPage less than 4 and totalPages greater than 7', () => {
    const totalPages = 10;
    for (let currentPage = 1; currentPage <= 3; currentPage++) {
      expect(generatePagination(currentPage, totalPages)).toEqual([1, 2, 3, 4, '...', totalPages - 1, totalPages]);
    }
  });

  it('should return correct pagination for currentPage greater than or equal to totalPages - 2', () => {
    const totalPages = 10;
    for (let currentPage = totalPages - 2; currentPage <= totalPages; currentPage++) {
      expect(generatePagination(currentPage, totalPages)).toEqual([
        1,
        2,
        '...',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]);
    }
  });

  it('returns correct pagination for other cases', () => {
    const currentPage = Math.floor(Math.random() * 10) + 1;
    const totalPages = currentPage * 2 + Math.floor(Math.random() * 5) + 1;
    expect(generatePagination(currentPage, totalPages)).toEqual([
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ]);
  });
});
