import { UserResponse, HttpService, UpdateUser } from '@contact/type';
import { UserService } from '../domain/user.service';

export class UserServiceImpl implements UserService {
  constructor(readonly http: HttpService) {}

  findAll() {
    return this.http.get<UserResponse[]>(`/api/user`);
  }

  findOneById(id: number) {
    return this.http.get<UserResponse | null>(`/api/user/${id}`);
  }

  findOneByUsername(username: string) {
    return this.http.get<UserResponse | null>(`/api/user/${username}`);
  }

  update(id: number, updateUser: UpdateUser) {
    return this.http.patch<UserResponse>(`/api/user/${id}`, updateUser);
  }

  remove(id: number) {
    return this.http.delete<UserResponse>(`/api/user/${id}`);
  }
}
