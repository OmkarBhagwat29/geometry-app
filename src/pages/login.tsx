import React, { FC, FormEvent, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { useAppContext } from "../../core/app-context";
import { User } from "../../models/user";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loginSuccess, setLoginSuccess] = useState(false);

  const [, dispatch] = useAppContext();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      {
        const user = new User(token);

        if (user.tokenExpired) {
          return;
        }

        setLoginSuccess(true);

        dispatch({ type: "LOGIN", payload: { token } });
      }
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const api_url = "http://localhost:3000/api/auth/login";

    try {
      const res = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("invalid credentials");

        return;
      }

      const data = await res.json();

      dispatch({ type: "LOGIN", payload: { token: data.token } });

      setLoginSuccess(true);

      localStorage.setItem("token", data.token);
    } catch (error) {
      setError(error as string);
    }
  };

  if (loginSuccess) {
    return <Navigate to={"/cad"} />;
  }

  if (error !== "") {
    return (
      <>
        <p>Invalid Crendentials</p>
      </>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-3 ml-3">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            className="border-2 border-black ml-2"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            className="border-2 border-black ml-2 mt-2"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className="border-2 border-black pl-8 pr-8 pt-2 pb-2 mt-4"
        >
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
};

export default Login;
