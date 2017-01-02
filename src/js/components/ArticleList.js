import React from "react";
import { Link } from "react-router";

export default (props) => {
    let limitTo = props.itemLimit;

    return (
        <div>
            {props.searchProducts.map((item, i) => {
                if (i < limitTo) {
                return (
                    <article key={i}>
                        <h3><Link to={`/product/${item.productName}`}>{item.productName}</Link></h3>
                        <p>{item.rating}</p>
                    </article>
                );
            }})}
        </div>
    );
}
