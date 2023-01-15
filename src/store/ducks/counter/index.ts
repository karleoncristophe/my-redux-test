import { CounterState, CounterTypes } from "./types";

const INITIAL_STATE: CounterState = {
  counter: {
    value: 0,
  },
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CounterTypes.COUNTER_INCREMENT: {
      if (state.counter.value >= 10) {
        return state;
      }
      return {
        ...state,
        counter: {
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
          value: state.counter.value - 1,
        },
      };
    }
    case CounterTypes.COUNTER_RESTART: {
      return {
        ...state,
        counter: {
          value: (state.counter.value = 0),
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
