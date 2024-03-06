import { describe, expect, test } from 'vitest';

import { Product } from '@/types';
import { ProductCard } from '@/components';
import { render } from '@testing-library/react';

describe('ProductCard', () => {
  test('should render correctly with initial props', () => {
    const testProduct: Product = {
      id: 1,
      price: 1000,
      brand: 'test brand',
      product: 'test product',
    };
    const { baseElement } = render(<ProductCard product={testProduct} />);

    expect(baseElement).toBeInTheDocument();
    expect(baseElement).matchSnapshot();
  });
});
