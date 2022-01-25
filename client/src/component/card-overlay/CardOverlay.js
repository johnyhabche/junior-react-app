import { React, Component } from 'react';

import './styles/CardOverlay.css';
import { NavLink } from 'react-router-dom';

class CardOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardOption: false,
      addedProducts: [],
    }
  }
  handleQuantity(index , opperator, price){

    const { toCart, setTotal } = this.props;
    var mainArray = toCart;
    // var totalArray = total;

    if(opperator === "increment") {
      mainArray[index].qty += 1;
      // totalArray.push(price);
      // this.setState({total: totalArray})

    }
    if(opperator === "decrement") {
      
      if(mainArray[index].qty > 1) {
          mainArray[index].qty -= 1;

      }

    }
    else mainArray[index].qty -= 0;
    let finalTotal = 0;
    toCart.map((product,i) => {
      finalTotal += product.prices[0].amount * product.qty;
      setTotal(Math.round(finalTotal * 100) / 100);
      return("");
    })
    this.setState({addedProducts: mainArray});
    }
    
  //calculate card items Total Price  
  // calcTotal(cart) {
  //   const { total } = this.props;
  //   console.log(cart)
    // cart.map((product, index) => {
    //   console.log(product)
    // })
    // let finalTotal;
    // finalTotal = total.reduce((res, i) => Math.round((res +  i) * 100) / 100 ) 
    // return(
    //   finalTotal
    // )
  // }

  //render cardOverlay Items
  renderItems() {
    const { toCart,
            currency } = this.props;
            
    return (
      toCart.length !== 0 ?
        toCart.map((item, index) => (
          
            <div key={index} className='card'>
              <div>
                  <p>{item.name}</p>
                  <p>{item.brand}</p>
                  <p><span>{currency} </span>{item.prices.map((cur, r) => (
                    currency === cur.currency.symbol ? (Math.round((cur.amount) * 100) / 100) : ""
                  ))}</p>
                  <div className='size-btn-container'>
                      {item.size === "" ? "" : isNaN(item.size) && item.size != null ? <button className="card-btn size-btn"> {item.size.charAt(0)}</button> : item.size !== "" ? <button className="card-btn size-btn"> {item.size}</button> : "" }
                      {item.color === "" ? "" : item.color !== "" ? <button className={`card-btn size-btn ${item.color}`}></button> : "" }
                      {item.capacity === "" ? "" : item.capacity !== "" ? <button className="card-btn size-btn"> {item.capacity}</button> : "" }
                  </div>
              </div>
                  <div className='card-con'>
                  <div className='plus-btn'>
                      <button  className='card-btn' onClick={ () => this.handleQuantity(index, "increment", item.prices[0].amount, item.qty)} >+</button>
                      <span>{ item.qty }</span>
                      <button className='card-btn' onClick={ () => this.handleQuantity(index, "decrement", item.price)}>-</button>
                  </div>
                      <img alt='' src={item.gallery[0]} />
                  </div>
        </div>
      
    ))
      : <div className='empty-card'><p> Nothing here yet ! </p></div>
    )
  }

    render() {

      const { closeCard,
              toCart,
              total
            } = this.props;

      return (
          <div className='card-container'>
            <div onClick={() => closeCard(false)} className='card-overlay'>

            </div>

            <div className='fadein cover-overlay'>
                <div className='card-header'>
                    <p>My Bag. <span className='cart-qty'>{toCart.length} items</span></p>
                </div>
                <div className='items-container'>
                  {this.renderItems()}
                </div>
                <div className='card-footer'>
                  <div className='total-container'>
                    <p>total :</p>
                    <span>${total}</span>
                  </div>
                  <div className='check-container'>
                      <NavLink to="cart"><button className='transparent'>view bag</button></NavLink>
                      <button className='green-white'>check out</button>
                  </div>
                </div>
             </div>
          </div>
      ) 
    }
  }

  export default CardOverlay;