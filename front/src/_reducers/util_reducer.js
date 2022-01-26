import types from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case types.LOADING_TOGGLE_ACTION:
      return { ...state, showLoading: action.payload };

    default:
      return state;
  }
}
