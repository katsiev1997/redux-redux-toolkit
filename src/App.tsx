import { useEffect, useReducer, useRef } from "react";
import "./App.css";
import {
  AppState,
  CounterId,
  DecrementAction,
  IncrementAction,
  store,
} from "./store";

function App() {
  return (
    <div>
      <Counter counterId="first" />
      <Counter counterId="second" />
    </div>
  );
}

const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];

export function Counter({ counterId }: { counterId: CounterId }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  console.log("render counter", counterId);

  const lastStateRef = useRef<ReturnType<typeof selectCounter>>();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentState = selectCounter(store.getState(), counterId);
      const lastState = lastStateRef.current;
      if (currentState !== lastState) {
        forceUpdate();
      }
      lastStateRef.current = currentState;
    });
    return unsubscribe;
  }, [counterId]);

  const counterState = selectCounter(store.getState(), counterId);
  return (
    <div>
      <button
        onClick={() =>
          store.dispatch({
            type: "increment",
            payload: { counterId },
          } satisfies IncrementAction)
        }
      >
        increment
      </button>
      <div>
        {counterId} = {counterState?.counter}
      </div>
      <button
        onClick={() =>
          store.dispatch({
            type: "decrement",
            payload: { counterId },
          } satisfies DecrementAction)
        }
      >
        decrement
      </button>
    </div>
  );
}

export default App;
