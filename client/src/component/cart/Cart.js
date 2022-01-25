import { React, Component } from 'react';


import './styles/Cart.css';


class Cart extends Component {

  //increment or decrement product quantity
  //@param index int
  //@param operator string
  handleQuantity(index , opperator){
    const { selectedProduct } = this.props
    var mainArray = selectedProduct;

      if(opperator === "increment") {
        mainArray[index].qty += 1;
      }
      if(opperator === "decrement") {
        if(mainArray[index].qty >= 1)
        mainArray[index].qty -= 1;
      }
      else mainArray[index].qty -= 0;
    
      this.setState({addedProducts: mainArray});
  }
  
  //render Cart information
  //return div
  renderCart() {
    const { selectedProduct,
            currency,
            Ondelete } = this.props;

    return (
      selectedProduct.map((products, index) => (
        
        <div key={index} className='cart'>
        <div className='cart-titles'>
          <h1>{products.name}</h1>
          <h2>{products.brand}</h2>
          <h3><span>{currency}</span> {products.prices.map((cur, r) => (
                  currency === cur.currency.symbol ? (Math.round((cur.amount * products.qty) * 100) / 100) : ""
                ))}
          </h3>

          <div className='sizes-btn'>
          <div className='attributes-container'>
            <div className='attributes-list'>
                {
                  products.attributes.map((attr, i) => (
                    <div className='pd' key={i}>
                      <h6>{attr.name + ":"} </h6>         
                        {attr.name === "Size" && !isNaN(products.size) ? <li className="attributes"> {products.size}</li> : isNaN(products.size) ?  <li className="attributes"> {products.size.charAt(0)}</li> : "" }
                        {attr.name === "Color" && products.color !== "" ? <li className={`attributes ${products.color}`}></li> : "" }
                        {attr.name === "Capacity" && products.capacity !== "" ? <li className="attributes"> {products.capacity}</li> : "" }
                    </div>
                  ))
                  }
            </div>
          </div>
          </div>
          </div>
        <div className='cart-imgs'>
          <div className='cart-counters'>
            <button className='btn-hover' onClick={()=>this.handleQuantity(index, "increment")}>+</button>
            <p> {products.qty}</p>
            <button className='btn-hover' onClick={()=>this.handleQuantity(index, "decrement")}>-</button>
          </div>
          <img alt='' src={products.gallery[0]}></img>
            <button className='remove-item' onClick={()=> Ondelete(index)}>-</button> 
        </div>
  </div>
      ))
      
    )
  }
    render() {

      return (

        <div className='cart-container'>
          <div className='heading-container'>
          <h1>CART</h1>
          </div>
          {this.renderCart()}
        </div>
      ) 
    }
  }

  export default Cart;