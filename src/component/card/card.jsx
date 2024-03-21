import styles from "./card.module.css";

export default function Card({product}){

    
    const title = product.title;
    const category  = product.category
    return <div className={styles.card}>
        <div className={styles.imgContainer}>
            <img  src={product.image} className={styles.img}/>
        </div>
        <span className={styles.title}>{title && title.substr(0, 30)}...</span>
        <div className={styles.priceTag}>
            <h4 className={styles.price}>&#8377; {product.price}</h4>
            <span className={styles.tag}>{category[0].toUpperCase() + category.substring(1)}</span>
        </div>
        <button className={styles.btn} type="button">Add To Cart</button>
    </div>
}