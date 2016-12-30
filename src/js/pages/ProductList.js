import React from "react";
import { connect } from "react-redux";
import * as productActions from "../actions/productActions";

// Main data store for handling and processing
@connect((store) => {
    return {
        data: store.user.formType,
    };
})

export default class ProductList extends React.Component {
    render() {
        // Render the main dashboard after data has been loaded
        return (
            <div class="container">

            </div>
        );
    }
}
