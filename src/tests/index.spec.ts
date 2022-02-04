import userTest from './model/user.spec';
import categoryTest from './model/category.spec';
import productTest from './model/product.spec';
import orderTest from './model/order.spec';

describe('first test', () => {
  it('first it', () => {
    expect(1).toBeTruthy();
  });
});

userTest();
categoryTest();
productTest();
orderTest();
