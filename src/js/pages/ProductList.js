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
    constructor() {
        super();
        this.listener = this._handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listener);
    }

    // Handle search input
    _onFilterChange(event) {
        const { dispatch, productsFiltered } = this.props;
        dispatch(productActions._onFilterChange(event, productsFiltered));
    }

    // If scroll doesnt work, for big screen sizes. Button will handle load content
    _handleClick() {
        const { dispatch, itemLimit } = this.props;
        dispatch(productActions._onIncreaseLimit(itemLimit));
    }

    // Handle unlimited scroll
    _handleScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            const { dispatch, itemLimit } = this.props;
            dispatch(productActions._onIncreaseLimit(itemLimit));
        }
    }

    _handleScrollTop() {
        setTimeout(() => {
            document.body.scrollTop = document.body.scrollTop - 150;
            if (document.body.scrollTop == 0) return;
            this._handleScrollTop();
        }, 10);
    }

    render() {
        const { searchProducts, itemLimit } = this.props;
        const prodLen = searchProducts.length;
        const { searchInput } = this.refs;

        let ProductList = <img class="gif" src="/img/ajax-loader.gif" alt="Loading!"/>,
            ShowButton = <button onClick={this._handleClick.bind(this)} class="btn">Show More</button>;
        if (!prodLen && searchInput) {
            if (searchInput.value) {
                ProductList = <div class="no-result">No results found matching "{searchInput.value}"</div>
                ShowButton = <div></div>
            }
        }

        if (itemLimit > prodLen) ShowButton = <div></div>;
        if (prodLen) ProductList = <ArticleList searchProducts={searchProducts} itemLimit={itemLimit}/>;

        // Render the main dashboard after data has been loaded
        return (
            <div class="list-container">
                <div class="topNav">
                    <h1>Review App</h1>
                    <div class="form-group">
                        <input class="input" type="text" id="searchInput" ref="searchInput" onChange={this._onFilterChange.bind(this)} placeholder="What product would you like to search for?" maxLength="25"/>
                    </div>
                </div>
                <div class="anchor-list">showing { (itemLimit > prodLen) ? prodLen : itemLimit } of {prodLen}</div>
                <div class="scroll-btn" onClick={this._handleScrollTop.bind(this)}><span/></div>
                { ProductList }
                <div class="middle">{ ShowButton }</div>
            </div>
        );
    }
}
