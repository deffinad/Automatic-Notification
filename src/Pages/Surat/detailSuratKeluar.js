import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "../../Components/Navigation";
import { getSuratKeluarById, getsuratKeluarById } from "../../Services/api";
import { Card } from "../../Components/Card";
import { Button } from "../../Components/Button";
import { Loading } from "../../Components/Loading";
import { Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import SamplePDF from "../../assets/pdf/sample.pdf";

export const DetailSuratKeluar = () => {
  const { id } = useParams();
  const [suratKeluar, setSuratKeluar] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  useState(() => {
    getSuratKeluarById(id)
      .then((response) => {
        setSuratKeluar(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setSuratKeluar([]);
      });
  }, []);

  return (
    <Navigation name="Detail Surat Keluar">
      <div className="mt-14">
        <Card style={"bg-white py-6 px-6 lg:h-[500px]"}>
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
                    <p className="text-lg">{suratKeluar[0].idSuratKeluar}</p>
                    <p className="mt-3 font-bold text-2xl breack-words">
                      {suratKeluar[0].perihalSurat}
                    </p>
                    <p className="text-base">{suratKeluar[0].tglSurat}</p>
                    <p className="text-base">
                      <span className="font-bold">ID Surat Masuk :</span>{" "}
                      {suratKeluar[0].idSuratMasuk}
                    </p>
                  </div>

                  <div className="flex flex-row border-y-2 py-4">
                    <div className="flex-1">
                      <p className="font-bold">Nomer Surat</p>
                      <p className="break-all">{suratKeluar[0].noSurat}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">Pengirim</p>
                      <p className="break-all">{suratKeluar[0].pengirim}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold">Tujuan</p>
                    <p>{suratKeluar[0].tujuan}</p>
                  </div>

                  <div>
                    <p className="font-bold">Sifat Surat</p>
                    <p>{suratKeluar[0].sifatSurat}</p>
                  </div>

                  <div>
                    <p className="font-bold">Keterangan</p>
                    <p className="break-words">{suratKeluar[0].keterangan}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Navigation>
  );
};
