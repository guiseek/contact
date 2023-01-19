import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Agenda, Meeting, User, UserRole} from '@contact/type'
import {entityContainer} from '../../../utils'
import {MeetingImpl} from './meeting.impl'
import {UserImpl} from './user.impl'

@Entity({
  name: 'agenda',
})
export class AgendaImpl implements Agenda {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserImpl, (user) => user.agenda, {
    eager: true,
  })
  user: User

  @Column({
    type: 'enum',
    enum: UserRole,
    enumName: 'USER_ROLE',
    nullable: false,
    default: 'USER',
  })
  roles: UserRole[]

  @ManyToOne(() => MeetingImpl, (meeting) => meeting.agenda, {
    eager: true,
  })
  meeting: Meeting
}

entityContainer.add(AgendaImpl)