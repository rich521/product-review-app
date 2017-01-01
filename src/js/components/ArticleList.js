import React from "react";
import { Link } from "react-router";

export default (products) => {
    const limitTo = 10;
    return (
        <div>
            {products.searchProducts.map((item, i) => {
                if (i < limitTo) {
                return (
                    <article key={item.id}>
                        <h3><Link to={`/product/${item.id}`}>{item.productName}</Link></h3>
                        <p>{item.rating}</p>
                    </article>
                );
            }})}
        </div>
    );
}
