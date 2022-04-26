import { combineReducers } from 'redux-immutable'

import { reducer as recommendReducer } from '../pages/discover/c-pages/recommed/store'

const cReducer = combineReducers({
  recommend: recommendReducer
})

export default cReducer
