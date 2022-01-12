import { React, PureComponent  } from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import './styles/Content.css';
import { NavLink } from 'react-router-dom';
// import PDP from '../pdp/PDP';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


const categories = client.query({
  query: gql`
  {
    category {
      name
      products {
        id
        name
        inStock
        brand
        description
        gallery
        category
        attributes {
          name
          items {
            displayValue
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
  
    }
  }
  `
})
class Content extends PureComponent {
      constructor(props) {
        super(props);
        this.state = {
          product: [],
        }
      }
      componentDidMount() {
        categories
        .then(res => this.setState({product: res.data.category.products}))

      } 
      
    render() {

        const product = this.state.product.map((t,i) => (
           
                this.props.cat === t.category ?
            <div key={i} onClick={ () => this.props.productDetail(t)}  className={t.inStock ? 'product' : 'product-not-instock'}>
                          <NavLink key={i} to={t.id}>
              <div className={t.inStock ? '' : 'overlay'}></div>

              <img alt={t.id} src={t.gallery[0]} />
              <p className='product-title'>{t.name}</p>
              <div className='price-currency-con'>
                <p className='product-price'>{t.prices.map((cur, index) => (
                  this.props.currency === cur.currency.symbol ? cur.currency.symbol : ""
                ))}</p>
                <p className='product-price'>{t.prices.map((cur, index) => (
                  this.props.currency === cur.currency.symbol ? cur.amount : ""
                ))}</p>
              </div>
              </NavLink>
            </div>
               : this.props.cat === "all" ?
              
               <div key={i} onClick={ () => this.props.productDetail(t)} className={t.inStock ? 'product' : 'product-not-instock'}>
                  <NavLink key={i} to={t.id}>
               <div className={t.inStock ? '' : 'overlay'}></div>
               <img alt={t.id} src={t.gallery[0]} />
               <p className='product-title'>{t.name}</p>
               <div className='price-currency-con'>
               <p className='product-price'>{t.prices.map((cur, index) => (
                  this.props.currency === cur.currency.symbol ? cur.currency.symbol : ""
                ))}</p>
                <p className='product-price'>{t.prices.map((cur, index) => (
                  this.props.currency === cur.currency.symbol ? cur.amount : ""
                ))}</p>
               </div>
               </NavLink>
             </div>
                : ""
                
        ))
      return (
        <div className='content'>
          <div className='title-container'>
            <h1>{this.props.cat}</h1>
          </div>
            <div className='product-container'>
                {product}
            </div>
        </div>
      ) 
    }
  }

  export default Content;