import { createAction, createReducer, Reducer } from "@reduxjs/toolkit";
import { AppState } from "../../store";

type CounterState = {
  counter: number;
};

export type CounterId = string;

type CountersState = Record<CounterId, CounterState | undefined>;

export const incrementAction = createAction<{ counterId: CounterId }>(
  "counters/increment"
);
export const decrementAction = createAction<{ counterId: CounterId }>(
  "counters/decrement"
);

const initialCounterState: CounterState = { counter: 0 };
const initialCountersState: CountersState = {};

export const countersReducer: Reducer<CountersState> = createReducer(initialCountersState, (builder) => {
  builder
    .addCase(incrementAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) state[counterId] = initialCounterState;
      state[counterId].counter++;
    })
    .addCase(decrementAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) state[counterId] = initialCounterState;
      state[counterId].counter--;
    });
});

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
