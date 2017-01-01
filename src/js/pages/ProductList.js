import React from "react";
import { connect } from "react-redux";
import * as productActions from "../actions/productActions";

import ArticleList from "../components/ArticleList";

// Main data store for handling and processing
@connect((store) => {
    return {
        productsAll: store.products.productsAll,
        productsFiltered: store.products.productsFiltered,
        searchProducts: store.products.searchProducts
    };
})

export default class ProductList extends React.Component {
    // componentWillMount() {
    //     this.props.dispatch(productActions.fetchProducts());
    // }

    _onFilterChange(event) {
        const { dispatch, productsFiltered } = this.props;
        dispatch(productActions._onFilterChange(event, productsFiltered));
    }

    render() {
        const { searchProducts } = this.props;

        let ProductList = <div>AJAX LOADING</div>;
        if (searchProducts.length) ProductList = <ArticleList searchProducts={searchProducts}/>;
        
        // Render the main dashboard after data has been loaded
        return (
            <div class="container">
                <div class="form-group">
                  <label class="control-label" for="inputLarge">Search Product</label>
                  <input class="form-control input-lg" type="text" id="inputLarge" onChange={this._onFilterChange.bind(this)} placeholder="What product would you like to search for?" />
                </div>
                <h2>Product list goes here</h2>
                { ProductList }
            </div>
        );
    }
}
