import { React, Component } from 'react';


import './styles/Cart.css';


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      imageArray: [],
      currentImage: 0
    }
  }
  componentDidMount() {
    const { selectedProduct } = this.props;
    this.setState({cart: selectedProduct})

  } 
  //increment or decrement product quantity
  //@param index int
  //@param operator string
  handleQuantity(index , opperator){
    const { selectedProduct, onDelete } = this.props
    var mainArray = selectedProduct;

      if(opperator === "increment") {
        mainArray[index].qty += 1;
      }
      if(opperator === "decrement") {
        if(mainArray[index].qty >= 1)
        mainArray[index].qty -= 1;
      }
      if(mainArray[index].qty === 0) {
        mainArray.splice(index, 1);
      }
    
      this.setState({addedProducts: mainArray});
  }

  //move gallery image right and left
  //@param index int
  //@param leftOrRight string
  setCurrentImage(index , leftOrRight) {
    var productArray = this.state.cart;

    if(productArray[index].gallery.length > productArray[index].curImage && leftOrRight === "right") {

        productArray[index].curImage += 1
        if(productArray[index].curImage === productArray[index].gallery.length) {
          productArray[index].curImage = 0;
        }
    }
    else if(productArray[index].gallery.length >= productArray[index].curImage && leftOrRight === "left") {

      if(productArray[index].curImage === 0) {
        productArray[index].curImage = productArray[index].gallery.length-1
      }
      productArray[index].curImage -= 1
  }
    else productArray[index].curImage = 0;
    
    this.setState({cart: productArray})
  }
  
  //render Cart information
  //return div
  renderCart() {
    const { currency,
            onDelete } = this.props;
    const { cart } = this.state;

    return (
      cart.map((products, index) => (
        
        <div key={index} className='cart'>
        <div className='cart-titles'>
          <h1>{products.name}</h1>
          <h2>{products.brand}</h2>
          <h3><span>{currency}</span> {products.prices.map((cur, r) => (
                  currency === cur.currency.symbol ? cur.amount : ""
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
                        {attr.name === "With USB 3 ports" && products.usb !== "" ? <li className="attributes"> {products.usb}</li> : "" }
                        {attr.name === "Touch ID in keyboard" && products.touchID !== "" ? <li className="attributes"> {products.touchID}</li> : "" }
                    </div>
                  ))
                  }
            </div>
          </div>
          </div>
          </div>
        <div className='cart-imgs'>
          <div className='cart-counters'>
            <button className='btn-hover' onClick={()=> this.handleQuantity(index, "increment")}>+</button>
            <p> {products.qty}</p>
            <button className='btn-hover' onClick={()=> this.handleQuantity(index, "decrement")}>-</button>
          </div>

          <div>
            <div className='image-container'>
              <div className='arrows-container'>
                <span className='left-slider slider' onClick={ () => this.setCurrentImage(index, "left")}>
                  <i className="fas fa-angle-left"></i>
                </span>
                <span className='right-slider slider' onClick={ () => this.setCurrentImage(index, "right")}>
                <i className="fas fa-angle-right" ></i>
                </span>
              </div>
              <img alt='' src={products.gallery[products.curImage]}></img>

            </div>
          </div>
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