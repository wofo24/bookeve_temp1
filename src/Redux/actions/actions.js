import axios from 'axios';
import * as type from './actionTypes'
import { Root_url } from '../ROOT_URL/Root_url';

export const fetchPosts = () => {
  // const data = [
  //   {
  //     "categoryId": 1,
  //     "categoryName": "Lipstick",
  //     "packages": [
  //       {
  //         "packageId": 1,
  //         "packageName": "Matte Lipstick Set",
  //         "packagePrice": 19.99,
  //         "packageDescription": "A set of 5 matte lipsticks in various shades.",
  //         "packageDiscount": 10,
  //         "variants": [
  //           {
  //             "variantId": 101,
  //             "variantName": "blue Shades",
  //             "variantPrice": 21.99,
  //             "variantDescription": "A set of 5 matte lipsticks in red shades.",
  //             "variantDiscount": 15
  //           },
  //           // Add more variants if needed
  //         ]
  //       },
  //       {
  //         "packageId": 2,
  //         "packageName": "Glossy Lipstick Duo",
  //         "packagePrice": 12.99,
  //         "packageDescription": "Two glossy lipsticks for a shiny finish.",
  //         "packageDiscount": 5,
  //         "variants": [
  //           {
  //             "variantId": 102,
  //             "variantName": "Red Shades",
  //             "variantPrice": 21.99,
  //             "variantDescription": "A set of 5 matte lipsticks in red shades.",
  //             "variantDiscount": 15
  //           },
  //           {
  //             "variantId": 103,
  //             "variantName": "yellow Shades",
  //             "variantPrice": 21.99,
  //             "variantDescription": "A set of 5 matte lipsticks in red shades.",
  //             "variantDiscount": 15
  //           },
  //           // Add more variants if needed
  //         ]

  //         // No variants for this package
  //       }
  //     ]
  //   },
  //   {
  //     "categoryId": 2,
  //     "categoryName": "Eyeshadow",
  //     "packages": [
  //       {
  //         "packageId": 3,
  //         "packageName": "Nude Eyeshadow Palette",
  //         "packagePrice": 24.99,
  //         "packageDescription": "A palette with neutral eyeshadow shades.",
  //         "packageDiscount": 15,
  //         "variants": [
  //           {
  //             "variantId": 105,
  //             "variantName": "No Shades",
  //             "variantPrice": 21.99,
  //             "variantDescription": "A set of 5 matte lipsticks in red shades.",
  //             "variantDiscount": 15
  //           },
  //           {
  //             "variantId": 106,
  //             "variantName": "green Shades",
  //             "variantPrice": 21.99,
  //             "variantDescription": "A set of 5 matte lipsticks in red shades.",
  //             "variantDiscount": 15
  //           },
  //           // Add more variants if needed
  //         ]
  //       },
  //       {
  //         "packageId": 4,
  //         "packageName": "Vibrant Eyeshadow Collection",
  //         "packagePrice": 29.99,
  //         "packageDescription": "A collection of bold and vibrant eyeshadows.",
  //         "packageDiscount": 0
  //       }
  //       // Add more packages if needed
  //     ]
  //   },
  //   {
  //     "categoryId": 3,
  //     "categoryName": "Foundation",
  //     "packages": [
  //       {
  //         "packageId": 5,
  //         "packageName": "Matte Finish Foundation",
  //         "packagePrice": 17.99,
  //         "packageDescription": "A matte finish foundation for a flawless look.",
  //         "packageDiscount": 20
  //       },
  //       {
  //         "packageId": 6,
  //         "packageName": "Dewy Glow Foundation",
  //         "packagePrice": 21.99,
  //         "packageDescription": "A foundation that provides a dewy, radiant glow.",
  //         "packageDiscount": 10
  //       }
  //       // Add more packages if needed
  //     ]
  //   },
  //   {
  //     "categoryId": 4,
  //     "categoryName": "Mascara",
  //     "packages": [
  //       {
  //         "packageId": 7,
  //         "packageName": "Volume Boost Mascara",
  //         "packagePrice": 14.99,
  //         "packageDescription": "Achieve voluminous lashes with this mascara.",
  //         "packageDiscount": 10
  //       },
  //       {
  //         "packageId": 8,
  //         "packageName": "Lengthening Mascara",
  //         "packagePrice": 12.49,
  //         "packageDescription": "Get longer lashes with this mascara.",
  //         "packageDiscount": 5
  //       }
  //       // Add more packages if needed
  //     ]
  //   },
  //   {
  //     "categoryId": 5,
  //     "categoryName": "Blush",
  //     "packages": [
  //       {
  //         "packageId": 9,
  //         "packageName": "Rosy Cheek Blush",
  //         "packagePrice": 9.99,
  //         "packageDescription": "Add a rosy tint to your cheeks with this blush.",
  //         "packageDiscount": 0,
  //         "variants": [
  //           {
  //             "variantId": 107,
  //             "variantName": "No Shades",
  //             "variantPrice": 21.99,
  //             "variantDescription": "A set of 5 matte lipsticks in red shades.",
  //             "variantDiscount": 15
  //           },
  //           {
  //             "variantId": 108,
  //             "variantName": "green Shades",
  //             "variantPrice": 21.99,
  //             "variantDescription": "A set of 5 matte lipsticks in red shades.",
  //             "variantDiscount": 15
  //           },
  //           // Add more variants if needed
  //         ]
  //       }
  //       // Add more packages if needed
  //     ]
  //   },
  //   {
  //     "categoryId": 6,
  //     "categoryName": "Blush",
  //     "packages": [
  //       {
  //         "packageId": 10,
  //         "packageName": "Rosy Cheek Blush",
  //         "packagePrice": 9.99,
  //         "packageDescription": "Add a rosy tint to your cheeks with this blush.",
  //         "packageDiscount": 0,
  //         "variants": [
  //           {
  //             "variantId": 108,
  //             "variantName": "No Shades",
  //             "variantPrice": 21.99,
  //             "variantDescription": "A set of 5 matte lipsticks in red shades.",
  //             "variantDiscount": 15
  //           },
  //           {
  //             "variantId": 109,
  //             "variantName": "green Shades",
  //             "variantPrice": 21.99,
  //             "variantDescription": "A set of 5 matte lipsticks in red shades.",
  //             "variantDiscount": 15
  //           },
  //           // Add more variants if needed
  //         ]
  //       }
  //       // Add more packages if needed
  //     ]
  //   }
  //   // Add more categories with packages and variants as necessary
  // ];
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/category-packages/?status=True&home=True`,
  };
  return async (dispatch) => {
    try {
      const response = await axios(config);
      const filter_Data = response?.data?.data?.filter((item) => (item?.packages && item?.packages.length > 0));

      const dataWithCount = filter_Data.map(category => ({
        ...category,
        packages: category?.packages?.map(packageItem => ({
          ...packageItem,
          count: 0,
        })),
      }));
      // console.log(response, 'hellp')
      dispatch({ type: type.FETCH_DATA, payload: dataWithCount });
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

export const incrementPackageCount = (packageId) => {
  return { type: type.INCREMENT, payload: packageId };
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
  const config = {
    method: 'post',
    url: `${Root_url}/web/v1/auth/${id}/activate/`,
    data: data
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
      'Authorization': 'Bearer ' + token
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
      console.log(response, 'this is response')
      // dispatch({ type: type.UPDATE_MY_PROFILE_SUCCESS, payload: response?.data });
    } catch (error) {
      console.log(error)
      // dispatch({ type: type.UPDATE_MY_PROFILE_ERROR, payload: error });
    }
  };
};


export const decrementPackageCount = (packageId) => {
  return { type: type.DECREMENT, payload: packageId };
};

export const store_id = (id) => {
  return { type: type.STORE_ID, payload: id };
};

export const openDialog = (data) => {
  return { type: type.OPEN_DIALOG, payload: data };
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



export const get_all_address = (data) => {
  return { type: type.GET_ALL_ADDRESS, payload: data };
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

export const get_search_item = (Query, search_type) => {
  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/search/?search_type=${search_type}&search=${Query}`,
  };
  return async (dispatch) => {
    try {
      const response = await axios(config);
      dispatch({ type: type.SEARCH_ITEM, payload: response.data.data });
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
  console.log(empty, 'empty ')
  return { type: type.EMPTY_QUARRY, payload: empty };
};
export const get_all_theme = () => {
  const themes = [
    {
      background: `linear-gradient(199deg, #558bc7, #f4f735)`,
      animation: `first 10s linear infinite`,
      OAnimation: `first 10s linear infinite`,
      WebkitAnimation: `first 10s linear infinite`,
      MozAnimation: `first 10s linear infinite`,
      backgroundSize: '600% 600%',
      backgroundPosition: '50% 50%',
      fontFamily: 'monospace',
      child_div_text: 'black',
      child_bg: 'rgba(200, 200, 200, 1)',
      color: 'white',
      buttonColor: 'red',
      buttonText: 'white',
      icons_Color: 'blue',
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
    `},
    {
      background: 'linear-gradient(4deg, #acffea, #ffffff, #28ff41)',
      animation: `first 10s linear infinite`,
      OAnimation: `first 10s linear infinite`,
      WebkitAnimation: `first 10s linear infinite`,
      MozAnimation: `first 10s linear infinite`,
      fontFamily: 'Times New Roman',
      backgroundSize: '600% 600%',
      backgroundPosition: '50% 50%',
      child_div_text: 'black',
      child_bg: 'rgba(200, 200, 200, 1)',
      color: 'green',
      buttonColor: 'red',
      buttonText: 'white',
      icons_Color: 'red',
      text_color: '#87697asd',
      text_style: '#5435asdf',
      theme_name: 'Gradient',
      keyframesStyle: `
      @-moz-keyframes AnimationName {
        0%{background-position:61% 0%}
        50%{background-position:40% 100%}
        100%{background-position:61% 0%}
    }
    @-o-keyframes AnimationName {
        0%{background-position:61% 0%}
        50%{background-position:40% 100%}
        100%{background-position:61% 0%}
    }
    @keyframes AnimationName {
        0%{background-position:61% 0%}
        50%{background-position:40% 100%}
        100%{background-position:61% 0%}
    }
    `,
    },
    {
      fontFamily: 'Comic Sans MS, Comic Sans, cursive',
      background: 'radial-gradient(#08ffbf 5%, #ffc208 17%, #ff3b3b 30%, white 62%)',
      animation: `first 10s linear infinite`,
      OAnimation: `first 10s linear infinite`,
      WebkitAnimation: `first 10s linear infinite`,
      MozAnimation: `first 10s linear infinite`,
      backgroundSize: '600% 600%',
      backgroundPosition: '50% 50%',
      child_bg: 'rgba(200, 200, 200, 1)',
      background_color: '#akjf',
      child_div_text: 'gray',
      child_bg: 'rgba(200, 200, 200, 1)',
      color: 'white',
      buttonColor: 'gray',
      buttonText: 'white',
      icons_Color: 'blue',
      text_color: 'white',
      text_style: '#5435asdf',
      theme_name: 'Minimal2',
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
    `,
    }
  ]

  const config = {
    method: 'get',
    url: `${Root_url}/web/v1/theme-configuration/`
  }

  return async (dispatch) => {
    try {
      const response = await axios(config);
      console.log(response.data.data, 'this is cheap')
      dispatch({ type: type.GET_THEMES, payload: themes });
    } catch (error) {
      dispatch({ type: type.FETCH_ERROR, payload: error.message });
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

export const show_message = (value, message, messageType) => {
  return { type: type.SHOW_MESSAGE, payload: { open: value, message: message, MessageType: messageType } };
};