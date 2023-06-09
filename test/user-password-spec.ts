import { encryptPassword } from '../src/libs/cryptogram';

describe('create user password', () => {
  it('create user password', async () => {
    const password = '';
    const salt = '';
    const encryptedPassword = encryptPassword(password, salt);
    console.log(`encryptedPassword: ${encryptedPassword}`);
  });
});
