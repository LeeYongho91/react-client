import axios from 'axios';
import types from './types';
import USER_SERVER from '../components/Config';

// export function registerUser(dataToSubmit) {
//   const request = axios
//     .post(`${USER_SERVER}/register`, dataToSubmit)
//     .then(response => response.data);

//   return {
//     type: REGISTER_USER,
//     payload: request,
//   };
// }

function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: types.LOGIN_USER,
    payload: request,
  };
}

// export function auth() {
//   const request = axios
//     .get(`${USER_SERVER}/auth`)
//     .then(response => response.data);

//   return {
//     type: AUTH_USER,
//     payload: request,
//   };
// }

// export function logoutUser() {
//   const request = axios
//     .get(`${USER_SERVER}/logout`)
//     .then(response => response.data);

//   return {
//     type: LOGOUT_USER,
//     payload: request,
//   };
// }

// export async function addToCart(id) {
//   const body = {
//     productId: id,
//   };

//   const { data } = await axios.post(`${USER_SERVER}/addToCart`, body);

//   console.log(data);
//   return {
//     type: ADD_TO_CART,
//     payload: data.cart,
//   };
// }

// export async function getCartItems(cartItems, userCart) {
//   console.log('test');
//   const { data } = await axios.get(
//     `/api/product/product_by_id?id=${cartItems}&type=array`,
//   );

//   console.log(data);

//   // CartItem들에 해당하는 정보들을
//   // Product Collection에서 가져온후에
//   // Quantity 정보를 넣어 준다.

//   userCart.forEach(cartItem => {
//     data.product.forEach((productDetail, index) => {
//       if (cartItem.id === productDetail._id) {
//         data.product[index].quantity = cartItem.quantity;
//       }
//     });
//   });

//   return {
//     type: GET_CART_ITEMS,
//     payload: data.product,
//   };
// }

// export async function removeCartItem(productId) {
//   const { data } = await axios.get(`/api/users/removeFromCart?id=${productId}`);

//   // productInfo, cart 정보를 조합해서 CartDetail을 만든다.

//   data.cart.forEach(item => {
//     data.productInfo.forEach((product, index) => {
//       if (item.id === product._id) {
//         data.productInfo[index].quantity = item.quantity;
//       }
//     });
//   });
//   return {
//     type: REMOVE_CART_ITEM,
//     payload: data,
//   };
// }

// export async function onSuccessBuy(paymentData) {
//   console.log(paymentData);

//   const { data } = await axios.post(`/api/users/successBuy`, paymentData);

//   console.log(data);

//   return {
//     type: ON_SUCCESS_BUY,
//     payload: data,
//   };
// }

export default { loginUser };
