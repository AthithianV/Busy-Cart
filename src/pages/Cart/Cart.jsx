// import for style
import styles from "./Cart.module.css"

// custome hook from cart context
import { useCart } from "../../context/cartContext";

// Cart compoent
import Card from "../../component/card/card"
import { useNavigate } from "react-router-dom";
import Spinner from "react-spinner-material";

export default function Cart(){

    const {cart, totalPrice, purchase, purchaseLoad} = useCart();
    const navigate = useNavigate();

    return (
        <main className={styles.main}>
            {/* if cart length is 0, cart is empty message is shown, else cart items are shown. */}
            {
                cart.length==0
                ?<h1 className={styles.empty}>You cart is Empty</h1>
                :<>
                    <div className={styles.header}>
                        <h3>Items: {cart.length}</h3>
                        <h3>Total Price: $ {totalPrice}</h3>
                        <button className={styles.btn} onClick={purchase}>
                            {purchaseLoad?<Spinner style={{margin: "auto"}} radius={30} color={"#000"} stroke={4} visible={true} />:"Purchase"}
                        </button>
                    </div>
                    <div className={styles.cartItems}>
                        {cart.map((p, index)=><Card product={p} key={index} cart={true}/>)}
                    </div>
                </>
            }
        </main>
    );
} 