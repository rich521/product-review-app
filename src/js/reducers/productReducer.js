export default function reducer(state = {
    data: false,
}, action) {
    var cases = {
        "FORM_TYPE": {
            ...state,
            data: action.payload
        }
    };

    if (cases[action.type]) return cases[action.type];

    return state;
}
