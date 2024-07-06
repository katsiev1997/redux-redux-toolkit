import { useDispatch } from "react-redux";
import "./App.css";
import {
  CounterId,
  DecrementAction,
  IncrementAction,
  selectCounter,
  useAppSelector,
} from "./store";

function App() {
  return (
    <div>
      <Counter counterId="first" />
      <Counter counterId="second" />
    </div>
  );
}

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useDispatch();
  const counterState = useAppSelector((state) => selectCounter(state, counterId));
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // console.log("render counter", counterId);

  // const lastStateRef = useRef<ReturnType<typeof selectCounter>>();

  // useEffect(() => {
  //   const unsubscribe = store.subscribe(() => {
  //     const currentState = selectCounter(store.getState(), counterId);
  //     const lastState = lastStateRef.current;
  //     if (currentState !== lastState) {
  //       forceUpdate();
  //     }
  //     lastStateRef.current = currentState;
  //   });
  //   return unsubscribe;
  // }, [counterId]);

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
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
          dispatch({
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
