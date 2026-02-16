import { useRef } from "react";
import { Link, useNavigate } from "react-router";
import "../styles/SignIn.css";
import { useAuth } from "../context/AuthContext";

function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { setAuth } = useAuth() as {
    setAuth: (auth: Auth | null) => void;
  };

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: (emailRef.current as HTMLInputElement).value,
        password: (passwordRef.current as HTMLInputElement).value,
      }),
    });

    if (response.status === 200) {
      const user = await response.json();

      setAuth(user);

      navigate(-1);
    } else {
      console.error(response);
    }
  }

  return (
    <>
      <div className="signin-container">
        <h1>Connexion</h1>
        <form onSubmit={(e) => login(e)} className="signin-form">
          <div>
            <label htmlFor="email">Email</label>{" "}
            <input ref={emailRef} type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>{" "}
            <input type="password" id="password" ref={passwordRef} />
          </div>
          <button className="send-btn" type="submit">
            Connecter
          </button>
        </form>
        <p className="link-to">
          Si vous n'êtes pas inscrit : <Link to="/sign-up">Cliquez ici !</Link>
        </p>
      </div>
    </>
  );
}

export default SignIn;
