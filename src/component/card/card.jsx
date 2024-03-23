import { useEffect, useState } from "react";
import {useAuth} from "../../context/authContext";
import { useCart } from "../../context/cartContext";
import styles from "./card.module.css";
import Spinner from "react-spinner-material";


export default function Card({product, cart}){

    const {addToCart, deleteFromCart, handleQuantity, cardLoader} = useCart();
    const {user} = useAuth();

    const title = product.title;
    const category  = product.category
    return <div className={styles.card}>
        <div className={styles.imgContainer}>
            <img  src={product.image} className={styles.img}/>
        </div>
        <span className={styles.title}>{title && title.substr(0, 30)}...</span>
        <div className={styles.priceTag}>
            {cart
                ?<div className={styles.countContainer}>
                    <button onClick={()=>handleQuantity(product, -1)} className={`${styles.countBtn} ${styles.minus}`}>&#45;</button>
                    <span className={styles.quantity}>{product.quantity}</span>
                    <button onClick={()=>handleQuantity(product, +1)} className={`${styles.countBtn} ${styles.plus}`}>&#43;</button>
                </div>
                :<span className={styles.tag}>{category[0].toUpperCase() + category.substring(1)}</span>}
            <h4 className={styles.price}>$ {product.price}</h4>
        </div>
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

