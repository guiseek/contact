import {User, Device, Agenda, CreateUser, UpdateUser, Meeting} from '@contact/type'
import {CreateAgendaDto, CreateMeetingDto, UpdateMeetingDto} from '../dto/meeting'
import {CreateDeviceDto} from '../dto/device'
import {SearchUserDto} from '../dto'

export abstract class UserService {
  abstract findAll(): Promise<User[]>

  abstract createOne(createUser: CreateUser): Promise<User>

  abstract createDevice(createDeviceDto: CreateDeviceDto): Promise<Device>

  abstract searchUser(query: SearchUserDto): Promise<User[]>
  abstract findOneMeeting(where: Partial<Pick<Meeting, 'id'>>): Promise<Meeting>
  abstract createMeeting(value: CreateMeetingDto, user: Pick<User, 'id'>): Promise<Agenda>
  abstract updateMeeting(id: number, value: UpdateMeetingDto): Promise<Meeting>
  abstract deleteMeeting(id: number): Promise<Meeting>
  abstract createAgendaOnMeeting(id: number, createAgendaDto: CreateAgendaDto): Promise<Agenda>

  abstract findOneById(id: number): Promise<User>

  abstract findOne(where: Partial<Pick<User, 'id' | 'username'>>): Promise<User>

  abstract findOneByUsername(username: string): Promise<User | null>
  abstract findMeetingsByUser(user: Pick<User, 'id'>): Promise<Meeting[]>

  abstract findDevices(user: Pick<User, 'id'>): Promise<Device[]>

  abstract findAgenda(user: Pick<User, 'id'>): Promise<Agenda[]>

  abstract update(id: number, updateUser: UpdateUser): Promise<User>

  abstract remove(id: number): Promise<User>
}
