import React from "react";
import Button from "./button";
export default (props)=>(   
        <tr className={props.className}>
					
            <td class="element">{props.name}</td>
            <td class="element">{props.price}</td>
            <td class="element">{props.count}</td>
            {(props.stock)&&<td class="element"><Button onClick={props.addToCart.bind(null,props.name)} message="+"/></td>}
            {!(props.stock)&&<td >outofstock</td>}
            	     {props.children}
        </tr>
);