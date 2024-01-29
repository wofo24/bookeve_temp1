import axios from 'axios';
import * as type from './actionTypes'
import { Root_url } from '../ROOT_URL/Root_url';
import Cookies from 'js-cookie';

export const fetchPosts = () => {
  const unknown_token = Cookies.get('unknown_user_token')
  const token = Cookies.get('token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/category-packages/?status=True&home=True`,
    params: {
      token: unknown_token,
    },
    headers: {}

  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return async (dispatch) => {
    try {
      dispatch({ type: type.FETCH_LOADING });
      const response = await axios(config);
      const filter_Data = response?.data?.data?.filter((item) => (item?.packages && item?.packages.length > 0));

      dispatch({ type: type.FETCH_DATA, payload: filter_Data });
    } catch (error) {
      dispatch({ type: type.FETCH_ERROR, payload: error.message });
    }
  };
}

export const get_public_information = () => {
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/business-profile/`,
  };

  return async (dispatch) => {
    dispatch({ type: type.PUBLIC_INFORMATION_LOADING })
    try {
      const response = await axios(config);
      dispatch({ type: type.PUBLIC_INFORMATION_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: type.PUBLIC_INFORMATION_ERROR, payload: error });
    }
  };
}

export const incrementPackageCount = (packageId) => {
  return { type: type.INCREMENT, payload: packageId };
};

export const decrementPackageCount = (packageId) => {
  return { type: type.DECREMENT, payload: packageId };
};

export const login = (data) => {
  const config = {
    method: 'post',
    url: `${Root_url}/web/v1/auth/login/`,
    data: data
  };
  return async (dispatch) => {
    dispatch({ type: type.USER_LOGIN_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.USER_LOGIN, payload: response.data });
    } catch (error) {
      dispatch({ type: type.USER_LOGIN_ERROR, payload: error.response.data.error });
    }
  };

};

export const signup = (data) => {
  const config = {
    method: 'post',
    url: `${Root_url}/web/v1/auth/signup/`,
    data: data
  };
  return async (dispatch) => {
    dispatch({ type: type.USER_SIGNUP_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.USER_SIGNUP, payload: response.data });
    } catch (error) {
      dispatch({ type: type.USER_SIGNUP_ERROR, payload: error.response.data.error });
    }
  };
};

export const activate = (data, id) => {
  const unknown_token = Cookies.get('unknown_user_token')
  const config = {
    method: 'post',
    url: `${Root_url}/web/v1/auth/${id}/activate/`,
    data: data,
    params: {
      token: unknown_token,
    }
  };
  return async (dispatch) => {
    try {
      dispatch({ type: type.ACTIVATE_USER_LOADING });
      const response = await axios(config);
      Cookies.remove('unknown_user_token')
      dispatch({ type: type.ACTIVATE_USER, payload: response.data });
    } catch (error) {
      dispatch({ type: type.ACTIVATE_USER_ERROR, payload: error.response.data.error });
    }
  };
};

export const re_send_otp = (id) => {
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/auth/${id}/resend_otp/`,
  };
  return async (dispatch) => {
    dispatch({ type: type.SUCCESS_OTP_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.SUCCESS_OTP, payload: response.data });

    } catch (error) {
      dispatch({ type: type.FAIL_OTP, payload: error });
    }
  };
};

export const Unknown_user_entered = () => {
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/auth/session_token/`,
  };

  return async (dispatch) => {
    try {
      const response = await axios(config);
      dispatch({ type: type.UNKNOWN_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: type.UNKNOWN_USER_ERROR, payload: error });
    }
  };
};

export const get_my_profile = () => {
  const token = Cookies.get('token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/user-details/my_profile/`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  return async (dispatch) => {
    dispatch({ type: type.GET_MY_PROFILE_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.GET_MY_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: type.GET_MY_PROFILE_ERROR, payload: error });
    }
  };
};

export const update_my_profile = (token, data) => {
  const config = {
    method: 'patch',
    url: `${Root_url}/web/v1/user-details/my_profile/`,
    data: data,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  return async (dispatch) => {
    dispatch({ type: type.UPDATE_MY_PROFILE_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.UPDATE_MY_PROFILE_SUCCESS, payload: response?.data });
    } catch (error) {
      console.log(error)
      dispatch({ type: type.UPDATE_MY_PROFILE_ERROR, payload: error });
    }
  };
};

