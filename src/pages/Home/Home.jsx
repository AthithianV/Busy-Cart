import Filter from "../../component/filter/filter";
import Search from "../../component/serachBar/Search";
import styles from "./home.module.css"
import { useContext, useEffect, useState } from "react";
import {getDocs} from "firebase/firestore";


export default function Home(){

    return (
        <main className="main">
            <Search />
            <Filter />
        </main>
    );
} 