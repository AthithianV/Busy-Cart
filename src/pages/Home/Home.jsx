import Filter from "../../component/filter/filter";
import Search from "../../component/serachBar/Search";
import styles from "./home.module.css"
import stlyes from "./home.module.css"
import { useProduct } from "../../context/ProductContext";
import Card from "../../component/card/card";
import { LineWave } from 'react-loader-spinner'

export default function Home(){

    const {products, page, setPage, isLoading} = useProduct();

    return (

        <main className={stlyes.main}>
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
            <Search />
            <Filter />
            <div className={styles.container}>
                {products.map((product, index)=><Card key={index} product={product} cart={false}/>)}
            </div>
            {/* <div className={styles.btnContainer}>
                <button onClick={()=>{setPage(page-1)}} className={styles.btn}>{"<<"}</button>
                <span className={styles.page}>{page+1}</span>
                <button onClick={()=>{setPage(page+1)}} className={styles.btn}>{">>"}</button>
            </div> */}</>}
        </main>
    );
} 