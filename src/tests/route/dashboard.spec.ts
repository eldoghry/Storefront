import supertest from 'supertest';

export default (request: supertest.SuperTest<supertest.Test>) => {
  describe('DASHBOARD ENDPOINT TEST SUITS\n', () => {
    it('get all products with category 1 and return status code 200', async () => {
      const response = await request.get('/dashboard/products/category/1');
      expect(response.statusCode).toEqual(200);
    });

    it('get most popular products and return status code 200 ', async () => {
      const response = await request.get(
        '/dashboard/products/popular/?sort=desc&limit=5'
      );
      expect(response.statusCode).toEqual(200);
    });
  }); //EOF order ENDPOINT TEST SUITS
}; //EOF EXPORT
