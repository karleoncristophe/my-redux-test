import { applyMiddleware, createStore, Store } from "redux";

import reducer from "./redux";
import { CounterState } from "./counter";
import createSagaMiddleware from "redux-saga";
import watch from "./saga";

export interface ApplicationState {
  counter: CounterState;
}

const sagaMiddleware = createSagaMiddleware()

export const store: Store<ApplicationState> = createStore(
  reducer,
	applyMiddleware(sagaMiddleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

sagaMiddleware.run(watch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
