// reducers.js
import * as type from '../actions/actionTypes';

const initialState = {
  posts: [],
  error: null,
  dialog_open: false,
  repeat_open: false,
  dialog_data: [],
  repeat_data: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_DATA:
      return { ...state, posts: action.payload, error: null };
    case type.FETCH_ERROR:
      return { ...state, error: action.payload };

    case type.INCREMENT:
      return {
        ...state,
        posts: state.posts.map((category) => ({
          ...category,
          packages: category?.packages?.map((packageItem) => ({
            ...packageItem,
            count:
              packageItem.packageId === action.payload
                ? packageItem.count + 1
                : packageItem.count,
          })),
        })),
      };

    case type.DECREMENT:
      return {
        ...state,
        posts: state.posts.map((category) => ({
          ...category,
          packages: category?.packages?.map((packageItem) => ({
            ...packageItem,
            count:
              packageItem.packageId === action.payload
                ? Math.max(packageItem.count - 1, 0)
                : packageItem.count,
          })),
        })),
      };
    case type.OPEN_DIALOG:
      return { ...state, dialog_open: true, dialog_data: action.payload };
    case type.CLOSE_DIALOG:
      return { ...state, dialog_open: false };
    case type.OPEN_REPEAT:
      return { ...state, repeat_open: true, repeat_data: action.payload };
    case type.CLOSE_REPEAT:
      return { ...state, repeat_open: false };
    default:
      return state;
  }
};

export default rootReducer;
