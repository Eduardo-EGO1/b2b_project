import "./Profile.css";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  {
    console.log(name, email, avatar);
  }
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await fetch(
        "https://api.homologation.cliqdrive.com.br/auth/profile/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Accept: "application/json;version=v1_web",
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Falha ao obter informações do usuário" + res.status);
      }

      const data = await res.json();

      setName(data.name);
      setEmail(data.email);
      setAvatar(data.avatar.low);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const Logout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");

    navigate("/login");
  };

  return (
    <div>
      <header>
        <button onClick={() => Logout()}>Logout</button>
      </header>
      <div className="data-container">
        <div className="data-form">
          <div className="data-avatar">
            <p>Profile picture</p>
            <img src={avatar} alt="Profile Avatar" />
          </div>
          <div className="data-output">
            <label>
              Your <strong>Name</strong>
            </label>
            <input value={name} readOnly />
          </div>
          <div className="data-output">
            <label>
              Your <strong>E-mail</strong>
            </label>
            <input value={email} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
