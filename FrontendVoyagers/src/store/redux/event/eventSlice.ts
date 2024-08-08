import { createAppSlice } from "store/createAppSlice"
import { CreateEventDto} from "./types"
import * as api from "./api"
const initialState = {
  event: undefined,
}
// createAppSlice - функция, которая возвращает новый слайс и принимает в качестве аргумента объект
export const eventSlice = createAppSlice({
  name: "EVENT",
  //принимает в качестве аргумента объект, значения которых хочу видеть по умолчанию
  initialState,
  reducers: create => ({
    createEvent: create.asyncThunk(
      async (eventDto: CreateEventDto) => {
        return api.fetchCreateEvent(eventDto)
      },
      {
        pending: state => {
          state.event = undefined
        },
        fulfilled: (state, action) => {
          state.event = action.payload
        },
        rejected: state => {
          state.event = undefined
        },
      },
    ),
  }),
  selectors: {
    events: state => state.event,
  },
})

export const { createEvent } = eventSlice.actions
export const { events } = eventSlice.selectors
