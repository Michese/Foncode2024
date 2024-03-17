import { DataForRegisterUser, User } from '@/types';
import getUser from './mock/getUser';
import { Api } from './Api';

const useMocks = true;

export class UserApi extends Api {
  static async loginByToken(token: string): Promise<User> {
    return (await (useMocks
      ? new Promise((res) => res(getUser()))
      : this.get('login/', {token}))) as Promise<User>;
  }
  static async login(login: string, password: string): Promise<User> {
    return (await (useMocks
      ? new Promise((res) => res(getUser()))
      : (this.get('login/', { login, password }))).then(response => {
            console.log('response', response);
            return { first_name: response.name, last_name: response.surname, users_password: response.password, users_email: response.login, token: '123214'  }
          }) as Promise<User>);
  }

  static async registerUser(user: DataForRegisterUser): Promise<User> {
    return (await (useMocks
      ? new Promise((res) => res(getUser()))
      : this.post('register/', user))) as Promise<User>;
  }

  static async getUser(): Promise<User> {
    return (await (useMocks
      ? new Promise((res) => res(getUser()))
      : this.get('user/'))) as Promise<User>;
  }

  static async logout(): Promise<unknown> {
    return (await (useMocks
      ? new Promise((res) => res(true))
      : this.get('logout/'))) as Promise<boolean>;
  }
}
