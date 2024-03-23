import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage(){
    const navigate = useNavigate();

    useEffect(()=>{
        setInterval(()=>{
            navigate("/");
        }, 3000);
    }, [])

    return (
        <main>
            <h1>Oops, Something Went Wrong!!!</h1>
        </main>
    );
} 