export interface User {
  username: string;
  password: string;
}

export const standardUser: User = {
  username: 'standard_user',
  password: 'secret_sauce',
};

export const invalidUser: User = {
  username: 'invalid_user',
  password: 'invalid_password',
};

export const validUsers: User[] = [standardUser];
