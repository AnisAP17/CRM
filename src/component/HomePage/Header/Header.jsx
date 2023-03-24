import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate()
  const logOutFunc = () => {
    navigate("/")
    localStorage.removeItem("user");
    window.location.reload();
  };

  const user = JSON.parse(localStorage.getItem("user") || '');

  return (
    <div>
      <div className="HomeHeader HomeFlexHeader HomePaddingHeader">
        <div className="HomeFlexHeader">
          <Link to="/" className="LinkHeader HomeWeight">CRM</Link>
        </div>
        <div className="HomeFlexHeader">
          <img src="" alt="" />
          <div className="PaddingLogout">{user.name}</div>
          <div onClick={logOutFunc} className="LoginPageLogOut">
            Выйти
          </div>
        </div>
      </div>
    </div>
  );
}
