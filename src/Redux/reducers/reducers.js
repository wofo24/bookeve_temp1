// reducers.js
import * as type from '../actions/actionTypes';

const initialState = {
  posts: [],
  error: null,
  dialog_open: false,
  repeat_open: false,
  view_open: false,
  delete_open: false,
  open_add_dialog: false,
  dialog_data: [],
  repeat_data: [],
  view_data: [],
  protected_routes: [],
  packages: [],
  all_address: [],
  open_address_data: []
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_DATA:
      return { ...state, posts: action.payload, error: null };
    case type.FETCH_ERROR:
      return { ...state, error: action.payload };
    case type.INCREMENT:
      console.log(state.posts, 'posts')
      return {
        ...state, posts: state?.posts?.map((category) => ({
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
    case type.OPEN_VIEW_DIALOG:
      return { ...state, view_open: true, view_data: action.payload };
    case type.CLOSE_VIEW_DIALOG:
      return { ...state, view_open: false };
    case type.PROTECTED_ROUTE:
      return { ...state, protected_routes: action.payload };
    case type.ADD_PACKAGE:
      return { ...state, packages: action.payload };
    case type.GET_ALL_ADDRESS:
      return { ...state, all_address: action.payload };

    case type.OPEN_ADDRESS_ADD_DIALOG:
      console.log(action.payload, 'the data from  Reducer?????')
      return { ...state, open_add_dialog: true, open_address_data: action.payload };
    case type.CLOSE_ADDRESS_ADD_DIALOG:
      return { ...state, open_add_dialog: false, open_address_data: action.payload };
    case type.OPEN_DELETE_ADDRESS_DIALOG:
      return { ...state, delete_open: true };
    case type.CLOSE_DELETE_ADDRESS_DIALOG:
      return { ...state, delete_open: false };

    case type.OPEN_UPDATE_ADDRESS_DIALOG:
      return { ...state, all_address: action.payload };
    case type.CLOSE_UPDATE_ADDRESS_DIALOG:
      return { ...state, all_address: action.payload };
    case type.APPLY_COUPON:
      console.log(action.payload, 'reducer')
      return { ...state };
    default:
      return state;
  }
};

export default rootReducer;
