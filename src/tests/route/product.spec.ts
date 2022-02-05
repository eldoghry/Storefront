import supertest from 'supertest';

export default (request: supertest.SuperTest<supertest.Test>) => {
  describe('PRODUCT ENDPOINT TEST SUITS\n', () => {
    let validToken = '';
    const invalidToken =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJ1c2VyNTMiLCJmaXJzdG5hbWUiOiJtb2hhbWVkIiwibGFzdG5hbWUiOiJtYWdkeSIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCRLUjE2ajlPNThyR09pUTVrYVlhdTYuSHRGbmNVNnFCeW5tZW44WUxrQ2pMbTdIbWYzZEpJcSIsImlhdCI6MTY0NDAxMTg2MywiZXhwIjoxNjQ0MDQ3ODYzfQ.1TNMuTeAA-z6l-_uOZzbxbl_8N6xi55V8F3lfwZgdCU';

    const validProduct = { name: 'Product 1', price: 100, category_id: 1 };

    beforeAll(async () => {
      const response = await request.post('/users/login').send({
        username: 'username',
        password: 'password',
      });

      validToken = `Bearer ${response.body.token}`;
    });

    it('index route should return 200', async () => {
      const response = await request.get('/products');
      expect(response.statusCode).toEqual(200);
    });

    it('create route should create new product and return status code 201', async () => {
      const response = await request
        .post('/products')
        .set('Authorization', validToken)
        .send({ name: 'Product 1', price: 100, category_id: 1 });

      expect(response.statusCode).toEqual(201);
    });

    it('create route with missing parameters should return status code 400', async () => {
      const response = await request
        .post('/products')
        .set('Authorization', validToken);
      expect(response.statusCode).toEqual(400);
    });

    it('create route with invalid token return status code 401', async () => {
      const response = await request
        .post('/products')
        .set('Authorization', invalidToken)
        .send(validProduct);
      expect(response.statusCode).toEqual(401);
    });

    it('create route with missing token return status code 400', async () => {
      const response = await request.post('/products').send(validProduct);
      expect(response.statusCode).toEqual(400);
    });

    it('show route should show product(1) and return status code 200', async () => {
      const response = await request.get('/products/1');
      expect(response.statusCode).toEqual(200);
    });

    it('update route should update product(1) and return status code 200', async () => {
      const response = await request
        .patch('/products/1')
        .set('Authorization', validToken)
        .send({ name: 'new Product 1' });
      expect(response.statusCode).toEqual(200);
    });

    it('delete route should delete product(2) and return status code 204', async () => {
      //create new product
      await request
        .post('/products')
        .set('Authorization', validToken)
        .send({ name: 'Product 2', price: 100, category_id: 1 });

      const response = await request
        .delete('/products/2')
        .set('Authorization', validToken);
      expect(response.statusCode).toEqual(204);
    });
  }); //EOF product ENDPOINT TEST SUITS
}; //EOF EXPORT
