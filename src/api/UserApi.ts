import { User } from '@/types';
import getUser from './mock/getUser';
import { Api } from './Api';

const useMocks = true;

export class UserApi extends Api {
  static async login(login: string, password: string): Promise<User> {
    return (await (useMocks
      ? new Promise((res) => res(getUser()))
      : this.get('login/', { login, password }))) as Promise<User>;
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
