import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage(){
    const navigate = useNavigate();

    // If router error occures and error, page is shown, it is redirected to home within 3 seconds.
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