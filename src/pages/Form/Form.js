import { Link, useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import Spinner from "react-spinner-material";
import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  signUp,
  userSelector,
} from "../../redux/reducer/userReducer/userReducer";
import { useEffect, useState } from "react";

export default function SignIn({ forSignIn }) {
  // Local State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State from redux
  const { user, isLoading } = useSelector(userSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (forSignIn) {
      dispatch(signIn({ email, password }));
    } else {
      dispatch(signUp({ name, email, password }));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [dispatch, user, navigate]);

  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Sign In</h1>

      {/* if forSignin is true input field for name is showm */}
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
        onClick={(e) => handleSubmit(e)}
        type="submit"
      >
        {isLoading ? (
          <Spinner
            style={{ margin: "auto" }}
            radius={30}
            color={"#000"}
            stroke={4}
            visible={true}
          />
        ) : forSignIn ? (
          "Sign In"
        ) : (
          "Sign Up"
        )}
      </button>

      {/* link for redirecting user from sign in to sign up and vice versa */}
      <div className={styles.redirect}>
        <span>
          {forSignIn ? "Do not have account? " : "Already Have Account? "}
        </span>
        <Link className={styles.link} to={forSignIn ? "/sign-up" : "/sign-in"}>
          {!forSignIn ? "Sign In" : "Sign Up"}
        </Link>
      </div>
    </form>
  );
}
