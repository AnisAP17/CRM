import { Link } from "react-router-dom";
import Header from "../Header/Header";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StickyHeadTable from "./table/StickyHeadTable";

// if(id){fetch(`http://updateApplication/${id}`, {
//   method: 'PUT',
//   body: JSON.stringify({application}),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
//   }

export default function Applications() {
  const [toggle, setToggle] = useState(false);
  const [application, setApplication] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    telephone: null,
    recordon: "",
    time: "",
  });

  const [allApplication, setAllApplication] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4001/allAplication")
      .then((response) => response.json())
      .then((json) => setAllApplication(json));
  }, []);

  const onChangeToggle = () => {
    setToggle(!toggle);
  };


  const updateApplication = (app) => {
    setToggle(!toggle);
    setApplication(app);
  };

  const onSaveChanges = (id) => {
    setToggle(!toggle);
  };

  const saveApplication = () => {
    const newApplecation = {
      ...application,
      id: uuidv4(),
    };
    setApplication({ ...application, id: uuidv4() });
    if (
      newApplecation.email !== "" &&
      typeof newApplecation.email === "string" &&
      newApplecation.surname !== "" &&
      typeof newApplecation.surname === "string" &&
      newApplecation.name !== "" &&
      typeof newApplecation.name === "string" &&
      newApplecation.time !== "" &&
      typeof newApplecation.time === "string" &&
      newApplecation.telephone !== 0 &&
      typeof newApplecation.telephone === "number" &&
      newApplecation.recordon !== "" &&
      typeof newApplecation.recordon === "string"
    ) {
      fetch("http://localhost:4001/create_application", {
        method: "POST",
        body: JSON.stringify(newApplecation),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

       
      window.location.reload();
    } else {
      alert("Заполните все ячейки");
    }
  };

  return (
    <div>
      <Header />
      <div className="HomeFlex">
        <div className="HomeFirstColumn HomePaddingColumn">
          <div>
            <div className="PaddingColumn">
              <Link className="PaddingColumn LinkLoginAndAuth" to="/">
                Доска
              </Link>
            </div>
            <div className="PaddingColumn">
              <Link className="PaddingColumn LinkLoginAndAuth" to="/client">
                Клиенты
              </Link>
            </div>
            <div className="PaddingColumn">
              <Link
                className="PaddingColumn LinkLoginAndAuth"
                to="/applications"
              >
                Заявки
              </Link>
            </div>
            <div className="PaddingColumn">
              <Link
                className="PaddingColumn LinkLoginAndAuth"
                to="/expenses"
              >
                Расходы
              </Link>
            </div>
            <div className="PaddingColumn">
              <Link className="PaddingColumn LinkLoginAndAuth" to="/income">
                Доходы
              </Link>
            </div>
          </div>
        </div>
        <div className="HomeSecondColumn HomePadding">
          <div
            onClick={onChangeToggle}
            className="HomeFlex LoginPageLogOutCircle"
          >
            Создать заявку
            <div>
              <AddCircleOutlineIcon />
            </div>
          </div>
          <br />
          {toggle && (
            <div>
              <table>
                <tbody>
                  <tr className="TableFlex">
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                          setApplication({
                            ...application,
                            name: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                          setApplication({
                            ...application,
                            surname: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                          setApplication({
                            ...application,
                            email: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                          setApplication({
                            ...application,
                            telephone: parseInt(e.target.value),
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                          setApplication({
                            ...application,
                            recordon: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="date"
                        onChange={(e) => {
                          setApplication({
                            ...application,
                            time: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="button"
                        value="add"
                        onClick={saveApplication}
                      />
                    </th>
                  </tr>
                  <StickyHeadTable />
                </tbody>
              </table>
            </div>
          )}
          {!toggle && (
            <table>
              <tbody>
              <StickyHeadTable />
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
