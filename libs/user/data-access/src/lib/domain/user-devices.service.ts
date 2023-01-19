import {UpdateDevice, DeviceResponse, Device} from '@contact/type'
import {Observable} from 'rxjs'

export abstract class UserDevicesService {
  abstract findAll(): Observable<DeviceResponse[]>
  abstract findOneById(id: number): Observable<DeviceResponse | null>
  abstract findOne(props: Partial<Omit<Device, 'user'>>): Observable<DeviceResponse | null>
  abstract update(id: number, updateDevice: UpdateDevice): Observable<DeviceResponse>
  abstract remove(id: number): Observable<DeviceResponse>
}