export const store_id = (id) => {
  return { type: type.STORE_ID, payload: id };
};

export const openDialog = (data) => {
  return { type: type.OPEN_DIALOG, payload: data };
};

export const increment_in_bag = (id) => {
  const unknown_token = Cookies.get('unknown_user_token')
  const token = Cookies.get('token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/cart/package/${id}/increment/`,
    params: {
      token: unknown_token,
    },
    headers: {},
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return async (dispatch) => {
    dispatch({ type: type.UPDATE_IN_BAG_LOADING });
    try {
      const response = await axios(config);

      dispatch({ type: type.UPDATE_IN_BAG, payload: response.data });
      dispatch({ type: type.INCREMENT_FOR_SNACKBAR, payload: response.data });
    } catch (error) {
      dispatch({ type: type.GET_ALL_CART_DATA_ERROR, payload: error.response.data.error });
    }
  };
};

export const decrement_in_bag = (id) => {
  const unknown_token = Cookies.get('unknown_user_token')
  const token = Cookies.get('token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/cart/package/${id}/decrement/`,
    params: {
      token: unknown_token,
    },
    headers: {},
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return async (dispatch) => {
    dispatch({ type: type.UPDATE_IN_BAG_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.UPDATE_IN_BAG, payload: response.data });
      dispatch({ type: type.DECREMENT_FORM_SNACKBAR, payload: response.data });
    } catch (error) {
      dispatch({ type: type.GET_ALL_CART_DATA_ERROR, payload: error.response.data.error });
    }
  };
};

export const get_all_cart_data = () => {
  const unknown_token = Cookies.get('unknown_user_token');
  const token = Cookies.get('token');

  let config = {
    method: 'get',
    url: `${Root_url}/web/v1/cart/`,
    params: {
      token: unknown_token,
    },
    headers: {},
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return async (dispatch) => {
    dispatch({ type: type.UPDATE_IN_BAG_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.GET_ALL_CART_DATA, payload: response?.data?.data?.cart_cart_item });
    } catch (error) {
      dispatch({ type: type.GET_ALL_CART_DATA, payload: error?.response?.data });
    }
  };
};

export const clear_all_cart_data = () => {
  const unknown_token = Cookies.get('unknown_user_token')
  const token = Cookies.get('token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/cart/clear_cart/`,
    params: {
      token: unknown_token,
    },
    headers: {}
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return async (dispatch) => {
    dispatch({ type: type.UPDATE_IN_BAG_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.GET_ALL_CART_DATA, payload: response?.data?.data?.cart_cart_item });
    } catch (error) {
      dispatch({ type: type.GET_ALL_CART_DATA, payload: error.response.data });
    }
  };
};

export const reschedule_booking_date = (id, data) => {
  const firstItem = id && id.length > 0 ? id[0] : null;
  const token = Cookies.get('token')
  const config = {
    method: 'patch',
    url: `${Root_url}/web/v1/checkout/${firstItem}/reschedule/`,
    headers: { 'Authorization': 'Bearer ' + token },
    data: { "appointment_date": data }
  };
  return async (dispatch) => {
    dispatch({ type: type.RESCHEDULE_BOOKING_DATA_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.RESCHEDULE_BOOKING_DATA_SUCCESSFULLY, payload: response?.data });
    } catch (error) {
      dispatch({ type: type.RESCHEDULE_BOOKING_DATA_FAIL, payload: error.response.data });
    }

  };
};


export const booking_cancel = (id) => {
  const firstItem = id && id.length > 0 ? id[0] : null;
  const token = Cookies.get('token')
  const config = {
    method: 'patch',
    url: `${Root_url}/web/v1/checkout/${firstItem}/mark_cancel/`,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  };
  return async (dispatch) => {
    dispatch({ type: type.CANCEL_BOOKING_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.CANCEL_BOOKING_SUCCESS, payload: response?.data });
    } catch (error) {
      dispatch({ type: type.CANCEL_BOOKING_FAIL, payload: error?.response?.data });
    }
  };
};

