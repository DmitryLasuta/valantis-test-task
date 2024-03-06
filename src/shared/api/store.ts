import type { Product } from '@/types';
import md5 from 'md5';

type ProductExcludingId = Omit<Product, 'id'>;
type ProductFieldNames = keyof ProductExcludingId;

class SoreAPI {
  public baseURL = 'https://api.valantis.store:41000';
  private password = import.meta.env.VITE_STORE_API_PASSWORD;

  private xAuth: string;

  constructor() {
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    this.xAuth = md5(`${this.password}_${timestamp}`);
  }

  /**
   * Fetcher function to make a POST request to a specified URL.
   *
   * @template T The expected return type of the fetch request.
   * @param {Object} requestBody The body of the request.
   * @param {('get_ids' | 'get_items' | 'filter' | 'get_fields')} requestBody.action The action to be performed.
   * @param {Object} [requestBody.params] Additional parameters for the request.
   * @returns {Promise<T>} Returns a Promise that resolves with the result of the fetch request.
   **/
  private async fetcher<T>(requestBody: {
    action: 'get_ids' | 'get_items' | 'filter' | 'get_fields';
    params?: object;
  }): Promise<T> {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'X-Auth': this.xAuth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.json() as Promise<{ result: T }>;
      return (await data).result;
    } catch (error) {
      console.error('Error in fetcher:', error);
      throw error;
    }
  }
  /**
   * The method returns an ordered list of product identifiers.
   *
   * @returns {Promise<string[]>} Ordered list of product identifiers.
   */
  public async getIdentifiers(): Promise<string[]>;
  /**
   * Used to filter.
   * Returns an ordered list of product IDs matching the specified value.
   *
   * Any field returned by the `getFields` method without parameters can be used as a parameter.
   * The data type corresponding to the field must be used as the value.
   * For the product field it will be checked if the parameter is a string.
   * For other fields, strict matching is checked.
   * @param {Partial<ProductExcludingId>} params Parameters for filtering.
   * @returns {Promise<string[]>} List of product identifiers that satisfy the filtering conditions.
   */
  public async getIdentifiers(params: Partial<ProductExcludingId>): Promise<string[]>;
  /**
   * The method returns an ordered list of product identifiers.
   * Detailed information about the product can be requested using the selected identifiers.
   *
   * Parameters:
   * @param {number} params.limit The number of identifiers.
   * @param {number} params.offset  Offset relative to the beginning of the list.
   *
   * @returns {Promise<string[]>} An array of identifiers
   */
  public async getIdentifiers(params: { limit: number; offset: number }): Promise<string[]>;
  public async getIdentifiers(params?: unknown): Promise<string[]> {
    if (!params) {
      const identifiers = await this.fetcher<string[]>({
        action: 'get_ids',
      });
      const uniqueIdentifiers = identifiers.filter((id, index, self) => {
        return self.indexOf(id) === index;
      });
      return uniqueIdentifiers;
    }

    if (typeof params === 'object' && 'limit' in params && 'offset' in params) {
      const identifiers = await this.fetcher<string[]>({
        action: 'get_ids',
        params,
      });
      const uniqueIdentifiers = identifiers.filter((id, index, self) => {
        return self.indexOf(id) === index;
      });
      return uniqueIdentifiers;
    }

    return this.fetcher({
      action: 'filter',
      params,
    });
  }

  /**
   * The method returns an ordered list of products with all characteristics by their identifiers.
   * Maximum: `100` records. If you need to get more than 100, you need to make a request multiple times.
   * Without identifiers returns null
   *
   * Parameters:
   * @param {string[]} identifiers - An array of identifiers
   * @returns {Promise<Product[] | null>} If an array of identifiers is passed, returns an array of products with all characteristics
   */
  public async getProducts(identifiers: string[]): Promise<Product[] | null> {
    return this.fetcher({
      action: 'get_items',
      params: {
        ids: identifiers,
      },
    });
  }

  /**
   * The method without parameters returns an ordered list of existing product fields.
   * When given the field parameter, it returns an ordered list of the values of the given product field.
   *
   * Parameters:
   * @param {string} params.field - The specified field
   * @param {number} params.offset -  Offset relative to the beginning of the list
   * @param {string} params.limit - The number of returned records
   * @returns {Promise<Array<number | string | null>>}
   */
  public getFields(params?: {
    field: ProductFieldNames;
    offset?: number;
    limit?: number;
  }): Promise<Array<number | string | null>> {
    return this.fetcher({
      action: 'get_fields',
      params,
    });
  }
}

export const storeAPI = new SoreAPI();
