const INITIAL_STATE = [
    {
        name: 'Mr. Smith',
        id: 0,
        sex: 'mature',
        birthday: '1975-05-05'
    }
];

export default (state = INITIAL_STATE, action:object) => {
    switch (action.type) {
        case 'SET_PATIENTS':
            return Object.assign(state, state.push(action.payload));
        default:
            return state;
    }
}