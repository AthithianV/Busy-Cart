import { NavLink, Outlet } from "react-router-dom";
import styles from "./NavBar.module.css"
import { useAuth } from "../../context/authContext";

export default function Nav(){

    const {isLogin} = useAuth();
    return (
        <>
        {/* Navigation bar */}
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <ul className={styles.navList}>

                        {/* Logo  - on click redirect to home page*/}
                        <NavLink to="/" className={styles.navBrand}>
                            <img className={styles.logoicon} src="https://cdn-icons-png.flaticon.com/128/2430/2430422.png" alt="logo"/>
                            <span className={styles.logo}>BusyBuy</span>
                        </NavLink>

                        {/* Icon and Link for home - on click redirect to home page */}
                        
                    </ul>
                </div>
                <div className={styles.right}>
                    <ul className={styles.navList}>
                        <NavLink to="/" className={styles.navItem} style={({isActive})=>isActive?{color: "blue"}: null}>
                                <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/128/1946/1946436.png" alt="Home icon"/>
                                <span className={styles.navTitle}>Home</span>
                        </NavLink>
                        {/* If logged in cart and order is shown in the nav bar */}
                        {isLogin
                            ?<><NavLink to="/orders" className={styles.navItem} style={({isActive})=>isActive?{color: "blue"}: null}>
                                <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/128/726/726568.png" alt="Orders icon"/>
                                <span className={styles.navTitle}>My Orders</span>
                            </NavLink>
                            <NavLink to="/cart" className={styles.navItem} style={({isActive})=>isActive?{color: "blue"}: null}>
                                    <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png" alt="Cart icon"/>
                                    <span className={styles.navTitle}>My Cart</span>
                            </NavLink>
                            </>
                            :<></>
                            }
                        {/* Icon and Link for Auth - on click redirect to Sign page*/}
                            <NavLink to={isLogin?"/sign-in":"/sign-out"} className={styles.navItem} style={({isActive})=>isActive?{color: "blue"}: null}>
                                <img className={styles.icon} 
                                src={!isLogin?"https://cdn-icons-png.flaticon.com/128/25/25245.png":"https://cdn-icons-png.flaticon.com/128/9297/9297112.png"} 
                                alt="sign out icon"/>
                                <span className={styles.navTitle}>{!isLogin?"Sign in":"Sign out"}</span>
                            </NavLink>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
}