import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

export function configureStore(initialState = {}) {
    const store = createStore(rootReducer, initialState);
    return store;
};
  
export const store = configureStore();