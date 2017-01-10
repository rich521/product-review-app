import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { _unixC } from "../actions/productActions";
import Rating from "../components/Rating";

@connect((store) => {
    return {
        productsAll: store.products.productsAll
    };
})

export default class ProductItem extends React.Component {
    render() {
        const { params, productsAll } = this.props;
        let name = params.id;
        if (!productsAll.length) return <img class="gif" src="/img/ajax-loader.gif" alt="Loading!"/>;

        return (
            <div class="item-container">
                <div class="topNav">
                	<Link to="/" class="btn">← Back</Link>
	                <h2>"{params.id}" Reviews</h2>
            	</div>
	            {productsAll.map((item, i) => {
	            	if (name === item.productName) {
	            	// if (name === item.productName.replace(/-/g, ".")) {
	                return (
	                    <article key={i} class="article">
		                    <div class="side-bar">
		                    	<h3>#{item.id}</h3>
		                    	<h2>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h2>
		                    	<div>Email: <a href={"mailto:" + item.email}>{item.email}</a></div>
		                    	<div>Items Bought: {item.hasBought}</div>
		                    </div>
	                    	<div class="content">
	                    		<h3>{item.title}</h3>
	                    		<Rating rating={item.rating} />
	                    		<div class="time">{_unixC(item.timestamp)}</div>
	                    		<p>{item.comments}</p>
	                    	</div>
	                    </article>
	                );
	            }})}
	        </div>
        );
    }
}
