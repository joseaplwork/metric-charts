import types from '../constants';
import reducer from '../reducer';

const buildState = state => ({
  chartsInfo: [],
  ...state,
});

describe('metricsData', () => {
  describe('reducer', () => {
    it('should return default state', () => {
      const action = { type: 'test' };
      const currentState = buildState();

      expect(reducer(currentState, action)).toEqual(currentState);
    });

    it('should return correct state for action `UPDATE_METRICS_STATE`', () => {
      const data = [{ key: 'value' }];
      const action = { type: types.UPDATE_METRICS_STATE, data };
      const currentState = buildState();
      const expectedState = buildState({ chartsInfo: data });

      expect(reducer(currentState, action)).toEqual(expectedState);
    });
  });
});
