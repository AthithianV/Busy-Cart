import { Link } from "react-router-dom";
import styles from "./Form.module.css";
import { useRef } from "react";
import { useAuth } from "../../context/authContext";

export default function SignIn({ forSignIn }) {
  const { isLogin, setName, setEmail, setPassword, handleSubmit } = useAuth();

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
        />
      ) : null}

      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className={styles.input}
        placeholder="Email"
        type="email"
      />

      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className={styles.input}
        placeholder="Password"
        type="password"
      />

      <button
        className={styles.btn}
        onClick={(e) => handleSubmit(e, forSignIn)}
        type="submit"
      >
        {forSignIn ? "Sign In" : "Sign Up"}
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
