import types from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case types.LOADING_TOGGLE_ACTION:
      return { ...state, showLoading: action.payload };

    case types.PRODUCT_IMAGES_ACTION:
      return { ...state, images: action.payload };

    case types.SHOW_DIALOG:
      return {
        ...state,
        showDialog: { show: true, ...action.payload },
      };
    case types.HIDE_DIALOG:
      return {
        ...state,
        showDialog: {},
      };
    default:
      return state;
  }
}
