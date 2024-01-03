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
      token: unknown_token ? unknown_token : token,
    }
  };

  return async (dispatch) => {
    try {
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
    try {
      const response = await axios(config);
      dispatch({ type: type.PUBLIC_INFORMATION_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: type.PUBLIC_INFORMATION_ERROR, payload: error });
    }
  };
}
export const add_package_count = (data) => {
  return { type: type.ADD_OR_UPDATE_ITEM, payload: data };

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
    try {
      const response = await axios(config);
      dispatch({ type: type.USER_LOGIN, payload: response.data });
    } catch (error) {
      dispatch({ type: type.USER_LOGIN, payload: error.response.data.error });
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
    try {
      const response = await axios(config);
      dispatch({ type: type.USER_SIGNUP, payload: response.data });
    } catch (error) {
      dispatch({ type: type.USER_SIGNUP, payload: error.response.data.error });
    }
  };
};

export const activate = (data, id) => {
  const unknown_token = Cookies.get('unknown_user_token')
  const token = Cookies.get('token')
  console.log(token, 'Token', unknown_token, 'unknown token')
  const config = {
    method: 'post',
    url: `${Root_url}/web/v1/auth/${id}/activate/`,
    data: data,
    params: {
      token: unknown_token ? unknown_token : token,
    }
  };

  return async (dispatch) => {
    try {
      const response = await axios(config);

      dispatch({ type: type.ACTIVATE_USER, payload: response.data });
    } catch (error) {
      dispatch({ type: type.ACTIVATE_USER, payload: error.response.data.error });
    }
  };
};

