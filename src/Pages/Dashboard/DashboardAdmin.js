import { Card } from "../../Components/Card";
import { Navigation } from "../../Components/Navigation";
import { CardDashboard } from "../../Components/Card/CardDashboard";
import {
  faFileAlt,
  faFileImport,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import SuratMasukImage from "../../assets/img/surat-masuk.png";
import { Button } from "../../Components/Button";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export const DashboardAdmin = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio:false,
    plugins: {
      title: {
        display: false,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Surat Masuk",
        data: labels.map(() => Math.random() * 100),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Surat Keluar",
        data: labels.map(() => Math.random() * 100),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Navigation name={"Dashboard"}>
      <div className="mt-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <CardDashboard
            icon={faFileImport}
            iconSize={"3x"}
            text={"Total Surat Masuk"}
            count={10}
            textSize={"text-xl"}
          />
          <CardDashboard
            icon={faFileAlt}
            iconSize={"3x"}
            text={"Total Surat Keluar"}
            count={5}
            textSize={"text-xl"}
          />
          <CardDashboard
            icon={faUserAlt}
            iconSize={"3x"}
            text={"Total Pengguna"}
            count={20}
            textSize={"text-xl"}
          />
        </div>

        <div className="mt-10 h-full flex flex-col md:flex-row gap-10 text-gray-600">
          <Card style={"bg-white h-auto flex flex-col p-6 flex-1"}>
            <div className="flex flex-row gap-3">
              <div className="w-[6px] bg-indigo-700"></div>
              <p className="font-bold text-lg">Grafik Surat</p>
            </div>

            <div className="flex-1 w-[99%] relative m-0">
              <Line options={options} data={data}/>
            </div>
          </Card>

          <Card style="w-full h-auto md:w-72 flex flex-col items-center justify-start h-full bg-white p-6 text-gray-600">
            <div className="flex flex-row gap-3">
              <div className="w-[6px] bg-indigo-700"></div>
              <p className="font-bold text-lg">Surat Masuk</p>
            </div>
            <img src={SuratMasukImage} className="flex-1 w-52" />

            <div className="flex flex-col justify-center items-center my-4 break-words text-center">
              <p className="text-base font-bold">Surat Penerimaan Beasiswa</p>
              <p className="text-base">Keterangan Beasiswa</p>
            </div>

            <Button
              name="Lihat Detail"
              style="w-full bg-indigo-700 my-0"
              textStyle="text-white text-sm"
            />
          </Card>
        </div>
      </div>
    </Navigation>
  );
};
