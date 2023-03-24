import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const saveUser = () => {
    const newUser = {
      ...user,
      id: uuidv4(),
    };
    setUser({ ...user, id: uuidv4() });
    if (
      newUser.email !== "" &&
      newUser.lastname !== "" &&
      newUser.name !== "" &&
      newUser.password !== ""
    ) {
      fetch("http://localhost:4001/user_signin", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

      localStorage.setItem("user", JSON.stringify(newUser));
      window.location.reload();
    } else {
      alert("Запишите все данные");
    }
  };

  return (
    <div className="LoginPageBackground ">
      <div className="LoginPageRegistration">
        <div className="">
          <h1>Регистрация</h1>
          <div className="loginPageRegistrationFrom">
            <div className="LoginPageInput">
              <span>Имя:</span>
              <input
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="LoginPageInputPut"
                type="text"
              />
            </div>
            <div className="LoginPageInput">
              <span>Фамилия:</span>
              <input
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                className="LoginPageInputPut"
                type="text"
              />
            </div>
            <div className="LoginPageInput">
              <span>Email:</span>
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="LoginPageInputPut"
                type="email"
                placeholder="example@email.com"
              />
            </div>
            <div className="LoginPageInput">
              <span>Пароль:</span>
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="LoginPageInputPut"
                type="password"
              />
            </div>
          </div>
          <div onClick={saveUser} className="LoginPageGetStarted">
            НАЧАТЬ РАБОТУ
          </div>
          <div className="LoginPageInputAuthorization loginPageRegistrationFromAut">
            <Link to="/auth" className="LinkLoginAndAuth">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
