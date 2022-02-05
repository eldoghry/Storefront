import supertest from 'supertest';

export default (request: supertest.SuperTest<supertest.Test>) => {
  describe('ORDER ENDPOINT TEST SUITS\n', () => {
    let validToken = '';
    const invalidToken =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJ1c2VyNTMiLCJmaXJzdG5hbWUiOiJtb2hhbWVkIiwibGFzdG5hbWUiOiJtYWdkeSIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCRLUjE2ajlPNThyR09pUTVrYVlhdTYuSHRGbmNVNnFCeW5tZW44WUxrQ2pMbTdIbWYzZEpJcSIsImlhdCI6MTY0NDAxMTg2MywiZXhwIjoxNjQ0MDQ3ODYzfQ.1TNMuTeAA-z6l-_uOZzbxbl_8N6xi55V8F3lfwZgdCU';

    beforeAll(async () => {
      const response = await request.post('/users/login').send({
        username: 'username',
        password: 'password',
      });

      validToken = `Bearer ${response.body.token}`;
    });

    it('create route should create new order and return status code 201', async () => {
      const response = await request
        .post('/orders')
        .set('Authorization', validToken);
      expect(response.statusCode).toEqual(201);
    });

    it('index route should return 200', async () => {
      const response = await request
        .get('/orders')
        .set('Authorization', validToken);
      expect(response.statusCode).toEqual(200);
    });

    it('delete route should delete order(2) and return status code 204', async () => {
      //create new order
      await request.post('/orders').set('Authorization', validToken);

      const response = await request
        .delete('/orders/2')
        .set('Authorization', validToken);

      expect(response.statusCode).toEqual(204);
    });

    it('create route with invalid token return status code 401', async () => {
      const response = await request
        .post('/orders')
        .set('Authorization', invalidToken);

      expect(response.statusCode).toEqual(401);
    });

    it('create route with missing token return status code 400', async () => {
      const response = await request.post('/orders');
      expect(response.statusCode).toEqual(400);
    });

    it('show route should show order(1) and return status code 200', async () => {
      const response = await request
        .get('/orders/1')
        .set('Authorization', validToken);
      expect(response.statusCode).toEqual(200);
    });

    it("can't complete empty order(1) and return status code 400", async () => {
      const response = await request
        .patch('/orders/1')
        .set('Authorization', validToken)
        .send({ status: 'complete' });
      expect(response.statusCode).toEqual(400);
    });

    it('add product to order(1) and return status code 201', async () => {
      const response = await request
        .post('/orders/1/products')
        .set('Authorization', validToken)
        .send({ quantity: 16, product_id: 1 });
      expect(response.statusCode).toEqual(201);
    });

    it('complete non empty order should update order(1) and return status code 200', async () => {
      const response = await request
        .patch('/orders/1')
        .set('Authorization', validToken)
        .send({ status: 'complete' });
      expect(response.statusCode).toEqual(200);
    });

    it('re-active order should update order(1) and return status code 200', async () => {
      const response = await request
        .patch('/orders/1')
        .set('Authorization', validToken)
        .send({ status: 'active' });
      expect(response.statusCode).toEqual(200);
    });

    it('update order(1) with missing parameter should return status code 400', async () => {
      const response = await request
        .patch('/orders/1')
        .set('Authorization', validToken);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toEqual({
        status: 'error',
        error: 'status is required and must be (active or complete)',
      });
    });
  }); //EOF order ENDPOINT TEST SUITS
}; //EOF EXPORT
