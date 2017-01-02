import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { fetchItem } from "../actions/productActions";
import Rating from "../components/Rating";

@connect((store) => {
    return {
        productsAll: store.products.productsAll
    };
})

export default class ProductItem extends React.Component {
    render() {
        const { params, productsAll } = this.props;
        // Fixes the dot bug
        let name = params.id.replace(/-/g, ".");
        if (!productsAll.length) return <div>AJAX LOADING</div>;

        return (
            <div class="item-container">
                <div class="topNav">
                	<Link to="/" class="btn">← Back</Link>
	                <h2>"{name}" Reviews</h2>
            	</div>
	            {productsAll.map((item, i) => {
	            	if (name === item.productName) {
	                return (
	                    <article key={i} class="article">
		                    <div class="side-bar">
		                    	<div>#{item.id}</div>
		                    	<h2>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h2>
		                    	<a href={"mailto:" + item.email}>{item.email}</a>
		                    	<div>Items Bought: {item.hasBought}</div>
		                    </div>
	                    	<div class="content">
	                    		<h3>{item.title}</h3>
	                    		<Rating rating={item.rating} />
	                    		<div>{item.timestamp}</div>
	                    		<p>{item.comments}</p>
	                    	</div>
	                    </article>
	                );
	            }})}
	        </div>
        );
    }
}
