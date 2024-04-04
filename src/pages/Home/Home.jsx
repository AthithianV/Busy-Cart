import Filter from "../../component/filter/filter";
import styles from "./home.module.css"
import stlyes from "./home.module.css"
import Card from "../../component/card/card";
import { LineWave } from 'react-loader-spinner'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts, getProductsWithFilter, productSelector } from "../../redux/reducer/productReducer/productReducer";

export default function Home(){

    const {products, isLoading, price, categories} = useSelector(productSelector);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProductsWithFilter({categories, price}));
    }, [dispatch, price, categories]);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (

        <main className={stlyes.main}>
            <Filter />
            {isLoading?
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
            :
            <>
            {/* <Search /> */}
            <div className={styles.container}>
                {products.map((product, index)=><Card key={index} product={product} cart={false}/>)}
            </div>
            </>}
        </main>
    );
} 