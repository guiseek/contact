import {FindOptionsWhere, Repository} from 'typeorm'
import {CreateUserDto} from '../dto/create-user.dto'
import {UpdateUserDto} from '../dto/update-user.dto'
import {MeetingImpl} from '../entities/meeting.impl'
import {DeviceImpl} from '../entities/device.impl'
import {AgendaImpl} from '../entities/agenda.impl'
import {UserService} from '../ports/user.service'
import {NotFoundException} from '@nestjs/common'
import {UserImpl} from '../entities/user.impl'
import {CreateDeviceDto} from '../dto/device'
import {CreateMeetingDto} from '../dto'
import {UserRole} from '@contact/type'

export class UserServiceImpl implements UserService {
  constructor(private users: Repository<UserImpl>, private devices: Repository<DeviceImpl>, private meetings: Repository<MeetingImpl>, private agenda: Repository<AgendaImpl>) {}

  async createMeetingAgenda(createMeetingDto: CreateMeetingDto, user: Pick<UserImpl, 'id'>) {
    const meeting = await this.meetings.save(createMeetingDto)
    const createAgendaDto = {user, meeting, roles: [UserRole.User]}
    return await this.agenda.save(createAgendaDto)
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
