import styles from "./card.module.css";

export default function Card({product}){

    
    const t = product.title;
    return <div className={styles.card}>
        <div className={styles.imgContainer}>
            <img  src={product.image} className={styles.img}/>
        </div>
        <span className={styles.title}>{t && t.substr(0, 30)}...</span>
        <h4 className={styles.price}>&#8377; {product.price}</h4>
        <button className={styles.btn} type="button">Add To Cart</button>
    </div>
}