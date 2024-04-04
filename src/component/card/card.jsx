// Style module import.
import styles from "./card.module.css";

// Import for spinner.
import Spinner from "react-spinner-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartSelector, deleteFromCart, quantityHandle } from "../../redux/reducer/cartReducer/cartThunks";
import { userSelector } from "../../redux/reducer/userReducer/userReducer";


export default function Card({product, cart, index}){

    // Get states from cart Context.
    const { cardLoader} = useSelector(cartSelector);
    const dispatch = useDispatch();
    const {user} = useSelector(userSelector);

    const title = product.title;
    const category  = product.category;
    return <div className={styles.card}>

        {/* Image container */}
        <div className={styles.imgContainer}>
            <img  src={product.image} className={styles.img} alt="poster"/>
        </div>

        {/* Title, the size of title is set to 30 characters */}
        <span className={styles.title}>{title && title.substr(0, 30)}...</span>

        {/* Container for price and Tag. Conditional Rednering is done such that is the card is for cart page, quantity buttons is shown else category is shown */}
        <div className={styles.priceTag}>
            {cart
                // Container for Quantity button, both button calls handleQuantity function onClick.
                ?<div className={styles.countContainer}>
                    <button onClick={()=>dispatch(quantityHandle({product, change: -1, user, index}))} className={`${styles.countBtn} ${styles.minus}`}>&#45;</button>
                    <span className={styles.quantity}>{product.quantity}</span>
                    <button onClick={()=>dispatch(quantityHandle({product, change: 1, user, index}))} className={`${styles.countBtn} ${styles.plus}`}>&#43;</button>
                </div>
                :<span className={styles.tag}>{category[0].toUpperCase() + category.substring(1)}</span>}
            <h4 className={styles.price}>$ {product.price.toFixed(2)}</h4>
        </div>


        {/* On conditional rendering, if cart is true, delete button is shown else add to cart button is shown */}
        {cart
            ?<button 
                onClick={()=>{
                    if(window.confirm("Are you sure you want to delete?")) 
                        dispatch(deleteFromCart({product, user, index}))
                    }} 
                className={styles.removeBtn} type="button">
                {
                cardLoader === product.id
                    ? <Spinner style={{margin: "auto"}} radius={25} color={"#000"} stroke={4} visible={true} />
                    :"Remove From Cart"}
                </button>
            :<button onClick={()=>dispatch(addToCart({user, product}))} className={styles.btn} type="button">
                {cardLoader === product.id
                    ?<Spinner style={{margin: "auto"}} radius={25} color={"#000"} stroke={4} visible={true} />
                    :"Add To Cart"}
            </button>}
    </div>
}

