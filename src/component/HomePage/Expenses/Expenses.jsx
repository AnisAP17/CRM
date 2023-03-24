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

export default function Expenses() {
    useEffect(() => {
        fetch("http://localhost:4001/allExpenses")
          .then((response) => response.json())
          .then((json) => setAllExpenses(json));
      }, []);

  const [toggle, setToggle] = useState(false);
  const [expenses, setExpenses] = useState({
    id: "",
    name: "",
    description: "",
    time: "",
    price: "",
  });

  const [allExpenses, setAllExpenses] = useState([]);

  let allPrice = allExpenses.map(ex => {
    return parseInt(ex.price)
  })

  let sum = 0

  allPrice.map((item) => sum += item)
console.log(sum)


  const onChangeToggle = () => {
    setToggle(!toggle);
  };

  const saveExpenses = () => {
    const newExpenses = {
      ...expenses,
      id: uuidv4(),
    };
    setExpenses({ ...expenses, id: uuidv4() });
    if (
        newExpenses.name !== "" &&
      typeof newExpenses.name === "string" &&
      newExpenses.time !== "" &&
      typeof newExpenses.time === "string" &&
      newExpenses.description !== "" &&
      typeof newExpenses.description === "string" &&
      newExpenses.price !== "" &&
      typeof newExpenses.price === "string"
    ) {
      fetch("http://localhost:4001/create_expenses", {
        method: "POST",
        body: JSON.stringify(newExpenses),
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
            <div>
                Общий расход <span className="Expenses">{sum}</span> сомони
            </div>
            <br />
          <div
            onClick={onChangeToggle}
            className="HomeFlex LoginPageLogOutCircleSecond"
          >
            Добавить расход
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
                            setExpenses({
                            ...expenses,
                            name: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                            setExpenses({
                            ...expenses,
                            description: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder='сомони'
                        onChange={(e) => {
                            setExpenses({
                            ...expenses,
                            price: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="date"
                        placeholder=''
                        onChange={(e) => {
                            setExpenses({
                            ...expenses,
                            time: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input type="button" value="add" onClick={saveExpenses} />
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
