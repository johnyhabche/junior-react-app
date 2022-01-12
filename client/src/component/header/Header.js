import { React, Component } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { NavLink } from "react-router-dom";
import NavbarData from './NavbarData';

import './styles/Header.css';
import './styles/Actions.css';
import './styles/Logo.css';
import './styles/Navigation.css';

const client = new ApolloClient({
    uri:'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  })
  
  
  const currency = client.query({
    query: gql`
    {
      currencies {
        label
        symbol
      }
      }
    `
  })

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currencies: [],
          selectedOption: "",
    
        }
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.changeQuery = this.changeQuery.bind(this);
      }
      componentDidMount() {
        currency
        .then(res => this.setState({currencies: res.data.currencies}))
    
      }
      //send category type to app.js 
      changeQuery(categoryType) {
        this.props.onChangeCategory(categoryType)
        this.props.setProductDetail()
      }
      //handel currency celected option and send it to app.js
      handleCurrencyChange(e){
        this.props.onChangeCurrency(e.target.value)
        this.setState({selectedOption: e.target.value })
      }
      openCloseCard(bool){
        this.setState({openClose: !bool})
        this.props.openClose(!bool)
      }
      
    render() {
        const Navbar = NavbarData.map(({title, url},index) => (
            <li key={index}>
                <NavLink onClick={ () => this.props.setLink(url)} to={url}>{title}</NavLink>
            </li>
        ))
        const currencyData = this.state.currencies.map((t,i) => (

            <option 
              key={i}
              value={t.symbol}
              className='currency-option'
            >{t.symbol} {t.label}</option >
    
        ))
      return (
        <div className='header'>
            <div className='navigation'>
                {Navbar}
            </div>

            <div className='logo'>
                <NavLink to={"/"}>
                   <img alt='logo' src='./a-logo.png' />
                </NavLink>
            </div>

            <div className='actions'>
            <select onChange={this.handleCurrencyChange}>
              {currencyData}
            </select>

                <li className='shopping-cart' onClick={() => this.openCloseCard(this.state.openClose)}>

                  <i value={this.props.productCount} className="fas fa-shopping-cart"></i>
                  
                </li>
            </div>

        </div>
      ) 
    }
  }

  export default Header;