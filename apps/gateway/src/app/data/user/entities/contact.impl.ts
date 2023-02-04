import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import {User, Contact} from '@contact/shared/types'
import {entityContainer} from '../../../utils'
import {UserImpl} from './user.impl'

@Entity({
  name: 'contacts',
})
export class ContactImpl extends BaseEntity implements Contact {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  displayName: string

  @Column({
    type: 'varchar',
    default: '',
  })
  photoUrl: string

  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean

  @ManyToOne(() => UserImpl, (user) => user.contacts, {
    lazy: false,
  })
  user: User

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
}

entityContainer.add(ContactImpl)
