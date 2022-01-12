import { React, Component } from 'react';


import './styles/Cart.css';


class Cart extends Component {
  constructor(props) {
    super(props);
    }
  handleQuantity(index , opperator){

    var mainArray=this.props.selectedProduct;
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
    

    render() {

      const cart = this.props.selectedProduct.map((products, index) => (
        
        <div key={index} className='cart'>
        <div className='cart-titles'>
          <h1>{products.name}</h1>
          <h2>{products.brand}</h2>
          <h3><span>{this.props.currency}</span> {products.prices.map((cur, r) => (
          
                  this.props.currency === cur.currency.symbol ? (Math.round((cur.amount * products.qty) * 100) / 100) : ""
                ))}
          </h3>

          <div className='sizes-btn'>

          {
                        products.attributes.map((attr, i) => (
                          <div className='pd' key={i}>
                            <h6>{attr.name + ":"}</h6>
                            <div className='attributes-container'>
                                
                                {attr.items.map((items, i) => (
                                  <div key={i} className='col-container'>
                                    {
                                      attr.name === "Color" ?
                                      <button className={`${items.displayValue} btn-attributes focus-white`} >
                                        
                                      </button> 
                                      : attr.name === "Size" ? 
                                      <button className="btn-attributes focus-white" >
                                      {items.displayValue}
                                      </button> 
                                      : attr.name === "Capacity" ? 
                                      <button className="btn-attributes focus-white" >
                                      {items.displayValue}
                                      </button>
                                      : 
                                      attr.name === "With USB 3 ports" ? 
                                      <button className="btn-attributes focus-white " >
                                      {items.displayValue}
                                      </button>
                                      : 
                                      attr.name === "Touch ID in keyboard" ? 
                                      <button className="btn-attributes focus-white " >
                                      {items.displayValue}
                                      </button>
                                      : ""
                                    }

                                  </div>
                                ))}
                            </div>
                          </div>
                            
                        ))
                    }
          </div>
          </div>
        <div className='cart-imgs'>
          <div className='cart-counters'>
            <button className='btn-hover' onClick={()=>this.handleQuantity(index, "increment")}>+</button>
            <p> {products.qty}</p>
            <button className='btn-hover' onClick={()=>this.handleQuantity(index, "decrement")}>-</button>
          </div>
          <img alt='' src={products.gallery[0]}></img>
            <button className='remove-item' onClick={()=> this.props.delete(index)}>Delete</button> 
        </div>
  </div>
      ))
      return (

        <div className='cart-container'>
          <div className='heading-container'>
          <h1>CART</h1>
          </div>
          {cart}
        </div>
      ) 
    }
  }

  export default Cart;