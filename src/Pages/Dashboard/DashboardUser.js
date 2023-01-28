import { Card } from "../../Components/Card";
import { Navigation } from "../../Components/Navigation";
import BgDashboard from "../../assets/img/bg-dashboard.png"
import { useUser } from "../Login/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { CardDashboard } from "../../Components/Card/CardDashboard";
import VektorImage from "../../assets/img/vektor.png"
import SuratMasukImage from "../../assets/img/surat-masuk.png"
import {Button} from "../../Components/Button"
export const DashboardUser = () => {
  const { user } = useUser();

  return (
    <Navigation name={"Dashboard"}>
      <div className="mt-14">
        <div className="flex lg:flex-row flex-col gap-10">
          <Card style="flex-1 bg-indigo-700 text-white">
            <div className="flex h-full items-center">
              <div className="flex-1 p-6 space-y-1">
                <p className="lg:text-xl">Selamat Datang,</p>
                <p className="lg:text-xl font-bold">{user.nama} !</p>
              </div>
              <div className="flex-1 flex justify-end">
                <img src={BgDashboard} className="w-72"/>
              </div>
            </div>
          </Card>

          <div className="lg:w-64">
            <CardDashboard icon={faMailBulk} text={"Total Pengajuan Surat Masuk"} iconSize={'3x'} count={3} textSize={"text-base"}/>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 mt-10 h-auto">
          <Card style="relative flex md:flex-1 justify-center items-center h-auto bg-white">
            <div className="absolute bottom-0">
              <img src={VektorImage}/>
            </div>

            <div className="flex h-full w-full p-10 gap-2 justify-center items-start flex-col text-gray-600">
              <p className="text-2xl font-bold w-72">Ajukan Suratmu dan Dapatkan Notifikasi</p>
              <p className="font-normal w-96">Pemberitahuan tepat waktu, terogranisir, dan terhubung</p>
            </div>
          </Card>

          <Card style="w-full md:w-72 flex flex-col items-center justify-start h-full bg-white p-6 text-gray-600">
            
            <div className="flex flex-row gap-3">
              <div className="w-[6px] bg-indigo-700"></div>
              <p className="font-bold text-lg">Pengajuan Surat Terakhir</p>
            </div>
            <img src={SuratMasukImage} className="w-40"/>

            <div className="flex flex-col justify-center items-center my-4 break-words text-center">
              <p className="text-base font-bold">Surat Penerimaan Beasiswa</p>
              <p className="text-base">Keterangan Beasiswa</p>
            </div>

            <Button name="Lihat Detail" style="w-full bg-indigo-700 my-0" textStyle="text-white text-sm"/>
          </Card>
        </div>

      </div>
    </Navigation>
  );
};
