import {User, Device, Agenda, CreateUser, UpdateUser} from '@contact/type'
import {AgendaResponseDto, CreateMeetingDto} from '../dto/meeting'
import {CreateDeviceDto} from '../dto/device'

export abstract class UserService {
  abstract findAll(): Promise<User[]>

  abstract createOne(createUser: CreateUser): Promise<User>

  abstract createDevice(createDeviceDto: CreateDeviceDto): Promise<Device>

  abstract createMeetingAgenda(createMeetingDto: CreateMeetingDto, user: Pick<User, 'id'>): Promise<Agenda>

  abstract findOneById(id: number): Promise<User>

  abstract findOne(where: Partial<Pick<User, 'id' | 'username'>>): Promise<User>

  abstract findOneByUsername(username: string): Promise<User | null>

  abstract findDevices(user: Pick<User, 'id'>): Promise<Device[]>

  abstract findAgenda(user: Pick<User, 'id'>): Promise<Agenda[]>

  abstract update(id: number, updateUser: UpdateUser): Promise<User>

  abstract remove(id: number): Promise<User>
}
