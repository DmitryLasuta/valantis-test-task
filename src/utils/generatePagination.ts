export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage < 5) {
    return [1, 2, 3, 4, 5, '...', currentPage + 7 < totalPages ? currentPage + 14 : totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, 2, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    '...',
    currentPage + 7 < totalPages ? currentPage + 15 : totalPages,
  ];
};
