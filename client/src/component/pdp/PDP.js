import { React, PureComponent  } from 'react';

import './styles/PDP.css';


class PDP extends PureComponent {
    
    render() {
        var item = this.props.productDetails;
        const gallery = this.props.productDetails.gallery.map((index,item) => (
            <img alt={index} key={index} src={this.props.productDetails.gallery[item]} />
        ))

      return (
        <div className='pdp-container'>
            <div className='product-gallery'>
            {gallery}
            </div>
            <div className='product-image'>
                <img alt='' src={this.props.productDetails.gallery[0]} />
            </div>
            <div className='card-information'>
                <h1>{this.props.productDetails.name}</h1>
                <h2>{this.props.productDetails.brand}</h2>

                <div className='sizes-container'>
                    {
                        this.props.productDetails.attributes.map((attr, index) => (
                            <div key={index}>
                            <h6>{attr.name + ":"}</h6>
                            <div className='attributes-container'>
                                
                                {attr.items.map((items, i) => (
                                  <div key={i} className='col-container'>
                                    {
                                      attr.name === "Color" ?
                                      <button className={`${items.displayValue} btn-attributes focus-white`} >
                                        
                                      </button> 
                                      : attr.name === "Size" ? 
                                      <button className="btn-attributes focus-white" >
                                      {items.displayValue}
                                      </button> 
                                      : attr.name === "Capacity" ? 
                                      <button className="btn-attributes focus-white " >
                                      {items.displayValue}
                                      </button>
                                      : 
                                      attr.name === "With USB 3 ports" ? 
                                      <button className="btn-attributes focus-white " >
                                      {items.displayValue}
                                      </button>
                                      : 
                                      attr.name === "Touch ID in keyboard" ? 
                                      <button className="btn-attributes focus-white " >
                                      {items.displayValue}
                                      </button>
                                      : ""
                                    }

                                  </div>
                                ))}
                            </div>
                          </div>
                            
                        ))
                    }
                </div>

                <h6> {this.props.currency} {this.props.productDetails.prices.map((cur, index) => (
                  this.props.currency === cur.currency.symbol ? cur.amount : ""
                ))}</h6>
                <div className='add-to-card-container'>
                    <button onClick={ () => this.props.selectedProduct(this.props.productDetails)} className={ this.props.productDetails.inStock === true ? "add-to-card" : "disabled-btn"}>
                        add to cart
                    </button>
                </div>
                <p>
                {(this.props.productDetails.description).replace(/<[^>]+>/g, '')}
                </p>
            </div>
        </div>
      ) 
    }
  }

  export default PDP;