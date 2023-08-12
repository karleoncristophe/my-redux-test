import { Action } from "redux";
import { ApplicationState } from "..";
import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from 'redux-saga/effects'
import { getPokemon } from "../httpClient";

// Actions types
export enum CounterTypes {
  COUNTER_INCREMENT = "@COUNTER/INCREMENT",
  COUNTER_DECREMENT = "@COUNTER/DECREMENT",
  COUNTER_RESTART = "@COUNTER/RESTART",
  COUNTER_ADDFIVE = "@COUNTER/ADDFIVE",
  COUNTER_ADDNAME = "@COUNTER/ADDNAME",
  COUNTER_ADDSTEP = "@COUNTER/ADDSTEP",
  GET = "@GET",
}


// Data types
export interface ICounter {
  value: number;
  name: string
  step: number
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
  readonly counter: ICounter;
}

const INITIAL_STATE: CounterState = {
  counter: {
    value: 0,
    name: '',
    step: 5
  },
};


//Reducer
const reducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case CounterTypes.COUNTER_INCREMENT: {
      if (state.counter.value >= 10) {
        return state;
      }
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + 1,
        },
      };
    }
    case CounterTypes.COUNTER_DECREMENT: {
      if (state.counter.value <= 0) {
        return state;
      }
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value - 1,
        },
      };
    }
    case CounterTypes.COUNTER_RESTART: {
      return {
        ...state,
        counter: {
          ...state.counter,
          value: (state.counter.value = 0),
        },
      };
    }
    case CounterTypes.COUNTER_ADDFIVE: {
   
      return {
        ...state,
        counter: {
          ...state.counter,
          value: (state.counter.value + state.counter.step),
          
        },

      };
    }
    case CounterTypes.COUNTER_ADDNAME: {
      return {
        ...state,
        counter: {
          ...state.counter,
          name: action.payload,
        },
      };
    } 
    case CounterTypes.COUNTER_ADDSTEP: {
      return {
        ...state,
        counter: {
          ...state.counter,
          step: action.payload,
        },
      };
    }
    case CounterTypes.GET:
      return { ...state }
    default: {
      return state;
    }
  }
};

//Actions
export const increment = () => {
  return { type: CounterTypes.COUNTER_INCREMENT };
};

export const decrement = () => {
  return { type: CounterTypes.COUNTER_DECREMENT };
};

export const restart = () => {
  return { type: CounterTypes.COUNTER_RESTART };
};

export const addFive = () => {
  return { type: CounterTypes.COUNTER_ADDFIVE };
};

export const get = () => {  
  return { type: CounterTypes.GET };
};

export const setName = (payload: string): SetNameAction => ({
  type: CounterTypes.COUNTER_ADDNAME,
  payload,
})

export const setStep = (payload: number): SetStepAction => ({
  type: CounterTypes.COUNTER_ADDSTEP,
  payload,
})

//Selectors
export const countSelector = (state: ApplicationState) => state.counter.counter.value
export const nameSelector = (state: ApplicationState) => state.counter.counter.name
export const stepSelector = (state: ApplicationState) => state.counter.counter.step

//Sagas
export function* getWorker(): SagaIterator {
  console.log("aqui");
  
  try {
    const res = yield call(getPokemon)
   console.log(res);
   
    // yield put(getSuccess(res.data.conteudo))
  } catch (err) {
    // const payload = handleApiError(err, {
    //   title: 'Falha ao obter parâmetros',
    //   description:
    //     'Um erro inesperado aconteceu. Por favor, tente novamente mais tarde.',
    // })

    // yield put(getFailure(payload))
  }
}

export function* watch(): SagaIterator {
  console.log("watch");
  
  yield takeLatest(CounterTypes.GET, getWorker)
}

export default reducer;


