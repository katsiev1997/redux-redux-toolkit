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


  // Правила использования селекторов
  // Выбирать как можно меньшие данные
  // Желательно иметь сложность алгоритма O(1) максимум O(n)
  // Не создавать новые ссылки state => state.users.toSorted(sortFn)
  // Самый простой способ использовать useMemo(() => users.toSorted(sortFn),[users])
  // Самый лучший способ использовать createSelector нужен чтобы закэшировать функцию селектора
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
