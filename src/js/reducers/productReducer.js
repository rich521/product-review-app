export default function reducer(state = {
    fetching: false,
    fetched: false,
    error: null,
    productsAll: [],
    productsFiltered: [],
    searchProducts:[],
    productReviews: []
}, action) {
    const cases = {
        "FETCHING_PRODUCTS": {
            ...state,
            fetching: true,
            fetched: false,
        },
        "FETCH_PRODUCTS_REJECTED": {
            ...state,
            fetching: false,
            error: action.payload
        },
        "FETCH_PRODUCTS_SUCCESSFUL": {
            ...state,
            fetching: false,
            fetched: true,
            productsAll: action.payload
        },
        "PRODUCT_FILTERED": {
            ...state,
            productsFiltered: action.payload,
            searchProducts: action.payload
        },
        "PRODUCT_SEARCH": {
            ...state,
            searchProducts: action.payload
        },
        "PRODUCT_REVIEWS": {
            ...state,
            productReviews: action.payload
        }
    };

    if (cases[action.type]) return cases[action.type];

    return state;
}
