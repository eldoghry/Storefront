import OrderStore from '../../model/order';
import CategoryStore from '../../model/category';
import ProductStore from '../../model/product';
import UserStore from '../../model/user';

export default () => {
  const orderStore = new OrderStore();

  describe('ORDER TEST SUITE', () => {
    describe('Order: Test Method Existance \n', () => {
      it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
      });

      it('should have an create method', () => {
        expect(orderStore.create).toBeDefined();
      });

      it('should have an show method', () => {
        expect(orderStore.show).toBeDefined();
      });

      it('should have an update method', () => {
        expect(orderStore.update).toBeDefined();
      });

      it('should have an delete method', () => {
        expect(orderStore.delete).toBeDefined();
      });

      it('should have an addProduct method', () => {
        expect(orderStore.addProduct).toBeDefined();
      });

      it('should have an cart method', () => {
        expect(orderStore.cart).toBeDefined();
      });
    }); //EOF Test Method Existance

    describe('Order: Test Methods Functionailty \n', () => {
      //create new category

      beforeAll(async () => {
        await new CategoryStore().create('category 3'); //id:3

        await new UserStore().create({
          username: 'user2',
          firstname: 'mohamed',
          lastname: 'madgy',
          password: 'password',
        }); //id: 2

        await new ProductStore().create({
          name: 'product 2',
          price: 100,
          category_id: 3,
        }); //id: 2
      });

      it('Create method should add new order and return it', async () => {
        const result = await orderStore.create(2);
        expect(result).toEqual({
          id: 1,
          user_id: 2,
          status: 'active',
        });
      });

      it('Index method should return list of orders', async () => {
        const result = await orderStore.index(2);
        expect(result).toEqual([
          {
            id: 1,
            user_id: 2,
            status: 'active',
          },
        ]);
      });

      it('Show method should return order', async () => {
        const result = await orderStore.show(1);
        expect(result).toEqual({
          id: 1,
          user_id: 2,
          status: 'active',
        });
      });

      it('Update method should update and return active order', async () => {
        const result = await orderStore.update(1, 'active');
        expect(result).toEqual({
          id: 1,
          user_id: 2,
          status: 'active',
        });
      });

      it('AddProduct method should add product to active order ', async () => {
        const result = await orderStore.addProduct(1, 2, 10);
        expect(result).toEqual({
          id: 1,
          order_id: 1,
          product_id: 2,
          quantity: 10,
        });
      });

      it('Cart method should add product to active order ', async () => {
        const result = await orderStore.cart(1);
        expect(result).toEqual([
          {
            product_id: 2,
            quantity: 10,
            name: 'product 2',
          },
        ]);
      });

      it('Update method should update and return complete order', async () => {
        const result = await orderStore.update(1, 'complete');
        expect(result).toEqual({
          id: 1,
          user_id: 2,
          status: 'complete',
        });
      });

      it('Delete method should remove order and index return empty list', async () => {
        await orderStore.delete(1);
        const result = await orderStore.index(2);
        expect(result).toEqual([]);
      });
    }); //EOF Test Method Functionailty
  }); //EOF order TEST SUITE
}; //EOF EXPORT
