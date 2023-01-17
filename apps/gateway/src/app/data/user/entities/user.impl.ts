import { entityContainer } from '../../../utils';
import { Device, User } from '@contact/type';
import {
  Column,
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { DeviceImpl } from '../../device/entities/device.impl';

@Entity({
  name: 'users',
})
@Unique(['username'])
export class UserImpl extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  salt: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'datetime',
    default: '00-00-0000 00:00:00',
  })
  birthday?: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  displayName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  photoUrl: string;

  @OneToMany(() => DeviceImpl, (device) => device.user)
  devices: Device[];

  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
    nullable: false,
  })
  updatedAt: Date;
}

entityContainer.add(UserImpl);