export const get_all_address = () => async (dispatch) => {
  const token = Cookies.get('token')
  try {
    dispatch({ type: type.ADDRESS_LOADING });
    const { data } = await axios.get(`${Root_url}/web/v1/user-address-details/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    dispatch({ type: type.GET_ALL_ADDRESS, payload: data });
  } catch (error) {
    dispatch({ type: type.GET_ALL_ADDRESS, payload: error });
  }
};

export const post_address = (data) => {
  const token = Cookies.get('token')
  const config = {
    method: 'post',
    url: `${Root_url}/web/v1/user-address-details/`,
    data: data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return async (dispatch) => {
    dispatch({ type: type.ADDRESS_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.POST_ADDRESS, payload: response.data });
    } catch (error) {
      dispatch({ type: type.POST_ADDRESS, payload: error });
    }
  };
};

export const update_address = (data) => {
  const token = Cookies.get('token')
  const config = {
    method: 'put',
    url: `${Root_url}/web/v1/user-address-details/${data?.id}/`,
    data: data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return async (dispatch) => {
    dispatch({ type: type.ADDRESS_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.POST_ADDRESS, payload: response.data });
    } catch (error) {
      console.log(error)
      dispatch({ type: type.POST_ADDRESS, payload: error });
    }
  };
};

export const delete_address = (id) => {
  const token = Cookies.get('token')
  const config = {
    method: 'delete',
    url: `${Root_url}/web/v1/user-address-details/${id}/`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return async (dispatch) => {
    dispatch({ type: type.ADDRESS_LOADING });
    try {
      await axios(config);
      dispatch({ type: type.DELETE_ADDRESS, payload: true });
    } catch (error) {
      console.log(error)
      dispatch({ type: type.DELETE_ADDRESS, payload: error });
    }
  };
};

export const get_search_item = (Query, search_type) => {
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/search/?search_type=All&search=${Query}`,
  };
  return async (dispatch) => {
    dispatch({ type: type.SEARCH_ITEM_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.SEARCH_ITEM, payload: response.data.data });
      dispatch({ type: type.SEARCHED_QUARRY, payload: Query });
    } catch (error) {
      dispatch({ type: type.SEARCH_ITEM_ERROR, payload: error.message });
    }
  };
};

export const get_all_theme = () => {

  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/theme-configuration/`
  }
  return async (dispatch) => {
    dispatch({ type: type.GET_THEMES_LOADING });
    try {
      const response = await axios(config);
      // console.log(response.data.data.theme_configuration, 'this is response')
      dispatch({ type: type.GET_THEMES, payload: response.data.data.theme_configuration });
    } catch (error) {
      dispatch({ type: type.GET_THEMES_ERROR, payload: error.message });
    }
  };
};

export const checked_out_call = (data) => {
  const token = Cookies.get('token')
  const config = {
    method: 'post',
    url: `${Root_url}/web/v1/checkout/`,
    data: data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return async (dispatch) => {
    dispatch({ type: type.CHECKED_OUT_SUCCESS_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.CHECKED_OUT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: type.CHECKED_OUT_FAIL, payload: error });
    }
  };

};

export const checked_out_get = (offset, limit) => {
  const token = Cookies.get('token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/checkout/?offset=${offset ? offset : 0}&limit=${limit ? limit : 10}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return async (dispatch) => {
    dispatch({ type: type.CHECKED_OUT_SUCCESS_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.CHECKED_OUT_LIST_SUCCESS, payload: response?.data });
    } catch (error) {
      dispatch({ type: type.CHECKED_OUT_LIST_FAIL, payload: error });
    }
  };
};

export const get_all_coupons = (id) => {
  const token = Cookies.get('token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/coupons/select`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      "packages": id
    }
  };
  return async (dispatch) => {
    dispatch({ type: type.GET_ALL_COUPONS_SUCCESS_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.GET_ALL_COUPONS_SUCCESS, payload: response?.data });
    } catch (error) {
      dispatch({ type: type.GET_ALL_COUPONS_FAIL, payload: error });
    }
  };

};

export const post_coupon_code = (code, data) => {
  const token = Cookies.get('token')
  const config = {
    method: 'post',
    url: `${Root_url}/web/v1/coupons/apply_coupon/?coupon_code=${code}`,
    data: data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return async (dispatch) => {
    dispatch({ type: type.GET_ALL_COUPONS_SUCCESS_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.POST_COUPON_CODE_SUCCESS, payload: response?.data });
    } catch (error) {
      dispatch({ type: type.POST_COUPON_CODE_FAIL, payload: error });
    }
  };

};

