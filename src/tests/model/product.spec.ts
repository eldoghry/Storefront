import ProductStore from '../../model/product';
import CategoryStore from '../../model/category';

export default () => {
  const productStore = new ProductStore();

  describe('PRODUCT TEST SUITE', () => {
    describe('Product: Test Method Existance \n', () => {
      it('should have an index method', () => {
        expect(productStore.index).toBeDefined();
      });

      it('should have an create method', () => {
        expect(productStore.create).toBeDefined();
      });

      it('should have an show method', () => {
        expect(productStore.show).toBeDefined();
      });

      it('should have an update method', () => {
        expect(productStore.update).toBeDefined();
      });

      it('should have an delete method', () => {
        expect(productStore.delete).toBeDefined();
      });
    }); //EOF Test Method Existance

    describe('Product: Test Methods Functionailty \n', () => {
      //create new category
      beforeAll(async () => {
        await new CategoryStore().create('category 2');
      });

      const product = {
        name: 'product 1',
        price: 100,
        category_id: 2,
      };

      it('Create method should add new product and return it', async () => {
        const result = await productStore.create(product);
        expect(result).toEqual({
          id: 1,
          name: 'product 1',
          price: 100,
          category_id: 2,
        });
      });

      it('Index method should return list of products', async () => {
        const result = await productStore.index();
        expect(result).toEqual([
          {
            id: 1,
            name: 'product 1',
            price: 100,
            category_id: 2,
          },
        ]);
      });

      it('Show method should return product', async () => {
        const result = await productStore.show(1);
        expect(result).toEqual({
          id: 1,
          name: 'product 1',
          price: 100,
          category_id: 2,
        });
      });

      it('Update method should update and return product', async () => {
        const result = await productStore.update({ id: 1, name: 'new product 1' });
        expect(result).toEqual({
          id: 1,
          name: 'new product 1',
          price: 100,
          category_id: 2,
        });
      });

      it('Delete method should remove product and index return empty list', async () => {
        await productStore.delete(1);
        const result = await productStore.index();
        expect(result).toEqual([]);
      });
    }); //EOF Test Method Functionailty
  }); //EOF product TEST SUITE
}; //EOF EXPORT
