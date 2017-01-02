import React from "react";
// import { IndexLink, Link } from "react-router";
import { connect } from "react-redux";

// import TopContainer from "../components/TopContainer";
// import TopNav from "../components/Nav";
// import Footer from "../components/Footer";

import * as productActions from "../actions/productActions";

@connect((store) => {
    return {
        productsAll: store.products.productsAll
    };
})

export default class Layout extends React.Component {
    componentWillMount() {
        this.props.dispatch(productActions.fetchProducts());
    }

    render() {
        // const { pathname } = this.props.location;
        return (
            // TopNav - Navbar, header, menu
            <div class="wrapper">
                {this.props.children}
            </div>
        );
    }
}
