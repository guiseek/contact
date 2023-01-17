import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import {
  DeviceService,
  CreateDeviceDto,
  UpdateDeviceDto,
  DeviceResponseDto,
} from '../../data';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user-devices')
@Controller('user/:userId/devices')
export class UserDevicesController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  async findAll() {
    return (await this.deviceService.findAll()).map(
      (device) => new DeviceResponseDto(device)
    );
  }

  @Get(':idOrDeviceId')
  async findOne(@Param('idOrDeviceId') idOrDeviceId: string) {
    if (isNaN(+idOrDeviceId)) {
      return new DeviceResponseDto(
        await this.deviceService.findOne({ deviceId: idOrDeviceId })
      );
    } else {
      return new DeviceResponseDto(
        await this.deviceService.findOneById(+idOrDeviceId)
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create device' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 200,
    description: 'The device created',
    type: DeviceResponseDto,
  })
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return new DeviceResponseDto(
      await this.deviceService.createOne(createDeviceDto)
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update device' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 200,
    description: 'The device updated',
    type: DeviceResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto
  ) {
    return new DeviceResponseDto(
      await this.deviceService.update(+id, updateDeviceDto)
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new DeviceResponseDto(await this.deviceService.remove(+id));
  }
}
