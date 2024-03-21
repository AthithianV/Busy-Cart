import { useState } from "react"
import styles from "./filter.module.css"
import { useProduct } from "../../context/ProductContext"

export default function Filter(){

    const {price, handlePrice, handleCategory} = useProduct();

    return <form className={styles.filter}>

            <div className={styles.price}>
                <h3 className={styles.title}>Filter</h3>
                <input className={styles.priceInput} type="number" value={price} onChange={(e)=>{handlePrice(e.target.value)}}/>            
            </div>

            <div className={styles.catContainer}>
                <h3 className={styles.title}>Categories</h3>
                <div className={styles.categories}>
                    
                    <div className={styles.catItem}>
                        <input className={styles.checkBox} onChange={()=>handleCategory("men's clothing")}  type="checkbox" name="mensclothing" id="mensclothing"/>
                        <label htmlFor="mensclothing">Men's Clothing</label>
                    </div>
                    <div className={styles.catItem}>
                        <input className={styles.checkBox} onChange={()=>handleCategory("women's clothing")} type="checkbox" name="womensclothing" id="womensclothing"/>
                        <label htmlFor="womensclothing">Women's Clothing</label>
                    </div>
                    <div className={styles.catItem}>
                        <input className={styles.checkBox} onChange={()=>handleCategory("jewelery")} type="checkbox" name="jewelery" id="jewelery"/>
                        <label htmlFor="jewelery">Jewelery</label>
                    </div>
                    <div className={styles.catItem}>
                        <input className={styles.checkBox} onChange={()=>handleCategory("electronics")} type="checkbox" name="electronics" id="electronics"/>
                        <label htmlFor="electronics">Electronics</label>
                    </div>
                </div>
            </div>
        </form>
}