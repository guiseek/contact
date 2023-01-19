import {Agenda} from './agenda'

export interface Meeting {
  id: number
  title: string
  start: Date
  end?: Date
  agenda: Agenda[]
  public: boolean
  createdAt: Date
  updatedAt: Date
}
