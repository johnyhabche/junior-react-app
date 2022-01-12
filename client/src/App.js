import { React, PureComponent } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Content from "./component/content/Content";
import Header from "./component/header/Header";
import Home from "./component/home/Home";
import PDP from "./component/pdp/PDP";
import CardOverlay from "./component/card-overlay/CardOverlay";
import Cart from './component/cart/Cart';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        currentCurrency: "$",
        productCategory: "/all",
        productDetail: [],
        openClose: false,
        qty: '',
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
  }
  changeCurrency(currency) {
    this.setState({currentCurrency: currency})
  }
  setLink(link) {
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
  addToCart(item) {
    this.setState((prevState) => {
      const newItem = {...item, itemId: this.state.nextProductId, qty: 1};
      return {
        nextProductId: prevState.nextProductId + 1,
        product: [...this.state.product, newItem]
      }
    })
  }
  onDelete(index) {
    var array = this.state.product.slice();
      array.splice(index, 1);
      this.setState({product: array})  

  }
  render() {
    
    return (
      <ApolloProvider client={client}>
      <div className="App"> 
              <Router className="router">
              <Header
                onChangeCurrency = {this.changeCurrency}
                setLink = {this.setLink}
                openClose = {this.openCloseCard}
                productCount = {this.state.product.length}
                />
              {this.state.openClose === true ? <CardOverlay
                closeCard = {this.closeCard}
                toCart = {this.state.product}
                currency = {this.state.currentCurrency}
                  /> : ''}
                <Routes>
                  <Route path="/" exact={true}
                   element= {<Home />}
                  />

                <Route path={this.state.productCategory}
                  element= {<Content cat = {(this.state.productCategory).substring(1)} 
                  productDetail ={this.productDetails}
                  currency = {this.state.currentCurrency} />} 
                    />

                <Route path={this.state.productCategory + "/" + this.state.productDetail.id}  
                  element= {<PDP
                  productDetails = {this.state.productDetail}
                  selectedProduct = {this.addToCart}
                  currency = {this.state.currentCurrency} />} 
                  />

                <Route path="cart"
                  element= {<Cart 
                  selectedProduct = {this.state.product}
                  currency = {this.state.currentCurrency}
                  delete = {this.onDelete}
                  />} 
                  />
                </Routes>
            </Router>
      </div>
      </ApolloProvider>
    );
  }

}

export default App;
