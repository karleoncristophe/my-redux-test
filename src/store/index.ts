import { createStore, Store } from "redux";

import rootReducer from "./ducks/rootReducer";
import { CounterState } from "./ducks/counter";

export interface ApplicationState {
  counter: CounterState;
}

export const store: Store<ApplicationState> = createStore(
  rootReducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
