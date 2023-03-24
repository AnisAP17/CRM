import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Authorization() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [allUser, setAllUser] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:4001/user')
    .then((response) => response.json())
    .then((json) => setAllUser(json));
  },[])

  const onFindUser = () => {
  allUser.filter(userMap => {
    if (userMap.email === user.email && userMap.password === user.password) {
        localStorage.setItem(('user'), JSON.stringify(user))
        navigate('/')
    }else{
        alert("Пользователь не найден")
    }
  })
  };
  console.log(user)
  console.log(allUser)

  return (
    <div>
      <div className="LoginPageBackground ">
        <div className="LoginPageAuth">
          <div className="">
            <h1>Вход</h1>
            <div className="loginPageRegistrationFrom">
              <div className="LoginPageInput">
                <span>Email:</span>
                <input
                  onChange={(e) => setUser({ email: e.target.value })}
                  className="LoginPageInputPut"
                  type="email"
                  placeholder="example@email.com"
                />
              </div>
              <div className="LoginPageInput">
                <span>Password:</span>
                <input
                  onChange={(e) => setUser({ password: e.target.value })}
                  className="LoginPageInputPut"
                  type="password"
                />
              </div>
            </div>
            <div className="LoginPageGetStarted" onClick={onFindUser}>
              Войти
            </div>
            <div className="LinkAuth">
              Нет аккаунта?{" "}
              <Link to="/" className="LinkLoginAndAuth">
                Регистрация
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
