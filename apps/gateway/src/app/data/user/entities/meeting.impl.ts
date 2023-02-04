import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {entityContainer} from '../../../utils'
import {Agenda, Meeting} from '@contact/shared/types'
import {AgendaImpl} from './agenda.impl'

@Entity({
  name: 'meetings',
})
export class MeetingImpl implements Meeting {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string

  @Column({
    type: 'datetime',
    nullable: false,
  })
  start: Date

  @Column({
    type: 'datetime',
    nullable: true,
  })
  end?: Date

  @OneToMany(() => AgendaImpl, (agenda) => agenda.meeting)
  agenda: Agenda[]

  @Column({
    type: 'boolean',
    nullable: false,
  })
  visible: boolean

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

entityContainer.add(MeetingImpl)
