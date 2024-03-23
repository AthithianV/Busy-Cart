// Import for hooks
import { useEffect, useState } from "react";
import {useAuth} from "../../context/authContext";

// Import for cartContext
import { useCart } from "../../context/cartContext";

// Style module import.
import styles from "./card.module.css";

// Import for spinner.
import Spinner from "react-spinner-material";


export default function Card({product, cart}){

    // Get states from cart Context.
    const {addToCart, deleteFromCart, handleQuantity, cardLoader} = useCart();

    const title = product.title;
    const category  = product.category;
    return <div className={styles.card}>

        {/* Image container */}
        <div className={styles.imgContainer}>
            <img  src={product.image} className={styles.img}/>
        </div>

        {/* Title, the size of title is set to 30 characters */}
        <span className={styles.title}>{title && title.substr(0, 30)}...</span>

        {/* Container for price and Tag. Conditional Rednering is done such that is the card is for cart page, quantity buttons is shown else category is shown */}
        <div className={styles.priceTag}>
            {cart
                // Container for Quantity button, both button calls handleQuantity function onClick.
                ?<div className={styles.countContainer}>
                    <button onClick={()=>handleQuantity(product, -1)} className={`${styles.countBtn} ${styles.minus}`}>&#45;</button>
                    <span className={styles.quantity}>{product.quantity}</span>
                    <button onClick={()=>handleQuantity(product, +1)} className={`${styles.countBtn} ${styles.plus}`}>&#43;</button>
                </div>
                :<span className={styles.tag}>{category[0].toUpperCase() + category.substring(1)}</span>}
            <h4 className={styles.price}>$ {product.price}</h4>
        </div>


        {/* On conditional rendering, if cart is true, delete button is shown else add to cart button is shown */}
        {cart
            ?<button onClick={()=>deleteFromCart(product)} className={styles.removeBtn} type="button">
                {
                cardLoader === product.id
                    ? <Spinner style={{margin: "auto"}} radius={25} color={"#000"} stroke={4} visible={true} />
                    :"Remove From Cart"}
                </button>
            :<button onClick={()=>addToCart(product)} className={styles.btn} type="button">
                {cardLoader === product.id
                    ?<Spinner style={{margin: "auto"}} radius={25} color={"#000"} stroke={4} visible={true} />
                    :"Add To Cart"}
            </button>}
    </div>
}

