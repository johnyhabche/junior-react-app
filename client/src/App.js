import { React, PureComponent } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Content from "./component/content/Content";
import Header from "./component/header/Header";
import Home from "./component/home/Home";
import PDP from "./component/pdp/PDP";
import CardOverlay from "./component/card-overlay/CardOverlay";
import Cart from './component/cart/Cart';
import Modal from './component/product-modal/Modal'

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      pickedColor: [{id: "", color: ""}],
      pickedCapacity: [{id: "", capacity: ""}],
      pickedSize: [{id: "", size: ""}],
      pickedWithUsb: [{id: "", usb: ""}],
      pickedWithTouchID: [{id: "", withTouchID: ""}],
      currentCurrency: "$",
      productCategory: "all",
      openCloseCurrency: false,
      productDetail: [],
      openClose: false,
      notAvailable: false,
      total:[0],
      openCloseModal: false,
      addAllOptions: false,
      product: [

      ],
      nextProductId: 0,
    }
    
    this.changeCurrency = this.changeCurrency.bind(this);
    this.setLink = this.setLink.bind(this);
    this.productDetails = this.productDetails.bind(this);
    this.openCloseCard = this.openCloseCard.bind(this);
    this.closeCard = this.closeCard.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleAttributColor = this.handleAttributColor.bind(this);
    this.handleAttributSize = this.handleAttributSize.bind(this);
    this.handleAttributCapacity = this.handleAttributCapacity.bind(this);
    this.handleAttributWithUSB = this.handleAttributWithUSB.bind(this);
    this.handleAttributWithTouchID = this.handleAttributWithTouchID.bind(this);
    this.setTotal = this.setTotal.bind(this);
    this.handleCurrencyCon = this.handleCurrencyCon.bind(this);
    this.handleOpenCloseModal = this.handleOpenCloseModal.bind(this);
  }

  handleOpenCloseModal(bool) {
    this.setState({openCloseModal: !bool})
    this.restAttributes();
    this.pleaseAddAllOptions(false)
  }
  handleCurrencyCon(bool) {
    this.setState({openCloseCurrency: !bool})
  }

  changeCurrency(curr) {
    this.setState({currentCurrency: curr})
    this.setState({openCloseCurrency: false})
  }

  setLink(link) {
    this.notAvailableItem(false)
    this.restAttributes();
    this.setState({productCategory: link})
  }

  productDetails(details) {
    this.setState({productDetail: details})
  }

  openCloseCard(bool) {
    this.setState({openClose: !bool})
  }
  closeCard(close) {
    this.setState({openClose: close})
  }
  notAvailableItem(bool) {
    this.setState({notAvailable: bool})
  }
  pleaseAddAllOptions(bool) {
    this.setState({addAllOptions: bool})

  }
  //Add customer product to card
  //param picked item object
  addToCart(item) {
    this.restAttributes();
    const { nextProductId,
            pickedColor,
            pickedSize,
            pickedCapacity,
            product,
            pickedWithUsb,
            pickedWithTouchID,
           } = this.state;

    
    // let addedToTotal = [...total];
    // addedToTotal.push(item.prices[0].amount);
    // let final = addedToTotal.reduce((res, i) => res +  i);
    // this.setState({total: final})
    let finalTotal = []
      
      finalTotal = item.prices[0].amount;
      this.setState({total: finalTotal})


    if(item.inStock === true) {

        this.setState((prevState) => {
          const newItem = {...item,
              itemId: nextProductId, qty: 1,
              color: pickedColor.color,
              size: pickedSize.size,
              capacity: pickedCapacity.capacity,
              usb: pickedWithUsb.usb,
              touchID: pickedWithTouchID.withTouchID,
              curImage: 0
        };
        this.pleaseAddAllOptions(false)
        if( newItem.color && newItem.capacity || newItem.size || newItem.capacity && newItem.usb && newItem.withTouchID) {
          return {
            nextProductId: prevState.nextProductId + 1,
            product: [...product, newItem]
          }
        }else this.pleaseAddAllOptions(true)
        })

    }else this.notAvailableItem(true)

  }
  //reset all attributes
  restAttributes() {
    this.setState({pickedColor: {id: "", color: ""}})
    this.setState({pickedSize: {id: "", size: ""}})
    this.setState({pickedCapacity: {id: "", capacity: ""}})
    this.setState({pickedWithUsb: {id: "", usb: ""}})
    this.setState({pickedWithTouchID: {id: "", touchID: ""}})
  }
  //Delete Item array
  onDelete(index) {
    const { product } = this.state;
    var array = product.slice();
      array.splice(index, 1);
      this.setState({product: array})  

  }
  //Set picked Item Color
  //@param attr string, i int
  handleAttributColor(attr , i) {
    this.setState({pickedColor: { id: i , color: attr}})
  }
  //Set picked Item Size
  //@param attr string, i int
  handleAttributSize(attr, i) {
    this.setState({pickedSize: {id: i, size: attr}})
  }
  //Set picked Item Capacity
  //@param attr string, i int
  handleAttributCapacity(attr, i) {
    this.setState({pickedCapacity: {id: i, capacity: attr}})
  }
  //Set picked Item usb
  //@param attr string, i int
  handleAttributWithUSB(attr, i) {
      this.setState({pickedWithUsb: {id: i, usb: attr}})
    }

  //Set picked Item with touch id
  //@param attr string, i int
  handleAttributWithTouchID(attr, i) {
    this.setState({pickedWithTouchID: {id: i, withTouchID: attr}})
  }
  setTotal(i) {
    this.setState({total: i})
  }

  render() {

    const { product,
            currentCurrency,
            openClose,
            productCategory,
            productDetail,
            notAvailable,
            pickedColor,
            pickedCapacity,
            pickedSize,
            pickedWithTouchID,
            pickedWithUsb,
            total,
            openCloseCurrency,
            openCloseModal,
            addAllOptions
          } = this.state;
    
    return (
      <div className="App"> 
              <Router className="router">
              {openCloseModal === true ? 
              <Modal openCloseModal = {openCloseModal} 
                     handleOpenCloseModal={this.handleOpenCloseModal} 
                     productDetails = {productDetail}
                     handleAttributColor = {this.handleAttributColor}
                     handleAttributSize = {this.handleAttributSize}
                     handleAttributCapacity = {this.handleAttributCapacity}
                     handleAttributWithTouchID = {this.handleAttributWithTouchID}
                     handleAttributWithUSB = {this.handleAttributWithUSB}
                     notAvailable = {notAvailable}
                     pickedColor = {pickedColor}
                     pickedCapacity = {pickedCapacity}
                     pickedSize = {pickedSize}
                     pickedWithTouchID = {pickedWithTouchID}
                     pickedWithUsb = {pickedWithUsb}
                     selectedProduct = {this.addToCart}
                     addAllOptions = {addAllOptions}
                     
              /> : "" }
              <Header
                handleCurrencyCon = {this.handleCurrencyCon}
                openCloseCurrency = {openCloseCurrency}
                onChangeCurrency = {this.changeCurrency}
                setLink = {this.setLink}
                openClose = {this.openCloseCard}
                productCount = {product.length}
                currency = {currentCurrency}
                />
              {openClose === true ? <CardOverlay
                closeCard = {this.closeCard}
                toCart = {product}
                currency = {currentCurrency}
                total = {total}
                setTotal = {this.setTotal}
                onDelete = {this.onDelete}
                  /> : ''}
                <Routes>
                  <Route path="/" exact={true}
                   element= {<Home />}
                  />

                <Route path={productCategory}
                  element= {<Content cat = {productCategory} 
                  productDetail ={this.productDetails}
                  currency = {currentCurrency} 
                  openCloseModal = {openCloseModal}
                  handleOpenCloseModal= {this.handleOpenCloseModal}/>} 
                    />

                <Route path={productCategory + "/" + productDetail.id}  
                  element= {<PDP
                  productDetails = {productDetail}
                  selectedProduct = {this.addToCart}
                  currency = {currentCurrency}
                  handleAttributColor = {this.handleAttributColor}
                  handleAttributSize = {this.handleAttributSize}
                  handleAttributCapacity = {this.handleAttributCapacity}
                  handleAttributWithTouchID = {this.handleAttributWithTouchID}
                  handleAttributWithUSB = {this.handleAttributWithUSB}
                  notAvailable = {notAvailable}
                  pickedColor = {pickedColor}
                  pickedCapacity = {pickedCapacity}
                  pickedSize = {pickedSize}
                  pickedWithTouchID = {pickedWithTouchID}
                  pickedWithUsb = {pickedWithUsb}
                  addAllOptions = {addAllOptions}
                  
                  />} 
                  />

                <Route path="cart"
                  element= {<Cart 
                  selectedProduct = {product}
                  currency = {currentCurrency}
                  />} 
                  />
                </Routes>
            </Router>
      </div>
    );
  }

}

export default App;