export const get_all_reviews = () => {
  const token = Cookies.get('token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/review/`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return async (dispatch) => {
    dispatch({ type: type.GET_ALL_REVIEWS_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.GET_ALL_REVIEWS_SUCCESS, payload: response?.data });
    } catch (error) {
      dispatch({ type: type.GET_ALL_REVIEWS_ERROR, payload: error });
    }
  };
};

export const post_review = (data) => {
  const token = Cookies.get('token')
  const config = {
    method: 'post',
    url: `${Root_url}/web/v1/review/`,
    data: data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return async (dispatch) => {
    dispatch({ type: type.POST_REVIEWS_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.POST_REVIEWS_SUCCESS, payload: response?.data });
    } catch (error) {
      dispatch({ type: type.POST_REVIEWS_ERROR, payload: error });
    }
  };
};

export const put_review = (data) => {
  const token = Cookies.get('token')
  const config = {
    method: 'put',
    url: `${Root_url}/web/v1/review/`,
    data: data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return async (dispatch) => {
    dispatch({ type: type.PUT_REVIEWS_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.PUT_REVIEWS_SUCCESS, payload: response?.data });
    } catch (error) {
      dispatch({ type: type.PUT_REVIEWS_ERROR, payload: error });
    }
  };
};

export const get_all_package_all_review = (id) => {
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/packages/${id}/reviews/?&offset=0&limit=10`,
  }

  return async (dispatch) => {
    dispatch({ type: type.GET_ALL_PACKAGE_REVIEWS_LOADING });
    try {
      const response = await axios(config);
      dispatch({ type: type.GET_ALL_PACKAGE_REVIEWS_SUCCESS, payload: response?.data });
    } catch (error) {
      dispatch({ type: type.GET_ALL_PACKAGE_REVIEWS_ERROR, payload: error });
    }
  };
};

export const closeDialog = () => {
  return { type: type.CLOSE_DIALOG };
};

export const openRepeat = (data) => {
  return { type: type.OPEN_REPEAT, payload: data };
};

export const closeRepeat = () => {
  return { type: type.CLOSE_REPEAT };
};

export const openView = (data) => {
  return { type: type.OPEN_VIEW_DIALOG, payload: data };
};

export const closeView = () => {
  return { type: type.CLOSE_VIEW_DIALOG };
};

export const protectRoute = (data) => {
  // console.log(data)
  return { type: type.PROTECTED_ROUTE, payload: data };
};

export const add_package = (package_id, add_on_id) => {
  const package1 = { packageId: package_id, add_on: add_on_id ? add_on_id : '' }
  return { type: type.ADD_PACKAGE, payload: package1 };
};

export const openAdd_Address = (data) => {
  return { type: type.OPEN_ADDRESS_ADD_DIALOG, payload: data };
};

export const closeAdd_Address = (data) => {
  return { type: type.CLOSE_ADDRESS_ADD_DIALOG, payload: data };
};

export const openUpdate_Address = (data) => {
  return { type: type.OPEN_UPDATE_ADDRESS_DIALOG, payload: data };
};

export const closeUpdate_Address = (data) => {
  return { type: type.CLOSE_UPDATE_ADDRESS_DIALOG, payload: data };
};

export const openDelete_Address = (data) => {
  return { type: type.OPEN_DELETE_ADDRESS_DIALOG, payload: data };
};

export const closeDelete_Address = (data) => {
  return { type: type.CLOSE_DELETE_ADDRESS_DIALOG, payload: data };
};

export const show_this_category_package = (data) => {
  return { type: type.SHOW_THIS_CATEGORY, payload: data };
};

export const apply_coupon = (data) => {
  return { type: type.APPLY_COUPON, payload: data };
};

export const get_schedule = (data) => {
  return { type: type.GET_SCHEDULE, payload: data };
};

export const get_all_ordered_data = (data) => {
  return { type: type.GET_ORDER_DATA, payload: data };
};

export const get_all_ordered_data_error = (data) => {
  return { type: type.GET_ORDER_DATA_ERROR, payload: data };
};

export const get_search_type = (search_type) => {

  return { type: type.GET_SEARCH_TYPE, payload: search_type }
}

export const theme_change = (style) => {
  return { type: type.BUTTON_THEME, payload: style };
};

export const empty_quarry = (empty) => {

  return { type: type.EMPTY_QUARRY, payload: empty };
};

export const apply_new_theme = (style) => {
  localStorage.setItem('theme', JSON.stringify(style));
  return { type: type.CHANGE_THEME, payload: style };
};

export const open_coupon_dialog = () => {
  return { type: type.OPEN_COUPON_DIALOG };
};

export const close_coupon_dialog = () => {
  return { type: type.CLOSE_COUPON_DIALOG };
};

export const show_all_address = () => {
  return { type: type.SHOW_ALL_ADDRESS };
};

export const hide_all_address = () => {
  return { type: type.HIDE_ALL_ADDRESS };
};

export const open_schedule_dialog = (id, name) => {
  const data = { id, name }
  return { type: type.OPEN_SCHEDULE_DIALOG, payload: data };
};

export const close_schedule_dialog = () => {
  return { type: type.CLOSE_SCHEDULE_DIALOG };
};

export const open_profile_dialog = () => {
  return { type: type.OPEN_PROFILE_EDIT };
};

export const close_profile_dialog = () => {
  return { type: type.CLOSE_PROFILE_EDIT };
};

export const selected_address = (data) => {
  return { type: type.SELECTED_ADDRESS, payload: data };
};

export const selected_date_time = (data) => {

  return { type: type.SELECTED_DATE_TIME, payload: data };
};

export const open_agree_dialog = () => {
  return { type: type.OPEN_AGREE_BOX };
};

export const close_agree_dialog = () => {
  return { type: type.CLOSE_AGREE_BOX };
};

export const open_t_c_dialog = () => {
  return { type: type.OPEN_T_C_DIALOG };
};

export const close_t_c_dialog = () => {
  return { type: type.CLOSE_T_C_DIALOG };
};

export const click_to_apply_coupon = (data) => {
  return { type: type.APPLY_COUPON_ON_CLICK, payload: data };
};

export const open_help = () => {
  return { type: type.OPEN_HELP, };
};

export const close_help = () => {
  return { type: type.CLOSE_HELP };
};

export const proceed_to_pay_open = () => {
  return { type: type.PROCEED_TO_PAY_OPEN };
};

export const proceed_to_pay_close = () => {
  return { type: type.PROCEED_TO_PAY_CLOSE };
};

export const open_check_out = (data) => {
  return { type: type.OPEN_CHECKOUT_LIST, payload: data };
};

export const to_show_in_details_checkout = (data) => {
  return { type: type.SHOW_ORDER_IN_DETAILS_SUCCESS, payload: data };
};
// /////////////////////////////////////////////////////////////////////////////
export const close_check_out = () => {
  return { type: type.CLOSE_CHECKOUT_LIST };
};

export const store_pathname = (path) => {
  return { type: type.STORE_PATHNAME, payload: path };
};

export const add_fetch_post = () => {
  return { type: type.ADD_IN_FETCH_POST };
};

export const sub_fetch_post = () => {
  return { type: type.SUB_IN_FETCH_POST };
};

export const store_data_for_check_out = (data) => {
  return { type: type.READY_FOR_CHECK_OUT_DATA, payload: data };
};

export const store_data_for_check_out_address_id = (data) => {
  return { type: type.READY_FOR_CHECK_OUT_DATA_ADDRESS_ID, payload: data };
};

export const store_count = (data) => {
  return { type: type.STORE_CART_COUNT, payload: data }

};

export const open_sign_out_dialog = () => {
  return { type: type.CONFIRM_LOGOUT_TRUE }

};

export const close_sign_out_dialog = () => {
  return { type: type.CONFIRM_LOGOUT_FALSE }

};

export const show_message = (value, message, messageType) => {
  return { type: type.SHOW_MESSAGE, payload: { open: value, message: message, MessageType: messageType } };
};

export const empty_reschedule = () => {
  return { type: type.EMPTY_RESCHEDULE_BOOKING_DATA_SUCCESSFULLY }
}

export const clear_cart_data_message = ()=>{
  return{type: type.CLEAR_CART_DATA_MESSAGES}
}

export const clear_coupon = ()=>{
  return{type: type.CLEAR_COUPON_MESSAGES}
}