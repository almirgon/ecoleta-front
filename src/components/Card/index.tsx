import React from 'react'
import styles from "./Card.module.css";


const Card = ({item, onClick}) => {
  return (
    <div onClick={onClick} className={styles.cardItem}>
      <div>
        <h3>{item.name}</h3>
        <p>{item.email}</p>
        <p>{item.whatsapp}</p>
      </div>
      <div>
        <p>{item.city} - {item.uf}</p>
      </div>
    </div>
  )
}

export default Card