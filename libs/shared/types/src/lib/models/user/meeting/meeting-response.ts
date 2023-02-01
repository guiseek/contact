export interface MeetingResponse {
  id: number
  title: string
  start: Date
  end?: Date
  visible: boolean
  createdAt: Date
  updatedAt: Date
}
