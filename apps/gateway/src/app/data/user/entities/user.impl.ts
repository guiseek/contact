import {
  Column,
  Entity,
  Unique,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm'
import {Agenda, Device, User, UserRole} from '@contact/shared/types'
import {entityContainer} from '../../../utils'
import {DeviceImpl} from './device.impl'
import {AgendaImpl} from './agenda.impl'

@Entity({
  name: 'users',
})
@Unique(['username'])
export class UserImpl extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number

  @Index({fulltext: true})
  @Column({
    type: 'varchar',
    nullable: false,
  })
  username: string

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  password: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  salt: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string

  @Column({
    type: 'datetime',
    default: '00-00-0000 00:00:00',
  })
  birthday?: string

  @Index({fulltext: true})
  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  displayName: string

  @Index({fulltext: true})
  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  firstName: string

  @Index({fulltext: true})
  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  lastName: string

  @Column({
    type: 'varchar',
    default: '',
  })
  photoUrl: string

  @OneToMany(() => DeviceImpl, (device) => device.user)
  devices: Device[]

  @OneToMany(() => AgendaImpl, (agenda) => agenda.user)
  agenda: Agenda[]

  @Column({
    type: 'enum',
    enum: UserRole,
    enumName: 'USER_ROLE',
    nullable: false,
    default: 'USER',
  })
  roles: UserRole[]

  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    nullable: false,
  })
  createdAt: Date

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
    nullable: false,
  })
  updatedAt: Date

  get isAdmin() {
    return this.roles.includes(UserRole.Admin)
  }
}

entityContainer.add(UserImpl)
