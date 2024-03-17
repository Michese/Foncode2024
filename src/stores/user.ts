import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { User } from '@/types';
import { UserApi } from '@/api';
import { USER_STORAGE_NAME } from '@/const';

const initialUser = (): User => ({
  first_name: '',
  last_name: '',
  users_password: '',
  users_email: '',
  token: '',
  vk: '',
});

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>(initialUser());
  const hasUser = computed<boolean>(() => !!user.first_name && !!user.last_name);

  function updateUser(newUser: User) {
    user.first_name = newUser.first_name;
    user.last_name = newUser.last_name;
    user.users_password = newUser.users_password;
    user.users_email = newUser.users_email;
    user.token = newUser.token;
    user.vk = newUser.vk;

    sessionStorage.setItem(USER_STORAGE_NAME, JSON.stringify({ ...newUser }));
  }

  async function authUser(
    users_email?: string,
    users_password?: string,
  ): Promise<User | null> {
    let foundedUser = null;

    if (users_email && users_password) {
      foundedUser = await UserApi.login(users_email, users_password);
    } else {
      const sessionUserStr = sessionStorage.getItem(USER_STORAGE_NAME);
      if (sessionUserStr) {
        const sessionUser = JSON.parse(sessionUserStr) as User;
        const token = sessionUser.token;

        if (token) foundedUser = await UserApi.getUser();
      }
    }

    if (foundedUser) updateUser(foundedUser);
    else sessionStorage.removeItem(USER_STORAGE_NAME);

    return foundedUser;
  }

  async function logout() {
    await UserApi.logout();
    sessionStorage.removeItem(USER_STORAGE_NAME);
    updateUser(initialUser());
  }

  function setVk(token: string) {
    user.vk = token;
  }

  return { user, logout, hasUser, authUser };
});
