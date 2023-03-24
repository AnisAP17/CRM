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

export default function Income() {
    useEffect(() => {
        fetch("http://localhost:4001/allIncome")
          .then((response) => response.json())
          .then((json) => setAllIncome(json));
      }, []);

  const [toggle, setToggle] = useState(false);
  const [income, setIncome] = useState({
    id: "",
    time: '',
    name: "",
    telephone: "",
    email: "",
    products: '',
    price: "",
  });

  const [allIncome, setAllIncome] = useState([]);

  let allPrice = allIncome.map(ex => {
    return parseInt(ex.price)
  })

  let sum = 0

  allPrice.map((item) => sum += item)
console.log(sum)


  const onChangeToggle = () => {
    setToggle(!toggle);
  };

  const saveIncomes = () => {
    const newIncome = {
      ...income,
      id: uuidv4(),
    };
    setIncome({ ...income, id: uuidv4() });
    if (
        newIncome.name !== "" &&
      typeof newIncome.name === "string" &&
      newIncome.time !== "" &&
      typeof newIncome.time === "string" &&
      newIncome.telephone !== "" &&
      typeof newIncome.telephone === "string" &&
      newIncome.email !== "" &&
      typeof newIncome.email === "string" &&
      newIncome.products !== "" &&
      typeof newIncome.products === "string" &&
      newIncome.price !== "" &&
      typeof newIncome.price === "string"
    ) {
      fetch("http://localhost:4001/create_income", {
        method: "POST",
        body: JSON.stringify(newIncome),
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
              <div className="PaddingColumn">
              <Link className="PaddingColumn LinkLoginAndAuth" to="/income">
                Доходы
              </Link>
            </div>
              </div>
          </div>
        </div>
        <div className="HomeSecondColumn HomePadding">
            <div>
                Общий доход <span className="Expenses">{sum}</span> сомони
            </div>
            <br />
          <div
            onClick={onChangeToggle}
            className="HomeFlex LoginPageLogOutCircleSecond"
          >
            Добавить доход
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
                        type="date"
                        onChange={(e) => {
                            setIncome({
                            ...income,
                            time: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                            setIncome({
                            ...income,
                            name: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                            setIncome({
                            ...income,
                            telephone: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                            setIncome({
                            ...income,
                            email: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        onChange={(e) => {
                            setIncome({
                            ...income,
                            products: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder='сомони'
                        onChange={(e) => {
                            setIncome({
                            ...income,
                            price: e.target.value,
                          });
                        }}
                      />
                    </th>
                    <th>
                      <input type="button" value="add" onClick={saveIncomes} />
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
