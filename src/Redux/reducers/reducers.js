// reducers.js
import * as type from '../actions/actionTypes'

const initialState = {
    posts: [],
    error: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case type.FETCH_DATA:
        return { ...state, posts: action.payload, error: null };
      case type.FETCH_ERROR:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  