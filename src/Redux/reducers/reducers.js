// reducers.js
import * as type from '../actions/actionTypes';

const savedTheme = JSON.parse(localStorage.getItem('theme'));

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
  open_address_data: [],
  all_ordered: [],
  search_item: '',
  button_style: [],
  apply_new_theme: savedTheme || {
    background: `linear-gradient(199deg, #558bc7, #f4f735)`,
    animation: `first 10s linear infinite`,
    OAnimation: `first 10s linear infinite`,
    WebkitAnimation: `first 10s linear infinite`,
    MozAnimation: `first 10s linear infinite`,
    fontFamily: 'monospace',
    backgroundPosition: '50% 50%',
    backgroundSize: '600% 600%',
    child_div_text: 'black',
    child_bg: 'rgba(200, 200, 200, 1)',
    color: 'white',
    buttonColor: 'blue',
    buttonText: 'white',
    icons_Color: 'blue',
    text_style: 'Fantasy',
    theme_name: 'Minimal',
    keyframesStyle: `
      @-webkit-keyframes first {
        0%{background-position:52% 0%}
        50%{background-position:49% 100%}
        100%{background-position:52% 0%}
    }
    @-moz-keyframes first {
        0%{background-position:52% 0%}
        50%{background-position:49% 100%}
        100%{background-position:52% 0%}
    }
    @-o-keyframes first {
        0%{background-position:52% 0%}
        50%{background-position:49% 100%}
        100%{background-position:52% 0%}
    }
    @keyframes first {
        0%{background-position:52% 0%}
        50%{background-position:49% 100%}
        100%{background-position:52% 0%}
    }
    `
  },
  all_theme: [],
  coupon_dialog: false,
  all_address_dialog: false,
  open_schedule: false,
  profile_edit: false,
  category_id_to_show_its_package: 0
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
      return { ...state };
    case type.GET_ORDER_DATA:
      return { ...state, all_ordered: action.payload };
    case type.GET_ORDER_DATA_ERROR:
      return { ...state, error: action.payload };
    case type.SEARCH_ITEM:
      return { ...state, search_item: action.payload };
    case type.EMPTY_QUARRY:

      return { ...state, search_item: action.payload };
    case type.BUTTON_THEME:
      return { ...state, button_style: action.payload };
    case type.CHANGE_THEME:
      return { ...state, apply_new_theme: action.payload };
    case type.GET_THEMES:
      return { ...state, all_theme: action.payload };

    case type.SHOW_THIS_CATEGORY:
      return { ...state, category_id_to_show_its_package: action.payload };

    case type.OPEN_COUPON_DIALOG:
      return { ...state, coupon_dialog: true };
    case type.CLOSE_COUPON_DIALOG:
      return { ...state, coupon_dialog: false };
    case type.SHOW_ALL_ADDRESS:
      return { ...state, all_address_dialog: true };
    case type.HIDE_ALL_ADDRESS:
      return { ...state, all_address_dialog: false };
    case type.OPEN_SCHEDULE_DIALOG:
      return { ...state, open_schedule: true };
    case type.CLOSE_SCHEDULE_DIALOG:
      return { ...state, open_schedule: false };
    case type.OPEN_PROFILE_EDIT:
      return { ...state, profile_edit: true };
    case type.CLOSE_PROFILE_EDIT:
      return { ...state, profile_edit: false };
    default:
      return state;
  }
};

export default rootReducer;
