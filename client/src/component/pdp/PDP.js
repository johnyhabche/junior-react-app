import { React, PureComponent  } from 'react';

import './styles/PDP.css';


class PDP extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        gallery: [],
        topImg: "",
        pickedColor: false,
      }
      
    }

    componentDidMount() {
     this.setState({product: this.props.productDetails})
     this.setState({gallery: this.props.productDetails.gallery});
     this.setState({topImg: this.props.productDetails.gallery[0]})
    }

    //set picked product image to primary picture
    handleImagePick(imageLink) {
      this.setState({topImg: imageLink})
      
    }
    
    //render product gallery
    renderGallery() {
      const { gallery } = this.state;
      return ( gallery.map((item, index) => (

        <img className='top-img' onClick={ () => this.handleImagePick(item)} alt="" key={index} src={item} />
      )  
    ))
    }

    renderAtrributes() {

      const {
        handleAttributCapacity,
        handleAttributColor,
        handleAttributSize,
        handleAttributWithUSB,
        productDetails,
        pickedColor,
        pickedCapacity,
        pickedSize,
        pickedWithUsb,
        handleAttributWithTouchID,
        pickedWithTouchID
      } = this.props

      return (
        productDetails.attributes.map((attr, index) => (
              <div key={index}>
              <h6>{attr.name + ":"}</h6>
              <div className='attributes-container'>
                  
                    <div  className='attributes-list'>
                    {attr.items.map((items, i) => (
                        
                        attr.name === "Color" ?
              
                        <div className='attr-container' key={i}>
                          <li key={i} onClick={ () => handleAttributColor(items.displayValue, i)} className={`${items.displayValue} attributess`} >

                          </li>
                          {pickedColor.id === i && pickedColor.color === items.displayValue ?<p className='picked-attr'>{items.displayValue}</p> : ""}
                        </div>
                        : 
                        attr.name === "Size" ? 
                        <div className='attr-container' key={i}>
                          <li key={i} onClick={ () => handleAttributSize(items.displayValue, i)} className="attributes" >
                          {items.displayValue}
                          </li>
                          {pickedSize.id === i && pickedSize.size === items.displayValue ?<p className='picked-attr dashed'>_</p> : ""}
                        </div> 
                        : 
                        attr.name === "Capacity" ? 
                        <div className='attr-container' key={i}> 
                          <li key={i}  onClick={ () => handleAttributCapacity(items.displayValue, i)} className="attributes" >
                          {items.displayValue}
                          </li>
                          {pickedCapacity.id === i && pickedCapacity.capacity === items.displayValue ?<p className='picked-attr dashed'>_</p> : ""}
                        </div>
                        :
                        attr.name === "With USB 3 ports" ? 
                        <div className='attr-container' key={i}>
                          <li key={i} className="attributes" onClick={ () => handleAttributWithUSB(items.displayValue, i) } >
                          {items.displayValue}
                          </li>
                          {pickedWithUsb.id === i && pickedWithUsb.usb === items.displayValue ?<p className='picked-attr dashed'>_</p> : ""}
                        </div>
                        : 
                        attr.name === "Touch ID in keyboard" ? 
                        <div className='attr-container' key={i}>
                          <li key={i} className="attributes" onClick={ () => handleAttributWithTouchID(items.displayValue, i) } >
                          {items.displayValue}
                          </li>
                          {pickedWithTouchID.id === i && pickedWithTouchID.withTouchID === items.displayValue ?<p className='picked-attr dashed'>_</p> : ""}
                        </div>
                        : ""

                      ))}
                    </div>
              </div>
            </div>
              
          ))
      )
    }

    render() {

      const { 
        currency,
        notAvailable,
        productDetails,
        selectedProduct} = this.props 

      const { topImg } = this.state 

      return (
        <div className='pdp-container'>
            <div className='product-gallery'>

            {this.renderGallery()}

            </div>
            <div className='product-image'>
                <img alt='' src={topImg} />
            </div>
            <div className='card-information'>
                <h1>{productDetails.name}</h1>
                <h2>{productDetails.brand}</h2>

                <div className='sizes-container'>

                {this.renderAtrributes()}
                
                </div>

                <h6> {currency} {productDetails.prices.map((cur, index) => (
                  currency === cur.currency.symbol ? cur.amount : ""
                ))}
                </h6>
                <div className='add-to-card-container'>
                    <button onClick={ () => selectedProduct(productDetails)} className={ productDetails.inStock === true ? "add-to-card" : "disabled-btn" }>
                        add to cart
                    </button>
                    <div className='not-avai;able-item'>
                      {notAvailable === true ? <h6> item not available! </h6> : "" }
                    </div>
                </div>
                <p className='product-des'>
                {(productDetails.description).replace(/<[^>]+>/g, '')}
                </p>
            </div>
        </div>
      ) 
    }
  }

  export default PDP;