import types from './constants';

export const initialState = {
  chartsInfo: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_METRICS_STATE:
      return { ...state, chartsInfo: action.data };
    default:
      return state;
  }
}
