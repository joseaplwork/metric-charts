import types from './constants';

export const initialState = {
  chartsInfo: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_METRICS_STATE: {
      return { ...state, chartsInfo: action.data };
    }
    case types.FETCH_METRICS_REQUEST_ERROR:
      return { ...state, chartsInfo: [] };
    default:
      return state;
  }
}
