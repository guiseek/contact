import {Device, UserResponse} from '@contact/shared/types'
import {ApiProperty} from '@nestjs/swagger'
import {UserResponseDto} from '../user-response.dto'

export class DeviceResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  label: string

  @ApiProperty()
  deviceId: string

  @ApiProperty()
  groupId: string

  @ApiProperty()
  kind: string

  @ApiProperty()
  user: UserResponse

  constructor({user, ...device}: Device) {
    Object.assign(this, device, {user: new UserResponseDto(user)})
  }
}
