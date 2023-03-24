import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function ApplicationsChart() {
    const labels = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октрябрь",
        "Ноябрь",
        "Декабрь",
      ];
      const [data, setData] = useState({
        labels: labels,
        datasets: [
          {
            label: "Заявки по месяцам за 2023 год",
            data: [4, 2, 1, 1, 5, 9, 3, 3, 1, 10, 6, 2],
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