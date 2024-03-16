export type User = {
  first_name: string;
  last_name: string;
  users_password: string;
  users_email: string;
  token: string;
};

export type DataForRegisterUser = {
  login: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  password: string;
};
