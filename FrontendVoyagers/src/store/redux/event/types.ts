export interface EventData {
  title: string
  activityType: string
  adressStart: string
  timeStart: number
  adressEnd: string
  timeEnd: number
  cost: number
}

export interface EventSliceState {
  events: EventData[]
}
