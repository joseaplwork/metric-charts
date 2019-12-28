import types from '@app/data/metrics/constants';

import reducer from '../reducer';

const buildState = state => ({
  isRequesting: false,
  isAppReady: true,
  ...state,
});

describe('appData', () => {
  describe('reducer', () => {
    it('should return default state', () => {
      const action = { type: 'test' };
      const currentState = buildState();

      expect(reducer(currentState, action)).toEqual(currentState);
    });

    it('should return correct state for action `FETCH_METRICS_REQUEST`', () => {
      const action = { type: types.FETCH_METRICS_REQUEST };
      const currentState = buildState();
      const expectedState = buildState({ isRequesting: true });

      expect(reducer(currentState, action)).toEqual(expectedState);
    });

    it('should return correct state for action `FETCH_METRICS_REQUEST_SUCCESS`', () => {
      const action = { type: types.FETCH_METRICS_REQUEST_SUCCESS };
      const currentState = buildState({ isRequesting: true });
      const expectedState = buildState();

      expect(reducer(currentState, action)).toEqual(expectedState);
    });

    it('should return correct state for action `FETCH_METRICS_REQUEST_ERROR`', () => {
      const action = { type: types.FETCH_METRICS_REQUEST_ERROR };
      const currentState = buildState({ isRequesting: true });
      const expectedState = buildState({
        isRequesting: false,
        isAppReady: false,
      });

      expect(reducer(currentState, action)).toEqual(expectedState);
    });
  });
});
