import { useState } from "react"
import styles from "./filter.module.css"
import { useProduct } from "../../context/ProductContext"

export default function Filter(){

    const {price, handlePrice} = useProduct();

    return <form className={styles.filter}>

            <div className={styles.price}>
                <h3 className={styles.title}>Filter</h3>
                <label>Price: {price}</label>
                <input type="range" min="1" max="100000" step="10" value={price} onChange={(e)=>{handlePrice(e.target.value)}}/>            
            </div>

            <div className={styles.catContainer}>
                <h3 className={styles.title}>Categories</h3>
                <div className={styles.categories}>
                    
                    <div className={styles.catItem}>
                        <input className={styles.checkBox}  type="checkbox" name="mensclothing" id="mensclothing"/>
                        <label htmlFor="mensclothing">Men's Clothing</label>
                    </div>
                    <div className={styles.catItem}>
                        <input className={styles.checkBox} type="checkbox" name="womensclothing" id="womensclothing"/>
                        <label htmlFor="womensclothing">Women's Clothing</label>
                    </div>
                    <div className={styles.catItem}>
                        <input className={styles.checkBox} type="checkbox" name="jewelery" id="jewelery"/>
                        <label htmlFor="jewelery">Jewelery</label>
                    </div>
                    <div className={styles.catItem}>
                        <input className={styles.checkBox} type="checkbox" name="electronics" id="electronics"/>
                        <label htmlFor="electronics">Electronics</label>
                    </div>
                </div>
            </div>
        </form>
}