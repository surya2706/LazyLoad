import { combineReducers } from 'redux';

import {
  FETCH_DATA,
  FETCH_COMPLETED,
  FETCH_FAILED,
  ALL_FETCHED,
} from './actions';

const fetchReducer = (state = { numFetches: 0, payload: [] }, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        fetchingData: true,
      };
    case FETCH_COMPLETED:
      let { payload } = state;
      payload = [...payload, ...action.payload];
      return {
        ...state,
        fetchingData: false,
        fetchCompleted: true,
        payload,
        numFetches: ++state.numFetches,
      };
    case FETCH_FAILED:
      return {
        ...state,
        fetchingData: false,
        fetchCompleted: false,
        fetchFailed: true,
        error: action.err,
      };
    case ALL_FETCHED:
      return {
        ...state,
        allFetched: true,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  fetchReducer,
});

export default reducer;