export const re_send_otp = (id) => {
  const config = {
    method: 'post',
    url: `${Root_url}/web/v1/auth/${id}/activate/`,
    data: { otp: '5555' }
  };
  console.log(config, 'config')
  return async (dispatch) => {
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

export const get_my_profile = (token) => {
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/user-details/my_profile/`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  console.log(config, 'this is')

  return async (dispatch) => {
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


export const update_in_bag = (data) => {
  const unknown_token = Cookies.get('unknown_user_token')
  const token = Cookies.get('unknown_user_token')
  const config = {
    method: 'post',
    url: `${Root_url}/web/v1/cart/`,
    data: data,
    params: {
      token: token ? token : unknown_token,
    },
  };
  return async (dispatch) => {
    try {
      const response = await axios(config);
      // dispatch({ type: type.UPDATE_IN_BAG, payload: response.data });
    } catch (error) {
      // dispatch({ type: type.UPDATE_IN_BAG, payload: error.response.data.error });
    }
  };
};

export const increment_in_bag = (id) => {
  const unknown_token = Cookies.get('unknown_user_token')
  const token = Cookies.get('unknown_user_token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/cart/package/${id}/increment/`,
    params: {
      token: token ? token : unknown_token,
    },
  };

  return async (dispatch) => {
    try {
      const response = await axios(config);
      // console.log(response, 'this is response')
      dispatch({ type: type.UPDATE_IN_BAG, payload: response.data });
    } catch (error) {
      dispatch({ type: type.UPDATE_IN_BAG, payload: error.response.data.error });
    }
  };
};

export const decrement_in_bag = (id) => {
  const unknown_token = Cookies.get('unknown_user_token')
  const token = Cookies.get('unknown_user_token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/cart/package/${id}/decrement/`,
    params: {
      token: token ? token : unknown_token,
    },
  };
  return async (dispatch) => {
    try {
      const response = await axios(config);
      // console.log(response, 'this is response')
      dispatch({ type: type.UPDATE_IN_BAG, payload: response.data });
    } catch (error) {
      dispatch({ type: type.UPDATE_IN_BAG, payload: error.response.data.error });
    }
  };
};

export const get_all_cart_data = (h) => {
  const unknown_token = Cookies.get('unknown_user_token')
  const token = Cookies.get('token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/cart/`,
    params: {
      token: token ? token : unknown_token,
    },
  };
  return async (dispatch) => {
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
      token: token ? token : unknown_token,
    },
  };
  return async (dispatch) => {
    try {
      const response = await axios(config);
      dispatch({ type: type.GET_ALL_CART_DATA, payload: response?.data?.data?.cart_cart_item });
    } catch (error) {
      dispatch({ type: type.GET_ALL_CART_DATA, payload: error.response.data });
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
  return { type: type.PROTECTED_ROUTE, payload: data };
};

export const add_package = (package_id, add_on_id) => {
  const package1 = { packageId: package_id, add_on: add_on_id ? add_on_id : '' }
  return { type: type.ADD_PACKAGE, payload: package1 };
};


export const get_all_address = () => async (dispatch) => {
  const token = Cookies.get('token')
  try {
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
  };

  console.log(config)
  return async (dispatch) => {
    try {
      const response = await axios(config);
      console.log(response, 'this is')
      dispatch({ type: type.POST_ADDRESS, payload: response.data });
    } catch (error) {
      console.log(error)
      dispatch({ type: type.POST_ADDRESS, payload: error });
    }
  };
};

export const openAdd_Address = (data) => {
  // console.log(data, 'this is data')
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

export const get_search_item = (Query, search_type) => {
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/search/?search_type=${search_type}&search=${Query}`,
  };
  return async (dispatch) => {
    try {
      const response = await axios(config);
      dispatch({ type: type.SEARCH_ITEM, payload: response.data.data });
      dispatch({ type: type.SEARCHED_QUARRY, payload: Query });
    } catch (error) {
      dispatch({ type: type.FETCH_ERROR, payload: error.message });
    }
  };
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
export const get_all_theme = () => {
  // const themes = [
  //   {
  //     background: `linear-gradient(199deg, #558bc7, #f4f735)`,
  //     animation: `first 10s linear infinite`,
  //     OAnimation: `first 10s linear infinite`,
  //     WebkitAnimation: `first 10s linear infinite`,
  //     MozAnimation: `first 10s linear infinite`,
  //     backgroundSize: '600% 600%',
  //     backgroundPosition: '50% 50%',
  //     fontFamily: 'monospace',
  //     child_div_text: 'black',
  //     child_bg: 'rgba(200, 200, 200, 1)',
  //     color: 'white',
  //     buttonColor: 'red',
  //     buttonText: 'white',
  //     icons_Color: 'blue',
  //     theme_name: 'Minimal',
  //     keyframesStyle: `
  //     @-webkit-keyframes first {
  //       0%{background-position:52% 0%}
  //       50%{background-position:49% 100%}
  //       100%{background-position:52% 0%}
  //   }
  //   @-moz-keyframes first {
  //       0%{background-position:52% 0%}
  //       50%{background-position:49% 100%}
  //       100%{background-position:52% 0%}
  //   }
  //   @-o-keyframes first {
  //       0%{background-position:52% 0%}
  //       50%{background-position:49% 100%}
  //       100%{background-position:52% 0%}
  //   }
  //   @keyframes first {
  //       0%{background-position:52% 0%}
  //       50%{background-position:49% 100%}
  //       100%{background-position:52% 0%}
  //   }
  //   `},
  //   {
  //     background: 'linear-gradient(4deg, #acffea, #ffffff, #28ff41)',
  //     animation: `first 10s linear infinite`,
  //     OAnimation: `first 10s linear infinite`,
  //     WebkitAnimation: `first 10s linear infinite`,
  //     MozAnimation: `first 10s linear infinite`,
  //     fontFamily: 'Times New Roman',
  //     backgroundSize: '600% 600%',
  //     backgroundPosition: '50% 50%',
  //     child_div_text: 'black',
  //     child_bg: 'rgba(200, 200, 200, 1)',
  //     color: 'green',
  //     buttonColor: 'red',
  //     buttonText: 'white',
  //     icons_Color: 'red',
  //     text_color: '#87697asd',
  //     text_style: '#5435asdf',
  //     theme_name: 'Gradient',
  //     keyframesStyle: `
  //     @-moz-keyframes AnimationName {
  //       0%{background-position:61% 0%}
  //       50%{background-position:40% 100%}
  //       100%{background-position:61% 0%}
  //   }
  //   @-o-keyframes AnimationName {
  //       0%{background-position:61% 0%}
  //       50%{background-position:40% 100%}
  //       100%{background-position:61% 0%}
  //   }
  //   @keyframes AnimationName {
  //       0%{background-position:61% 0%}
  //       50%{background-position:40% 100%}
  //       100%{background-position:61% 0%}
  //   }
  //   `,
  //   },
  //   {
  //     fontFamily: 'Comic Sans MS, Comic Sans, cursive',
  //     background: 'radial-gradient(#08ffbf 5%, #ffc208 17%, #ff3b3b 30%, white 62%)',
  //     animation: `first 10s linear infinite`,
  //     OAnimation: `first 10s linear infinite`,
  //     WebkitAnimation: `first 10s linear infinite`,
  //     MozAnimation: `first 10s linear infinite`,
  //     backgroundSize: '600% 600%',
  //     backgroundPosition: '50% 50%',
  //     child_bg: 'rgba(200, 200, 200, 1)',
  //     background_color: '#akjf',
  //     child_div_text: 'gray',
  //     child_bg: 'rgba(200, 200, 200, 1)',
  //     color: 'white',
  //     buttonColor: 'gray',
  //     buttonText: 'white',
  //     icons_Color: 'blue',
  //     text_color: 'white',
  //     text_style: '#5435asdf',
  //     theme_name: 'Minimal2',
  //     keyframesStyle: `
  //     @-webkit-keyframes first {
  //       0%{background-position:52% 0%}
  //       50%{background-position:49% 100%}
  //       100%{background-position:52% 0%}
  //   }
  //   @-moz-keyframes first {
  //       0%{background-position:52% 0%}
  //       50%{background-position:49% 100%}
  //       100%{background-position:52% 0%}
  //   }
  //   @-o-keyframes first {
  //       0%{background-position:52% 0%}
  //       50%{background-position:49% 100%}
  //       100%{background-position:52% 0%}
  //   }
  //   @keyframes first {
  //       0%{background-position:52% 0%}
  //       50%{background-position:49% 100%}
  //       100%{background-position:52% 0%}
  //   }
  //   `,
  //   }
  // ]
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/theme-configuration/`
  }
  return async (dispatch) => {
    try {
      const response = await axios(config);
      dispatch({ type: type.GET_THEMES, payload: response.data.data });
    } catch (error) {
      dispatch({ type: type.GET_THEMES, payload: error.message });
    }
  };
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

export const open_schedule_dialog = () => {
  return { type: type.OPEN_SCHEDULE_DIALOG };
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

export const close_check_out = () => {
  return { type: type.CLOSE_CHECKOUT_LIST };
};


export const store_data_for_check_out = (data) => {
  return { type: type.READY_FOR_CHECK_OUT_DATA, payload: data };
};

export const store_data_for_check_out_address_id = (data) => {
  return { type: type.READY_FOR_CHECK_OUT_DATA_ADDRESS_ID, payload: data };
};

export const checked_out_call = (data) => {
  console.log(data)
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
    try {
      const response = await axios(config);
      dispatch({ type: type.CHECKED_OUT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: type.CHECKED_OUT_FAIL, payload: error });
    }
  };

};

export const checked_out_get = () => {
  const token = Cookies.get('token')
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/checkout/`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return async (dispatch) => {
    try {
      const response = await axios(config);
      dispatch({ type: type.CHECKED_OUT_LIST_SUCCESS, payload: response?.data });
    } catch (error) {
      dispatch({ type: type.CHECKED_OUT_LIST_FAIL, payload: error });
    }
  };

};



export const show_message = (value, message, messageType) => {
  return { type: type.SHOW_MESSAGE, payload: { open: value, message: message, MessageType: messageType } };
};