import types from './types';

export function loadingToggleAction(status) {
  return {
    type: types.LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function productImagesAction(images) {
  return {
    type: types.PRODUCT_IMAGES_ACTION,
    payload: images,
  };
}
