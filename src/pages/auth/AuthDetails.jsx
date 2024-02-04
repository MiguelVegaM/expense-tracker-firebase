import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSingOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sing Out successful");
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>Sing In as {authUser.email}</p>
          <button onClick={userSingOut}>Sing Out</button>
        </>
      ) : (
        <h2>Sing Out</h2>
      )}
    </div>
  );
};
