import { FETCH_SPAM } from '../actions/types'

export default function(state=[], action){
  switch(action.type){
    case FETCH_SPAM:
      return [ ...state, action.payload ]
  }
  return state
}
