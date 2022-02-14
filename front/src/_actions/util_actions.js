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

export function showDialogAction(data) {
  return {
    type: types.SHOW_DIALOG,
    payload: data,
  };
}

export function hideDialogAction(data) {
  return {
    type: types.HIDE_DIALOG,
    payload: data,
  };
}
