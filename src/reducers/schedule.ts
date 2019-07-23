export default (state = [], action:object) => {
    switch (action.type) {
        case 'SET_SCHEDULE':
            return Object.assign(state, state.push(action.payload));
        default:
            return state;
    }
}