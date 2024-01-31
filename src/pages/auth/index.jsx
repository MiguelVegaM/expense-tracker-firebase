import { useState } from "react";
import { auth } from "../../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthDetails } from "./authDetails";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import "./styles.css";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const authInfo = {
          email: userCredential.user.email,
          userID: userCredential.user.uid,
          isAuth: true,
        };
        console.log(authInfo);
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/expense-tracker");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="auth">
      <form onSubmit={singIn}>
        <p>Entrar</p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Entrar</button>
      </form>
      <AuthDetails />
    </div>
  );
};
