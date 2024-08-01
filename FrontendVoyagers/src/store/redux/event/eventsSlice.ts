import { createAppSlice } from "store/createAppSlice"

import { EventData, EventSliceState } from "./types"
import { PayloadAction } from "@reduxjs/toolkit"

const eventsSliceInitialState = {
  events: [],
}

// createAppSlice - функция, которая возвращает новый слайс и принимает в качестве аргумента объект
export const eventsSlice = createAppSlice({
  name: "EVENT",
  //принимает в качестве аргумента объект, значения которых хочу видеть по умолчанию
  initialState: eventsSliceInitialState,
  reducers: create => ({
    addEvent: create.reducer(
      (state: EventSliceState, action: PayloadAction<EventData>) => {},
    ),
  }),
  selectors: {
    events: state => state.events,
  },
})

export const eventSliceActions = eventsSlice.actions // все наши редюсеры
export const eventSliceSelectors = eventsSlice.selectors // все наши селекторы
