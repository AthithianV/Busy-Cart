// import for style
import styles from "./Cart.module.css"

// Cart compoent
import Card from "../../component/card/card"
import { useNavigate } from "react-router-dom";
import Spinner from "react-spinner-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userSelector } from "../../redux/reducer/userReducer/userReducer";
import { getCart, purchase, cartSelector } from "../../redux/reducer/cartReducer/cartThunks";
import { LineWave } from "react-loader-spinner";

export default function Cart(){

    const {cart, totalPrice, purchaseLoader, cartLoader} = useSelector(cartSelector);
    const {user} = useSelector(userSelector);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCart(user));
    }, [dispatch, user]);


    return (
        <main className={styles.main}>
            {/* if cart length is 0, cart is empty message is shown, else cart items are shown. */}
            {cartLoader?
                <div className={styles.loader}>
                <LineWave
                visible={true}
                height="300"
                width="300"
                color="purple"
                ariaLabel="line-wave-loading"
                wrapperStyle={{}}
                wrapperClass=""
                firstLineColor=""
                middleLineColor=""
                lastLineColor=""
                />
            </div>
            :cart.length===0
                ?<h1 className={styles.empty}>You cart is Empty</h1>
                :<>
                    <div className={styles.header}>
                        <h3>Items: {cart.length}</h3>
                        <h3>Total Price: $ {totalPrice.toFixed(2)}</h3>
                        <button className={styles.btn} onClick={()=>{dispatch(purchase({user})) ; navigate("/orders")}}>
                            {purchaseLoader?<Spinner style={{margin: "auto"}} radius={30} color={"#000"} stroke={4} visible={true} />:"Purchase"}
                        </button>
                    </div>
                    <div className={styles.cartItems}>
                        {cart.map((p, index)=><Card product={p} key={index} cart={true} index={index}/>)}
                    </div>
                </>
            }
        </main>
    );
} 