export default (state = {}, action:object) => {
    switch (action.type) {
        case 'SET_DOCTORS':
            return action.payload;
        default:
            return state;
    }
}