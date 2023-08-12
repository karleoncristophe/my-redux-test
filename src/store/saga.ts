import { all, call } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/types'
import * as counter from './ducks/counter'
/* Centralizar os sagas da feature */
export default function* watch(): SagaIterator {
  yield all([
    call(counter.watch),
  ])
}