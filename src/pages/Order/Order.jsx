import { useOrder } from "../../context/orderContext";
import styles from "./order.module.css"

export default function Order(){

    const {order} = useOrder();

    return (
            <main className={styles.main}>
            {
                order.length==0
                ?<h1 className={styles.empty}>No orders Found!</h1>
                :<>
                    <h1>Your Orders</h1>
                    {order.map((ord, i)=>{
                        const [o] = Object.entries(ord);
                        const [key, cart] = o;
                        return <div key={i}>
                        <h3 className={styles.title}>Ordered On: {cart.date}</h3>
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
                                    {cart.products.map((product, index)=>{
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
                                        <td className={`${styles.totalPrice} ${styles.data}`} >${cart.totalPrice}</td>
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