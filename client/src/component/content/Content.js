import { React, PureComponent  } from 'react';
import { Fetch_PRODUCTS_QUERY } from '../../queries/Queries'

import './styles/Content.css';
import { NavLink } from 'react-router-dom';
// import PDP from '../pdp/PDP';

class Content extends PureComponent {
      constructor(props) {
        super(props);
        this.state = {
          product: [],
        }
      }

      componentDidMount() {
        Fetch_PRODUCTS_QUERY
        .then(res => this.setState({product: res.data.category.products}))

      } 
      //Render Products detail by category type
      renderProducts() {

        const { cat,
                productDetail,
                currency} = this.props;

        const { product } = this.state;

        return (

          product.map((t,i) => (
           
            cat === t.category ?
                <NavLink className='product-link' key={i} to={t.id} onClick={ () => productDetail(t)} >
                  <div key={i} className={t.inStock ? 'product' : 'product-not-instock'}>
                    <div className={t.inStock ? '' : 'overlay'}></div>
    
                    <img alt={t.id} src={t.gallery[0]} />
                    <p className='product-title'>{t.name}</p>
                    <div className='price-currency-con'>
                      <p className='product-price'>{t.prices.map((cur, index) => (
                        currency === cur.currency.symbol ? cur.currency.symbol : ""
                      ))}</p>
                      <p className='product-price'>{t.prices.map((cur, index) => (
                        currency === cur.currency.symbol ? cur.amount : ""
                      ))}</p>
                    </div>
                  </div>
                </NavLink>
            : cat === "all" ?
                <NavLink className='product-link' key={i} to={t.id} onClick={ () => productDetail(t)}>
                    <div key={i} className={t.inStock ? 'product' : 'product-not-instock'}>
                    <div className={t.inStock ? '' : 'overlay'}></div>
                    <img alt={t.id} src={t.gallery[0]} />
                    <p className='product-title'>{t.name}</p>
                    <div className='price-currency-con'>
                    <p className='product-price'>{t.prices.map((cur, index) => (
                        currency === cur.currency.symbol ? cur.currency.symbol : ""
                      ))}</p>
                      <p className='product-price'>{t.prices.map((cur, index) => (
                        currency === cur.currency.symbol ? cur.amount : ""
                      ))}</p>
                    </div>
                  </div>
                </NavLink>
                      : ""
                    
            ))
        )
      }
      
    render() {

      const { cat, } = this.props

      return (
        <div className='content'>
          <div className='title-container'>
            <h1>{cat}</h1>
          </div>
            <div className='product-container'>
                {this.renderProducts()}
            </div>
        </div>
      ) 
    }
  }

  export default Content;