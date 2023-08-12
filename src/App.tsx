import reactLogo from "./assets/react.svg";
import "./App.css";
import { useReduxDispatch, useReduxSelector } from "./hooks";
import { addFive, countSelector, decrement, setName, increment, nameSelector, restart, stepSelector, setStep, get } from "./store/ducks/counter";
import { useEffect } from "react";

function App() {
  const count = useReduxSelector(countSelector);
  const name = useReduxSelector(nameSelector)
  const step = useReduxSelector(stepSelector)
  const dispatch = useReduxDispatch();
  const incre = () => {
    dispatch(increment());
  };

  const decre = () => {
    dispatch(decrement());
  };

  const rest = () => {
    dispatch(restart());
  };


  useEffect(() => {
    dispatch(get())
  }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Counter {count}</h1>
      <h1>Name: {name}</h1>
      <input value={name} onChange={(e) => dispatch(setName(e.target.value))} />
      <h1>Step: {step}</h1>
      <input value={step} type="number" onChange={(e) => dispatch(setStep(Number(e.target.value)))} />
    
      <h1></h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <button onClick={incre}>Increment</button>
        </div>
        <div
          style={{
            width: 20,
          }}
        />
        <div>
          <button onClick={decre}>Decrement</button>
        </div>
        <div
          style={{
            width: 20,
          }}
        />
        <div>
          <button onClick={() => dispatch(addFive())}>+ {step}</button>
        </div>
        <div
          style={{
            width: 20,
          }}
        />
        <div>
          <button onClick={rest}>Restart</button>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

// const masStateToProps = (state) => {
//   return {
//     count: state.counter.value,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: "counter/increment" }),
//     decrement: () => dispatch({ type: "counter/decrement" }),
//     ten: (amount) => dispatch({ type: "counter/ten", payload: amount }),
//     restart: () => dispatch({ type: "counter/restart" }),
//   };
// };

// export default connect(masStateToProps, mapDispatchToProps)(App);
