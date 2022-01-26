import types from './types';

export function laadingToggleAction(status) {
  return {
    type: types.LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
