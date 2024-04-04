// imports for styles
import styles from "./filter.module.css"
import { useDispatch } from "react-redux";
import { actions } from "../../redux/reducer/productReducer/productReducer";

export default function Filter(){

    // Destructiong the state from product context.
    const dispatch = useDispatch();

    return <form onSubmit={(e)=>e.preventDefault()} className={styles.filter}>

            {/* A container to filter element by price */}
            <div className={styles.price}>
                <h3 className={styles.title}>Filter</h3>
                <input 
                    className={styles.priceInput} 
                    type="number"
                    placeholder="Price"
                    onChange={(e)=>{setTimeout(()=>{dispatch(actions.setPrice(e.target.value))}, 500)}}/>            
            </div>

            {/* A container to filet element by categories. */}
            <div className={styles.catContainer}>
                <h3 className={styles.title}>Categories</h3>
                <div className={styles.categories}>
                    
                    {/* Currently categories are hard coded but that can be made dynamic by making state for category and adding it to context. */}
                    <div className={styles.catItem}>
                        <input className={styles.checkBox} onChange={()=>dispatch(actions.setCategory("men's clothing"))}  type="checkbox" name="mensclothing" id="mensclothing"/>
                        <label htmlFor="mensclothing">Men's Clothing</label>
                    </div>
                    <div className={styles.catItem}>
                        <input className={styles.checkBox} onChange={()=>dispatch(actions.setCategory("women's clothing"))} type="checkbox" name="womensclothing" id="womensclothing"/>
                        <label htmlFor="womensclothing">Women's Clothing</label>
                    </div>
                    <div className={styles.catItem}>
                        <input className={styles.checkBox} onChange={()=>dispatch(actions.setCategory("jewelery"))} type="checkbox" name="jewelery" id="jewelery"/>
                        <label htmlFor="jewelery">Jewelery</label>
                    </div>
                    <div className={styles.catItem}>
                        <input className={styles.checkBox} onChange={()=>dispatch(actions.setCategory("electronics"))} type="checkbox" name="electronics" id="electronics"/>
                        <label htmlFor="electronics">Electronics</label>
                    </div>
                </div>
            </div>
        </form>
}