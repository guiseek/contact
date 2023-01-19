export interface MeetingResponse {
  id: number
  title: string
  start: Date
  end?: Date
  public: boolean
  createdAt: Date
  updatedAt: Date
}
