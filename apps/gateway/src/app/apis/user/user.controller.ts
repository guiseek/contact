import {
  UserService,
  UpdateUserDto,
  CreateUserDto,
  UserResponseDto,
  CreateDeviceDto,
  DeviceResponseDto,
  CreateMeetingDto,
  AgendaResponseDto,
  UpdateMeetingDto,
  MeetingResponseDto,
  SearchUserDto,
  CreateAgendaDto,
  ContactResponseDto,
} from '../../data'
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Controller,
  UnauthorizedException,
} from '@nestjs/common'
import {AuthUserLogged, UserRole} from '@contact/shared/types'
import {User} from '../../data/user/ports/user'
import {Logged, Roles} from '../../utils'

type Constructor<T = unknown> = new (...params: unknown[]) => T

const toDto = <D>(dto: Constructor<D>) => {
  return {
    async one<T extends D>(item: Promise<T>) {
      return new dto(await item)
    },
    async many<T extends D>(items: Promise<T[]>) {
      return (await items).map((item) => new dto(item))
    },
  }
}

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  private _toUserDto = toDto(UserResponseDto)
  private _toDeviceDto = toDto(DeviceResponseDto)
  private _toAgendaDto = toDto(AgendaResponseDto)
  private _toMeetingDto = toDto(MeetingResponseDto)
  private _toContactDto = toDto(ContactResponseDto)

  constructor(private readonly userService: UserService) {}

  @Get('devices')
  @ApiOperation({summary: 'Gets devices by user'})
  async findDevices(@Logged() user: AuthUserLogged) {
    return this._toDeviceDto.many(this.userService.findDevices(user))
  }

  @Post('device')
  @ApiOperation({summary: 'Creates user device'})
  @ApiBody({
    isArray: true,
    required: true,
    type: CreateDeviceDto,
  })
  async createDevice(
    @Logged() user: AuthUserLogged,
    @Body() value: CreateDeviceDto
  ) {
    return this._toDeviceDto.one(
      this.userService.createDevice({
        ...value,
        user,
      })
    )
  }

  @Post('search')
  @ApiOperation({summary: 'Creates user meeting'})
  @ApiBody({
    required: true,
    type: SearchUserDto,
  })
  async searchUser(
    @Logged() user: AuthUserLogged,
    @Body() value: SearchUserDto
  ) {
    return this._toUserDto.many(this.userService.searchUser(value))
  }

  @Post('meeting')
  @ApiOperation({summary: 'Creates user meeting'})
  @ApiBody({
    required: true,
    type: CreateMeetingDto,
  })
  async createMeeting(
    @Logged() user: AuthUserLogged,
    @Body() value: CreateMeetingDto
  ) {
    return this._toAgendaDto.one(this.userService.createMeeting(value, user))
  }

  @Get('meeting')
  @ApiOperation({summary: 'Gets meetings'})
  async findMeetingsByUser(@Logged() user: AuthUserLogged) {
    return this._toMeetingDto.many(this.userService.findMeetingsByUser(user))
  }

  @Get('meeting/:meetingId')
  @ApiOperation({summary: 'Gets meeting'})
  async getMeeting(
    @Logged() user: AuthUserLogged,
    @Param('meetingId') id: number
  ) {
    return this._toMeetingDto.one(this.userService.findOneMeeting({id}))
  }

  @Patch('meeting/:meetingId')
  @ApiOperation({summary: 'Patch meeting'})
  async patchMeeting(
    @Logged() user: AuthUserLogged,
    @Param('meetingId') meetingId: number,
    @Body() value: UpdateMeetingDto
  ) {
    return this._toMeetingDto.one(
      this.userService.updateMeeting(meetingId, value)
    )
  }

  @Post('meeting/:meetingId/agenda')
  @ApiOperation({summary: 'Create agenda to existing meeting'})
  async patchMeetingAgenda(
    @Logged() user: AuthUserLogged,
    @Param('meetingId') meetingId: number,
    @Body() value: CreateAgendaDto
  ) {
    return this._toAgendaDto.one(
      this.userService.createAgendaOnMeeting(meetingId, value)
    )
  }

  @Delete('meeting/:meetingId')
  @ApiOperation({summary: 'Delete meeting'})
  async deleteMeeting(
    @Logged() user: AuthUserLogged,
    @Param('meetingId') meetingId: number
  ) {
    return this._toMeetingDto.one(this.userService.deleteMeeting(meetingId))
  }

  @Get('agenda')
  @ApiOperation({summary: 'Gets agenda by user'})
  async findAgenda(@Logged() user: AuthUserLogged) {
    return await this._toAgendaDto.many(this.userService.findAgenda(user))
  }

  @Get('contacts')
  @ApiOperation({summary: 'Gets user with contacts'})
  async findContacts(@Logged() {id}: AuthUserLogged) {
    return await this._toContactDto.many(this.userService.findContacts({id}))
  }

  @Post('device/bulk')
  @ApiOperation({summary: 'Creates user devices bulk'})
  @ApiBody({
    isArray: true,
    required: true,
    type: CreateDeviceDto,
  })
  async createDevices(
    @Logged() user: AuthUserLogged,
    @Body() values: CreateDeviceDto[]
  ) {
    return Promise.allSettled(
      values.map((value) =>
        this._toDeviceDto.one(this.userService.createDevice({...value, user}))
      )
    )
  }

  @Get(':idOrUsername')
  @ApiOperation({summary: 'Gets user by id or username'})
  async findOne(@Param('idOrUsername') idOrUsername: string) {
    let user: User

    if (isNaN(+idOrUsername)) {
      this._toUserDto.one(this.userService.findOne({username: idOrUsername}))
    } else {
      this._toUserDto.one(this.userService.findOne({id: +idOrUsername}))
    }

    return new UserResponseDto(user)
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update user'})
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({status: 401, description: 'Unauthorized.'})
  @ApiResponse({
    status: 200,
    description: 'The user updated',
    type: UserResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() value: UpdateUserDto,
    @Logged() user: AuthUserLogged
  ) {
    if (user.id !== +id) {
      throw new UnauthorizedException('You can only change yourself')
    }

    return this._toUserDto.one(this.userService.update(+id, value))
  }

  @Delete(':id')
  @ApiOperation({summary: 'Removes user'})
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  async remove(@Param('id') id: string, @Logged() logged: AuthUserLogged) {
    const user = new User(logged)
    if (user.id !== +id) {
      throw new UnauthorizedException('You can only change yourself')
    }
    return this._toUserDto.one(this.userService.remove(+id))
  }

  @Post()
  @Roles(UserRole.Admin)
  @ApiOperation({summary: 'Creates user', security: []})
  @ApiBody({
    required: true,
    type: CreateUserDto,
  })
  async createUser(@Body() value: CreateUserDto) {
    return this._toUserDto.one(this.userService.createOne(value))
  }

  @Get()
  @Roles(UserRole.Admin)
  async findAll() {
    return this._toUserDto.many(this.userService.findAll())
  }
}
