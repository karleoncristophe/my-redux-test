/* eslint-disable no-unused-vars */
import { SagaIterator } from 'redux-saga'
import { IPokemonResults, getPokemon } from './httpClient'
import { call, put, takeLatest } from 'redux-saga/effects'
import { Action } from 'redux'
import { ApplicationState } from '..'

export enum Types {
  GET_LIST = '@POKEMON/GET_LIST',
  GET_LIST_SUCCESS = '@POKEMON/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@POKEMON/GET_LIST_ERROR',
}

export interface IPokemon {
  descriptionsError: string
  pokemon_list: IPokemonResults[]
}

export interface PokemonState {
  readonly data: IPokemon
}

export interface SetError extends Action {
  type: Types
  payload: string | IPokemonResults[]
}

type Actions = SetError | { type: '' }

// State
const INITIAL_STATE: PokemonState = {
  data: { descriptionsError: '', pokemon_list: [] },
}

// Reduce
const pokemonsRecuce = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case Types.GET_LIST: {
      return {
        ...state,
        data: {
          ...state.data,
        },
      }
    }
    case Types.GET_LIST_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          pokemon_list: action.payload,
        },
      }
    }
    case Types.GET_LIST_ERROR: {
      return {
        ...state,
        data: {
          ...state.data,
          descriptionsError: action.payload,
        },
      }
    }
    default: {
      return state
    }
  }
}

// Selectors
export const pokemonSelector = (state: ApplicationState) =>
  state.pokemon.data.pokemon_list

export const pokemonErrorSelector = (state: ApplicationState) =>
  state.pokemon.data.descriptionsError

// Actions
export const getPokemonList = () => {
  return { type: Types.GET_LIST }
}

export const setGetPokemonSuccess = (payload: IPokemonResults[]) => {
  return { type: Types.GET_LIST_SUCCESS, payload }
}

export const setGetPokeonError = (payload: string) => {
  return { type: Types.GET_LIST_ERROR, payload }
}

// Sagas
export function* getWorker(): SagaIterator {
  try {
    // throw new Error()
    const res: IPokemonResults[] = yield call(getPokemon)

    yield put(setGetPokemonSuccess(res))
  } catch (err) {
    yield put(
      setGetPokeonError(
        'Algo de errado aconteceu. Por favor, tente mais tarde!',
      ),
    )
  }
}

export function* watchPokemons(): SagaIterator {
  yield takeLatest(Types.GET_LIST, getWorker)
}

export default pokemonsRecuce
