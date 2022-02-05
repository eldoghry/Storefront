import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import user from '../../interface/user';

export default (request: supertest.SuperTest<supertest.Test>) => {
  describe('USER ENDPOINT TEST SUITS\n', () => {
    const invalidToken =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJ1c2VyNTMiLCJmaXJzdG5hbWUiOiJtb2hhbWVkIiwibGFzdG5hbWUiOiJtYWdkeSIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCRLUjE2ajlPNThyR09pUTVrYVlhdTYuSHRGbmNVNnFCeW5tZW44WUxrQ2pMbTdIbWYzZEpJcSIsImlhdCI6MTY0NDAxMTg2MywiZXhwIjoxNjQ0MDQ3ODYzfQ.1TNMuTeAA-z6l-_uOZzbxbl_8N6xi55V8F3lfwZgdCU';

    it('create route should create new user and return status code 201', async () => {
      const response = await request.post('/users').send({
        username: 'username',
        firstname: 'mohamed',
        lastname: 'magdy',
        password: 'password',
      });

      expect(response.statusCode).toEqual(201);
    });

    it('index route should return 200', async () => {
      const validToken = await getToken(request, 'username', 'password');
      const response = await request
        .get('/users')
        .set('Authorization', validToken);
      expect(response.statusCode).toEqual(200);
    });

    it(`show route should show user and return status code 200`, async () => {
      const validToken = await getToken(request, 'username', 'password');
      const u = getUser(validToken);
      const userID = u.id as number;

      const response = await request
        .get(`/users/${userID}`)
        .set('Authorization', validToken);
      expect(response.statusCode).toEqual(200);
    });

    it(`delete route should delete user and return status code 204`, async () => {
      await request.post('/users').send({
        username: 'username2',
        firstname: 'mohamed',
        lastname: 'magdy',
        password: 'password',
      });

      const validToken = await getToken(request, 'username2', 'password');
      const u = getUser(validToken);
      const userID = u.id as number;

      const response = await request
        .delete(`/users/${userID}`)
        .set('Authorization', validToken);
      expect(response.statusCode).toEqual(204);
    });

    it(`unauthorized access return status code 403`, async () => {
      await request.post('/users').send({
        username: 'username3',
        firstname: 'mohamed',
        lastname: 'magdy',
        password: 'password',
      });

      const user1token = await getToken(request, 'username', 'password');
      const user3token = await getToken(request, 'username3', 'password');
      const u = getUser(user3token);
      const userID = u.id as number;

      const response = await request
        .delete(`/users/${userID}`)
        .set('Authorization', user1token);
      expect(response.statusCode).toEqual(403);
    });
  }); //EOF user ENDPOINT TEST SUITS
}; //EOF EXPORT

const getToken = async (
  request: supertest.SuperTest<supertest.Test>,
  username: string,
  password: string
): Promise<string> => {
  const response = await request.post('/users/login').send({
    username,
    password,
  });

  return `Bearer ${response.body.token}`;
};

const getUser = (bearerToken: string): user => {
  const token = bearerToken.split(' ')[1].trim();
  const user = jwt.verify(
    token,
    process.env.TOKEN_ACCESS_SECRET as string
  ) as user;
  return user;
};
