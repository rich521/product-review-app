import axios from "axios";

const productURL = "./data/products.json";

// Fetch the products data
export function fetchProducts() {
    return (dispatch) => {
        dispatch({ type: "FETCHING_PRODUCTS" });
        axios.get(productURL)
            .then((response) => {
                const data = response.data,
                    list = handleDuplicates(data);
                dispatch({ type: "FETCH_PRODUCTS_SUCCESSFUL", payload: data });
                dispatch({ type: "PRODUCT_FILTERED", payload: list });
            })
            .catch((err) => {
                dispatch({ type: "FETCH_PRODUCTS_REJECTED", payload: err });
            });
    }
}

// Search bar filter on change
export function _onFilterChange(event, products) {
    return (dispatch) => {
        if (!event) {
            dispatch({ type: "PRODUCT_SEARCH", payload: products });
            return;
        }

        const filterBy = event.target.value.toString().toLowerCase(),
            size = products.length,
            filteredList = [];
        for (let i = 0; i < size; i++) {
            let v = products[i].productName;
            if (v.toString().toLowerCase().indexOf(filterBy) !== -1) filteredList.push(products[i]);
        }

        if (filteredList == null) return;
        dispatch({ type: "PRODUCT_SEARCH", payload: filteredList });
    }
}

// Fetch the item data
export function fetchItem(id, list) {
    console.log(id, list);
    const array = [];
    for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].id === id) array.push(list[i]);
    }

    console.log(array);

    return (dispatch) => {
        dispatch({ type: "PRODUCT_REVIEWS", payload: array });
    }
}

/*
Data is not ready for item display. Functions below removes
product duplicates so it can be show on the main page
*/

let newArray = [];

function handleDuplicates(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let name = arr[i].productName;
        if (indexOf(name)) newArray.push(arr[i]);
    }
    return newArray;
}

// Custom indexOf
function indexOf(arg) {
    let arrLength = newArray.length;
    if (!arrLength) return true;
    for (let i = newArray.length - 1; i >= 0; i--) {
        if (newArray[i].productName === arg) {
            return false;
        }
    }
    return true;
}