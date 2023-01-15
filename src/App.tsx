import reactLogo from "./assets/react.svg";
import "./App.css";
import { useReduxDispatch, useReduxSelector } from "./hooks";
import { decrement, increment, restart } from "./store/ducks/counter/actions";

function App() {
  const count = useReduxSelector((state) => state.counter.counter.value);
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
          <button>+ 5</button>
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
