import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function ExpensesAndIncomeChart() {
  useEffect(() => {
    fetch("http://localhost:4001/allIncome")
      .then((response) => response.json())
      .then((json) => setAllExpenses(json));
  }, []);

  const [allExpenses, setAllExpenses] = useState([]);

  let allPrice = allExpenses.map(ex => {
    return parseInt(ex.price)
  })

  let sum = 0

  allPrice.map((item) => sum += item)

    const labels = [
        "Расходы и Доходы за 2023 год",
      ];
      const [data, setData] = useState({
        labels: labels,
        datasets: [
          {
            label: "Расходы в сомони",
            data: [46000],
            backgroundColor: ["#ff0000"],
            borderColor: ["#ff0000"],
            borderWidth: 1,
          },
          {
            label: "Доходы в сомони",
            data: [75000],
            backgroundColor: ["rgb(153, 102, 255)"],
            borderColor: ["rgb(153, 102, 255)"],
            borderWidth: 1,
          },
        ],
      });
    return (
        <div>
            <Bar height={250} width={900} data={data} />
        </div>
    )
}