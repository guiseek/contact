import {SearchUserDto, CreateMeetingDto, UpdateMeetingDto, CreateAgendaDto} from '../dto'
import {FindOptionsWhere, Like, Repository} from 'typeorm'
import {CreateUserDto} from '../dto/create-user.dto'
import {UpdateUserDto} from '../dto/update-user.dto'
import {MeetingImpl} from '../entities/meeting.impl'
import {DeviceImpl} from '../entities/device.impl'
import {AgendaImpl} from '../entities/agenda.impl'
import {UserService} from '../ports/user.service'
import {NotFoundException} from '@nestjs/common'
import {UserImpl} from '../entities/user.impl'
import {CreateDeviceDto} from '../dto/device'
import {UserRole} from '@contact/type'

export class UserServiceImpl implements UserService {
  constructor(private users: Repository<UserImpl>, private devices: Repository<DeviceImpl>, private meetings: Repository<MeetingImpl>, private agenda: Repository<AgendaImpl>) {}

  async searchUser({query}: SearchUserDto) {
    return this.users.manager.getRepository(UserImpl).find({
      where: {displayName: Like(`%${query}%`)},
    })
  }

  async createMeeting(createMeetingDto: CreateMeetingDto, user: Pick<UserImpl, 'id'>) {
    const meeting = await this.meetings.save(createMeetingDto)
    const createAgendaDto = {user, meeting, roles: [UserRole.Admin]}
    return await this.agenda.save(createAgendaDto)
  }

  async updateMeeting(id: number, updateMeetingDto: UpdateMeetingDto) {
    if (await this.findOneMeeting({id})) {
      return this.meetings.save({id, ...updateMeetingDto})
    }
  }

  async createAgendaOnMeeting(id: number, createAgendaDto: CreateAgendaDto) {
    let meeting: MeetingImpl
    if ((meeting = await this.findOneMeeting({id}))) {
      return this.agenda.save({meeting, ...createAgendaDto})
    }
  }

  async deleteMeeting(id: number) {
    let meeting: MeetingImpl
    if ((meeting = await this.findOneMeeting({id}))) {
      await Promise.allSettled(meeting.agenda.map((item) => this.agenda.remove(item)))
      return this.meetings.remove(meeting)
    }
  }

  async findOneMeeting(where: FindOptionsWhere<MeetingImpl>) {
    const meeting = await this.meetings.findOne({where, relations: ['agenda']})
    if (!meeting) throw new NotFoundException(`Meeting not found.`)
    return meeting
  }

  async findAll() {
    return this.users.find()
  }

  async createOne(createUserDto: CreateUserDto) {
    return this.users.save(createUserDto)
  }

  async createDevice(createDeviceDto: CreateDeviceDto) {
    return this.devices.save(createDeviceDto)
  }

  async findDevices(user: Pick<UserImpl, 'id'>) {
    return this.devices.find({where: {user}})
  }

  async findAgenda(user: Pick<UserImpl, 'id'>) {
    return this.agenda.find({where: {user}})
  }

  async findMeetingsByUser(user: Pick<UserImpl, 'id'>) {
    return this.meetings.find({where: {agenda: {user}}, relations: ['agenda']})
  }

  async removeDevice(id: number) {
    return (await this.findOneDevice({id})).remove()
  }

  async findOneById(id: number) {
    return this.findOne({id})
  }

  async findOneByUsername(username: string) {
    return this.users.findOneBy({username})
  }

  async findOne(where: FindOptionsWhere<UserImpl>) {
    const user = await this.users.findOne({where})
    if (!user) throw new NotFoundException(`User not found.`)
    return user
  }

  async findOneDevice(where: FindOptionsWhere<DeviceImpl>) {
    const device = await this.devices.findOne({where})
    if (!device) throw new NotFoundException(`Device not found.`)
    return device
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (await this.findOne({id})) {
      return this.users.save({id, ...updateUserDto})
    }
  }

  async remove(id: number) {
    let user: UserImpl
    if ((user = await this.findOne({id}))) {
      return this.users.remove(user)
    }
  }
}
