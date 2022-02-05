import UserStore from '../../model/user';
import user from '../../interface/user';
import bcrypt from 'bcrypt';

export default () => {
  const userStore = new UserStore();
  const pepear: string = process.env.BCRYPT_PASSWORD as string;
  const validUser: user = {
    username: 'username',
    firstname: 'mohamed',
    lastname: 'magdy',
    password: 'password',
  };

  describe('USER TEST SUITE', () => {
    describe('User: Test Method Existance \n', () => {
      it('should have an index method', () => {
        expect(userStore.index).toBeDefined();
      });

      it('should have an create method', () => {
        expect(userStore.create).toBeDefined();
      });

      it('should have an show method', () => {
        expect(userStore.show).toBeDefined();
      });

      it('should have an delete method', () => {
        expect(userStore.delete).toBeDefined();
      });
    }); //EOF Test Method Existance

    describe('User: Test Method Functionailty \n', () => {
      it('Create method should add new user and return token', async () => {
        const result: user = await userStore.create(validUser);
        const isSamePassword = bcrypt.compare(
          validUser + pepear,
          result.password_digest as string
        );

        expect(validUser.username === result.username).toBeTruthy();
        expect(validUser.firstname === result.firstname).toBeTruthy();
        expect(validUser.lastname === result.lastname).toBeTruthy();
        expect(isSamePassword).toBeTruthy();
      });

      it('Index method should return list of categories', async () => {
        const result = await userStore.index();
        expect(result.length).toEqual(1);
      });

      it('Show user(1) method should return user', async () => {
        const result = await userStore.show(1);
        const isSamePassword = bcrypt.compare(
          validUser.password + pepear,
          result.password_digest as string
        );
        expect(validUser.username === result.username).toBeTruthy();
        expect(validUser.firstname === result.firstname).toBeTruthy();
        expect(validUser.lastname === result.lastname).toBeTruthy();
        expect(isSamePassword).toBeTruthy();
      });
    }); //EOF Test Method Functionailty
  }); //EOF user TEST SUITE
}; //EOF EXPORT
