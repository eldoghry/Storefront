import CategoryStore from '../../model/category';

export default () => {
  const categoryStore = new CategoryStore();

  describe('CATEGORY TEST SUITE', () => {
    describe('Category: Test Method Existance \n', () => {
      it('should have an index method', () => {
        expect(categoryStore.index).toBeDefined();
      });

      it('should have an create method', () => {
        expect(categoryStore.create).toBeDefined();
      });

      it('should have an show method', () => {
        expect(categoryStore.show).toBeDefined();
      });

      it('should have an update method', () => {
        expect(categoryStore.update).toBeDefined();
      });

      it('should have an delete method', () => {
        expect(categoryStore.delete).toBeDefined();
      });
    }); //EOF Test Method Existance

    describe('Category: Test Methods Functionailty \n', () => {
      it('Create method should add new category and return it', async () => {
        const result = await categoryStore.create('category 1');
        expect(result).toEqual({
          id: 1,
          name: 'category 1',
        });
      });

      it('Index method should return list of categories', async () => {
        const result = await categoryStore.index();
        expect(result).toEqual([
          {
            id: 1,
            name: 'category 1',
          },
        ]);
      });

      it('Show method should return category', async () => {
        const result = await categoryStore.show(1);
        expect(result).toEqual({
          id: 1,
          name: 'category 1',
        });
      });

      it('Update method should update and return category', async () => {
        const result = await categoryStore.update({
          id: 1,
          name: 'new categroy 1',
        });
        expect(result).toEqual({
          id: 1,
          name: 'new categroy 1',
        });
      });

      it('Delete method should remove category and index return empty list', async () => {
        await categoryStore.delete(1);
        const result = await categoryStore.index();
        expect(result).toEqual([]);
      });
    }); //EOF Test Method Functionailty
  }); //EOF CATEGORY TEST SUITE
}; //EOF EXPORT
