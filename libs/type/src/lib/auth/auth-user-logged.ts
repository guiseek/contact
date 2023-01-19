import { User } from '../user/user';

export type AuthUserLogged = Pick<
  User,
  'email' | 'username' | 'displayName' | 'id'
>;
