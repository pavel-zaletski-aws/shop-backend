import { getProductItemById } from './dataProvider';
import data from './data';

describe('dataProvider', () => {
  it('should return product', () => {
    const product = data.find(item => item.id === 1);
    getProductItemById(1).then((data) => {
      expect(data).toBe(product);
    });
  });
});
