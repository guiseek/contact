import {User, CheckUser, CreateUser, AuthRequest, UserResponse, AuthResponse, AuthUserLogged, CheckUserResponse} from '@contact/type'

export abstract class AuthService {
  abstract validateUser({username, password}: AuthRequest): Promise<AuthUserLogged>
  abstract checkUser(user: CheckUser): Promise<CheckUserResponse>
  abstract createUser(user: CreateUser): Promise<UserResponse>
  abstract login(user: User): Promise<AuthResponse>
}
