import Filter from "../../component/filter/filter";
import Search from "../../component/serachBar/Search";
import styles from "./home.module.css"
import stlyes from "./home.module.css"
import { useProduct } from "../../context/ProductContext";
import Card from "../../component/card/card";

export default function Home(){

    const {products, page, setPage} = useProduct();

    return (
        <main className={stlyes.main}>
            <Search />
            <Filter />
            <div className={styles.container}>
                {products.map((product, index)=><Card key={index} product={product}/>)}
            </div>
            {/* <div className={styles.btnContainer}>
                <button onClick={()=>{setPage(page-1)}} className={styles.btn}>{"<<"}</button>
                <span className={styles.page}>{page+1}</span>
                <button onClick={()=>{setPage(page+1)}} className={styles.btn}>{">>"}</button>
            </div> */}
        </main>
    );
} 