import { Link } from "react-router-dom";
import Header from "./Header/Header";
import ApplicationsChart from "./ApplicatiosChart/ApplicationsChart";
import ExpensesAndIncomeChart from "./ExpensesAndIncomeChart/ExpensesAndIncomeChart";


export default function HomePage() {
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
          <ApplicationsChart/>
          <ExpensesAndIncomeChart/>
        </div>
        
      </div>
    </div>
  );
}
