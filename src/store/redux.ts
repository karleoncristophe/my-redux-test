import { combineReducers } from 'redux'

import counter from './counter'
import pokemon from './pokemon'

export default combineReducers({
  counter,
  pokemon,
})
