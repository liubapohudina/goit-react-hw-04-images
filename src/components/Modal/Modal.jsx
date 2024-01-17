import styles from './modal.module.css';
import PropTypes from "prop-types";
import React, { useEffect } from 'react';


export const Modal = ({ arrayItem, closeModal }) => {
  const pathToLargeImage = arrayItem.src.large;
  const alt = arrayItem.src.alt;
  
  const handleClick = (event) => {
    const currentClickItem = event.target.nodeName;
    if (currentClickItem === "DIV") {
      closeModal()        
    }
  
}

  useEffect(() => {
    const handleClickElement = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
    document.addEventListener("keydown", handleClickElement);

    return () => document.removeEventListener("keydown", handleClickElement);
  }, [closeModal])
    

         return (
            <div className={styles.overlay} onClick={handleClick}>
                <div className={styles.modal}>
                    modal
                    <img src={pathToLargeImage} alt={alt} />
                </div>
            </div>
        )
}

Modal.propTypes = {
  arrayItem: PropTypes.object.isRequired,
 closeModal: PropTypes.func.isRequired, 
}