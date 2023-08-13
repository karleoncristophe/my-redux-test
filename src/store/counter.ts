/* eslint-disable no-unused-vars */
import { Action } from 'redux'
import { ApplicationState } from '.'
import { SagaIterator } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { Description, getPokemon } from './httpClient'

// Actions types
export enum CounterTypes {
  COUNTER_INCREMENT = '@COUNTER/INCREMENT',
  COUNTER_DECREMENT = '@COUNTER/DECREMENT',
  COUNTER_RESTART = '@COUNTER/RESTART',
  COUNTER_ADDFIVE = '@COUNTER/ADDFIVE',
  COUNTER_ADDNAME = '@COUNTER/ADDNAME',
  COUNTER_ADDSTEP = '@COUNTER/ADDSTEP',
  GET = '@GET',
  GET_SUCCESS = '@GET/SUCCESS',
  GET_ERROR = '@GET/ERROR',
}

// Data types
export interface ICounter {
  value: number
  name: string
  step: number
  descriptions: Description[] | []
  descriptionsError: string
}

export interface SetNameAction extends Action {
  type: CounterTypes
  payload: string
}

export interface SetStepAction extends Action {
  type: CounterTypes
  payload: number
}

type Actions = SetNameAction | SetStepAction | { type: '' }

// State types
// readonly porque o estado do redux é imutavel
export interface CounterState {
  readonly counter: ICounter
}

const INITIAL_STATE: CounterState = {
  counter: {
    value: 0,
    name: '',
    step: 5,
    descriptions: [],
    descriptionsError: '',
  },
}

// Reducer
const reducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case CounterTypes.COUNTER_INCREMENT: {
      if (state.counter.value >= 10) {
        return state
      }
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + 1,
        },
      }
    }
    case CounterTypes.COUNTER_DECREMENT: {
      if (state.counter.value <= 0) {
        return state
      }
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value - 1,
        },
      }
    }
    case CounterTypes.COUNTER_RESTART: {
      return {
        ...state,
        counter: {
          ...state.counter,
          value: (state.counter.value = 0),
        },
      }
    }
    case CounterTypes.COUNTER_ADDFIVE: {
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + state.counter.step,
        },
      }
    }
    case CounterTypes.COUNTER_ADDNAME: {
      return {
        ...state,
        counter: {
          ...state.counter,
          name: action.payload,
        },
      }
    }
    case CounterTypes.COUNTER_ADDSTEP: {
      return {
        ...state,
        counter: {
          ...state.counter,
          step: action.payload,
        },
      }
    }

    case CounterTypes.GET_SUCCESS: {
      return {
        ...state,
        counter: {
          ...state.counter,
          descriptions: action.payload,
        },
      }
    }

    case CounterTypes.GET_ERROR: {
      return {
        ...state,
        counter: {
          ...state.counter,
          descriptionsError: action.payload,
        },
      }
    }

    default: {
      return state
    }
  }
}

// Actions
export const get = () => {
  return { type: CounterTypes.GET }
}

export const setGetSuccess = (payload: Description[]) => {
  return { type: CounterTypes.GET_SUCCESS, payload }
}

export const setGetError = (payload: string) => {
  return { type: CounterTypes.GET_ERROR, payload }
}

export const increment = () => {
  return { type: CounterTypes.COUNTER_INCREMENT }
}

export const decrement = () => {
  return { type: CounterTypes.COUNTER_DECREMENT }
}

export const restart = () => {
  return { type: CounterTypes.COUNTER_RESTART }
}

export const addFive = () => {
  return { type: CounterTypes.COUNTER_ADDFIVE }
}

export const setName = (payload: string): SetNameAction => ({
  type: CounterTypes.COUNTER_ADDNAME,
  payload,
})

export const setStep = (payload: number): SetStepAction => ({
  type: CounterTypes.COUNTER_ADDSTEP,
  payload,
})

// Selectors
export const countSelector = (state: ApplicationState) =>
  state.counter.counter.value
export const nameSelector = (state: ApplicationState) =>
  state.counter.counter.name
export const stepSelector = (state: ApplicationState) =>
  state.counter.counter.step
export const descriptionsSelector = (state: ApplicationState) =>
  state.counter.counter.descriptions
export const descriptionsErrorSelector = (state: ApplicationState) =>
  state.counter.counter.descriptionsError

// Sagas
export function* getWorker(): SagaIterator {
  console.log('getWorker')
  try {
    // throw new Error()
    const res: Description[] = yield call(getPokemon)
    yield put(setGetSuccess(res))
  } catch (err) {
    yield put(
      setGetError('Algo de errado aconteceu. Por favor, tente mais tarde!'),
    )
  }
}

export function* watch(): SagaIterator {
  yield takeLatest(CounterTypes.GET, getWorker)
}

export default reducer
