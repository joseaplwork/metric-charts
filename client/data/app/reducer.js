import types from '@app/data/metrics/constants';

export const initialState = {
  isRequesting: false,
  isAppReady: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_METRICS_REQUEST:
      return { ...state, isRequesting: true, isAppReady: state.isAppReady };
    case types.FETCH_METRICS_REQUEST_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        isAppReady: initialState.isAppReady,
      };
    case types.FETCH_METRICS_REQUEST_ERROR:
      return { ...state, isAppReady: false, isRequesting: false };
    default:
      return state;
  }
}
