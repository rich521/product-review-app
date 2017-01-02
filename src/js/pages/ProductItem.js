import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { fetchItem } from "../actions/productActions";

@connect((store) => {
    return {
        productsAll: store.products.productsAll
    };
})

export default class ProductItem extends React.Component {
    render() {
        const { params, productsAll } = this.props;
        if (!productsAll.length) return <div>AJAX LOADING</div>;

        return (
            <div>
	            <h1>ProductItem</h1>
	            <h2><Link to="/">Back</Link></h2>
	            {productsAll.map((item, i) => {
	            	if (params.id === item.productName) {
	                return (
	                    <article key={i}>
	                    	<ul>
	                    		<li>{item.id}</li>
	                    		<li>{item.name}</li>
	                    		<li>{item.email}</li>
	                    		<li>{item.hasBought}</li>
	                    		<li>{item.rating}/5</li>
	                    		<li>{item.timestamp}</li>
	                    		<li>{item.title}</li>
	                    		<li>{item.comments}</li>
	                    	</ul>
	                    </article>
	                );
	            }})}
	        </div>
        );
    }
}
