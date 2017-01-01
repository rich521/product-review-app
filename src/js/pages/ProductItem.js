import React from "react";
import { connect } from "react-redux";
import { fetchItem } from "../actions/productActions";

@connect((store) => {
    return {
        productsAll: store.products.productsAll,
        productReviews: store.products.productReviews
    };
})

export default class ProductItem extends React.Component {
    componentDidMount() {
        const { dispatch, params, productsAll } = this.props;
        dispatch(fetchItem(params.id, productsAll));
    }

    render() {
        const { productReviews } = this.props;

        if (productReviews.length) {
            return (
	            <div>
		            <h1>ProductItem</h1>
		            {productReviews.map((item, i) => {
		                return (
		                    <article key={item.id}>
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
		            })}
		        </div>
            );
        } else {
        	return <div>AJAX LOADING</div>;
        }

    }
}
