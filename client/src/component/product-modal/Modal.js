import React, { Component } from "react";

import './styles/Modal.css';

class Modal extends Component {

    renderAttributes() {
        const { productDetails,
            handleAttributCapacity,
            handleAttributColor,
            handleAttributSize,
            handleAttributWithUSB,
            pickedColor,
            pickedCapacity,
            pickedSize,
            pickedWithUsb,
            handleAttributWithTouchID,
            pickedWithTouchID } = this.props;
        return (
            <div className="modal-body">
            {productDetails.attributes.map((attr,i) => (
            <div className="attributes">
                <h6>{attr.name + ":"}</h6>
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
              <li key={i} onClick={ () => handleAttributSize(items.displayValue, i)} className={`atributes ${pickedSize.id === i && pickedSize.size === items.displayValue ? "black-bg" : ""}`} >
              {!isNaN(items.displayValue) ? items.displayValue : items.displayValue.charAt(0)}
              </li>
            </div> 
            : 
            attr.name === "Capacity" ? 
            <div className='attr-container' key={i}> 
              <li key={i}  onClick={ () => handleAttributCapacity(items.displayValue, i)} className={`atributes ${pickedCapacity.id === i && pickedCapacity.capacity === items.displayValue ? "black-bg" : ""}`} >
              {items.displayValue}
              </li>
            </div>
            :
            attr.name === "With USB 3 ports" ? 
            <div className='attr-container' key={i}>
              <li key={i} onClick={ () => handleAttributWithUSB(items.displayValue, i) } className={`atributes ${pickedWithUsb.id === i && pickedWithUsb.usb === items.displayValue ? "black-bg" : ""}`}>
              {items.displayValue}
              </li>
            </div>
            : 
            attr.name === "Touch ID in keyboard" ? 
            <div className='attr-container' key={i}>
              <li key={i} onClick={ () => handleAttributWithTouchID(items.displayValue, i)} className={`atributes ${pickedWithTouchID.id === i && pickedWithTouchID.withTouchID === items.displayValue ? "black-bg" : ""}`}>
              {items.displayValue}
              </li>
            </div>
            : ""

          ))}
                </div>
            ))}
        </div>
        )
    }
    render() {
        const { productDetails,
                handleOpenCloseModal,
                openCloseModal,
                selectedProduct,
                addAllOptions
             } = this.props;
        return (
            <div>
                <div className="modal-overlay" onClick={() => handleOpenCloseModal(openCloseModal)}>

                </div>
                <div className="modal-con">
                    <div className="modal-header">
                        <span className="close-btn" onClick={() => handleOpenCloseModal(openCloseModal)}><i className="fas fa-times"></i></span>
                        <h5>please select required option for: </h5>
                        <h3>{productDetails.name}</h3>
                    </div>
                    {this.renderAttributes()}
                    <div className="modal-footer">
                        <button  onClick={ () => selectedProduct(productDetails)}>Add To Cart</button>
                        <div className="options-warning">
                            {addAllOptions ? <h3>please provide all options!</h3> : ""}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;