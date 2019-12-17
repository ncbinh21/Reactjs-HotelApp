export default (state = {}, action) => {
    switch (action.type) {
        case 'ACTIVATE_LOGIN':
            return action.login;
        default:
            return state;
    }
};