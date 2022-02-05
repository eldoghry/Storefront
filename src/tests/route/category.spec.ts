import supertest from 'supertest';

export default (request: supertest.SuperTest<supertest.Test>) => {
  describe('CATEGORY ENDPOINT TEST SUITS\n', () => {
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

    it('index route should return 200', async () => {
      const response = await request.get('/categories');
      expect(response.statusCode).toEqual(200);
    });

    it('create route should create new category and return status code 201', async () => {
      const response = await request
        .post('/categories')
        .set('Authorization', validToken)
        .send({ name: 'category 1' });
      expect(response.statusCode).toEqual(201);
      expect(response.body).toEqual({
        status: 'success',
        category: { id: 1, name: 'category 1' },
      });
    });

    it('create route with missing parameters should return status code 400', async () => {
      const response = await request
        .post('/categories')
        .set('Authorization', validToken);
      expect(response.statusCode).toEqual(400);
    });

    it('create route with invalid token return status code 401', async () => {
      const response = await request
        .post('/categories')
        .set('Authorization', invalidToken)
        .send({ name: 'category 2' });

      expect(response.statusCode).toEqual(401);
    });

    it('create route with missing token return status code 400', async () => {
      const response = await request
        .post('/categories')
        .send({ name: 'category 2' });
      expect(response.statusCode).toEqual(400);
    });

    it('show route should show category(1) and return status code 200', async () => {
      const response = await request.get('/categories/1');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        status: 'success',
        category: { id: 1, name: 'category 1' },
      });
    });

    it('show category with invalid id and return status code 200', async () => {
      const response = await request.get('/categories/invalid');
      expect(response.statusCode).toEqual(400);
    });

    it('update route should update category(1) and return status code 200', async () => {
      const response = await request
        .patch('/categories/1')
        .set('Authorization', validToken)
        .send({ name: 'new category 1' });
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        status: 'success',
        category: { id: 1, name: 'new category 1' },
      });
    });

    it('delete route should delete category(2) and return status code 204', async () => {
      //create new categry
      await request
        .post('/categories')
        .set('Authorization', validToken)
        .send({ name: 'category 2' });

      const response = await request
        .delete('/categories/2')
        .set('Authorization', validToken);
      expect(response.statusCode).toEqual(204);
    });
  }); //EOF CATEGORY ENDPOINT TEST SUITS
}; //EOF EXPORT
