import { useDispatch, useSelector } from "react-redux";
import { useOrder } from "../../context/orderContext";
import styles from "./order.module.css"
import { getOrders, orderSelector } from "../../redux/reducer/orderReducer/orderReducer";
import { useEffect } from "react";
import { userSelector } from "../../redux/reducer/userReducer/userReducer";
import { LineWave } from "react-loader-spinner";

export default function Order(){

    const {orders, orderLoader} = useSelector(orderSelector);
    const {user} = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(user){
            dispatch(getOrders({user}));
        }
    }, [dispatch, user]);

    return (


            <main className={styles.main}>
                {orderLoader
                ?<div className={styles.loader}>
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
            :orders.length==0
                ?<h1 className={styles.empty}>No orders Found!</h1>
                :<>
                    <h1>Your Orders</h1>
                    {orders.map((ord, i)=>{
                        const currentOrder = Object.keys(ord)[0];
                        return <div key={i}>
                        <h3 className={styles.title}>Ordered On: {ord[currentOrder].date}</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th className={`${styles.header} ${styles.name}`}>Title</th>
                                        <th className={styles.header}>Price</th>
                                        <th className={styles.header}>Quantity</th>
                                        <th className={`${styles.header} ${styles.topRight}`}>Total Price</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                    {ord[currentOrder].products.map((product, index)=>{
                                        return <tr key={index}>               
                                            <td className={styles.data}>{product.title.substring(0,25)}...</td>
                                            <td className={styles.data}>${product.price}</td>
                                            <td className={styles.data}>{product.quantity}</td>
                                            <td className={styles.data}>${product.totalPrice}</td>
                                        </tr>
                                    })}
                                    <tr>
                                        <td className={`${styles.bottomLeft} ${styles.data}`} ></td>
                                        <td className={styles.data} ></td>
                                        <td className={styles.data} ></td>
                                        <td className={`${styles.totalPrice} ${styles.data}`} >${ord[currentOrder].totalPrice.toFixed(2)}</td>
                                    </tr>
                                    
                                </tbody>

                            </table>
                        </div>
                    })}
                    
                </>
            }
        </main>
    );
} 