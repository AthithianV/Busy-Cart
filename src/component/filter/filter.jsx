import { useState } from "react"
import styles from "./filter.module.css"

export default function Filter(){

    const {price, setPrice} = useState(50000);

    return <form>
            <label>Price: {price}</label>
            <input type="range" min="1" max="100000" step="10" onChange={(e)=>setPrice(e.current.value)}/>
            <div>
                <div>
                    <input type="checkout" name="mensclothing" id="mensclothing"/>
                    <label for="mensclothing">Men's Clothing</label>
                </div>
                <div>
                    <input type="checkout" name="womensclothing" id="womensclothing"/>
                    <label for="womensclothing">Women's Clothing</label>
                </div>
                <div>
                    <input type="checkout" name="jewelery" id="jewelery"/>
                    <label for="jewelery">Jewelery</label>
                </div>
                <div>
                    <input type="checkout" name="electronics" id="electronics"/>
                    <label for="electronics">Electronics</label>
                </div>
                
            </div>
        </form>
}