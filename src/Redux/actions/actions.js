// actions.js
// import axios from 'axios';
import * as type from './actionTypes'

export const fetchPosts = () => {
  const data = [
    {
      "categoryId": 1,
      "categoryName": "Lipstick",
      "packages": [
        {
          "packageId": 1,
          "packageName": "Matte Lipstick Set",
          "packagePrice": 19.99,
          "packageDescription": "A set of 5 matte lipsticks in various shades.",
          "packageDiscount": 10,
          "variants": [
            {
              "variantId": 101,
              "variantName": "blue Shades",
              "variantPrice": 21.99,
              "variantDescription": "A set of 5 matte lipsticks in red shades.",
              "variantDiscount": 15
            },
            // Add more variants if needed
          ]
        },
        {
          "packageId": 2,
          "packageName": "Glossy Lipstick Duo",
          "packagePrice": 12.99,
          "packageDescription": "Two glossy lipsticks for a shiny finish.",
          "packageDiscount": 5,
          "variants": [
            {
              "variantId": 102,
              "variantName": "Red Shades",
              "variantPrice": 21.99,
              "variantDescription": "A set of 5 matte lipsticks in red shades.",
              "variantDiscount": 15
            },
            {
              "variantId": 103,
              "variantName": "yellow Shades",
              "variantPrice": 21.99,
              "variantDescription": "A set of 5 matte lipsticks in red shades.",
              "variantDiscount": 15
            },
            // Add more variants if needed
          ]

          // No variants for this package
        }
      ]
    },
    {
      "categoryId": 2,
      "categoryName": "Eyeshadow",
      "packages": [
        {
          "packageId": 3,
          "packageName": "Nude Eyeshadow Palette",
          "packagePrice": 24.99,
          "packageDescription": "A palette with neutral eyeshadow shades.",
          "packageDiscount": 15,
          "variants": [
            {
              "variantId": 105,
              "variantName": "No Shades",
              "variantPrice": 21.99,
              "variantDescription": "A set of 5 matte lipsticks in red shades.",
              "variantDiscount": 15
            },
            {
              "variantId": 106,
              "variantName": "green Shades",
              "variantPrice": 21.99,
              "variantDescription": "A set of 5 matte lipsticks in red shades.",
              "variantDiscount": 15
            },
            // Add more variants if needed
          ]
        },
        {
          "packageId": 4,
          "packageName": "Vibrant Eyeshadow Collection",
          "packagePrice": 29.99,
          "packageDescription": "A collection of bold and vibrant eyeshadows.",
          "packageDiscount": 0
        }
        // Add more packages if needed
      ]
    },
    {
      "categoryId": 3,
      "categoryName": "Foundation",
      "packages": [
        {
          "packageId": 5,
          "packageName": "Matte Finish Foundation",
          "packagePrice": 17.99,
          "packageDescription": "A matte finish foundation for a flawless look.",
          "packageDiscount": 20
        },
        {
          "packageId": 6,
          "packageName": "Dewy Glow Foundation",
          "packagePrice": 21.99,
          "packageDescription": "A foundation that provides a dewy, radiant glow.",
          "packageDiscount": 10
        }
        // Add more packages if needed
      ]
    },
    {
      "categoryId": 4,
      "categoryName": "Mascara",
      "packages": [
        {
          "packageId": 7,
          "packageName": "Volume Boost Mascara",
          "packagePrice": 14.99,
          "packageDescription": "Achieve voluminous lashes with this mascara.",
          "packageDiscount": 10
        },
        {
          "packageId": 8,
          "packageName": "Lengthening Mascara",
          "packagePrice": 12.49,
          "packageDescription": "Get longer lashes with this mascara.",
          "packageDiscount": 5
        }
        // Add more packages if needed
      ]
    },
    {
      "categoryId": 5,
      "categoryName": "Blush",
      "packages": [
        {
          "packageId": 9,
          "packageName": "Rosy Cheek Blush",
          "packagePrice": 9.99,
          "packageDescription": "Add a rosy tint to your cheeks with this blush.",
          "packageDiscount": 0,
          "variants": [
            {
              "variantId": 107,
              "variantName": "No Shades",
              "variantPrice": 21.99,
              "variantDescription": "A set of 5 matte lipsticks in red shades.",
              "variantDiscount": 15
            },
            {
              "variantId": 108,
              "variantName": "green Shades",
              "variantPrice": 21.99,
              "variantDescription": "A set of 5 matte lipsticks in red shades.",
              "variantDiscount": 15
            },
            // Add more variants if needed
          ]
        }
        // Add more packages if needed
      ]
    }
    // Add more categories with packages and variants as necessary
  ];

  return async (dispatch) => {
    try {
      // const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const dataWithCount = data.map(category => ({
        ...category,
        packages: category?.packages?.map(packageItem => ({
          ...packageItem,
          count: 0,
        })),
      }));
      dispatch({ type: type.FETCH_DATA, payload: dataWithCount });
    } catch (error) {
      dispatch({ type: type.FETCH_ERROR, payload: error.message });
    }
  };

}

export const incrementPackageCount = (packageId) => {
  return { type: type.INCREMENT, payload: packageId };
};

export const decrementPackageCount = (packageId) => {
  return { type: type.DECREMENT, payload: packageId };
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


export const apply_coupon = (data) => {
  
  return { type: type.APPLY_COUPON, payload: data };
};

export const get_schedule = (data) => {

  return { type: type.GET_SCHEDULE, payload: data };
};

