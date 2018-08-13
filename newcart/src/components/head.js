import React from "react";
export default (props)=>(
    <thead>
        <tr>
            <th class="element">NAME</th>
            <th class="element">PRICE</th>
            <th class="element">COUNT</th>
            {props.children}
        </tr>
    </thead>
);