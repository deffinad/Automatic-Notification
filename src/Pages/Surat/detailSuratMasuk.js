import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "../../Components/Navigation";
import { getSuratMasukById } from "../../Services/api";
import { Card } from "../../Components/Card";
import { Button } from "../../Components/Button";
import { Badge } from "../../Components/Badge";
import { useUser } from "../Login/session";
import { Loading } from "../../Components/Loading";
import { Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import SamplePDF from "../../assets/pdf/sample.pdf";

export const DetailSuratMasuk = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [suratMasuk, setSuratMasuk] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  useEffect(() => {
    getSuratMasukById(id)
      .then((response) => {
        setLoading(false);
        setSuratMasuk(response.data);
      })
      .catch((err) => {
        setLoading(false);
        setSuratMasuk([]);
      });
  }, []);

  return (
    <Navigation name="Detail Surat Masuk">
      <div className="mt-14">
        <Card style="bg-white py-6 px-6 h-full lg:h-[500px]">
          {loading ? (
            <div className="flex flex-col md:flex-row gap-5 md:h-[500px]">
              <div className="w-full h-full flex justify-center items-center">
                <Loading width={200} height={200} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col-reverse h-full lg:flex-row gap-10">
              <div className="w-full lg:h-full h-[500px] bg-gray-100 lg:w-[45%]">
                <div className="flex flex-row justify-center items-center bg-gray-50 p-2">
                  <ZoomOutButton />
                  <ZoomPopover />
                  <ZoomInButton />
                </div>
                <div className="h-[90%]">
                  <Viewer fileUrl={SamplePDF} plugins={[zoomPluginInstance]} />
                </div>
              </div>

              <div className="flex-1 h-full flex flex-col mt-5 lg:mt-0">
                <div className="space-y-6 h-full justify-center flex flex-col">
                  <div>
                    <p className="text-lg font-semibold">
                      {suratMasuk[0].idSuratMasuk}
                    </p>
                    <p className="mt-3 font-bold text-2xl break-words">
                      {suratMasuk[0].perihalSurat}
                    </p>
                    <p className="text-base mt-1">{suratMasuk[0].tglSurat}</p>
                    <div className="flex justify-start mt-1">
                      {suratMasuk[0].tglDiterima === "" ? (
                        <Badge
                          text={"Proses"}
                          style={
                            "text-white rounded-lg bg-yellow-400 hover:bg-yellow-500"
                          }
                        />
                      ) : (
                        <Badge
                          text={"Selesai"}
                          style={
                            "text-white rounded-lg bg-emerald-600 hover:bg-emerald-700"
                          }
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row border-y-2 gap-5 py-4">
                    <div className="flex-1">
                      <p className="font-bold">Nomer Surat</p>
                      <p className="break-all">{suratMasuk[0].noSurat}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">Sifat Surat</p>
                      <p className="break-all">{suratMasuk[0].sifatSurat}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold">Pengirim</p>
                    <p>{suratMasuk[0].pengirim}</p>
                  </div>

                  <div>
                    <p className="font-bold">Keterangan</p>
                    <p className="break-words">{suratMasuk[0].keterangan}</p>
                  </div>
                </div>

                {user.role == "admin" ? (
                  suratMasuk[0].tglDiterima === "" ? (
                    <div className="flex-1 flex items-end">
                      <div className="w-full">
                        <Link
                          to={
                            "/tambahsuratkeluar/" +
                            suratMasuk[0].idSuratMasuk +
                            "/" +
                            suratMasuk[0].pengirim
                          }
                        >
                          <Button
                            name="Buat Surat Keluar"
                            style="w-full bg-indigo-700 hover:bg-indigo-800"
                            textStyle="text-white"
                          />
                        </Link>
                      </div>
                    </div>
                  ) : null
                ) : suratMasuk[0].tglDiterima === "" ? null : (
                  <div className="flex-1 flex items-end">
                    <Button
                      name="Download"
                      style="w-full bg-indigo-700 hover:bg-indigo-800"
                      textStyle="text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </Navigation>
  );
};
