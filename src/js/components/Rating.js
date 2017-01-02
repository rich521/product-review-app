import React from "react";

export default (props) => {
    return (
		<div class="stars">
            {[...Array(5)].map((a, j) => {
                return <span key={j} class={(props.rating > j) ? "star-gold":"star-grey"}>✪</span>;
            })}
            <span class="rating">{props.rating}.0</span>
    	</div>
    );

}
