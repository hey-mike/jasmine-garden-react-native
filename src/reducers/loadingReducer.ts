import * as actionTypes from 'src/actions/actionTypes';
import { createReducer } from 'src/lib/createReducer';

const initialState = {
  isLoginLoading: false,
};

export const loadingReducer = createReducer(initialState, {
  [actionTypes.LOGIN_ENABLE_LOADER](state) {
    return { ...state, isLoginLoading: true };
  },
  [actionTypes.LOGIN_DISABLE_LOADER](state) {
    return { ...state, isLoginLoading: false };
  },
});
