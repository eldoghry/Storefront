import UserStore from '../../model/user';
import user from '../../interface/user';
import bcrypt from 'bcrypt';

export default () => {
  const userStore = new UserStore();
  const pepear: string = process.env.BCRYPT_PASSWORD as string;
  const validUser: user = {
    username: 'magdy',
    firstname: 'mohamed',
    lastname: 'madgy',
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
        const isSamePassword = bcrypt.compare(validUser + pepear, result.password_digest as string);

        expect(validUser.username === result.username).toBeTruthy();
        expect(validUser.firstname === result.firstname).toBeTruthy();
        expect(validUser.lastname === result.lastname).toBeTruthy();
        expect(isSamePassword).toBeTruthy();
      });

      // it('Create method fail becouse user name not unique', async () => {
      //   try {
      //     await userStore.create('user 1');
      //   } catch (err) {
      //     expect(err).toEqual(
      //       'can\'t create categories error: duplicate key value violates unique constraint "categories_name_key"'
      //     );
      //   }
      // });

      it('Index method should return list of categories', async () => {
        const result = await userStore.index();
        expect(result).toEqual([{ id: 1, username: 'magdy', firstname: 'mohamed', lastname: 'madgy' }]);
      });

      it('Show method should return user', async () => {
        const result = await userStore.show(1);
        const isSamePassword = bcrypt.compare(validUser + pepear, result.password_digest as string);
        expect(validUser.username === result.username).toBeTruthy();
        expect(validUser.firstname === result.firstname).toBeTruthy();
        expect(validUser.lastname === result.lastname).toBeTruthy();
        expect(isSamePassword).toBeTruthy();
      });

      // it('Update method should update and return user', async () => {
      //   const result = await userStore.update({ id: 1, name: 'new categroy 1' });
      //   expect(result).toEqual({
      //     id: 1,
      //     name: 'new categroy 1',
      //   });
      // });

      // it('Delete method should remove user and index return empty list', async () => {
      //   await userStore.delete(1);
      //   const result = await userStore.index();
      //   expect(result).toEqual([]);
      // });
    }); //EOF Test Method Functionailty
  }); //EOF user TEST SUITE
}; //EOF EXPORT
