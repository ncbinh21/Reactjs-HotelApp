import {
    combineReducers,
    createStore,
} from 'redux';
  
// actions.js
export const setLoginHomepage = login => ({
    type: 'ACTIVATE_LOGIN',
    login,
});
  
// reducers.js
export const login = (state = {}, action) => {
    switch (action.type) {
        case 'ACTIVATE_LOGIN':
            return action.login;
        default:
            return state;
    }
};
  
export const reducers = combineReducers({
    login,
});
  
// store.js
export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
};
  
export const store = configureStore();