import React from "react";
import { connect } from "react-redux";
import { _fetchProducts } from "../actions/productActions";

@connect((store) => {
    return {
        productsAll: store.products.productsAll
    };
})

export default class Layout extends React.Component {
    componentWillMount() {
        this.props.dispatch(_fetchProducts());
    }

    // Basic Layout, further customizable. Children prop react router
    render() {
        return (
            <div class="wrapper">
                {this.props.children}
            </div>
        );
    }
}
