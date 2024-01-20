// reducers.js
import { useNavigate } from 'react-router-dom';
import * as type from '../actions/actionTypes';
// impoer useNavigate

const savedTheme = JSON.parse(localStorage.getItem('theme'));

const initialState = {
  posts: {
    loading: false,
    data: [],
    error: [],
  },
  public_information: {
    loading: false,
    data: [],
    error: []
  },
  useLogged_in: {
    loading: false,
    data: [],
    error: []
  },
  active_user: {
    loading: false,
    data: [],
    error: []
  },
  otp_resend: {
    loading: false,
    data: [],
    error: [],
  },
  useSign_Up: {
    loading: false,
    data: [],
    error: [],
  },
  get_my_profile_success_error: {
    loading: false,
    data: [],
    error: []
  },
  get_my_profile_update_success_error: {
    loading: false,
    data: [],
    error: []
  },
  card_data: {
    loading: false,
    data: [],
    error: []
  },
  check_out_data: {
    loading: false,
    cart_item_for_check_out_bag_data: [],
    cart_item_for_check_out_address_id: [],
    check_out_success: [],
    check_out_fail: [],
    check_out_get_list_success: [],
    check_out_get_list_fail: [],

  },
  search_item: {
    query: '',
    search_type: 'all',
    error: []
  },
  coupons: {
    loading: false,
    get_coupon_success: [],
    get_coupon_fail: [],
    post_coupon_success: [],
    post_coupon_fail: [],
  },
  themeLoading: false,

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
  all_address: {
    all_address: [],
    posted_address_result: [],
    delete_address_result: [],
    update_address_result: [],
  },
  open_address_data: [],
  all_ordered: [],

  button_style: [],
  all_theme: [],
  coupon_dialog: false,
  all_address_dialog: false,
  open_schedule: false,
  profile_edit: false,
  category_id_to_show_its_package: 1,
  apply_new_theme: savedTheme || {
    background: `#FFE394`,
    animation: `first 15s linear infinite`,
    OAnimation: `first 15s linear infinite`,
    WebkitAnimation: `first 15s linear infinite`,
    MozAnimation: `first 15s linear infinite`,
    fontFamily: 'monospace',
    backgroundPosition: '50% 50%',
    backgroundSize: '600% 600%',
    child_div_text: 'black',
    child_bg: ' rgb(255 255 255 / 0.6)',
    child_backdropFilter: `blur(10px)`,
    icons_Background: '#fff3d0',
    Company_Name_title: 'black',
    buttonColor: 'rgb(255, 198, 41)',
    buttonText: 'white',
    icons_Color: 'rgb(255, 198, 41)',
    text_style: 'Fantasy',
    color: 'white',
    theme_name: 'Minimal',
    margin: '-7px',
    padding: '0px',
    keyframesStyle: `
    @-webkit-keyframes AnimationName {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @-moz-keyframes AnimationName {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes AnimationName {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  `
  },
  selected_address: '',
  selected_date_time: '',
  agree_box: false,
  t_c_dialog: false,
  help_dialog: false,
  apply_onClick_coupon: '',
  snack_bar_message: [],
  user_id: null,
  unknown_user_success_error: [],
  searched_quarry: '',
  address_id: [],
  proceed_to_pay: false,

  open_check: {
    data_success: [],
    data_fail: [],
    open: false
  },
  reschedule: [],
  show_in_details_checkout: [],

  pathname: '',
  update_in_post: 0,
  cart_count: 0,
  sign_out: false
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_LOADING:
      return { ...state, posts: { ...state.posts, loading: true } };
    case type.FETCH_DATA:
      return { ...state, posts: { ...state.posts, data: action.payload, loading: false } };
    case type.FETCH_ERROR:
      return { ...state, posts: { ...state.posts, error: action.payload, loading: false } };

    // ------------------------------>
    case type.PUBLIC_INFORMATION_LOADING:
      return { ...state, public_information: { ...state.public_information, loading: true } }
    case type.PUBLIC_INFORMATION_SUCCESS:
      return { ...state, public_information: { ...state.public_information, loading: false, data: action.payload } }
    case type.PUBLIC_INFORMATION_ERROR:
      return { ...state, public_information: { ...state.public_information, loading: false, error: action.payload } }
    case type.OPEN_DIALOG:
      return { ...state, dialog_open: false, dialog_data: action.payload };


    case type.USER_LOGIN_LOADING:
      return { ...state, useLogged_in: { ...state.useLogged_in, loading: true } }
    case type.USER_LOGIN:
      return { ...state, useLogged_in: { ...state.useLogged_in, loading: false, data: action.payload } }
    case type.USER_LOGIN_ERROR:
      return { ...state, useLogged_in: { ...state.useLogged_in, loading: false, error: action.payload } }

    // -------------------------------> OTP
    case type.SUCCESS_OTP_LOADING:
      return { ...state, otp_resend: { ...state.otp_resend, loading: true } };
    case type.SUCCESS_OTP:
      return { ...state, otp_resend: { ...state.otp_resend, loading: false, data: action.payload } };
    case type.FAIL_OTP:
      return { ...state, otp_resend: { ...state.otp_resend, loading: false, error: action.payload } };
    // ----------------------------------> Resend otp & active user

    case type.ACTIVATE_USER_LOADING:
      return { ...state, active_user: { ...state.active_user, loading: true, error: action.payload } }
    case type.ACTIVATE_USER:
      return { ...state, active_user: { ...state.active_user, loading: false, data: action.payload } }
    case type.ACTIVATE_USER_ERROR:
      return { ...state, active_user: { ...state.active_user, loading: false, error: action.payload } }

    case type.OPEN_CHECKOUT_LIST:
      return { ...state, open_check: { ...state.open_check, data_success: action.payload, open: true } };
    case type.CLOSE_CHECKOUT_LIST:
      return { ...state, open_check: { ...state.open_check, data_fail: action.payload, open: false } };

    case type.STORE_ID:
      return { ...state, user_id: action.payload };


    case type.USER_SIGNUP_LOADING:
      return { ...state, useSign_Up: { ...state.useSign_Up, loading: true } };
    case type.USER_SIGNUP:
      return { ...state, useSign_Up: { ...state.useSign_Up, loading: false, data: action.payload } };
    case type.USER_SIGNUP_ERROR:
      return { ...state, useSign_Up: { ...state.useSign_Up, loading: false, error: action.payload } };


    case type.GET_MY_PROFILE_LOADING:
      return { ...state, get_my_profile_success_error: { ...state.get_my_profile_success_error, loading: true } };
    case type.GET_MY_PROFILE_SUCCESS:
      return { ...state, get_my_profile_success_error: { ...state.get_my_profile_success_error, loading: false, data: action.payload } };
    case type.GET_MY_PROFILE_ERROR:
      return { ...state, get_my_profile_success_error: { ...state.get_my_profile_success_error, loading: false, error: action.payload } };

    // ---------------Edit profile--------------------

    case type.UPDATE_MY_PROFILE_LOADING:
      return { ...state, get_my_profile_update_success_error: { ...state.get_my_profile_update_success_error, loading: true } };
    case type.UPDATE_MY_PROFILE_SUCCESS:
      return { ...state, get_my_profile_update_success_error: { ...state.get_my_profile_update_success_error, loading: false, data: action.payload } }
    case type.UPDATE_MY_PROFILE_ERROR:
      return { ...state, get_my_profile_update_success_error: { ...state.get_my_profile_update_success_error, loading: false, error: action.payload } }

    // address---------------------------------------->
    case type.ADDRESS_LOADING:
      return { ...state, all_address: { ...state.all_address, loading: true } }
    case type.GET_ALL_ADDRESS:
      return { ...state, all_address: { ...state.all_address, all_address: action.payload, loading: false } };
    case type.POST_ADDRESS:
      return { ...state, all_address: { ...state.all_address, posted_address_result: action.payload, loading: false } };
    case type.UPDATE_ADDRESS:
      return { ...state, all_address: { ...state.all_address, update_address_result: action.payload, loading: false } };
    case type.DELETE_ADDRESS:
      return { ...state, all_address: { ...state.all_address, delete_address_result: action.payload, loading: false } };

    // ---------------------Themes----------->

    case type.GET_THEMES_LOADING:
      return { ...state, themeLoading: true };
    case type.GET_THEMES:
      return { ...state, all_theme: action.payload, themeLoading: false };
    case type.GET_THEMES_ERROR:
      return { ...state, all_theme: action.payload, themeLoading: false };
    case type.CHANGE_THEME:
      return { ...state, apply_new_theme: action.payload };

    // Unknown user ---------------------------------------->

    case type.UNKNOWN_USER_SUCCESS:
      return { ...state, unknown_user_success_error: action.payload };
    case type.UNKNOWN_USER_ERROR:
      return { ...state, unknown_user_success_error: action.payload };

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
    // address ---------------------------------------------------------------------------------------------------->

    // address ---------------------------------------------------------------------------------------------------->

    case type.OPEN_ADDRESS_ADD_DIALOG:
      return { ...state, open_add_dialog: true, open_address_data: action.payload };
    // unknown bag ----------------------------------------------------------------------------------------------------->
    case type.UPDATE_IN_BAG_LOADING:
      return { ...state, card_data: { ...state.card_data, loading: true } };
    case type.UPDATE_IN_BAG:
      return { ...state, card_data: { ...state.card_data, loading: false, data: action.payload } };
    case type.GET_ALL_CART_DATA:
      return { ...state, card_data: { ...state.card_data, loading: false, data: action.payload } };
    case type.GET_ALL_CART_DATA_ERROR:
      return { ...state, card_data: { ...state.card_data, loading: false, error: action.payload } };

    // unknown bag ----------------------------------------------------------------------------------------------------->

    case type.RESCHEDULE_BOOKING_DATA_LOADING:
      return {
        ...state, check_out_data: { ...state.check_out_data, loading: true }
      }
    case type.RESCHEDULE_BOOKING_DATA_SUCCESSFULLY:
      return {
        ...state, check_out_data: { ...state.check_out_data, loading: false, check_out_get_list_success: action.payload }
      }
    case type.RESCHEDULE_BOOKING_DATA_FAIL:
      return {
        ...state, check_out_data: { ...state.check_out_data, loading: false, check_out_get_list_fail: action.payload }
      }

    // Booking cancel---------------------------->

    case type.CANCEL_BOOKING_LOADING:
      return {
        ...state, check_out_data: { ...state.check_out_data, loading: true }
      }
    case type.CANCEL_BOOKING_SUCCESS:
      return {
        ...state, check_out_data: { ...state.check_out_data, check_out_get_list_success: action.payload, loading: false }
      }
    case type.CANCEL_BOOKING_FAIL:
      return {
        ...state, check_out_data: { ...state.check_out_data, check_out_get_list_fail: action.payload, loading: false }
      }
    // ------------------checkout--------------------------->
    case type.CHECKED_OUT_SUCCESS_LOADING:
      return {
        ...state, check_out_data: { ...state.check_out_data, loading: true }
      }
    case type.CHECKED_OUT_SUCCESS:
      return {
        ...state, check_out_data: { ...state.check_out_data, loading: false, check_out_success: action.payload }
      }
    case type.CHECKED_OUT_FAIL:
      return {
        ...state, check_out_data: { ...state.check_out_data, loading: false, check_out_fail: action.payload }
      }
    case type.CHECKED_OUT_LIST_SUCCESS:
      return {
        ...state, check_out_data: { ...state.check_out_data, loading: false, check_out_get_list_success: action.payload }
      }

    case type.CHECKED_OUT_LIST_FAIL:
      return {
        ...state, check_out_data: { ...state.check_out_data, loading: false, check_out_get_list_fail: action.payload }
      }
    // --------------------- Search item -------------->

    case type.SEARCH_ITEM_LOADING:
      return { ...state, search_item: { ...state.search_item, loading: true } };
    case type.SEARCH_ITEM:
      return { ...state, search_item: { ...state.search_item, loading: false, data: action.payload } };
    case type.SEARCHED_QUARRY:
      return { ...state, searched_quarry: action.payload };
    case type.GET_SEARCH_TYPE:
      return { ...state, search_type: action.payload };
    case type.EMPTY_QUARRY:
      return { ...state, search_item: action.payload };

    // coupons------------------------------------------------------------------------------------------------------------>

    case type.POST_COUPON_CODE_SUCCESS:
      return { ...state, coupons: { ...state.coupons, post_coupon_success: action.payload, loading: false } }
    case type.POST_COUPON_CODE_FAIL:
      return { ...state, coupons: { ...state.coupons, post_coupon_fail: action.payload, loading: false } }

    case type.GET_ALL_COUPONS_SUCCESS_LOADING:
      return { ...state, coupons: { ...state.coupons, loading: true } }
    case type.GET_ALL_COUPONS_SUCCESS:
      return { ...state, coupons: { ...state.coupons, get_coupon_success: action.payload, loading: false } }
    case type.GET_ALL_COUPONS_FAIL:
      return { ...state, coupons: { ...state.coupons, get_coupon_fail: action.payload, loading: false } }

    // coupons------------------------------------------------------------------------------------------------------------>
    case type.CLOSE_ADDRESS_ADD_DIALOG:
      return { ...state, open_add_dialog: false, open_address_data: action.payload };
    case type.OPEN_DELETE_ADDRESS_DIALOG:
      return { ...state, delete_open: true, address_id: action.payload };
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

    case type.BUTTON_THEME:
      return { ...state, button_style: action.payload };

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
      return { ...state, open_schedule: true, reschedule: action.payload };
    case type.CLOSE_SCHEDULE_DIALOG:

      return { ...state, open_schedule: false };
    case type.OPEN_PROFILE_EDIT:
      return { ...state, profile_edit: true };
    case type.CLOSE_PROFILE_EDIT:
      return { ...state, profile_edit: false };
    case type.SELECTED_ADDRESS:
      return { ...state, selected_address: action.payload };
    case type.SELECTED_DATE_TIME:

      return { ...state, selected_date_time: action.payload };
    case type.OPEN_AGREE_BOX:
      return { ...state, agree_box: true };
    case type.SHOW_ORDER_IN_DETAILS_SUCCESS:
      return { ...state, show_in_details_checkout: action.payload };
    case type.CLOSE_AGREE_BOX:
      return { ...state, agree_box: false };
    case type.OPEN_T_C_DIALOG:
      return { ...state, t_c_dialog: true };
    case type.CLOSE_T_C_DIALOG:
      return { ...state, t_c_dialog: false };
    case type.OPEN_HELP:
      return { ...state, help_dialog: true };
    case type.CLOSE_HELP:
      return { ...state, help_dialog: false };
    case type.STORE_PATHNAME:
      return { ...state, pathname: action.payload };

    case type.PROCEED_TO_PAY_OPEN:
      return { ...state, proceed_to_pay: true };
    case type.PROCEED_TO_PAY_CLOSE:
      return { ...state, proceed_to_pay: false };
    case type.ADD_IN_FETCH_POST:
      return { ...state, update_in_post: state.update_in_post + 1 };
    case type.SUB_IN_FETCH_POST:
      return { ...state, update_in_post: state.update_in_post - 1 };
    // ////////////////////////////////////
    case type.STORE_CART_COUNT:
      return { ...state, cart_count: action.payload };

    case type.CONFIRM_LOGOUT_TRUE:
      return { ...state, sign_out: true };
    case type.CONFIRM_LOGOUT_FALSE:
      return { ...state, sign_out: false };
    // ////////////////////////////////////
    case type.APPLY_COUPON_ON_CLICK:
      return { ...state, apply_onClick_coupon: action.payload };
    case type.READY_FOR_CHECK_OUT_DATA:
      return { ...state, check_out_data: { ...state.check_out_data, cart_item_for_check_out_bag_data: action.payload } };
    case type.READY_FOR_CHECK_OUT_DATA_ADDRESS_ID:
      return {
        ...state, check_out_data: { ...state.check_out_data, cart_item_for_check_out_address_id: action.payload }
      };
    case type.SHOW_MESSAGE:
      return {
        ...state, snack_bar_message: action.payload
      }

    default:
      return state;
  }
};

export default rootReducer;
