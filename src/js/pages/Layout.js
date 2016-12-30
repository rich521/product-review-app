import React from "react";
import { IndexLink, Link } from "react-router";
// import TopNav from "../components/Nav";
// import Footer from "../components/Footer";

export default class Layout extends React.Component {
    render() {
        // const { pathname } = this.props.location;
        return (
            // TopNav - Navbar, header, menu
            <div class="wrapper">
                <h1>Product Review App</h1>
                {this.props.children}
            </div>
        );
    }
}
