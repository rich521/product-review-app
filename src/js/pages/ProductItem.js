import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { unixC } from "../actions/productActions";
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
        if (!productsAll.length) return <img class="gif" src="/img/ajax-loader.gif" alt="Loading!"/>;

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
		                    	<h3>#{item.id}</h3>
		                    	<h2>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h2>
		                    	<div>Email: <a href={"mailto:" + item.email}>{item.email}</a></div>
		                    	<div>Items Bought: {item.hasBought}</div>
		                    </div>
	                    	<div class="content">
	                    		<h3>{item.title}</h3>
	                    		<Rating rating={item.rating} />
	                    		<div class="time">{unixC(item.timestamp)}</div>
	                    		<p>{item.comments}</p>
	                    	</div>
	                    </article>
	                );
	            }})}
	        </div>
        );
    }
}
