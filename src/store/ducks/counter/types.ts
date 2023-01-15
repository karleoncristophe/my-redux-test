// Actions types
export enum CounterTypes {
  COUNTER_INCREMENT = "@COUNTER/INCREMENT",
  COUNTER_DECREMENT = "@COUNTER/DECREMENT",
  COUNTER_RESTART = "@COUNTER/RESTART",
}

// Data types
export interface ICounter {
  value: number;
}

// State types
// readonly porque o estado do redux é imutavel
export interface CounterState {
  readonly counter: ICounter;
}
