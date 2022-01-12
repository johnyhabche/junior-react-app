import { React, Component } from 'react';

import './styles/CardOverlay.css';
import { NavLink } from 'react-router-dom';

class CardOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardOption: false,
      addedProducts: []
    }
  }
  handleQuantity(index , opperator){

    var mainArray=this.props.toCart;
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

        const items =
        this.props.toCart !== "" ?
          this.props.toCart.map((item, index) => (
            <div key={index} className='card'>
              <div>
                  <p>{item.name}</p>
                  <p>{item.brand}</p>
                  <p><span>{this.props.currency} </span>{item.prices.map((cur, r) => (
                    this.props.currency === cur.currency.symbol ? (Math.round((cur.amount * item.qty) * 100) / 100) : ""
                  ))}</p>
                  <div className='size-btn-container'>
                      <button className='card-btn size-btn'>S</button>
                      <button className='card-btn size-btn'>M</button>
                  </div>
              </div>
              <div className='card-con'>
              <div className='plus-btn'>
                  <button  className='card-btn' onClick={()=>this.handleQuantity(index, "increment")} >+</button>
                  <span>{item.qty }</span>
                  <button className='card-btn' onClick={()=>this.handleQuantity(index, "decrement")}>-</button>
              </div>
                  <img alt='' src={item.gallery[0]} />
              </div>
        </div>
          
        ))
        : "Card empty"
      return (
          <div className='card-container'>
            <div onClick={() => this.props.closeCard(false)} className='card-overlay'>

            </div>

            <div className='fadein cover-overlay'>
                <div className='card-header'>
                    <p>My Bag. <span className='cart-qty'>{this.props.toCart.length}</span> items</p>
                </div>

                {items}

                <div className='check-container'>
                      <NavLink to="cart"><button className='transparent'>view bag</button></NavLink>
                      <button className='green-white'>check out</button>
                </div>
             </div>
             <div>
               <p>Total</p>
             </div>
          </div>
      ) 
    }
  }

  export default CardOverlay;