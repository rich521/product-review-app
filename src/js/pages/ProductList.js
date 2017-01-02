import React from "react";
import { connect } from "react-redux";
import * as productActions from "../actions/productActions";

import ArticleList from "../components/ArticleList";

// Main data store for handling and processing
@connect((store) => {
    return {
        productsFiltered: store.products.productsFiltered,
        searchProducts: store.products.searchProducts,
        itemLimit: store.products.itemLimit
    };
})

export default class ProductList extends React.Component {
    componentDidMount() {
        document.addEventListener('scroll', this._handleScroll.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this._handleScroll.bind(this));
    }

    // Handle search input
    _onFilterChange(event) {
        const { dispatch, productsFiltered } = this.props;
        dispatch(productActions._onFilterChange(event, productsFiltered));
    }

    // Handle unlimited scroll
    _handleScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            const { dispatch, itemLimit } = this.props;
            dispatch(productActions._onIncreaseLimit(itemLimit));
        }
    }

    render() {
        const { searchProducts, itemLimit } = this.props;
        const { searchInput } = this.refs;

        let ProductList = <div>AJAX LOADING</div>;
        if (!searchProducts.length && searchInput) {
            if (searchInput.value) ProductList = <div>NO results</div>
        }

        if (searchProducts.length) {
            ProductList = <ArticleList searchProducts={searchProducts} itemLimit={itemLimit}/>;
        }

        // Render the main dashboard after data has been loaded
        return (
            <div class="container">
                <div class="form-group">
                  <label class="control-label" for="inputLarge">Search Product</label>
                  <input class="form-control input-lg" type="text" id="searchInput" ref="searchInput" onChange={this._onFilterChange.bind(this)} placeholder="What product would you like to search for?" />
                </div>
                <h2>Product list goes here</h2>
                { ProductList }
            </div>
        );
    }
}
