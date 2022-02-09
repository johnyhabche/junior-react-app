import { React, Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Fetch_CURRENCY_QUERY, Fetch_CATEGORIES_LINKS_QUERY }  from '../../queries/Queries';

import './styles/Header.css';
import './styles/Actions.css';
import './styles/Logo.css';
import './styles/Navigation.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
          links: [],
          currencies: [],
          selectedOption: "",
    
        }

        this.changeQuery = this.changeQuery.bind(this);
      }

      //Get currency and Category Query
      componentDidMount() {
        Fetch_CURRENCY_QUERY
        .then(res => this.setState({currencies: res.data.currencies}));

        Fetch_CATEGORIES_LINKS_QUERY
        .then(res => this.setState({links: res.data.categories}));

      }
      
      //send category type to app.js 
      //@param categoryType String
      changeQuery(categoryType) {
        const { onChangeCategory,
                setProductDetail } = this.props;
        onChangeCategory(categoryType)
        setProductDetail()
      }

      //Close and Open card layout
      //@param boolean
      openCloseCard(bool){
        const { openClose } = this.props
        this.setState({openClose: !bool})
        openClose(!bool)
      }

      //Render Category Navigation
      renderNavbar() {
        const { setLink } = this.props
        return (this.state.links.map((title,index) => (
          <li key={index}>
              <NavLink onClick={ () => setLink(title.name)} to={title.name}>{title.name}</NavLink>
          </li>)
      ))
      }

      //generate current currency
      currencyData() {
        const { onChangeCurrency } = this.props
        return (
          this.state.currencies.map((t,i) => (
              
            <li
              key={i}
              onClick={ () => onChangeCurrency(t.symbol)}
              className='currency-option'
            >{t.symbol} {t.label}</li >
    
        ))
        )
      }

      // handleCurrencyCon(bool) {
      //   this.setState({openCloseCurrency: !bool})
      // }
      
    render() {

      const {
        currency,
        productCount,
        handleCurrencyCon,
        openCloseCurrency
      } = this.props

      const {
        openClose,
      } = this.state
      
      return (
        <div className='header'>
            <div className='navigation'>
                {this.renderNavbar()}
            </div>

            <div className='logo'>
                <NavLink to={"/"}>
                   <img alt='logo' src='./a-logo.png' />
                </NavLink>
            </div>

            <div className='actions'>

            <button onClick={ () => handleCurrencyCon(openCloseCurrency)} className='currency-switcher-btn'>
              {currency}
              <span>{ openCloseCurrency === true ? <i className="fas fa-arrow-down"></i> :  <i className="fas fa-arrow-up"></i> }</span>
            </button>

            <div className="currency-container">
              {
                openCloseCurrency === true ? 

                <div className='currency-switcher'>
                  {this.currencyData()}
                </div> : ""
              }
            </div>

                <div className='shopping-cart' onClick={() => this.openCloseCard(openClose)}>

                  <i value={productCount} className="fas fa-shopping-cart"></i>
                  
                </div>
            </div>

        </div>
      ) 
    }
  }

  export default Header;