import React, { Component } from 'react';
import './App.css';
import Input from "./components/input";
import  ProductList from "./components/productlist";
import Product from './components/Product';
import {Products} from "./Api";
import Head from './components/head';
import Button from './components/button';
class App extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      isSearched:false,
      isCheckedStock:false,
      searchedName:"",
      currentPage:"PRODUCTS_PAGE",
      products:Products,
      message:0
     }
    
  }

  addToCart=(Name)=>
  { let product=this.state.products
    let [serachItem]=this.state.products.filter(({name})=>name===Name)
    serachItem.count++;
    this.setState({product})
   
  }

  decrementCart=(Name)=>
  {
    let product=this.state.products
    let [serachItem]=this.state.products.filter(({name})=>name===Name)
    serachItem.count--;
    this.listCount();
    this.setState({product})
  }
  
  removeCart=(Name)=>
  {
    let product=this.state.products
    let [serachItem]=this.state.products.filter(({name})=>name===Name)
    serachItem.count=0;    
    this.listCount();
    this.setState({product})
  }

  backToCart =(e) =>
  {
    this.setState({currentPage:"PRODUCTS_PAGE"});
    console.log(this.state.currentPage)
  }
  
  cartChange =(e) =>
  {
    this.setState({currentPage:"CART_PAGE"});
  
  }
  checkboxFunc = (state)=>{
    this.setState({isCheckedStock:state}) 
     
  }
  searchFunc = (state,name) =>
  {
  this.setState({isSearched:state, searchedName:name})
  }
  listCount=()=>
  {
    let list=this.state.products.filter((product)=>product.count!==0)
    this.setState({message:list.length})
  }
  
  
  render() {
    if(this.state.currentPage==="PRODUCTS_PAGE")
    {
            
    return (
      <div>

        <header className="App-header">
          <h1  className="App-title">Welcome to EasySearch</h1>
        </header>

        <div className="App">
          <button className="cart-button" style={{float:"right"}} onClick={this.cartChange.bind(null,this)}>CART({this.state.message})</button>
          <Input searchFunc={this.searchFunc} checkboxFunc={this.checkboxFunc} />
          <table className="productTable">
          <ProductList isSearched={this.state.isSearched} isCheckedStock={this.state.isCheckedStock} searchedName={this.state.searchedName} listCount={this.listCount} />
          </table>
        </div>

      </div>
    );
    }
  else{
    let total=this.state.products.reduce((subTotal, { price, count }) => subTotal + price * count,0.0).toFixed(2)
   
    let cartList=this.state.products.filter((product)=>product.count!==0)
    return (
      <React.Fragment>

        <header className="App-header">
          <h1  className="App-title">Welcome to EasySearch</h1>
        </header>

        <div className="App">
          <button className="back-button" style={{float:"right"}} onClick={this.backToCart.bind(null,this)}>BACK</button>

          {cartList.length ?<table class="productTable">
            <Head>
              <th class="element" >ADD</th>
              <th class="element">DECREMENT</th>
              <th class="element">REMOVE</th>
              <th class="element">SUBTOTAL</th>
            </Head>
            
            {cartList.map( (product) => <Product key={product.id} {...product} addToCart={this.addToCart}>
              <td class="element"><Button message="-" onClick={this.decrementCart.bind(null,product.name)}/></td>
              <td class="element"><Button message="X" onClick={this.removeCart.bind(null,product.name)}/></td>
              <td class="element">{product.price*product.count}</td>
              </Product>
            )}
          </table>:<div className="noitem"></div>}

          {cartList.length!==0 &&
          <p className="total">
           <h4> Total:{total}
           </h4>
            </p>
          }
        </div>
      </React.Fragment>
    );
   }

  }
}

export default App;
