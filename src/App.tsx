import reactLogo from './assets/react.svg'
import './App.css'
import { useReduxDispatch, useReduxSelector } from './hooks'
import {
  addFive,
  countSelector,
  decrement,
  setName,
  increment,
  nameSelector,
  restart,
  stepSelector,
  setStep,
  get,
  descriptionsSelector,
  descriptionsErrorSelector,
} from './store/counter'
import { useEffect } from 'react'
import {
  getPokemonList,
  pokemonErrorSelector,
  pokemonSelector,
} from './store/pokemon'
import { extractPokemonIdFromUrl } from './utils/getId'

function App() {
  const pokemonList = useReduxSelector(pokemonSelector)
  const pokemonError = useReduxSelector(pokemonErrorSelector)

  const dispatch = useReduxDispatch()

  useEffect(() => {
    dispatch(getPokemonList())
  }, [])

  return (
    <div className="App">
      {pokemonList.map((item) => (
        <div key={item.url}>
          <img
            className="card-img-top"
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${extractPokemonIdFromUrl(
              item.url,
            )}.svg`}
            height="200px"
            alt="pokemoncard"
          />
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  )
}

export default App

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
