import { entityContainer } from '../../../utils';
import { Device, User } from '@contact/type';
import { UserImpl } from '../../user/entities/user.impl';
import {
  Column,
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'devices',
})
export class DeviceImpl extends BaseEntity implements Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    // default: 'audioinput'
  })
  kind: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  deviceId: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  groupId: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  label: string;

  @ManyToOne(() => UserImpl, (user) => user.devices, {
    cascade: true,
    lazy: false,
  })
  user: User;

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

entityContainer.add(DeviceImpl);
