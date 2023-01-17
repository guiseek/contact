import {
  DeviceResponse,
  UpdateDevice,
  HttpService,
  HttpOptionsParams,
} from '@contact/type';
import { Observable } from 'rxjs';
import { UserDevicesService } from '../domain/user-devices.service';

export class UserDevicesServiceImpl implements UserDevicesService {
  constructor(readonly http: HttpService) {}

  findAll() {
    return this.http.get<DeviceResponse[]>(`/keep/user`);
  }

  findOneById(id: number) {
    return this.http.get<DeviceResponse | null>(`/keep/user/${id}`);
  }

  findOne(params: HttpOptionsParams): Observable<DeviceResponse | null> {
    return this.http.get<DeviceResponse | null>(`/keep/user/`, { params });
  }

  update(id: number, updateUser: UpdateDevice) {
    return this.http.patch<DeviceResponse>(`/keep/user/${id}`, updateUser);
  }

  remove(id: number) {
    return this.http.delete<DeviceResponse>(`/keep/user/${id}`);
  }
}
