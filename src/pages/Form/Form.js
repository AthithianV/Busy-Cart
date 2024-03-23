import { Link } from "react-router-dom";
import styles from "./Form.module.css";
import { useRef } from "react";
import { useAuth } from "../../context/authContext";
import Spinner from "react-spinner-material";

export default function SignIn({ forSignIn }) {
  const { isLogin, isLoading, setName, setEmail, setPassword, handleSubmit } =
    useAuth();

  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Sign In</h1>

      {!forSignIn ? (
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={styles.input}
          placeholder="Name"
          type="text"
          required
        />
      ) : null}

      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className={styles.input}
        placeholder="Email"
        type="email"
        required
      />

      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className={styles.input}
        placeholder="Password"
        type="password"
        required
      />

      <button
        className={styles.btn}
        onClick={(e) => handleSubmit(e, forSignIn)}
        type="submit"
      >
        {isLoading ? (
          <Spinner style={{margin: "auto"}} radius={30} color={"#fff"} stroke={4} visible={true} />
        ) : forSignIn ? (
          "Sign In"
        ) : (
          "Sign Up"
        )}
      </button>

      <div className={styles.redirect}>
        <span>
          {forSignIn ? "Do not have account? " : "Already Have Account? "}
        </span>
        <Link className={styles.link} to="/sign-up">
          {!forSignIn ? "Sign In" : "Sign Up"}
        </Link>
      </div>
    </form>
  );
}
