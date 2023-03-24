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

export default function Client() {
  const [toggle, setToggle] = useState(false);
  const [client, setClient] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    organization: "",
    telephone: null,
  });

  const [allClient, setAllClient] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4001/allClient")
      .then((response) => response.json())
      .then((json) => setAllClient(json));
  }, []);

  const onChangeToggle = () => {
    setToggle(!toggle);
  };

  const saveClient = () => {
    const newClient = {
      ...client,
      id: uuidv4(),
    };
    setClient({ ...client, id: uuidv4() });
    if (
      newClient.email !== "" &&
      typeof newClient.email === "string" &&
      newClient.organization !== "" &&
      typeof newClient.organization === "string" &&
      newClient.surname !== "" &&
      typeof newClient.surname === "string" &&
      newClient.name !== "" &&
      typeof newClient.name === "string" &&
      newClient.telephone !== 0 &&
      typeof newClient.telephone === "number"
    ) {
      fetch("http://localhost:4001/create_client", {
        method: "POST",
        body: JSON.stringify(newClient),
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
              <Link className="PaddingColumn LinkLoginAndAuth" to="/expenses">
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
            className="HomeFlex LoginPageLogOutCircleSecond"
          >
            Добавить клиента
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
                          setClient({
                            ...client,
                            name: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                          setClient({
                            ...client,
                            surname: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                          setClient({
                            ...client,
                            email: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                          setClient({
                            ...client,
                            organization: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                          setClient({
                            ...client,
                            telephone: parseInt(e.target.value),
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input type="button" value="add" onClick={saveClient} />
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
