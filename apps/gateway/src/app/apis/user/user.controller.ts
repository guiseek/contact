import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  UserService,
  UpdateUserDto,
  UserResponseDto,
  CreateDeviceDto,
  DeviceResponseDto,
  CreateUserDto,
} from '../../data';
import { Logged, Roles } from '../../utils';
import { AuthUserLogged, User, UserRole } from '@contact/type';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('devices')
  @ApiOperation({ summary: 'Gets devices by user' })
  async findDevices(@Logged() user: AuthUserLogged) {
    return (await this.userService.findDevices(user)).map(
      (device) => new DeviceResponseDto(device)
    );
  }

  @Post('device')
  @ApiOperation({ summary: 'Creates user device' })
  @ApiBody({
    isArray: true,
    required: true,
    type: CreateDeviceDto,
  })
  async createDevice(
    @Logged() user: AuthUserLogged,
    @Body() createDeviceDto: CreateDeviceDto
  ) {
    return new DeviceResponseDto(
      await this.userService.createDevice({
        ...createDeviceDto,
        user,
      })
    );
  }

  @Post('device/bulk')
  @ApiOperation({ summary: 'Creates user devices bulk' })
  @ApiBody({
    isArray: true,
    required: true,
    type: CreateDeviceDto,
  })
  async createDevices(
    @Logged() user: AuthUserLogged,
    @Body() createDevicesDto: CreateDeviceDto[]
  ) {
    return Promise.allSettled(
      createDevicesDto.map(async (createDeviceDto) => {
        const value = { ...createDeviceDto, user };
        return new DeviceResponseDto(
          await this.userService.createDevice(value)
        );
      })
    );
  }

  @Get(':idOrUsername')
  @ApiOperation({ summary: 'Gets user by id or username' })
  async findOne(@Param('idOrUsername') idOrUsername: string) {
    let user: User;

    if (isNaN(+idOrUsername)) {
      user = await this.userService.findOne({ username: idOrUsername });
    } else {
      user = await this.userService.findOne({ id: +idOrUsername });
    }

    return new UserResponseDto(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 200,
    description: 'The user updated',
    type: UserResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Logged() user: AuthUserLogged
  ) {
    if (user.id !== +id) {
      throw new UnauthorizedException('You can only change yourself');
    }
    return new UserResponseDto(
      await this.userService.update(+id, updateUserDto)
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Removes user' })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  async remove(@Param('id') id: string, @Logged() user: AuthUserLogged) {
    if (user.id !== +id) {
      throw new UnauthorizedException('You can only change yourself');
    }
    return new UserResponseDto(await this.userService.remove(+id));
  }

  @Post()
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: 'Creates user' })
  @ApiBody({
    required: true,
    type: CreateUserDto,
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return new UserResponseDto(await this.userService.createOne(createUserDto));
  }

  @Get()
  async findAll() {
    return (await this.userService.findAll()).map(
      (user) => new UserResponseDto(user)
    );
  }
}
