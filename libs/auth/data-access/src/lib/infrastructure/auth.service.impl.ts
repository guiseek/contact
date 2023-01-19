import {
  CheckUser,
  CreateUser,
  AuthRequest,
  UserResponse,
  AuthResponse,
  HttpService,
  CheckUserResponse,
  AuthUserLogged,
} from '@contact/type';
import { AuthService } from '../domain/auth.service';

export class AuthServiceImpl implements AuthService {
  constructor(readonly http: HttpService) {}

  validateUser() {
    return this.http.get<AuthUserLogged>(`/api/auth/me`);
  }
  checkUser(user: CheckUser) {
    return this.http.post<CheckUserResponse>(`/api/auth/check`, user);
  }
  createUser(user: CreateUser) {
    return this.http.post<UserResponse>(`/api/auth/register`, user);
  }
  login(request: AuthRequest) {
    return this.http.post<AuthResponse>(`/api/auth/login`, request);
  }
}
