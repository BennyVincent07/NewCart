import React from "react";
import {Products} from "../Api";
import Product from "./Product";
import Head from "./head";
class ProductList extends React.Component
{ 
	constructor(props)
	{
		super(props);
		this.state={
			products:Products,
			
			
		}
	} 
     
	
	
	addToCart=(Name)=>
  {console.log(Products);
    let products=this.state.products
	let [searchProduct]=this.state.products.filter(({name})=> name===Name)
	searchProduct.count++;
	this.setState({products});
	this.props.listCount();
  }
	render()
	{
		if(this.props.isSearched)
		{
			if (this.props.isCheckedStock){
				let searchedList=this.state.products.filter(({name,stock})=>(name.toLowerCase()).startsWith(this.props.searchedName.toLowerCase())&&stock);
				return(
					<React.Fragment>
						{searchedList.length!==0 ? <Head><th class="element" >ADD</th></Head>:<p>...NO ITEM..</p>}
						<tbody>
						{searchedList.map((product)=><Product key={product.id} className="inStock" {...product} addToCart={this.addToCart}/>)}
						</tbody>
					</React.Fragment>

				);
			}
			else{
				let searchedList=this.state.products.filter(({name})=>(name.toLowerCase()).startsWith(this.props.searchedName.toLowerCase()));
				return(
					<React.Fragment> 
						{searchedList.length!==0 ? <Head>
							<th class="element" >ADD</th></Head>:<p>...NO ITEM..</p>}
						<tbody>
						{ searchedList.map((product)=>{
							const className=product.stock?"inStock":"outOfStock";
							return(<Product key={product.id} className={className} {...product} addToCart={this.addToCart}/> )})}
						</tbody>

					</React.Fragment>

				);
			}
            
            

		}
		else
		{    
			if(this.props.isCheckedStock)
			{
				let stockList=this.state.products.filter(({stock})=>stock===true);
				return(
					<React.Fragment>
						<Head><th class="element" >ADD</th></Head>
						<tbody>
						{stockList.map((product)=><Product key={product.id} className="inStock" {...product} addToCart={this.addToCart}/>)}
						</tbody>
					</React.Fragment>
				);
			}
			else{
				return(
					<React.Fragment>
						<Head><th class="element" >ADD</th></Head>
						<tbody>
						{this.state.products.map((product)=>{
							const className=product.stock?"inStock":"outOfStock";
							return(<Product key={product.id} className={className} {...product} addToCart={this.addToCart}/> )})}
						</tbody>
					</React.Fragment>

				);
			}
		}
        
        

	}
        

}
export default ProductList;