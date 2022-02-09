import { React, Component } from 'react';

import './styles/CardOverlay.css';
import { NavLink } from 'react-router-dom';

class CardOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardOption: false,
      addedProducts: [],
      cardTotal: "",
    }
  }
  handleQuantity(index , opperator, price){

    const { toCart, setTotal, currency, onDelete } = this.props;
    var mainArray = toCart;
    // var totalArray = total;
    
    if(opperator === "increment") {
      mainArray[index].qty += 1;
      // totalArray.push(price);
      // this.setState({total: totalArray})

    }
    if(opperator === "decrement") {
      
      if(mainArray[index].qty > 0) {
          mainArray[index].qty -= 1;
      }
      if(mainArray[index].qty === 0) {
        onDelete(index);
      }

    }
    else mainArray[index].qty -= 0;
    //calculate Total
    let finalTotal = 0;
    toCart.map((product, i) => {product.prices.map((prices, i)=> {
      if(currency === prices.currency.symbol) {
        finalTotal += prices.amount * product.qty;
        setTotal(Math.round(finalTotal * 100) / 100);
        return("");
      }
    })})
    this.setState({addedProducts: mainArray});
    }

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
                    {
                    item.attributes.map((attr,i) => (
                      <div key={i}>
                              {
                                attr.name === "Size" ?
                                <div className='attr-container'>
                                    {attr.items.map((items, i) => (

                                        <li key={i} className={`${items.displayValue === item.size ? "selected card-btn size-btn" : "card-btn size-btn"}`}>
                                            {!isNaN(items.displayValue)  ? items.displayValue :  items.displayValue.charAt(0)}
                                        </li>))

                                    } 
                                  </div>
                                : ""
                              }
                              {
                                attr.name === "Capacity" ?
                                <div className='attr-container'>
                                    {attr.items.map((items, i) => (

                                        <li key={i} className={`${items.displayValue === item.capacity ? "selected card-btn size-btn" : "card-btn size-btn"}`}>
                                            {items.displayValue}
                                        </li>))

                                    } 
                                  </div>
                                : ""
                              }
                              {
                                attr.name === "Touch ID in keyboard" ?
                                <div className='attr-container'>
                                    {attr.items.map((items, i) => (

                                        <li key={i} className={`${items.displayValue === item.touchID ? "selected card-btn size-btn" : "card-btn size-btn"}`}>
                                            {items.displayValue}
                                        </li>))

                                    } 
                                  </div>
                                : ""
                              }
                              {
                                attr.name === "With USB 3 ports" ?
                                <div className='attr-container'>
                                    {attr.items.map((items, i) => (

                                        <li key={i} className={`${items.displayValue === item.usb ? "selected card-btn size-btn" : "card-btn size-btn"}`}>
                                            {items.displayValue}
                                        </li>))

                                    } 
                                  </div>
                                : ""
                              }
                              {
                                attr.name === "Color" ?
                                <div className='attr-container'>
                                    {attr.items.map((items, i) => (

                                        <li key={i} className={`${items.displayValue === item.color ? "selected card-btn size-btn" : `${items.displayValue} card-btn size-btn`}`}>

                                        </li>))

                                    } 
                                  </div>
                                : ""
                              }
                                            
                        </div>

                    ))
                    }
                    
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
              total,
              currency
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
                    <span>{currency } {total}</span>
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