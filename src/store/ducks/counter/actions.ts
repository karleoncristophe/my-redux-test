import { CounterTypes } from "./types";

export const increment = () => {
  return { type: CounterTypes.COUNTER_INCREMENT };
};

export const decrement = () => {
  return { type: CounterTypes.COUNTER_DECREMENT };
};

export const restart = () => {
  return { type: CounterTypes.COUNTER_RESTART };
};
