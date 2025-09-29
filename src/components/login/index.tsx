import { useState } from "react";

import { useNavigate } from "react-router-dom";

import type { KeyboardEvent } from "react";

import "../../index.css";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      submitLogin(email, password);
    }
  };
  const navigate = useNavigate();

  const submitLogin = async (email: string, password: string) => {
    try {
      const res = await fetch(
        "https://api.homologation.cliqdrive.com.br/auth/login/",
        {
          method: "POST",
          headers: {
            Accept: "application/json;version=v1_web",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (res.status === 400) {
        const data = await res.json();
        throw new Error(
          "Por favor, preencha os campos obrigatórios (Email / Password)",
          data.detail
        );
      }

      if (res.status === 401) {
        const data = await res.json();
        throw new Error(data.detail);
      }

      if (!res.ok) {
        throw new Error("Falha no login: " + res.status);
      }

      const data = await res.json();

      localStorage.setItem("refreshToken", data.tokens.refresh);
      localStorage.setItem("accessToken", data.tokens.access);

      navigate("/profile");
      return data;
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <img src="/assets/b2bit_logo.png" className="logo"></img>
        <div className="input-field">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="@gmail.com"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="************"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button onClick={() => submitLogin(email, password)}>Sign In</button>
      </div>
    </div>
  );
};

export default Login;
