// actions.js
import axios from 'axios';
import * as type from './actionTypes'

export const fetchPosts = () => {
    const data = [
        {
          "categoryName": "Lipstick",
          "packages": [
            {
              "packageName": "Matte Lipstick Set",
              "packagePrice": 19.99,
              "packageDescription": "A set of 5 matte lipsticks in various shades.",
              "packageDiscount": 10
            },
            {
              "packageName": "Glossy Lipstick Duo",
              "packagePrice": 12.99,
              "packageDescription": "Two glossy lipsticks for a shiny finish.",
              "packageDiscount": 5
            }
          ]
        },
        {
          "categoryName": "Eyeshadow",
          "packages": [
            {
              "packageName": "Nude Eyeshadow Palette",
              "packagePrice": 24.99,
              "packageDescription": "A palette with neutral eyeshadow shades.",
              "packageDiscount": 15
            },
            {
              "packageName": "Vibrant Eyeshadow Collection",
              "packagePrice": 29.99,
              "packageDescription": "A collection of bold and vibrant eyeshadows.",
              "packageDiscount": 0
            }
          ]
        },
        {
          "categoryName": "Foundation",
          "packages": [
            {
              "packageName": "Matte Finish Foundation",
              "packagePrice": 17.99,
              "packageDescription": "A matte finish foundation for a flawless look.",
              "packageDiscount": 20
            },
            {
              "packageName": "Dewy Glow Foundation",
              "packagePrice": 21.99,
              "packageDescription": "A foundation that provides a dewy, radiant glow.",
              "packageDiscount": 10
            }
          ]
        }
      ]
      




    return async (dispatch) => {
        try {
            // const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            dispatch({ type: type.FETCH_DATA, payload: data });
        } catch (error) {
            dispatch({ type: type.FETCH_ERROR, payload: error.message });
        }
    };

}

