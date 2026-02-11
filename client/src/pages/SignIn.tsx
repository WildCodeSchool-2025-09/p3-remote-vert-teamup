import { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router";

type Auth = {
  user: User;
  token: string;
};

function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { setAuth } = useOutletContext() as {
    setAuth: (auth: Auth | null) => void;
  };

  async function login() {
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

      navigate("/");
    } else {
      console.error(response);
    }
  }

  return (
    <form onSubmit={login}>
      <div>
        <label htmlFor="email">email</label>{" "}
        <input ref={emailRef} type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">password</label>{" "}
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default SignIn;
