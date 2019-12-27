import { setupStore } from '@app/store';

describe('Store', () => {
  const action = { type: 'test' };

  test('should expose required methods', () => {
    const store = setupStore();

    expect(store.getState).toBeInstanceOf(Function);
    expect(store.subscribe).toBeInstanceOf(Function);
    expect(store.subscribeReducer).toBeInstanceOf(Function);
    expect(store.subscribeMiddleware).toBeInstanceOf(Function);
  });

  test('should subscribe a reducer', () => {
    const store = setupStore();
    const mockReducer = jest.fn();

    store.subscribeReducer(mockReducer);
    store.dispatch(action);

    expect(mockReducer).toHaveBeenCalled();
  });

  test('should subscribe a middleware', () => {
    const store = setupStore();
    const mockMiddleware = jest.fn();

    store.subscribeMiddleware(mockMiddleware);
    store.dispatch(action);

    expect(mockMiddleware).toHaveBeenCalled();
  });

  test('should subscribe a container', () => {
    const store = setupStore();
    const mockContainer = jest.fn();

    store.subscribe(mockContainer);
    store.dispatch(action);

    expect(mockContainer).toHaveBeenCalled();
  });

  test('should return state', () => {
    const store = setupStore();

    expect(store.getState()).toBeInstanceOf(Object);
  });
});
