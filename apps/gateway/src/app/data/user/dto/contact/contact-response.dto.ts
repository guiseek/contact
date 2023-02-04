import {Contact, UserResponse} from '@contact/shared/types'
import {ApiProperty} from '@nestjs/swagger'
import {UserResponseDto} from '../user-response.dto'

export class ContactResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  displayName: string

  @ApiProperty()
  photoUrl: string

  @ApiProperty()
  user: UserResponse

  constructor({user, ...contact}: Contact) {
    Object.assign(this, contact, {user: new UserResponseDto(user)})
  }
}
