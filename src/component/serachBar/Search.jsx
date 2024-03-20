import styles from "./Search.module.css"

export default function Search(){

    return (
        <div className={styles.search}>
            <input className={styles.searchInput}  type="text" placeholder="Search By name"/>
            <button className={styles.searchBtn} type="submit">Search</button>
        </div>
    )   
}