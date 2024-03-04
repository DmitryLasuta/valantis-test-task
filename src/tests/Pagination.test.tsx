import { render, fireEvent, screen } from '@testing-library/react';
import { Pagination } from '@/components';
import { describe, it, expect, vi } from 'vitest';

describe('Pagination', () => {
  it('should render correctly with initial props', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(getByLabelText('Go to previous page')).toBeDisabled();
    expect(getByLabelText('Go to next page')).not.toBeDisabled();
  });

  it('should call onPageChange with the correct page when next button is clicked', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    fireEvent.click(getByLabelText('Go to next page'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with the correct page when a page number is clicked', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    fireEvent.click(getByLabelText('Go to page 3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('should disable next button when currentPage is equal to totalPages', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);

    expect(getByLabelText('Go to next page')).toBeDisabled();
  });

  it('should disable previous button when currentPage is equal to 1', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    expect(getByLabelText('Go to previous page')).toBeDisabled();
  });

  it('should call onPageChange with the correct page when previous button is clicked', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

    fireEvent.click(getByLabelText('Go to previous page'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
